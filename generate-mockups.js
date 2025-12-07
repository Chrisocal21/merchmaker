// Quick script to generate placeholder mockup images
const fs = require('fs');
const path = require('path');

// Simple SVG-based mockups that will work immediately
const mockups = [
  {
    filename: 'tee_front.png',
    title: 'TEE FRONT',
    chestBox: { x: 1150, y: 650, width: 400, height: 400 }
  },
  {
    filename: 'tee_back.png',
    title: 'TEE BACK',
    backBox: { x: 600, y: 400, width: 800, height: 1000 }
  },
  {
    filename: 'hoodie_front.png',
    title: 'HOODIE FRONT',
    chestBox: { x: 1150, y: 750, width: 350, height: 350 }
  },
  {
    filename: 'hoodie_back.png',
    title: 'HOODIE BACK',
    backBox: { x: 600, y: 500, width: 800, height: 900 }
  }
];

const mockupsDir = path.join(__dirname, 'public', 'mockups');

mockups.forEach(mockup => {
  const box = mockup.chestBox || mockup.backBox;
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="2000" height="2000" fill="#f3f4f6"/>
  
  <!-- Shirt shape -->
  <rect x="600" y="400" width="800" height="1200" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
  
  <!-- Title -->
  <text x="1000" y="950" font-family="Arial" font-size="80" font-weight="bold" fill="#9ca3af" text-anchor="middle">
    ${mockup.title}
  </text>
  
  <!-- Print area box -->
  <rect x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" 
        fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="20,10"/>
  <text x="${box.x + box.width/2}" y="${box.y + box.height/2}" 
        font-family="Arial" font-size="40" fill="#ef4444" text-anchor="middle">
    PRINT AREA
  </text>
</svg>`;

  const svgPath = path.join(mockupsDir, mockup.filename.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, svg);
  console.log(`Created: ${svgPath}`);
});

console.log('\nSVG mockups created! Update config to use .svg instead of .png');
