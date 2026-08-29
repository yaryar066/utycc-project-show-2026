"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Camera,
  Download,
  RotateCcw,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function BadgeGeneratorPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const posterImgRef = useRef<HTMLImageElement | null>(null);

  // Preload School Event Poster
  useEffect(() => {
    const poster = new window.Image();
    poster.src = "/images/event-poster.png";
    poster.onerror = () => {
      poster.src = "/event-poster.png";
    };
    poster.onload = () => {
      posterImgRef.current = poster;
      if (previewCanvasRef.current) {
        drawCard(previewCanvasRef.current, false);
      }
    };
  }, []);

  // File Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setPosX(0);
        setPosY(0);
        setScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Drawing: Tall Portrait Aspect Ratio
  const drawCard = useCallback(
    (canvas: HTMLCanvasElement, forExport = false) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = forExport ? 1200 : 640;
      const height = forExport ? 960 : 512;
      const ratio = forExport ? 1 : 640 / 1200;

      canvas.width = width;
      canvas.height = height;

      // 1. Dark Card Base Frame
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 28 * ratio);
      ctx.clip();

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      // 2. RIGHT SIDE: User Uploaded Photo
      const userPhotoX = width * 0.40;
      const userPhotoW = width - userPhotoX;

      if (imageSrc) {
        const img = new window.Image();
        img.src = imageSrc;
        if (img.complete) {
          const imgAspect = img.width / img.height;
          const boxAspect = userPhotoW / height;
          let drawW = userPhotoW;
          let drawH = height;

          if (imgAspect > boxAspect) {
            drawW = height * imgAspect;
          } else {
            drawH = userPhotoW / imgAspect;
          }

          drawW *= scale;
          drawH *= scale;

          const cx = userPhotoX + userPhotoW / 2 + (posX / 100) * (userPhotoW / 2);
          const cy = height / 2 + (posY / 100) * (height / 2);

          ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
        }
      } else {
        // Placeholder
        const placeholderGrad = ctx.createLinearGradient(userPhotoX, 0, width, height);
        placeholderGrad.addColorStop(0, "#091222");
        placeholderGrad.addColorStop(1, "#020617");
        ctx.fillStyle = placeholderGrad;
        ctx.fillRect(userPhotoX, 0, userPhotoW, height);

        ctx.fillStyle = "#475569";
        ctx.font = `bold ${24 * ratio}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("SELECT YOUR PHOTO", userPhotoX + userPhotoW / 2, height / 2);
        ctx.textAlign = "left";
      }

      // 3. LEFT SIDE: Fixed School Poster Image with Smooth Gradient Blend
      const posterW = width * 0.50;

      if (posterImgRef.current && posterImgRef.current.complete) {
        ctx.drawImage(posterImgRef.current, 0, 0, posterW, height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, posterW, height);
        grad.addColorStop(0, "#082f49");
        grad.addColorStop(1, "#020617");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, posterW, height);

        ctx.fillStyle = "#ffffff";
        ctx.font = `900 ${36 * ratio}px sans-serif`;
        ctx.fillText("UTYCC PROJECT SHOW", 40 * ratio, 140 * ratio);
        ctx.fillStyle = "#22d3ee";
        ctx.font = `800 ${30 * ratio}px sans-serif`;
        ctx.fillText("EXHIBITION 2026", 40 * ratio, 190 * ratio);
      }

      // Smooth Gradient Blend between Poster and Photo
      const blendGrad = ctx.createLinearGradient(posterW - 130 * ratio, 0, posterW + 80 * ratio, 0);
      blendGrad.addColorStop(0, "rgba(2, 6, 23, 0)");
      blendGrad.addColorStop(0.45, "rgba(2, 6, 23, 0.75)");
      blendGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = blendGrad;
      ctx.fillRect(posterW - 130 * ratio, 0, 210 * ratio, height);

      // 4. Outer Card Border
      ctx.restore();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.35)";
      ctx.lineWidth = 2 * ratio;
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 28 * ratio);
      ctx.stroke();
    },
    [imageSrc, posX, posY, scale]
  );

  // Redraw preview canvas
  useEffect(() => {
    if (previewCanvasRef.current) {
      drawCard(previewCanvasRef.current, false);
    }
  }, [drawCard]);

  // Standard File Download for Laptop / Desktop
  const triggerLaptopDownload = (canvas: HTMLCanvasElement) => {
    const dataUrl = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "UTYCC-Project-Show-2026-Moment.png";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsGenerating(false);
  };

  // Export Logic (Mobile -> Save to Camera Roll / Laptop -> Direct File Download)
  const handleDownload = async () => {
    setIsGenerating(true);
    const exportCanvas = document.createElement("canvas");
    drawCard(exportCanvas, true);

    // Detect if Mobile Device (iOS / Android)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || "");

    if (isMobile && navigator.share && navigator.canShare) {
      exportCanvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "UTYCC-Project-Show-2026-Moment.png", {
            type: "image/png",
          });
          if (navigator.canShare({ files: [file] })) {
            try {
              // Mobile Native Share Sheet (Save Image to Camera Roll)
              await navigator.share({
                files: [file],
              });
              setIsGenerating(false);
              return;
            } catch (error) {
              // If user cancels share dialog
              setIsGenerating(false);
              return;
            }
          }
        }
        // Fallback if share failed
        triggerLaptopDownload(exportCanvas);
      }, "image/png", 1.0);
    } else {
      // Direct Download for Laptop / PC
      triggerLaptopDownload(exportCanvas);
    }
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col font-sans">
      {/* Background Campus Drone Wallpaper */}
      <div className="fixed inset-0 h-full w-full -z-20 overflow-hidden">
        <Image
          src="/images/utycc-campus.jpg"
          alt="UTYCC Campus Landscape Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark Blur Overlay */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-[6px] -z-10" />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full flex flex-col items-center">
        {/* Navigation Back */}
        <div className="w-full flex justify-start mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO SHOWCASE DIRECTORY</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="w-full text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>UTYCC MEMORY PASS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Create Your Project Show Memory Card
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto font-light">
            Upload your picture from laptop or gallery to blend with the official UTYCC Exhibition poster.
          </p>
        </div>

        {/* Action Buttons: Upload Photo & Use Camera */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 font-mono"
          >
            <Upload className="w-4 h-4" />
            <span>{imageSrc ? "Change Photo" : "Upload Photo"}</span>
          </button>

          <button
            onClick={() => cameraInputRef.current?.click()}
            className="px-6 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-slate-200 font-semibold text-xs sm:text-sm hover:border-cyan-400 transition-all flex items-center gap-2 cursor-pointer font-mono"
          >
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Use Camera</span>
          </button>
        </div>

        {/* Live Canvas Preview */}
        <div className="w-full max-w-[640px] relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/40 bg-slate-950 p-2">
          <canvas ref={previewCanvasRef} className="w-full h-auto block rounded-2xl" />
        </div>

        {/* Adjust Photo Position Controls */}
        {imageSrc && (
          <div className="w-full max-w-[640px] glass-panel border border-cyan-500/30 rounded-2xl p-5 mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold font-mono text-cyan-400">
              <span>ADJUST PHOTO POSITION</span>
              <button
                onClick={() => {
                  setPosX(0);
                  setPosY(0);
                  setScale(1);
                }}
                className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer text-[11px]"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Left / Right</span>
                  <span>{posX}</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Up / Down</span>
                  <span>{posY}</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Zoom</span>
                  <span>{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Download Action Button */}
        <div className="w-full max-w-[640px] mt-8 flex justify-center">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm font-mono flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? "PREPARING CARD..." : "DOWNLOAD CARD (PNG)"}</span>
          </button>
        </div>
      </main>
    </div>
  );
}