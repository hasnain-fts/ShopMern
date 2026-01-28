import { lazy } from "react";

const BigListLabwraper = lazy(() =>
  import("@/components/Labs/lab_01_big_lists/BigListLabwraper")
);

const ExpensiveCalculationsLabwraper = lazy(() =>
  import(
    "@/components/Labs/lab-02-expensive-calculations/ExpensiveCalculationsLabwraper"
  )
);

export const labRoutes = [
  {
    path: "/big-lists",
    title: "Big Lists",
    showInMenu: true,
    element: <BigListLabwraper />,
  },
  {
    path: "/expensive-calculations",
    title: "Expensive Calculations",
    showInMenu: true,
    element: <ExpensiveCalculationsLabwraper />,
  },
];
