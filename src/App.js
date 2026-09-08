import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BMI from "./BMI";
import Result from "./Result";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;