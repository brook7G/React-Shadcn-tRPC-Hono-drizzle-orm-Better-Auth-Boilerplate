import { useState } from "react"
import DashboardShell from "@/components/layouts/dashboard-shell"
import { IconUsers, IconDashboard } from "@tabler/icons-react"
import { useSession } from "@/hooks/auth/auth-client"
import { DashboardView } from "./dashboard-view"
import { UsersView } from "./user/users-view"

function AdminPage() {
  const { data: session } = useSession()
  const [activeView, setActiveView] = useState("dashboard")

  const sidebarData = {
    primary: [
      { title: "Dashboard", url: "#", icon: IconDashboard, onClick: () => setActiveView("dashboard") },
      { title: "Users", url: "#", icon: IconUsers, onClick: () => setActiveView("users") },
    ],
    secondary: [
    ]
  }

  const currentUser = {
    name: session?.user?.name || "Admin User",
    email: session?.user?.email || "admin@example.com",
    avatar: session?.user?.image || undefined,
    id: session?.user?.id || ""
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />
      case "users":
        return <UsersView />
      default: 
        return null
    }
  }

  return (
    <DashboardShell
      sidebar={sidebarData}
      title="Admin Dashboard"
      user={currentUser}
    >
      {renderContent()}
    </DashboardShell>
  )
}



export  default AdminPage