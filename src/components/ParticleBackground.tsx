import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (canvas: HTMLCanvasElement) => void;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouse = useRef({
    x: null as number | null,
    y: null as number | null,
    radius: 150,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Define the Particle class correctly implementing the interface
    class ParticleClass implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(
        x: number,
        y: number,
        size: number,
        speedX: number,
        speedY: number
      ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgb(255, 255, 255)"; // Partikel putih
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 1.5;
        const speedY = (Math.random() - 0.5) * 1.5;
        particlesRef.current.push(
          new ParticleClass(x, y, size, speedX, speedY)
        );
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 225, ${1 - distance / 100})`; // Garis putih transparan
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }

        // Hubungkan partikel dengan mouse jika dekat
        if (mouse.current.x !== null && mouse.current.y !== null) {
          const dx = particlesRef.current[i].x - mouse.current.x;
          const dy = particlesRef.current[i].y - mouse.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.current.radius) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              1 - distance / mouse.current.radius
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particlesRef.current) {
        particle.update(canvas);
        particle.draw(ctx);
      }

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasDimensions();
    initParticles();
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };

    const handleMouseOut = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    const handleResize = () => {
      setCanvasDimensions();
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{
        background: "linear-gradient(to bottom right, #2700d4, #4A00E0)",
      }} // Menggunakan nilai heksadesimal langsung
    ></canvas>
  );
};

export default ParticleBackground;
