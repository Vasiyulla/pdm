"use client"

import { useState } from "react"
import { LoginPanel } from "@/components/login-panel"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (email: string) => {
    // Simulated login
    if (email && email.includes("@")) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return <>{isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <LoginPanel onLogin={handleLogin} />}</>
}
