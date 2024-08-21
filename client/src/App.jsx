import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Create from "./pages/Create/Create.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar/Calendar.jsx";
import Plans from "./pages/Plans/Plans.jsx";
import Account from "./pages/Account/Account.jsx";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/create/:plan" element={<Create />} />
          <Route path="/" element={<Calendar />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
