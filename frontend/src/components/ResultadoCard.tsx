import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type ResultadoData = {
  protocolo: string
  nrCpf: string
  pendenciaRFB: boolean
  descricaoPendencia: string | null
}

type ResultadoCardProps = {
  data: ResultadoData | null
  erro: string | null
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
      title="Copiar"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  )
}

export default function ResultadoCard({ data, erro }: ResultadoCardProps) {
  if (erro) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Erro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{erro}</p>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const fields = [
    { label: "Protocolo", value: data.protocolo },
    { label: "CPF", value: data.nrCpf },
    { label: "Pendência RFB", value: data.pendenciaRFB ? "Sim" : "Não" },
    { label: "Descrição Pendência", value: data.descricaoPendencia ?? "—" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultado da Consulta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {fields.map((field) => (
            <div key={field.label} className="flex items-center justify-between border-b pb-2 last:border-0">
              <span className="text-muted-foreground">{field.label}</span>
              <span className="font-medium flex items-center">
                {field.value}
                <CopyButton value={field.value} />
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
