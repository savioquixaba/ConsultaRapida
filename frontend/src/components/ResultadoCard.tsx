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
            <div key={field.label} className="flex justify-between border-b pb-2 last:border-0">
              <span className="text-muted-foreground">{field.label}</span>
              <span className="font-medium">{field.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
