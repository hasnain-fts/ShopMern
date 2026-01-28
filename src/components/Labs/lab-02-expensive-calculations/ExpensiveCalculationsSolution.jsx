import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const expensiveCalculation = (items) => {
  let total = 0;
  for (let i = 0; i < 50_000_000; i++) {
    total += i % 10;
  }
  return total + items.length;
};

export default function ExpensiveCalculationsSolution() {
  const [query, setQuery] = React.useState("");
  const [items] = React.useState(
    Array.from({ length: 500 }, (_, i) => `Item ${i}`)
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  // ✅ expensive calculation only runs when filteredItems changes
  const total = useMemo(() => {
    return expensiveCalculation(filteredItems);
  }, [filteredItems]);

  return (
    <div className="max-w-3xl mx-auto ">
      <h5 className="flex items-center gap-2">
        Expensive Calculation Lab
        <Badge variant="success">Optimized</Badge>
      </h5>

      <div className="space-y-4 mt-3">
        <Input
          placeholder="Search items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <p className="text-sm text-muted-foreground">
          Expensive calculation is memoized using <code>useMemo</code>.
        </p>

        <p className="font-semibold">Total: {total}</p>

        <div className="h-60 overflow-auto border rounded-md p-2 space-y-1">
          {filteredItems.map((item) => (
            <div key={item} className="text-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
