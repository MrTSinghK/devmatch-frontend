import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="bg-slate-800 text-white p-4 shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">DevMatch</Link>
        <nav className="space-x-4">
          <Link to="/developer" className="hover:underline">Developer</Link>
          <Link to="/client" className="hover:underline">Client</Link>
        </nav>
      </div>
    </header>
  );
}
