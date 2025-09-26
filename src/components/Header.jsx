// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center font-bold">DM</div>
          <div>
            <div className="text-lg font-semibold">DevMatch</div>
            <div className="text-xs opacity-80">AI-powered dev matching (Hackathon MVP)</div>
          </div>
        </Link>
        <nav className="flex gap-3 items-center">
          <Link to="/developer" className="px-3 py-2 bg-white/10 rounded hover:bg-white/20">Developer</Link>
          <Link to="/client" className="px-3 py-2 bg-white/10 rounded hover:bg-white/20">Client</Link>
        </nav>
      </div>
    </header>
  );
}
