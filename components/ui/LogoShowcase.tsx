"use client";

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import SoluSixLogo from './SoluSixLogoEnhanced';

const LogoShowcase: React.FC = () => {
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">SoluSix Brand Identity</h1>
          <p className="text-lg text-slate-600 italic">"Do essencial ao inesperado"</p>
          <button
            onClick={replay}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Replay Animation
          </button>
        </div>

        {/* Main Logo Display */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <SoluSixLogo key={key} size="lg" animated={true} />
        </div>

        {/* Size Variations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Small</h3>
            <SoluSixLogo size="sm" animated={false} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Medium</h3>
            <SoluSixLogo size="md" animated={false} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Large</h3>
            <SoluSixLogo size="lg" animated={false} />
          </div>
        </div>

        {/* Color Variations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Default</h3>
            <SoluSixLogo variant="default" animated={false} />
          </div>
          <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Light</h3>
            <SoluSixLogo variant="light" animated={false} />
          </div>
          <div className="bg-slate-100 rounded-xl shadow-md p-8 text-center">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">Dark</h3>
            <SoluSixLogo variant="dark" animated={false} />
          </div>
        </div>

        {/* Usage Context */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Usage Examples</h2>
          
          {/* Header Example */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
              <SoluSixLogo variant="light" size="sm" animated={false} />
              <div className="flex items-center gap-4">
                <span className="text-white text-sm">Products</span>
                <span className="text-white text-sm">About</span>
                <span className="text-white text-sm">Contact</span>
              </div>
            </div>
            <div className="p-6 text-center text-slate-600">
              <p>Header navigation example</p>
            </div>
          </div>

          {/* App Header Example */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <SoluSixLogo variant="light" size="md" animated={false} />
              <div className="text-white">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-white text-center">
              <p className="opacity-90">Mobile app header example</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase; 