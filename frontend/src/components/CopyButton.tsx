import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CopyButton({ value }: { value: string }) {
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
      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all shrink-0 group relative"
      title="Copiar"
    >
      {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-foreground text-background px-2 py-1 rounded shadow whitespace-nowrap">
          Copiado!
        </span>
      )}
    </button>
  )
}
