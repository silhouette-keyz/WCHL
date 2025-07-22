import { Suspense } from "react";
import "./App.css";
import AppRouting from "./app/AppRouting";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="*"
            element={
              <Suspense>
                <AppRouting />
              </Suspense>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
