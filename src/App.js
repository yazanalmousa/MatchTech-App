import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResultPage from "./pages/ResultPage";
import  ResultContext  from "./Helper/Context";
import { useState } from "react";

function App() {
  const [result, setResult] = useState({});

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </ResultContext.Provider>
  );
}

export default App;
