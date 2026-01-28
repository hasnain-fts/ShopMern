import { lazy } from "react";

const WordFileGeneration = lazy(
  () => import("@/components/Implementation/WordFileGeneration"),
);

export const ImplementationRoutes = [
  {
    path: "/Word-File-Generation",
    title: "Word file Generation",
    showInMenu: false,
    element: <WordFileGeneration />,
  },
];
