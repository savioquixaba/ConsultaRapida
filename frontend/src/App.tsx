import { useState } from "react"
import { Search, Heart } from "lucide-react"
import ConsultaForm from "./components/ConsultaForm"
import ResultadoCard from "./components/ResultadoCard"
import SkeletonCard from "./components/SkeletonCard"
import ThemeToggle from "./components/ThemeToggle"

type ResultadoData = {
  protocolo: string
  nrCpf: string
  pendenciaRFB: boolean
  descricaoPendencia: string | null
  indConsBiografica: number
  indConsBiometrica: number
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export default function App() {
  const [data, setData] = useState<ResultadoData | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleConsultar(protocolo: string) {
    setLoading(true)
    setData(null)
    setErro(null)

    try {
      const res = await fetch(`${API_URL}/api/consultas/${protocolo}`)
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.erro || `Erro ${res.status}`)
      }
      const json: ResultadoData = await res.json()
      setData(json)
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen flex flex-col items-center p-4 pt-12 md:pt-24">
        <div className="w-full max-w-lg space-y-8 pb-16">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary/10 mb-2">
              <Search size={24} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">ConsultaRapida</h1>
            <p className="text-sm text-muted-foreground">
              Consulte protocolos e obtenha dados consolidados
            </p>
          </div>

          <ConsultaForm onConsultar={handleConsultar} loading={loading} />
          {loading ? <SkeletonCard /> : <ResultadoCard data={data} erro={erro} />}
        </div>

        <footer className="fixed bottom-0 w-full text-center py-3 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm border-t border-border">
          <p className="flex items-center justify-center gap-1">
            Desenvolvido com <Heart size={12} className="text-red-500 fill-red-500" /> por{" "}
            <span className="font-medium text-foreground">Sávio Quixaba</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <a
              href="https://github.com/savioquixaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/savioquixaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
