import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';
import { MapPin, Linkedin, Github, Mail } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { ROLES, TECH_STACK } from '../constants/data';
import { cn } from '../lib/utils';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const { text, blink } = useTypewriter(ROLES);

  const handlePhotoMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#F2B759',
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.001;

      particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
      particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-[70px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-[-1] pointer-events-none" />

      {/* SVG Filter for Water Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="blur-dissolve-effect">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.02;0.05;0.02" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-[60px] flex flex-col lg:flex-row gap-12 items-center w-full h-full">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-[1.2] flex flex-col justify-center"
        >
          <span className="text-mint tracking-[4px] uppercase text-base font-medium mb-4 block">
            Hey, I'm
          </span>
          <h1 className="text-[60px] md:text-[80px] font-extrabold text-gradient leading-[1.1] mb-6">
            Anshu Gupta
          </h1>

          <div className="min-h-[40px] mb-6">
            <span className="text-2xl md:text-[32px] font-medium text-khaki">
              {text}
              <span className={cn("inline-block w-[2px] h-[1em] bg-khaki ml-1 align-middle", blink ? "opacity-100" : "opacity-0")}></span>
            </span>
          </div>

          <p className="text-mint text-base max-w-[450px] leading-relaxed mb-8">
            Building digital experiences from Kathmandu 🏔️. Blending business intelligence with full-stack technology to create smart, AI-powered solutions.
          </p>

          <div className="flex flex-wrap gap-5 mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 bg-khaki text-slate-green-deep font-bold rounded-lg shadow-[0_0_20px_rgba(242,183,89,0.3)] hover:shadow-[0_0_30px_rgba(242,183,89,0.5)] transition-all uppercase tracking-wider text-[15px]"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 border border-khaki text-khaki font-bold rounded-lg hover:bg-khaki hover:text-slate-green-deep transition-all uppercase tracking-wider text-[15px]"
            >
              Download CV
            </motion.button>
          </div>

          {/* Skills Strip */}
          <div className="flex flex-wrap gap-2.5 max-w-[500px] mb-12">
            {TECH_STACK.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.1, borderColor: '#F2B759', color: '#F2B759' }}
                className="px-3.5 py-1.5 rounded-full bg-slate-green-mid/60 border border-khaki/30 text-mint text-xs font-medium whitespace-nowrap transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Photo Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-[0.8] flex justify-center lg:justify-end relative"
        >
          <div
            ref={containerRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-[280px] h-[340px] md:w-[320px] md:h-[380px] group animate-float cursor-crosshair"
          >
            {/* Rotating Ring */}
            <div className="absolute inset-[-20px] border-2 border-dashed border-khaki/30 rounded-full animate-spin-slow pointer-events-none" />

            {/* Photo Container */}
            <div className="relative w-full h-full blob-shape overflow-hidden border-2 border-khaki/50 shadow-[0_0_60px_rgba(242,183,89,0.2)] bg-slate-green-deep">
              {/* Background Layer (Visible by default) */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-green to-slate-green-mid/40">
                <span className="text-[100px] font-extrabold text-khaki opacity-80 select-none">
                  AG
                </span>
              </div>

              {/* Reveal Image Layer */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: `circle(${isHovered ? '150%' : '0%'} at ${mousePos.x}% ${mousePos.y}%)`,
                  WebkitClipPath: `circle(${isHovered ? '150%' : '0%'} at ${mousePos.x}% ${mousePos.y}%)`,
                  transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1), -webkit-clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: isHovered ? 'url(#blur-dissolve-effect)' : 'none'
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Anshu Gupta"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Water Distortion Overlay (Subtle) */}
                <div className="absolute inset-0 bg-khaki/5 mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            {/* Particles */}
            <div className="absolute top-[10%] left-[80%] w-2 h-2 rounded-full bg-khaki/50" />
            <div className="absolute top-[85%] left-[15%] w-1.5 h-1.5 rounded-full bg-mint/50" />
            <div className="absolute top-[50%] -right-[30px] w-1.5 h-1.5 rounded-full bg-khaki/50" />
          </div>
        </motion.div>

        {/* Contact Mini Row */}
        <div className="absolute bottom-10 left-6 md:left-[60px] hidden md:flex items-center gap-4 text-[13px] text-mint">
          <span>Kathmandu 📍</span>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-khaki transition-colors">LinkedIn</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-khaki transition-colors">GitHub</a>
          <span className="opacity-30">|</span>
          <a href="https://anshugupta-eight.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-khaki transition-colors">anshugupta-eight.vercel.app</a>
        </div>
      </div>
    </section>
  );
}
