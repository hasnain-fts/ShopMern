import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProductCard({ name, price, category, stock, imageURL }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      
      {/* Image */}
      <img
        src={imageURL || "https://avatar.vercel.sh/shadcn1"}
        alt={name}
        className="aspect-video w-full object-cover rounded-t-xl"
      />

      <CardHeader>
        {/* Category Badge */}
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>

        {/* Name */}
        <CardTitle className="text-lg">{name}</CardTitle>

        {/* Price */}
        <p className="text-xl font-bold text-green-600">${price}</p>

        {/* Stock */}
        <p className={`text-sm ${stock > 0 ? "text-gray-500" : "text-red-500"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>
      </CardHeader>

      <CardFooter>
        <Button className="w-full" disabled={stock === 0}>
          {stock > 0 ? "Buy" : "Out of Stock"}
        </Button>
      </CardFooter>

    </Card>
  )
}