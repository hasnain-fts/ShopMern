import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom";

export function ProductCard({ _id, name, price, category, stock, imageURL }) {
  const navigate = useNavigate();

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      
      {/* Clickable Image */}
      <img
        src={imageURL || "https://avatar.vercel.sh/shadcn1"}
        alt={name}
        onClick={() => navigate(`/product/${_id}`)}
        className="aspect-video w-full object-cover rounded-t-xl cursor-pointer hover:opacity-90 transition-opacity"
      />

      <CardHeader>
        {/* Category Badge - not clickable usually, but added cursor-default */}
        <Badge variant="secondary" className="w-fit cursor-default">
          {category}
        </Badge>

        {/* Name as clickable link */}
        <CardTitle 
          onClick={() => navigate(`/product/${_id}`)}
          className="text-lg cursor-pointer hover:text-gray-600 transition-colors hover:underline"
        >
          {name}
        </CardTitle>

        {/* Price - not clickable */}
        <p className="text-xl font-bold text-green-600 cursor-default">
          ${price}
        </p>

        {/* Stock - not clickable */}
        <p className={`text-sm cursor-default ${stock > 0 ? "text-gray-500" : "text-red-500"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>
      </CardHeader>

      <CardFooter>
        <Button 
          className="w-full cursor-pointer" 
          disabled={stock === 0}
          onClick={() => {
            if (stock > 0) {
              // Add to cart logic here
              console.log("Added to cart:", name);
            }
          }}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>

    </Card>
  )
}