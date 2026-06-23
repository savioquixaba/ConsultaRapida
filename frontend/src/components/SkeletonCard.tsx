import { Card, CardContent, CardHeader } from "./ui/card"

export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-40 bg-secondary rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="h-3 w-24 bg-secondary rounded animate-pulse" />
            <div className="h-3 w-32 bg-secondary rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
