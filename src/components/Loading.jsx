// src/components/Loading.jsx
import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <div className="w-6 h-6 rounded-full border-4 border-indigo-300 border-t-indigo-600 animate-spin" />
      <div>{text}</div>
    </div>
  );
}
