import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme")
    if (stored) return stored === "dark"
    return true
  })

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 p-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-accent transition-all"
      title={dark ? "Modo claro" : "Modo escuro"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
