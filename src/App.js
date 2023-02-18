import Search from "./pages/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Show from "./pages/Show.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/details/:id" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
