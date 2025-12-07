"use client";

import { useRef, useEffect, useState, ChangeEvent } from "react";
import { mockupTemplateList, MockupTemplate } from "@/config/mockupTemplates";

// Helper function to scale image proportionally inside a box
function fitIntoBox(
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number
): { targetW: number; targetH: number } {
  const imgAspect = imgW / imgH;
  const boxAspect = boxW / boxH;

  let targetW: number;
  let targetH: number;

  if (imgAspect > boxAspect) {
    // Image is wider than box
    targetW = boxW;
    targetH = boxW / imgAspect;
  } else {
    // Image is taller than box
    targetH = boxH;
    targetW = boxH * imgAspect;
  }

  return { targetW, targetH };
}

export default function MockupPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<MockupTemplate>(
    mockupTemplateList[0]
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scale, setScale] = useState<number>(100);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setOffsetX(0);
      setOffsetY(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!uploadedImage) return;
    setIsDragging(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    setDragStart({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStart) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;
    const deltaX = currentX - dragStart.x;
    const deltaY = currentY - dragStart.y;
    setOffsetX((prev) => prev + deltaX);
    setOffsetY((prev) => prev + deltaY);
    setDragStart({ x: currentX, y: currentY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleResetPosition = () => {
    setOffsetX(0);
    setOffsetY(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);

    canvas.width = selectedTemplate.canvasSize.width;
    canvas.height = selectedTemplate.canvasSize.height;

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mockupImg = new Image();
    
    mockupImg.onload = () => {
      ctx.drawImage(mockupImg, 0, 0, canvas.width, canvas.height);

      if (uploadedImage) {
        const artImg = new Image();
        
        artImg.onload = () => {
          const { x, y, width, height } = selectedTemplate.printArea;

          const { targetW, targetH } = fitIntoBox(
            artImg.width,
            artImg.height,
            width,
            height
          );

          const scaledW = (targetW * scale) / 100;
          const scaledH = (targetH * scale) / 100;

          const drawX = x + (width - scaledW) / 2 + offsetX;
          const drawY = y + (height - scaledH) / 2 + offsetY;

          ctx.drawImage(artImg, drawX, drawY, scaledW, scaledH);
          
          // Draw overlay if exists
          if (selectedTemplate.overlaySrc) {
            const overlayImg = new Image();
            overlayImg.onload = () => {
              ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
              
              // Draw print area guide on top
              ctx.setLineDash([10, 5]);
              ctx.strokeStyle = "#ef4444";
              ctx.lineWidth = 2;
              ctx.strokeRect(x, y, width, height);
              ctx.setLineDash([]);
              
              setIsDrawing(false);
            };
            overlayImg.onerror = () => {
              // If overlay fails to load, just draw the guide
              ctx.setLineDash([10, 5]);
              ctx.strokeStyle = "#ef4444";
              ctx.lineWidth = 2;
              ctx.strokeRect(x, y, width, height);
              ctx.setLineDash([]);
              
              setIsDrawing(false);
            };
            overlayImg.src = selectedTemplate.overlaySrc;
          } else {
            // Draw print area guide on top
            ctx.setLineDash([10, 5]);
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            ctx.setLineDash([]);
            
            setIsDrawing(false);
          }
        };

        artImg.onerror = (err) => {
          console.error("Failed to load artwork:", err);
          setIsDrawing(false);
        };

        artImg.src = uploadedImage;
      } else {
        // Draw print area guide when no image is uploaded
        const { x, y, width, height } = selectedTemplate.printArea;
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.setLineDash([]);
        setIsDrawing(false);
      }
    };

    mockupImg.onerror = (err) => {
      console.error("Failed to load mockup image:", err);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(600, 400, 800, 1200);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "bold 60px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Mockup image not found", canvas.width / 2, canvas.height / 2);
      ctx.font = "30px Arial";
      ctx.fillText("Add images to /public/mockups/", canvas.width / 2, canvas.height / 2 + 50);
      setIsDrawing(false);
    };

    mockupImg.src = selectedTemplate.mockupSrc;
  }, [selectedTemplate, uploadedImage, scale, offsetX, offsetY]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedTemplate.key}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Merch Mockup Studio</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <select
                value={selectedTemplate.key}
                onChange={(e) => {
                  const template = mockupTemplateList.find(
                    (t) => t.key === e.target.value
                  );
                  if (template) setSelectedTemplate(template);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {mockupTemplateList.map((template) => (
                  <option key={template.key} value={template.key}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Design
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Size: {scale}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                disabled={!uploadedImage}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: uploadedImage
                    ? `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${scale}%, #e5e7eb ${scale}%, #e5e7eb 100%)`
                    : "#e5e7eb",
                }}
              />
            </div>

            <div>
              <button
                onClick={handleResetPosition}
                disabled={!uploadedImage || (offsetX === 0 && offsetY === 0)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Reset Position
              </button>
            </div>

            <div>
              <button
                onClick={handleDownload}
                disabled={!uploadedImage || isDrawing}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="max-w-full h-auto border border-gray-200 rounded cursor-move"
              style={{ cursor: uploadedImage ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            />
          </div>
          {isDrawing && (
            <p className="text-center text-gray-500 mt-4">Rendering...</p>
          )}
          {uploadedImage && (
            <p className="text-center text-gray-500 mt-4 text-sm">
              Drag the design to reposition it within the print area
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
