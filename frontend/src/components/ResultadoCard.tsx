import { XCircle, Fingerprint, FileSearch } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import CopyButton from "./CopyButton"

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

function IndicatorBadge({ label, value }: { label: string; value: number }) {
  const color = value > 0 ? "text-green-400" : "text-muted-foreground"
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/30">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-lg font-bold tabular-nums ${color}`}>{value}</span>
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

  if (!data) {
    return (
      <Card className="py-12">
        <CardContent>
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <FileSearch size={40} strokeWidth={1.5} />
            <p className="text-sm">Digite um protocolo para consultar</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
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

        <div className="flex items-center gap-2 pb-1">
          <Fingerprint size={16} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Indicadores</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <IndicatorBadge label="Consulta Biográfica" value={data.indConsBiografica} />
          <IndicatorBadge label="Consulta Biométrica" value={data.indConsBiometrica} />
        </div>
      </CardContent>
    </Card>
  )
}
