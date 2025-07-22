import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

export default function PagesRouting() {
  const HomePage = React.lazy(() => import("./Home/HomePage"));

  return (
    <Routes>
      <Route
        path="*"
        element={
          <Suspense>
            <HomePage />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}
