import { useState } from "react"
import { Search } from "lucide-react"
import ConsultaForm from "./components/ConsultaForm"
import ResultadoCard from "./components/ResultadoCard"

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
    <div className="min-h-screen flex flex-col items-center p-4 pt-12 md:pt-24">
      <div className="w-full max-w-lg space-y-8">
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
        <ResultadoCard data={data} erro={erro} />
      </div>
    </div>
  )
}
