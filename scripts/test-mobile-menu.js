/**
 * Test script for mobile menu responsiveness
 * Run this in browser console to test different device configurations
 */

const testConfigurations = [
  // Galaxy S24+ (1440 x 3088)
  { name: 'Galaxy S24+', width: 1440, height: 3088, pixelRatio: 3 },
  // iPhone 15 Pro Max (1290 x 2796)
  { name: 'iPhone 15 Pro Max', width: 1290, height: 2796, pixelRatio: 3 },
  // iPad Pro 12.9" (2048 x 2732)
  { name: 'iPad Pro 12.9"', width: 2048, height: 2732, pixelRatio: 2 },
  // Galaxy Tab S9+ (1600 x 2560)
  { name: 'Galaxy Tab S9+', width: 1600, height: 2560, pixelRatio: 2 },
  // Standard mobile (375 x 812)
  { name: 'Standard Mobile', width: 375, height: 812, pixelRatio: 2 },
];

function simulateDevice(config) {
  console.log(`🧪 Testing: ${config.name}`);
  console.log(`📱 Resolution: ${config.width}x${config.height}`);
  console.log(`🔍 Pixel Ratio: ${config.pixelRatio}`);
  
  // Simulate device pixel ratio
  Object.defineProperty(window, 'devicePixelRatio', {
    value: config.pixelRatio,
    writable: false
  });
  
  // Simulate viewport
  Object.defineProperty(window, 'innerWidth', {
    value: config.width,
    writable: false
  });
  
  Object.defineProperty(window, 'innerHeight', {
    value: config.height,
    writable: false
  });
  
  // Simulate visualViewport if not available
  if (!window.visualViewport) {
    window.visualViewport = {
      width: config.width,
      height: config.height,
      scale: 1,
      offsetLeft: 0,
      offsetTop: 0
    };
  }
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
  
  // Test menu functionality
  setTimeout(() => {
    const menuButton = document.querySelector('button[aria-label*="menu"]');
    if (menuButton) {
      console.log('✅ Menu button found');
      menuButton.click();
      
      setTimeout(() => {
        const menu = document.querySelector('.mobile-menu-container');
        if (menu) {
          const menuHeight = menu.offsetHeight;
          const viewportHeight = window.innerHeight;
          const headerHeight = 64;
          const maxExpectedHeight = viewportHeight - headerHeight - 16;
          
          console.log(`📏 Menu height: ${menuHeight}px`);
          console.log(`📏 Max expected: ${maxExpectedHeight}px`);
          console.log(`✅ Menu fits viewport: ${menuHeight <= maxExpectedHeight}`);
          
          // Check if menu is scrollable
          const isScrollable = menu.scrollHeight > menu.clientHeight;
          console.log(`📜 Menu is scrollable: ${isScrollable}`);
          
          // Close menu
          menuButton.click();
        } else {
          console.log('❌ Menu not found');
        }
      }, 500);
    } else {
      console.log('❌ Menu button not found');
    }
  }, 100);
}

function runAllTests() {
  console.log('🚀 Starting mobile menu tests...\n');
  
  testConfigurations.forEach((config, index) => {
    setTimeout(() => {
      simulateDevice(config);
      console.log('---\n');
    }, index * 2000);
  });
}

// Export for use in browser console
window.testMobileMenu = {
  runAllTests,
  simulateDevice,
  testConfigurations
};

console.log('📱 Mobile Menu Test Suite loaded!');
console.log('Run testMobileMenu.runAllTests() to test all configurations');
console.log('Or testMobileMenu.simulateDevice(config) for specific device'); 