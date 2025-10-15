
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-4xl font-bold text-sky-600 tracking-tight">
          Virtual Try-On AI
        </h1>
        <p className="text-slate-500 mt-2">See it on before you buy it.</p>
      </div>
    </header>
  );
};

export default Header;
