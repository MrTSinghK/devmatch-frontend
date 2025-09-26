// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import DeveloperPage from "./pages/DeveloperPage";
import ClientPage from "./pages/ClientPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/client" element={<ClientPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-6">
          <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600">DevMatch — Hackathon demo</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
