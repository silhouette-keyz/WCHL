import { Route, Routes } from "react-router-dom";
import PagesRouting from "./pages/PagesRouting";

export default function AppRouting() {
  return (
    <Routes>
      <Route path="*" element={<PagesRouting />}></Route>
    </Routes>
  );
}
