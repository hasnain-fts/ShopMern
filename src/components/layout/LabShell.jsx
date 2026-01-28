import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import LoadingFallback from "./LoadingFallback";

const LabShell = ({ Lab, title }) => {
  const [mode, setMode] = useState("solution");
  const location = useLocation();

  // reset lab on route change
  useEffect(() => {
    setMode("solution");
  }, [location]);

  return (
    <div className="min-h-screen w-full px-4 pt-4">
      <Tabs value={mode} onValueChange={setMode} className="w-full">
        <TabsList>
          <TabsTrigger value="solution">Solution</TabsTrigger>
          <TabsTrigger value="problem">Problem</TabsTrigger>
        </TabsList>

        <TabsContent value={mode} forceMount>
          {/* Mode is DRILLED */}
          {/* <Lab mode={mode} /> */}
          <Suspense fallback={<LoadingFallback />}>
            {Lab ? React.cloneElement(Lab, { mode }) : "no Child exist"}
          </Suspense>
        </TabsContent>
      </Tabs>

      <p className="mt-3 text-[11px] text-slate-400">
        Paint / Actual &gt; 16ms may cause frame drops at 60fps
      </p>
    </div>
  );
};

export default LabShell;
