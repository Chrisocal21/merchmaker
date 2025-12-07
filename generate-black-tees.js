// Generate better black t-shirt mockups
const fs = require('fs');
const path = require('path');

const mockups = [
  {
    filename: 'tee_front.svg',
    title: 'FRONT',
    isBack: false,
    chestBox: { x: 1150, y: 650, width: 400, height: 400 }
  },
  {
    filename: 'tee_back.svg',
    title: 'BACK',
    isBack: true,
    backBox: { x: 600, y: 400, width: 800, height: 1000 }
  },
  {
    filename: 'hoodie_front.svg',
    title: 'FRONT',
    isHoodie: true,
    isBack: false,
    chestBox: { x: 1150, y: 750, width: 350, height: 350 }
  },
  {
    filename: 'hoodie_back.svg',
    title: 'BACK',
    isHoodie: true,
    isBack: true,
    backBox: { x: 600, y: 500, width: 800, height: 900 }
  }
];

const mockupsDir = path.join(__dirname, 'public', 'mockups');

mockups.forEach(mockup => {
  const box = mockup.chestBox || mockup.backBox;
  const isBack = mockup.isBack;
  
  // Create more realistic t-shirt shape
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fabric${mockup.filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d0d0d;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
      <feOffset dx="0" dy="4" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="2000" height="2000" fill="#f8f9fa"/>
  
  <!-- Shadow -->
  <ellipse cx="1000" cy="1850" rx="400" ry="50" fill="#000000" opacity="0.1"/>
  
  ${isBack ? `
    <!-- Back of Shirt - More realistic t-shirt shape -->
    <!-- Left Sleeve -->
    <ellipse cx="550" cy="550" rx="150" ry="120" 
             fill="url(#fabric${mockup.filename})" filter="url(#shadow)"/>
    
    <!-- Right Sleeve -->
    <ellipse cx="1450" cy="550" rx="150" ry="120" 
             fill="url(#fabric${mockup.filename})" filter="url(#shadow)"/>
    
    <!-- Main Body -->
    <path d="M 650 450 Q 1000 420 1350 450 L 1300 1650 Q 1000 1680 700 1650 Z" 
          fill="url(#fabric${mockup.filename})" filter="url(#shadow)"/>
    
    <!-- Collar -->
    <ellipse cx="1000" cy="450" rx="90" ry="35" fill="#0a0a0a"/>
    
    <!-- Shoulder seams -->
    <line x1="650" y1="450" x2="700" y2="500" stroke="#0a0a0a" stroke-width="2" opacity="0.5"/>
    <line x1="1350" y1="450" x2="1300" y2="500" stroke="#0a0a0a" stroke-width="2" opacity="0.5"/>
  ` : `
    <!-- Front of Shirt - More realistic t-shirt shape -->
    <!-- Left Sleeve -->
    <ellipse cx="550" cy="550" rx="150" ry="120" 
             fill="url(#fabric${mockup.filename})" filter="url(#shadow)"/>
    
    <!-- Right Sleeve -->
    <ellipse cx="1450" cy="550" rx="150" ry="120" 
             fill="url(#fabric${mockup.filename})" filter="url(#shadow)"/>
    
    <!-- Main Body -->
    <path d="M 650 450 Q 1000 420 1350 450 L 1300 1650 Q 1000 1680 700 1650 Z" 
          fill="url(#fabric${mockup.filename})" filter="url(#shadow)"/>
    
    <!-- Neckline -->
    <ellipse cx="1000" cy="450" rx="120" ry="40" fill="#0a0a0a"/>
    <ellipse cx="1000" cy="445" rx="100" ry="30" fill="url(#fabric${mockup.filename})"/>
    
    <!-- Shoulder seams -->
    <line x1="650" y1="450" x2="700" y2="500" stroke="#0a0a0a" stroke-width="2" opacity="0.5"/>
    <line x1="1350" y1="450" x2="1300" y2="500" stroke="#0a0a0a" stroke-width="2" opacity="0.5"/>
  `}
  
  ${mockup.isHoodie ? `
    <!-- Hood -->
    <ellipse cx="1000" cy="320" rx="120" ry="80" fill="#0d0d0d" filter="url(#shadow)"/>
    <path d="M 920 340 Q 1000 380 1080 340" stroke="#1a1a1a" stroke-width="3" fill="none"/>
  ` : ''}
  
  <!-- Fabric texture overlay -->
  <rect x="${isBack ? 600 : 850}" y="350" width="${isBack ? 800 : 300}" height="1300" 
        fill="url(#fabric${mockup.filename})" opacity="0.3"/>
  
  <!-- Print area indicator (subtle) -->
  <rect x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" 
        fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="15,10" opacity="0.3"/>
</svg>`;

  const svgPath = path.join(mockupsDir, mockup.filename);
  fs.writeFileSync(svgPath, svg);
  console.log(`Created: ${svgPath}`);
});

console.log('\n✅ Realistic black t-shirt mockups created!');
