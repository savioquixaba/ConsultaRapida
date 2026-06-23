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

type FieldProps = {
  label: string
  value: string
}

function FieldRow({ label, value }: FieldProps) {
  return (
    <div className="border-b pb-3 last:border-0">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="flex items-start gap-2 mt-1">
        <span className="font-medium break-all leading-relaxed flex-1 min-w-0">{value}</span>
        <CopyButton value={value} />
      </div>
    </div>
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
          <p className="text-destructive whitespace-pre-wrap break-all">{erro}</p>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultado da Consulta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <FieldRow label="Protocolo" value={data.protocolo} />
        <FieldRow label="CPF" value={data.nrCpf} />
        <FieldRow label="Pendência RFB" value={data.pendenciaRFB ? "Sim" : "Não"} />
        <FieldRow label="Descrição Pendência" value={data.descricaoPendencia ?? "—"} />
      </CardContent>
    </Card>
  )
}
