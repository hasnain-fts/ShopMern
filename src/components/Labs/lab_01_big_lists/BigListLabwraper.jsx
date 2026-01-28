import React, {
  lazy,
  Profiler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Separator } from "@/components/ui/separator";

/* =========================
   Lazy Components
========================= */
const ListingProblem = lazy(() =>
  import("@/components/Labs/lab_01_big_lists/ListingProblem")
);

const ListingProblemSolution = lazy(() =>
  import("@/components/Labs/lab_01_big_lists/ListingProblemSolution")
);

/* =========================
   Hooks (Lab-Specific)
========================= */
const useRenderCount = () => {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
};

const MetricItem = ({ label, value, highlight }) => (
  <div className="flex flex-col px-3 py-2">
    <span className="text-[10px] uppercase tracking-wide text-slate-400">
      {label}
    </span>
    <span
      className={`text-sm font-medium ${
        highlight === "danger"
          ? "text-red-500"
          : highlight === "good"
          ? "text-emerald-500"
          : "text-slate-700 dark:text-slate-100"
      }`}
    >
      {value}
    </span>
  </div>
);

const useComponentPaintTime = (deps = []) => {
  const [paintMs, setPaintMs] = useState(null);

  useEffect(() => {
    const start = performance.now();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPaintMs((performance.now() - start).toFixed(1));
      });
    });
  }, deps);

  return paintMs;
};

/* =========================
   Big List Lab Wrapper
========================= */
const BigListLabWrapper = ({ mode }) => {
  const [metrics, setMetrics] = useState(null);
  const renderCount = useRenderCount();
  const paintTime = useComponentPaintTime([mode]);

  // reset metrics when switching problem/solution
  useEffect(() => {
    setMetrics(null);
  }, [mode]);

  const labConfig = useMemo(
    () => ({
      problem: {
        component: <ListingProblem />,
        codeSnippet: `
{userData.map((user) => (
  <Item variant="outline">
    <ItemMedia>
      <Avatar className="size-10">
        <AvatarImage src={user.profileImageUrl} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>
        {user.name}
        <sub>{user.email}</sub>
      </ItemTitle>
      <ItemDescription>{user.lastSeen}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="icon-sm" variant="outline" className="rounded-full">
        <Plus />
      </Button>
    </ItemActions>
  </Item>
))}
        `,
      },

      solution: {
        component: <ListingProblemSolution />,
        codeSnippet: `
import { useVirtualizer } from "@tanstack/react-virtual";

const rowVirtualizer = useVirtualizer({
  count: userData.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => ROW_HEIGHT,
  overscan: 8,
});

{rowVirtualizer.getVirtualItems().map((row) => (
  <Item variant="outline">
    <ItemMedia>
      <Avatar className="size-10">
        <AvatarImage src={row.profileImageUrl} />
        <AvatarFallback>{row.initials}</AvatarFallback>
      </Avatar>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>
        {row.name}
        <sub>{row.email}</sub>
      </ItemTitle>
      <ItemDescription>{row.lastSeen}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="icon-sm" variant="outline" className="rounded-full">
        <Plus />
      </Button>
    </ItemActions>
  </Item>
))}
        `,
      },
    }),
    []
  );

  const isSlow = metrics && Number(metrics.actualDuration) > 16;

  const { component, codeSnippet } = labConfig[mode];

  return (
    <>
      {/* ===== Metrics Header ===== */}
      <div className="flex items-center justify-between px-6 pb-3">
        <span className="text-lg font-medium text-slate-600">
          Big List Performance Metrics
        </span>

        <div className="flex items-center rounded-md border bg-slate-50 dark:bg-slate-900/40 divide-x">
          <MetricItem
            label="Paint"
            value={paintTime ? `${paintTime} ms` : "—"}
            highlight={paintTime > 16 ? "danger" : "good"}
          />
          <MetricItem label="Renders" value={renderCount} />
          <MetricItem label="Phase" value={metrics?.phase || "—"} />
          <MetricItem
            label="Actual"
            value={metrics ? `${metrics.actualDuration} ms` : "—"}
            highlight={isSlow ? "danger" : "good"}
          />
          <MetricItem
            label="Base"
            value={metrics ? `${metrics.baseDuration} ms` : "—"}
          />
        </div>
      </div>

      {/* ===== Main Layout ===== */}
      <div className="flex flex-col lg:flex-row gap-4 min-h-0 px-4">
        {/* Code */}
        <aside className="w-full lg:w-1/2 rounded-lg bg-slate-50 p-4 overflow-auto">
          <pre className="text-xs font-mono whitespace-pre-wrap">
            {codeSnippet}
          </pre>
        </aside>

        <Separator orientation="vertical" />

        {/* Preview */}
        <main className="w-full lg:w-1/2 rounded-lg bg-white p-4">
          <Profiler
            id={`BigList-${mode}`}
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

export default BigListLabWrapper;
