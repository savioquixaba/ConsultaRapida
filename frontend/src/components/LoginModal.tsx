import { useState } from "react"
import { Lock, Loader2, X, XCircle } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || ""

type LoginModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    try {
      const body = new URLSearchParams({ username, password })
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      if (res.url.includes("error")) {
        throw new Error("Usuário ou senha inválidos.")
      }
      if (!res.ok && res.status !== 200) {
        throw new Error(`Erro ${res.status}`)
      }
      setPassword("")
      onSuccess()
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-rise"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border/50 bg-secondary/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 shadow-[0_0_20px_rgba(0,128,255,0.35)]">
              <Lock size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Sessão expirada</h2>
              <p className="text-xs text-muted-foreground">Faça login para continuar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            title="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {erro && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2.5 mb-4">
            <XCircle size={16} className="shrink-0" />
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="modal-username" className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Usuário
            </label>
            <input
              id="modal-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={loading}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="modal-password" className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Senha
            </label>
            <input
              id="modal-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !username.trim() || !password}
            className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_6px_20px_rgba(0,128,255,0.35)] border border-white/10 transition-all disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
            {loading ? "Entrando..." : "Entrar novamente"}
          </button>
        </form>
      </div>
    </div>
  )
}
