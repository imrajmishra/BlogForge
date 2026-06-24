import React from "react";
import Link from "next/link";

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="w-full bg-zinc-900/40 border-b border-zinc-800 py-6 mb-8 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm">
        <Link href="/" className="text-gray-400 hover:text-violet-400 transition-colors">
          Home
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-200 font-medium">{pageName}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
