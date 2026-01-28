import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { 
  Profiler, 
  useEffect, 
  useRef, 
  useState, 
  useCallback,
  useMemo,
  memo
} from "react";
import { RefreshCw, AlertTriangle, CheckCircle, Zap } from "lucide-react";

/* =========================
   Performance Measurement Types
========================= */
const PERFORMANCE_TYPES = {
  RENDER: 'render',
  MEMOIZATION: 'memoization',
  LIST_VIRTUALIZATION: 'list_virtualization',
  COMPUTATION: 'computation',
  NETWORK: 'network',
  MEMORY: 'memory',
  UNKNOWN: 'unknown'
};

/* =========================
   Enhanced Metrics Collection
========================= */
const usePerformanceMetrics = (componentType = PERFORMANCE_TYPES.UNKNOWN) => {
  const [metrics, setMetrics] = useState({
    renderCount: 0,
    paintTime: null,
    profilerMetrics: null,
    memoryUsage: null,
    interactionTime: null,
  });
  
  const renderCountRef = useRef(0);
  const interactionStartRef = useRef(null);
  const isMountedRef = useRef(false);

  // Track render count
  useEffect(() => {
    if (isMountedRef.current) {
      renderCountRef.current += 1;
      setMetrics(prev => ({
        ...prev,
        renderCount: renderCountRef.current
      }));
    } else {
      isMountedRef.current = true;
    }
  });

  // Measure paint time
  useEffect(() => {
    const startTime = performance.now();
    requestAnimationFrame(() => {
      const paintTime = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, paintTime }));
    });
  }, []);

  // Memory measurement (if available)
  useEffect(() => {
    if ('memory' in performance) {
      try {
        const memory = performance.memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: {
            usedJSHeapSize: (memory.usedJSHeapSize / 1024 / 1024).toFixed(2),
            totalJSHeapSize: (memory.totalJSHeapSize / 1024 / 1024).toFixed(2)
          }
        }));
      } catch (e) {
        // Memory API not available
      }
    }
  }, []);

  // Track interaction time
  const startInteractionTimer = useCallback(() => {
    interactionStartRef.current = performance.now();
  }, []);

  const endInteractionTimer = useCallback(() => {
    if (interactionStartRef.current) {
      const interactionTime = performance.now() - interactionStartRef.current;
      setMetrics(prev => ({ ...prev, interactionTime }));
      interactionStartRef.current = null;
    }
  }, []);

  // Handle Profiler metrics
  const handleProfilerMetrics = useCallback((profilerData) => {
    setMetrics(prev => ({
      ...prev,
      profilerMetrics: profilerData
    }));
  }, []);

  // Reset metrics
  const resetMetrics = useCallback(() => {
    renderCountRef.current = 0;
    setMetrics({
      renderCount: 0,
      paintTime: null,
      profilerMetrics: null,
      memoryUsage: null,
      interactionTime: null,
    });
  }, []);

  // Analyze performance
  const getPerformanceAnalysis = useCallback(() => {
    const { profilerMetrics, paintTime, renderCount } = metrics;
    
    const analysis = {
      isSlow: false,
      issues: [],
      suggestions: [],
      score: 0
    };

    if (profilerMetrics) {
      const actualDuration = parseFloat(profilerMetrics.actualDuration);
      
      // Check for frame drops
      if (actualDuration > 16.67) {
        analysis.isSlow = true;
        analysis.issues.push(`Frame drops likely (${actualDuration}ms > 16.67ms)`);
        analysis.suggestions.push('Consider using React.memo or useMemo');
      }

      // Check for unnecessary re-renders
      if (renderCount > 1 && componentType === PERFORMANCE_TYPES.RENDER) {
        analysis.issues.push(`Excessive re-renders: ${renderCount}`);
        analysis.suggestions.push('Use React.memo or optimize state/props');
      }

      // Calculate performance score (0-100)
      if (actualDuration < 10) analysis.score = 100;
      else if (actualDuration < 16.67) analysis.score = 80;
      else if (actualDuration < 30) analysis.score = 60;
      else if (actualDuration < 50) analysis.score = 40;
      else analysis.score = 20;
    }

    return analysis;
  }, [metrics, componentType]);

  return {
    metrics,
    startInteractionTimer,
    endInteractionTimer,
    handleProfilerMetrics,
    resetMetrics,
    getPerformanceAnalysis
  };
};

/* =========================
   Performance Analyzer Component
========================= */
const PerformanceAnalyzer = memo(({ 
  metrics, 
  analysis, 
  componentType,
  title 
}) => {
  const { profilerMetrics, paintTime, renderCount, memoryUsage, interactionTime } = metrics;
  const { isSlow, issues, suggestions, score } = analysis;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant={isSlow ? "destructive" : "success"}>
            {isSlow ? "Needs Optimization" : "Good"}
          </Badge>
          <div className="text-sm font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
            Score: {score}/100
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 border rounded-lg">
          <div className="text-xs text-muted-foreground">Render Time</div>
          <div className={`text-xl font-bold ${isSlow ? 'text-red-500' : 'text-green-500'}`}>
            {profilerMetrics?.actualDuration || '—'} ms
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="text-xs text-muted-foreground">Paint Time</div>
          <div className="text-xl font-bold">
            {paintTime ? `${paintTime.toFixed(1)} ms` : '—'}
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="text-xs text-muted-foreground">Render Count</div>
          <div className="text-xl font-bold">{renderCount}</div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="text-xs text-muted-foreground">Memory</div>
          <div className="text-sm">
            {memoryUsage ? `${memoryUsage.usedJSHeapSize} MB` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Analysis Panel */}
      {issues.length > 0 && (
        <div className="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h4 className="font-medium text-red-700 dark:text-red-300">Performance Issues</h4>
          </div>
          <ul className="space-y-1">
            {issues.map((issue, idx) => (
              <li key={idx} className="text-sm text-red-600 dark:text-red-400">• {issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions Panel */}
      {suggestions.length > 0 && (
        <div className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium text-blue-700 dark:text-blue-300">Optimization Suggestions</h4>
          </div>
          <ul className="space-y-1">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-sm text-blue-600 dark:text-blue-400">• {suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Detailed Metrics */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>Component Type: {componentType}</div>
        {profilerMetrics && (
          <>
            <div>Base Duration: {profilerMetrics.baseDuration} ms</div>
            <div>Render Phase: {profilerMetrics.phase}</div>
          </>
        )}
        {interactionTime && (
          <div>Interaction Time: {interactionTime.toFixed(1)} ms</div>
        )}
      </div>
    </div>
  );
});

/* =========================
   Performance Test Runner
========================= */
const PerformanceTestRunner = memo(({ 
  component, 
  componentType,
  testConfig = {} 
}) => {
  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);
  
  const tests = useMemo(() => {
    const defaultTests = [
      { id: 'initial', name: 'Initial Render', action: () => {} },
      { id: 're-render', name: 'Re-render', action: (comp) => {
        // Simulate prop change
        return React.cloneElement(comp, { _testRerender: Date.now() });
      }},
      { id: 'interaction', name: 'User Interaction', action: (comp) => {
        // Try to find and trigger interactive elements
        return comp;
      }},
    ];
    
    return [...defaultTests, ...(testConfig.additionalTests || [])];
  }, [testConfig]);

  const runTests = useCallback(async () => {
    setIsTesting(true);
    setTestResults([]);
    
    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i);
      const test = tests[i];
      
      // Measure test execution
      const startTime = performance.now();
      await test.action(component);
      const endTime = performance.now();
      
      setTestResults(prev => [...prev, {
        ...test,
        duration: endTime - startTime,
        timestamp: new Date().toISOString()
      }]);
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsTesting(false);
  }, [tests, component]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Performance Tests</h4>
        <Button 
          size="sm" 
          onClick={runTests} 
          disabled={isTesting}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isTesting ? 'animate-spin' : ''}`} />
          {isTesting ? 'Running Tests...' : 'Run Tests'}
        </Button>
      </div>
      
      {testResults.length > 0 && (
        <div className="space-y-2">
          {testResults.map((result, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">{result.name}</span>
              <span className={`font-medium ${
                result.duration > 50 ? 'text-red-500' : 
                result.duration > 16 ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {result.duration.toFixed(1)} ms
              </span>
            </div>
          ))}
        </div>
      )}
      
      {isTesting && (
        <div className="text-center py-4">
          <div className="inline-block animate-pulse">Running test {currentTest + 1} of {tests.length}</div>
        </div>
      )}
    </div>
  );
});

/* =========================
   Enhanced Performance Pane
========================= */
const PerformancePane = memo(({ 
  code, 
  element, 
  title,
  description,
  componentType = PERFORMANCE_TYPES.UNKNOWN,
  onMetricsUpdate 
}) => {
  const {
    metrics,
    handleProfilerMetrics,
    resetMetrics,
    getPerformanceAnalysis
  } = usePerformanceMetrics(componentType);

  const analysis = getPerformanceAnalysis();
  
  // Detect component type automatically
  useEffect(() => {
    const detectComponentType = () => {
      if (code.includes('useVirtualizer') || code.includes('virtual')) {
        return PERFORMANCE_TYPES.LIST_VIRTUALIZATION;
      }
      if (code.includes('useMemo') || code.includes('React.memo')) {
        return PERFORMANCE_TYPES.MEMOIZATION;
      }
      if (code.includes('expensive') || code.includes('calculation')) {
        return PERFORMANCE_TYPES.COMPUTATION;
      }
      if (code.includes('fetch') || code.includes('API') || code.includes('useEffect')) {
        return PERFORMANCE_TYPES.NETWORK;
      }
      return PERFORMANCE_TYPES.RENDER;
    };
    
    // You could set the detected type here
  }, [code]);

  const memoizedElement = useMemo(() => {
    return React.cloneElement(element, {
      _performanceLab: true,
      _onInteractionStart: () => {}, // Placeholder for interaction tracking
      _onInteractionEnd: () => {} // Placeholder for interaction tracking
    });
  }, [element]);

  const handleProfilerRender = useCallback((id, phase, actualDuration, baseDuration) => {
    const profilerData = {
      phase,
      actualDuration: actualDuration.toFixed(1),
      baseDuration: baseDuration.toFixed(1),
      timestamp: Date.now()
    };
    
    handleProfilerMetrics(profilerData);
    onMetricsUpdate?.(profilerData);
  }, [handleProfilerMetrics, onMetricsUpdate]);

  return (
    <div className="space-y-6">
      {/* Header with description */}
      {description && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Code Panel */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Source Code</h4>
              <Badge variant="outline">{componentType}</Badge>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-auto max-h-[400px]">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {code}
              </pre>
            </div>
          </div>
        </div>

        <Separator orientation="vertical" />

        {/* Preview & Analysis Panel */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <h4 className="font-medium mb-3">Live Preview</h4>
            <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
              <Profiler id="component-preview" onRender={handleProfilerRender}>
                {memoizedElement}
              </Profiler>
            </div>
          </div>

          <PerformanceAnalyzer
            metrics={metrics}
            analysis={analysis}
            componentType={componentType}
            title={title}
          />

          <PerformanceTestRunner
            component={element}
            componentType={componentType}
            testConfig={{
              additionalTests: analysis.suggestions.map(suggestion => ({
                id: `test-${suggestion}`,
                name: `Test: ${suggestion}`,
                action: () => Promise.resolve()
              }))
            }}
          />

          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetMetrics}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Metrics
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              // Force a re-render to test
              forceUpdate();
            }}>
              Trigger Re-render
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

/* =========================
   Main HOC Component
========================= */
const PerformanceLabHOC = ({ item }) => {
  const [activeTab, setActiveTab] = useState("solution");
  const [problemMetricsHistory, setProblemMetricsHistory] = useState([]);
  const [solutionMetricsHistory, setSolutionMetricsHistory] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  
  // Detect performance type from item
  const detectPerformanceType = useCallback((code) => {
    const codeLower = code.toLowerCase();
    
    if (codeLower.includes('virtual') || codeLower.includes('scroll')) {
      return PERFORMANCE_TYPES.LIST_VIRTUALIZATION;
    }
    if (codeLower.includes('usememo') || codeLower.includes('memo')) {
      return PERFORMANCE_TYPES.MEMOIZATION;
    }
    if (codeLower.includes('expensive') || codeLower.includes('calculation') || codeLower.includes('compute')) {
      return PERFORMANCE_TYPES.COMPUTATION;
    }
    if (codeLower.includes('fetch') || codeLower.includes('api') || codeLower.includes('effect')) {
      return PERFORMANCE_TYPES.NETWORK;
    }
    return PERFORMANCE_TYPES.RENDER;
  }, []);
  
  const problemType = useMemo(() => 
    detectPerformanceType(item?.lab?.problem?.codeSnippet || ''),
    [item, detectPerformanceType]
  );
  
  const solutionType = useMemo(() => 
    detectPerformanceType(item?.lab?.solution?.codeSnippet || ''),
    [item, detectPerformanceType]
  );

  // Update comparison when metrics change
  useEffect(() => {
    if (problemMetricsHistory.length > 0 && solutionMetricsHistory.length > 0) {
      const latestProblem = problemMetricsHistory[problemMetricsHistory.length - 1];
      const latestSolution = solutionMetricsHistory[solutionMetricsHistory.length - 1];
      
      const problemTime = parseFloat(latestProblem.actualDuration);
      const solutionTime = parseFloat(latestSolution.actualDuration);
      
      setComparisonData({
        problem: latestProblem,
        solution: latestSolution,
        improvement: problemTime - solutionTime,
        improvementPercentage: ((problemTime - solutionTime) / problemTime * 100).toFixed(1)
      });
    }
  }, [problemMetricsHistory, solutionMetricsHistory]);

  return (
    <div className="min-h-screen w-full p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{item?.title || 'React Performance Lab'}</h1>
        <p className="text-muted-foreground">
          Analyze and compare the performance of React components. Identify bottlenecks and learn optimization techniques.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="outline" className="capitalize">{problemType}</Badge>
          {comparisonData && (
            <Badge variant={
              parseFloat(comparisonData.improvementPercentage) > 0 ? "success" : "destructive"
            }>
              {comparisonData.improvementPercentage}% {parseFloat(comparisonData.improvementPercentage) > 0 ? 'faster' : 'slower'}
            </Badge>
          )}
        </div>
      </header>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="problem">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Problem
          </TabsTrigger>
          <TabsTrigger value="solution">
            <CheckCircle className="w-4 h-4 mr-2" />
            Solution
          </TabsTrigger>
        </TabsList>

        {/* Problem Tab */}
        <TabsContent value="problem">
          <PerformancePane
            title="Problem Implementation"
            description={item?.lab?.problem?.description || 'Original implementation with performance issues'}
            code={item.lab.problem.codeSnippet}
            element={item.lab.problem.component}
            componentType={problemType}
            onMetricsUpdate={(metrics) => {
              setProblemMetricsHistory(prev => [...prev.slice(-9), metrics]);
            }}
          />
        </TabsContent>

        {/* Solution Tab */}
        <TabsContent value="solution">
          <PerformancePane
            title="Optimized Solution"
            description={item?.lab?.solution?.description || 'Optimized implementation with performance fixes'}
            code={item.lab.solution.codeSnippet}
            element={item.lab.solution.component}
            componentType={solutionType}
            onMetricsUpdate={(metrics) => {
              setSolutionMetricsHistory(prev => [...prev.slice(-9), metrics]);
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Comparison Dashboard */}
      {comparisonData && (
        <div className="mt-8 p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
          <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Problem</h4>
              <div className="text-2xl font-bold">{comparisonData.problem.actualDuration} ms</div>
              <div className="text-sm text-muted-foreground mt-1">Render time</div>
            </div>
            
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Solution</h4>
              <div className="text-2xl font-bold">{comparisonData.solution.actualDuration} ms</div>
              <div className="text-sm text-muted-foreground mt-1">Render time</div>
            </div>
            
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Improvement</h4>
              <div className="text-2xl font-bold">{comparisonData.improvement.toFixed(1)} ms</div>
              <div className="text-sm text-muted-foreground mt-1">
                {comparisonData.improvementPercentage}% faster
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg">
            <h4 className="font-medium mb-2">Optimization Recommendations</h4>
            <ul className="space-y-2">
              {problemType === PERFORMANCE_TYPES.LIST_VIRTUALIZATION && (
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Use windowing/virtualization for long lists</span>
                </li>
              )}
              {problemType === PERFORMANCE_TYPES.COMPUTATION && (
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Memoize expensive calculations with useMemo</span>
                </li>
              )}
              {problemType === PERFORMANCE_TYPES.RENDER && (
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Use React.memo for pure components</span>
                </li>
              )}
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Use useCallback for event handlers passed as props</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Lazy load non-critical components</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>&gt; 16ms: Likely frame drops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>8-16ms: Acceptable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>&lt; 8ms: Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to force update (for testing)
const forceUpdate = () => {
  // This would be implemented based on your needs
};

export default PerformanceLabHOC;