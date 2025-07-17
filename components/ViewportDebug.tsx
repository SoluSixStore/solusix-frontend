"use client"

import { useState, useEffect } from 'react';
import { getViewportInfo, getVisualViewportHeight } from '@/lib/utils';

export function ViewportDebug() {
  const [viewportInfo, setViewportInfo] = useState(() => getViewportInfo());
  const [visualHeight, setVisualHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateInfo = () => {
      setViewportInfo(getViewportInfo());
      setVisualHeight(getVisualViewportHeight());
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);
    window.addEventListener('orientationchange', updateInfo);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateInfo);
    }

    return () => {
      window.removeEventListener('resize', updateInfo);
      window.removeEventListener('orientationchange', updateInfo);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateInfo);
      }
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || !mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2">📱 Viewport Debug</div>
      <div className="space-y-1">
        <div>Width: {viewportInfo.width}px</div>
        <div>Height: {viewportInfo.height}px</div>
        <div>Visual Height: {visualHeight}px</div>
        <div>Pixel Ratio: {viewportInfo.pixelRatio}</div>
        <div>High DPI: {viewportInfo.isHighDPI ? '✅' : '❌'}</div>
        <div>Mobile: {viewportInfo.isMobile ? '✅' : '❌'}</div>
        <div>Tablet: {viewportInfo.isTablet ? '✅' : '❌'}</div>
        <div>Orientation: {viewportInfo.orientation}</div>
        <div className="mt-2 pt-2 border-t border-white/20">
          <div>Menu Max Height: {Math.max(visualHeight - 64 - 16, 200)}px</div>
        </div>
      </div>
    </div>
  );
} 