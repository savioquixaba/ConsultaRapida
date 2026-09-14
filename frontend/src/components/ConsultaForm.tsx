import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type ConsultaFormProps = {
  onConsultar: (protocolo: string) => void
  loading: boolean
}

export default function ConsultaForm({ onConsultar, loading }: ConsultaFormProps) {
  const [protocolo, setProtocolo] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (protocolo.trim()) {
      onConsultar(protocolo.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          placeholder="Digite o número do protocolo"
          value={protocolo}
          onChange={(e) => setProtocolo(e.target.value)}
          disabled={loading}
          className="pl-10"
        />
      </div>
      <Button type="submit" disabled={loading || !protocolo.trim()} size="lg">
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Search size={18} />
        )}
      </Button>
    </form>
  )
}
