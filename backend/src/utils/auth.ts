import { betterAuth } from "better-auth"
import { phoneNumber } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../database/db.js"
import { haveIBeenPwned } from "better-auth/plugins"
import { betterauthConfig } from "../config/betterauth_config.js"
import { admin } from "better-auth/plugins"
import * as schema from "../database/schema/auth-schema.js"

const plugins = [
    haveIBeenPwned(),
    admin() 
] as const

const usePhoneOtp = betterauthConfig.otp.enabled

export const auth: ReturnType<typeof betterAuth> = betterAuth({
    database: drizzleAdapter(db, { provider: 'mysql', schema }),
    plugins: [  
        ...plugins,
        ...(usePhoneOtp
            ? [phoneNumber({
                async sendOTP({ phoneNumber: toPhoneNumber, code }, request) {
                    // TODO: integrate SMS provider here
                    // For now, log to console for development
                    console.log(`[OTP] to ${toPhoneNumber}: ${code}`)
                },
                signUpOnVerification: {
                    getTempEmail: (phoneNumber) => `${phoneNumber}@my-site.com`,
                    getTempName: (phoneNumber) => phoneNumber,
                },
            })]
            : []),
    ],
    
    rateLimit: {
        window:  betterauthConfig.rateLimit.window,
        max: betterauthConfig.rateLimit.max,
    },
    emailAndPassword: {    
        enabled: true
    }
})

export type Auth = ReturnType<typeof betterAuth>