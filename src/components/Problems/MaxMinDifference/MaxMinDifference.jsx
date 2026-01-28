import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MaxMinDifference = () => {
  const [input, setInput] = useState("");
  const [difference, setDifference] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  // Solution function
  const calculateDifference = (values) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max, diff: max - min };
  };

  const handleCalculate = () => {
    try {
      const values = input.split(",").map(Number);
      if (values.some(isNaN)) throw new Error();

      const { min, max, diff } = calculateDifference(values);
      setMinValue(min);
      setMaxValue(max);
      setDifference(diff);
    } catch {
      alert("Please enter a valid comma-separated list of numbers");
    }
  };

  const codeString = `function calculateDifference(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - min;
}`;

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>🌡️ Max-Min Difference Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter numbers (comma separated). Example: <code>4,9,-2,7,5</code>
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="e.g. 4,9,-2,7,5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleCalculate}>Calculate</Button>
          </div>

          {difference !== null && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Minimum Value:</strong> {minValue}
              </p>
              <p>
                <strong>Maximum Value:</strong> {maxValue}
              </p>
              <p>
                <strong>Difference:</strong>{" "}
                <span className="text-green-600 font-bold">{difference}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Code Display */}
      <Card>
        <CardHeader>
          <CardTitle>💻 Code Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-zinc-900 text-zinc-100 text-sm p-4 rounded-lg overflow-x-auto">
            {codeString}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaxMinDifference;
