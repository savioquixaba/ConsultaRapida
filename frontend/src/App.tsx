import { useState } from "react"
import ConsultaForm from "./components/ConsultaForm"
import ResultadoCard from "./components/ResultadoCard"

type ResultadoData = {
  protocolo: string
  nrCpf: string
  pendenciaRFB: boolean
  descricaoPendencia: string | null
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
        throw new Error(err?.detalhe || `Erro ${res.status}: ${res.statusText}`)
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">ConsultaRapida</h1>
        <ConsultaForm onConsultar={handleConsultar} loading={loading} />
        <ResultadoCard data={data} erro={erro} />
      </div>
    </div>
  )
}
