import { useState } from "react"
import { Copy, Check, XCircle, Fingerprint, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type ResultadoData = {
  protocolo: string
  nrCpf: string
  pendenciaRFB: boolean
  descricaoPendencia: string | null
  indConsBiografica: number
  indConsBiometrica: number
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
      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all shrink-0"
      title="Copiar"
    >
      {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
    </button>
  )
}

type FieldProps = {
  label: string
  value: string
  highlight?: boolean
}

function FieldRow({ label, value, highlight }: FieldProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg even:bg-secondary/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium flex items-center gap-1 ${highlight ? "text-primary" : ""}`}>
        {value}
        <CopyButton value={value} />
      </span>
    </div>
  )
}

export default function ResultadoCard({ data, erro }: ResultadoCardProps) {
  if (erro) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle size={20} className="text-destructive" />
            <CardTitle>Erro</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive/90">{erro}</p>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Resultado da Consulta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <FieldRow label="Protocolo" value={data.protocolo} />
        <FieldRow label="CPF" value={data.nrCpf} />

        <div className="border-t border-border my-2" />

        <FieldRow
          label="Pendência RFB"
          value={data.pendenciaRFB ? "Sim" : "Não"}
          highlight={data.pendenciaRFB}
        />
        <FieldRow label="Descrição Pendência" value={data.descricaoPendencia ?? "—"} />

        <div className="border-t border-border my-2" />

        <div className="flex items-center gap-2 py-2">
          <Fingerprint size={16} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Indicadores</span>
        </div>
        <FieldRow label="Consulta Biográfica" value={String(data.indConsBiografica)} />
        <FieldRow label="Consulta Biométrica" value={String(data.indConsBiometrica)} />
      </CardContent>
    </Card>
  )
}
