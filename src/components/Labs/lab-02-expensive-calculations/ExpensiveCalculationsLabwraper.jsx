import React, {
  lazy,
  Profiler,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Separator } from "@/components/ui/separator";

/* =========================
   Lazy Imports
========================= */
const ExpensiveCalculations = lazy(() =>
  import(
    "@/components/Labs/lab-02-expensive-calculations/ExpensiveCalculations"
  )
);

const ExpensiveCalculationsSolution = lazy(() =>
  import(
    "@/components/Labs/lab-02-expensive-calculations/ExpensiveCalculationsSolution"
  )
);

/* =========================
   Metric UI
========================= */
const MetricItem = ({ label, value, highlight }) => (
  <div className="flex flex-col px-3 py-2">
    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
    <span
      className={`text-sm font-medium ${
        highlight === "danger"
          ? "text-red-500"
          : highlight === "good"
          ? "text-emerald-500"
          : ""
      }`}
    >
      {value}
    </span>
  </div>
);

/* =========================
   Render Counter
========================= */
const useRenderCount = () => {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
};

/* =========================
   Lab Wrapper
========================= */
const ExpensiveCalculationsLabWrapper = ({ mode = "problem" }) => {
  const renderCount = useRenderCount();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    setMetrics(null);
  }, [mode]);

  const labConfig = useMemo(
    () => ({
      problem: {
        component: <ExpensiveCalculations />,
        codeSnippet: `
const total = expensiveCalculation(filteredItems);
// recalculates on EVERY render
        `,
      },
      solution: {
        component: <ExpensiveCalculationsSolution />,
        codeSnippet: `
const total = useMemo(() => {
  return expensiveCalculation(filteredItems);
}, [filteredItems]);
// runs only when dependencies change
        `,
      },
    }),
    []
  );

  const { component, codeSnippet } = labConfig[mode];

  const isBlocking = metrics && Number(metrics.actualDuration) > 50;

  return (
    <>
      {/* ===== Metrics Header ===== */}
      <div className="flex items-center justify-between px-6 pb-3">
        <span className="text-lg font-medium">
          Expensive Calculation Metrics
        </span>

        <div className="flex items-center rounded-md border bg-muted divide-x">
          <MetricItem label="Renders" value={renderCount} />
          <MetricItem label="Phase" value={metrics?.phase || "—"} />
          <MetricItem
            label="Calc Time"
            value={metrics ? `${metrics.actualDuration} ms` : "—"}
            highlight={isBlocking ? "danger" : "good"}
          />
          <MetricItem
            label="Base"
            value={metrics ? `${metrics.baseDuration} ms` : "—"}
          />
        </div>
      </div>

      {/* ===== Layout ===== */}
      <div className="flex flex-col lg:flex-row gap-4 min-h-0 px-4">
        {/* LEFT: Code */}
        <aside className="w-full lg:w-1/2 rounded-lg bg-slate-50 p-4 overflow-auto">
          <pre className="text-xs font-mono whitespace-pre-wrap">
            {codeSnippet}
          </pre>
        </aside>

        <Separator orientation="vertical" />

        {/* RIGHT: Live Render */}
        <main className="w-full lg:w-1/2 rounded-lg bg-white p-4">
          <Profiler
            id={`ExpensiveCalc-${mode}`}
            onRender={(_, phase, actual, base) => {
              setMetrics({
                phase,
                actualDuration: actual.toFixed(1),
                baseDuration: base.toFixed(1),
              });
            }}
          >
            {component}
          </Profiler>
        </main>
      </div>
    </>
  );
};

export default ExpensiveCalculationsLabWrapper;
