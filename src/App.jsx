import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DeveloperPage from "./pages/DeveloperPage";
import ClientPage from "./pages/ClientPage";
import Home from "./pages/Home";

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/client" element={<ClientPage />} />
      </Routes>
    </BrowserRouter>
  );
}
