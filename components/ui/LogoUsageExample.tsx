"use client";

import React from 'react';
import SoluSixLogo from './SoluSixLogoEnhanced';

// Example of how to use the enhanced logo in different contexts
const LogoUsageExample: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-slate-800">Logo Usage Examples</h2>
      
      {/* Basic usage */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <SoluSixLogo />
      </div>

      {/* Different sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex items-center gap-4">
          <SoluSixLogo size="sm" animated={false} />
          <SoluSixLogo size="md" animated={false} />
          <SoluSixLogo size="lg" animated={false} />
        </div>
      </div>

      {/* Different variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Variants</h3>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white rounded-lg">
            <SoluSixLogo variant="default" animated={false} />
          </div>
          <div className="p-4 bg-slate-800 rounded-lg">
            <SoluSixLogo variant="light" animated={false} />
          </div>
          <div className="p-4 bg-slate-100 rounded-lg">
            <SoluSixLogo variant="dark" animated={false} />
          </div>
        </div>
      </div>

      {/* With custom className */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Custom Styling</h3>
        <SoluSixLogo 
          className="border-2 border-green-500 p-4 rounded-lg bg-green-50" 
          animated={false} 
        />
      </div>
    </div>
  );
};

export default LogoUsageExample; 