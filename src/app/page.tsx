"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";

import Image from "next/image";

const vehicleImages = [
  { src: "/images/gallery-03.png", alt: "2016 Land Rover LR4 HSE - Front View" },
  { src: "/images/gallery-01.png", alt: "2016 Land Rover LR4 HSE - Exterior" },
  { src: "/images/gallery-02.png", alt: "2016 Land Rover LR4 HSE - Rear View" },
  { src: "/images/gallery-04.png", alt: "2016 Land Rover LR4 HSE - Interior" },
  { src: "/images/gallery-05.png", alt: "2016 Land Rover LR4 HSE - Dashboard" },
  { src: "/images/gallery-06.png", alt: "2016 Land Rover LR4 HSE - Wheel Detail" },
  { src: "/images/gallery-07.png", alt: "2016 Land Rover LR4 HSE - Engine Bay" },
  { src: "/images/gallery-08.png", alt: "2016 Land Rover LR4 HSE - Cargo Area" },
  { src: "/images/gallery-09.png", alt: "2016 Land Rover LR4 HSE - Front Angle" },
  { src: "/images/gallery-10.png", alt: "2016 Land Rover LR4 HSE - Rear Angle" },
  { src: "/images/gallery-11.png", alt: "2016 Land Rover LR4 HSE - Detail Shot" },
  { src: "/images/gallery-12.png", alt: "2016 Land Rover LR4 HSE - Exterior Detail" },
  { src: "/images/gallery-13.png", alt: "2016 Land Rover LR4 HSE - Final View" },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentHeroVideo, setCurrentHeroVideo] = useState(0);
  const [currentHeritageVideo, setCurrentHeritageVideo] = useState(0);
  const [heroTitleOpacity, setHeroTitleOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heritageVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideos = ["/images/hero2.mp4", "/images/hero.mp4"];
  const heritageVideos = ["/images/heritage-video2.mp4", "/images/heritage-video.mp4"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [statsVisible, setStatsVisible] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationId: number;
    const PLAY_TIME = 8000; // Exactly 8 seconds per video
    const FADE_TIME = 1500; // 1.5s fade

    const updateOpacity = () => {
      const elapsed = Date.now() - startTimeRef.current;
      let opacity = 1;

      // Fade out during last 1.5 seconds
      if (elapsed > PLAY_TIME - FADE_TIME) {
        opacity = Math.max(0, (PLAY_TIME - elapsed) / FADE_TIME);
      // Fade in during first 1.5 seconds
      } else if (elapsed < FADE_TIME) {
        opacity = elapsed / FADE_TIME;
      }

      video.style.opacity = String(opacity);
      setHeroTitleOpacity(opacity);
      animationId = requestAnimationFrame(updateOpacity);
    };

    // Timer-based switching - guarantees equal time
    const startTimeRef = { current: Date.now() };
    const switchTimer = setTimeout(() => {
      setCurrentHeroVideo((prev) => (prev + 1) % heroVideos.length);
    }, PLAY_TIME);

    // Loop video if it ends before switch time
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };

    animationId = requestAnimationFrame(updateOpacity);
    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(switchTimer);
      cancelAnimationFrame(animationId);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentHeroVideo]);

  // Heritage video cycling with cross-fade (no gap)
  useEffect(() => {
    const video = heritageVideoRef.current;
    if (!video) return;

    let animationId: number;
    const PLAY_TIME = 8000; // Exactly 8 seconds per video
    const FADE_TIME = 1000; // 1s fade

    const updateOpacity = () => {
      const elapsed = Date.now() - startTimeRef.current;
      let opacity = 1;

      // Fade out during last 1 second
      if (elapsed > PLAY_TIME - FADE_TIME) {
        opacity = Math.max(0, (PLAY_TIME - elapsed) / FADE_TIME);
      // Fade in during first 0.5 seconds
      } else if (elapsed < 500) {
        opacity = elapsed / 500;
      }

      video.style.opacity = String(opacity);
      animationId = requestAnimationFrame(updateOpacity);
    };

    // Timer-based switching - guarantees equal time
    const startTimeRef = { current: Date.now() };
    const switchTimer = setTimeout(() => {
      setCurrentHeritageVideo((prev) => (prev + 1) % heritageVideos.length);
    }, PLAY_TIME);

    // Loop video if it ends before switch time
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    animationId = requestAnimationFrame(updateOpacity);
    video.addEventListener("ended", handleEnded);

    return () => {
      clearTimeout(switchTimer);
      cancelAnimationFrame(animationId);
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentHeritageVideo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById("stats-bar");
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 100);

      // Scroll progress calculation
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % vehicleImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + vehicleImages.length) % vehicleImages.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Interested in 2016 Land Rover LR4 HSE");
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:donny@makebttr.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 overflow-x-auto">
            <div className="flex gap-8">
              <a href="#gallery" className={`lr-heading text-xs transition-colors whitespace-nowrap ${navScrolled ? 'text-foreground hover:text-lr-green' : 'text-white/80 hover:text-white'}`}>Gallery</a>
              <a href="#features" className={`lr-heading text-xs transition-colors whitespace-nowrap ${navScrolled ? 'text-foreground hover:text-lr-green' : 'text-white/80 hover:text-white'}`}>Features</a>
              <a href="#specs" className={`lr-heading text-xs transition-colors whitespace-nowrap ${navScrolled ? 'text-foreground hover:text-lr-green' : 'text-white/80 hover:text-white'}`}>Specs</a>
              <a href="#condition" className={`lr-heading text-xs transition-colors whitespace-nowrap ${navScrolled ? 'text-foreground hover:text-lr-green' : 'text-white/80 hover:text-white'}`}>Condition</a>
              <a href="#contact" className={`lr-heading text-xs transition-colors whitespace-nowrap ${navScrolled ? 'text-foreground hover:text-lr-green' : 'text-white/80 hover:text-white'}`}>Contact</a>
            </div>
            <a href="#contact" className={`lr-btn text-xs py-2 px-6 hidden md:block ${navScrolled ? 'lr-btn-primary' : 'bg-white text-foreground border-white hover:bg-transparent hover:text-white'}`}>
              Contact Seller
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <video
          key={currentHeroVideo}
          ref={videoRef}
          src={heroVideos[currentHeroVideo]}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 pb-32 text-center">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-4 transition-opacity duration-300"
            style={{ opacity: heroTitleOpacity }}
          >
            {currentHeroVideo === 0 ? "LAND ROVER" : "LR4 HSE"}
          </h1>
          <p
            className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-8 font-light transition-opacity duration-300"
            style={{ opacity: heroTitleOpacity }}
          >
            Legendary capability meets refined luxury. One owner, meticulously maintained.
          </p>
          <a
            href="#contact"
            className="lr-btn bg-white text-foreground border-white hover:bg-transparent hover:text-white transition-opacity duration-300"
            style={{ opacity: heroTitleOpacity }}
          >
            Contact Seller
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats-bar" className="bg-[#1a1a1a] text-white py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div
              className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0ms' }}
            >
              <p className="lr-heading text-xs text-white/60 mb-2">Year</p>
              <p className="text-4xl md:text-5xl font-light">2016</p>
            </div>
            <div
              className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '150ms' }}
            >
              <p className="lr-heading text-xs text-white/60 mb-2">Mileage</p>
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-4xl md:text-5xl font-light">81,000</p>
                <p className="text-sm text-white/60">mi</p>
              </div>
            </div>
            <div
              className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="lr-heading text-xs text-white/60 mb-2">Engine</p>
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-4xl md:text-5xl font-light">3.0L</p>
                <p className="text-sm text-white/60">V6 SC</p>
              </div>
            </div>
            <div
              className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '450ms' }}
            >
              <p className="lr-heading text-xs text-white/60 mb-2">Asking Price</p>
              <div className="flex items-baseline justify-center gap-1">
                <p className="text-lg text-white/60">$</p>
                <p className="text-4xl md:text-5xl font-light">16,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-muted-foreground text-center mb-4">Explore</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Photo Gallery</h2>

          {/* Main Image Viewer */}
          <div className="relative max-w-6xl mx-auto mb-8">
            <div className="relative aspect-[16/10] bg-muted overflow-hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer w-full h-full">
                    <Image
                      key={currentImage}
                      src={vehicleImages[currentImage].src}
                      alt={vehicleImages[currentImage].alt}
                      fill
                      className="object-cover ken-burns"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl bg-background border-border p-2">
                  <DialogTitle className="sr-only">{vehicleImages[currentImage].alt}</DialogTitle>
                  <DialogDescription className="sr-only">Full size view</DialogDescription>
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={vehicleImages[currentImage].src}
                      alt={vehicleImages[currentImage].alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 text-sm">
              {currentImage + 1} / {vehicleImages.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-4 max-w-6xl mx-auto">
            {vehicleImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-opacity ${
                  currentImage === index ? "ring-2 ring-lr-green" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full Bleed Feature Video 1 */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <video
          src="/images/terrain-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl">
            <p className="lr-heading text-xs text-white/60 mb-4">Capability</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Terrain Response System</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              The LR4&apos;s legendary Terrain Response system adapts to any surface - from rock crawling to highway cruising.
              With air suspension and permanent four-wheel drive, it offers genuine off-road capability that few modern SUVs can match.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-muted-foreground text-center mb-4">Equipment</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Premium Features</h2>

          <div className="grid md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto">
            <div className="bg-white p-12 card-glow transition-all duration-300 hover:-translate-y-1">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Off-Road</p>
              <h3 className="text-2xl font-light mb-4">Terrain Response System</h3>
              <p className="text-muted-foreground">Select from General, Snow, Mud, and Sand modes. The system automatically adjusts throttle response, transmission, and traction control for optimal grip.</p>
            </div>
            <div className="bg-white p-12 card-glow transition-all duration-300 hover:-translate-y-1">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Suspension</p>
              <h3 className="text-2xl font-light mb-4">Electronic Air Suspension</h3>
              <p className="text-muted-foreground">Independent front and rear air suspension with automatic load leveling. Raises for off-road clearance, lowers for easy entry.</p>
            </div>
            <div className="bg-white p-12 card-glow transition-all duration-300 hover:-translate-y-1">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Audio</p>
              <h3 className="text-2xl font-light mb-4">Meridian Surround Sound</h3>
              <p className="text-muted-foreground">Premium 380W British audio system with SiriusXM satellite radio. HDD navigation with touchscreen interface.</p>
            </div>
            <div className="bg-white p-12 card-glow transition-all duration-300 hover:-translate-y-1">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Vision</p>
              <h3 className="text-2xl font-light mb-4">360° Camera System</h3>
              <p className="text-muted-foreground">Surround cameras with blind spot monitoring, reverse traffic detection, and closing vehicle sensing. Tow assist included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Bleed Feature Video 2 */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Background video (next in queue) - always visible underneath */}
        <video
          src={heritageVideos[(currentHeritageVideo + 1) % heritageVideos.length]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Foreground video with fade transition */}
        <video
          key={currentHeritageVideo}
          ref={heritageVideoRef}
          src={heritageVideos[currentHeritageVideo]}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl ml-auto text-right">
            <p className="lr-heading text-xs text-white/60 mb-4">Heritage</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">The Last True Discovery</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Land Rover discontinued the LR4 after 2016, replacing it with the road-focused Discovery 5.
              This makes the LR4 the final evolution of the original go-anywhere Discovery philosophy.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              While newer models prioritized on-road comfort, the LR4 maintained the rugged body-on-frame
              heritage that made Land Rover legendary. It&apos;s increasingly sought after by enthusiasts
              who value true capability over crossover compromises.
            </p>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-24 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-white/60 text-center mb-4">Technical</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Specifications</h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
            <div>
              <p className="lr-heading text-xs text-white/60 mb-6">Vehicle</p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Color</span>
                  <span>Fuji White</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Interior</span>
                  <span>Ebony Leather</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">VIN</span>
                  <span className="text-xs">SALAG2V61GA845591</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Assembly</span>
                  <span>Solihull, UK</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Original Sticker</span>
                  <span>$62,971</span>
                </div>
              </div>
            </div>

            <div>
              <p className="lr-heading text-xs text-white/60 mb-6">Powertrain</p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Engine</span>
                  <span>3.0L V6 Supercharged</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Output</span>
                  <span>340 hp / 332 lb-ft</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Transmission</span>
                  <span>8-Speed Auto</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Drivetrain</span>
                  <span>Permanent 4WD</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Stop/Start</span>
                  <span>Yes</span>
                </div>
              </div>
            </div>

            <div>
              <p className="lr-heading text-xs text-white/60 mb-6">Economy</p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">City</span>
                  <span>15 MPG</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Highway</span>
                  <span>19 MPG</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Combined</span>
                  <span>16 MPG</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Fuel Type</span>
                  <span>Gasoline</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="text-white/60">Towing Capacity</span>
                  <span>7,716 lbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="max-w-5xl mx-auto mb-16">
            <p className="lr-heading text-xs text-white/60 mb-6 text-center">Factory Packages</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white/20 p-8 transition-all duration-300 hover:border-lr-green/50 hover:bg-white/5">
                <h3 className="text-xl font-light mb-4">Vision Assist Package</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Adaptive Xenon Headlights</li>
                  <li>• Auto High Beam Assist</li>
                  <li>• Blind Spot Monitoring</li>
                  <li>• Closing Vehicle Sensing</li>
                  <li>• Reverse Traffic Detection</li>
                  <li>• 360° Surround Camera System</li>
                  <li>• Tow Assist</li>
                </ul>
              </div>
              <div className="border border-white/20 p-8 transition-all duration-300 hover:border-lr-green/50 hover:bg-white/5">
                <h3 className="text-xl font-light mb-4">Black Design Package</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• 20&quot; Black 10-Spoke Wheels</li>
                  <li>• Black Grille</li>
                  <li>• Black Mirror Caps</li>
                  <li>• Black Lacquer Interior Trim</li>
                  <li>• LR4 Tailgate Badge</li>
                  <li>• Extended Roof Rails</li>
                </ul>
              </div>
              <div className="border border-white/20 p-8 transition-all duration-300 hover:border-lr-green/50 hover:bg-white/5">
                <h3 className="text-xl font-light mb-4">Silver Edition Package</h3>
                <p className="text-white/40 text-xs mb-4">Retail Value: $6,500</p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Meridian Surround Sound 380W</li>
                  <li>• SiriusXM Satellite Radio</li>
                  <li>• InControl Apps</li>
                  <li>• Protection Package</li>
                  <li>• Ebony Cargo Cover</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Standard Features */}
          <div className="max-w-5xl mx-auto">
            <p className="lr-heading text-xs text-white/60 mb-6 text-center">Standard Equipment</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-medium mb-4 text-white/80">Comfort</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Power Adjustable Front Seats</li>
                  <li>• Heated Front Seats</li>
                  <li>• Leather Seating Surfaces</li>
                  <li>• Dual Zone Climate Control</li>
                  <li>• Tilt/Slide Sunroof + Alpine Roof</li>
                  <li>• Power Fold-Flat Rear Seats</li>
                  <li>• Rear Privacy Glass</li>
                  <li>• Telescopic Steering Wheel</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-4 text-white/80">Technology</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• HDD Navigation System</li>
                  <li>• Touchscreen Interface</li>
                  <li>• Bluetooth Connectivity</li>
                  <li>• USB Connectivity</li>
                  <li>• Rear Parking Aids</li>
                  <li>• Rear View Camera</li>
                  <li>• Xenon Headlights w/ LED</li>
                  <li>• Perimeter Alarm</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-4 text-white/80">Safety &amp; Stability</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Dynamic Stability Control</li>
                  <li>• Electronic Traction Control</li>
                  <li>• Anti-Lock Braking System</li>
                  <li>• Electronic Brakeforce Dist.</li>
                  <li>• Hill Start Assist</li>
                  <li>• Trailer Stability Assist</li>
                  <li>• Emergency Brake Assist</li>
                  <li>• Cornering Brake Control</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This LR4 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-muted-foreground text-center mb-4">Value</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Why This LR4</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 border border-lr-green flex items-center justify-center transition-all duration-300 group-hover:bg-lr-green">
                <span className="text-2xl font-light text-lr-green transition-colors duration-300 group-hover:text-white">7</span>
              </div>
              <h3 className="text-lg font-light mb-2">Seven Seats</h3>
              <p className="text-sm text-muted-foreground">Three rows with power fold-flat rear seating. Stadium seating provides excellent visibility for all passengers.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 border border-lr-green flex items-center justify-center transition-all duration-300 group-hover:bg-lr-green">
                <span className="text-2xl font-light text-lr-green transition-colors duration-300 group-hover:text-white">UK</span>
              </div>
              <h3 className="text-lg font-light mb-2">British Built</h3>
              <p className="text-sm text-muted-foreground">Assembled in Solihull, UK. 75% British parts content. The heart of Land Rover heritage.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 border border-lr-green flex items-center justify-center transition-all duration-300 group-hover:bg-lr-green">
                <span className="text-2xl font-light text-lr-green transition-colors duration-300 group-hover:text-white">4</span>
              </div>
              <h3 className="text-lg font-light mb-2">True 4WD</h3>
              <p className="text-sm text-muted-foreground">Permanent four-wheel drive with Terrain Response. Not a crossover pretending to be an SUV.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 border border-lr-green flex items-center justify-center transition-all duration-300 group-hover:bg-lr-green">
                <span className="text-2xl font-light text-lr-green transition-colors duration-300 group-hover:text-white">1</span>
              </div>
              <h3 className="text-lg font-light mb-2">One Owner</h3>
              <p className="text-sm text-muted-foreground">Originally sold at Hornburg Land Rover Los Angeles. Meticulously maintained with full service history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Condition Section */}
      <section id="condition" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-muted-foreground text-center mb-4">Transparency</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Vehicle Condition</h2>

          <div className="grid md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
            <div className="bg-secondary p-8 text-center transition-all duration-300 hover:bg-white">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Exterior</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Minor wear consistent with age</p>
            </div>
            <div className="bg-secondary p-8 text-center transition-all duration-300 hover:bg-white">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Interior</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Leather in great condition</p>
            </div>
            <div className="bg-secondary p-8 text-center transition-all duration-300 hover:bg-white">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Mechanical</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Recently serviced</p>
            </div>
            <div className="bg-secondary p-8 text-center transition-all duration-300 hover:bg-white">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Tires</p>
              <p className="text-3xl font-light mb-2">Good</p>
              <p className="text-sm text-muted-foreground">Adequate tread remaining</p>
            </div>
            <div className="bg-secondary p-8 text-center transition-all duration-300 hover:bg-white">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Brakes</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Recently replaced</p>
            </div>
            <div className="bg-secondary p-8 text-center transition-all duration-300 hover:bg-white">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Title</p>
              <p className="text-3xl font-light text-lr-green mb-2">Clean</p>
              <p className="text-sm text-muted-foreground">No accidents reported</p>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-12 mb-8">
            Full service records available upon request
          </p>

          {/* Carfax */}
          <div className="max-w-md mx-auto text-center">
            <a
              href="https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=CVW_1&vin=SALAG2V61GA845591"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border-2 border-[#00a0df] px-8 py-4 hover:bg-[#00a0df]/5 transition-colors"
            >
              <svg width="100" height="24" viewBox="0 0 100 24" className="flex-shrink-0">
                <text x="0" y="18" fill="#00a0df" fontWeight="bold" fontSize="18" fontFamily="Arial, sans-serif">CARFAX</text>
              </svg>
              <span className="text-sm font-medium text-foreground">View Vehicle History Report</span>
            </a>
            <p className="text-xs text-muted-foreground mt-3">VIN: SALAG2V61GA845591</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-white/60 text-center mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-4">Interested?</h2>
          <p className="text-center text-white/60 mb-16 max-w-xl mx-auto">
            Serious inquiries only. Happy to answer questions or schedule a viewing in Park City, UT.
          </p>

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="lr-heading text-xs text-white/60 mb-3 block">Name</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent border-white/30 border-0 border-b rounded-none px-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white"
                    required
                  />
                </div>
                <div>
                  <label className="lr-heading text-xs text-white/60 mb-3 block">Phone</label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-transparent border-white/30 border-0 border-b rounded-none px-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="lr-heading text-xs text-white/60 mb-3 block">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-white/30 border-0 border-b rounded-none px-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white"
                  required
                />
              </div>

              <div>
                <label className="lr-heading text-xs text-white/60 mb-3 block">Message</label>
                <Textarea
                  placeholder="I'm interested in learning more about the LR4..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-white/30 border-0 border-b rounded-none px-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-white min-h-[100px] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="lr-btn bg-white text-foreground border-white hover:bg-transparent hover:text-white w-full"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-white/60 text-sm mb-4">Or reach out directly</p>
              <a href="tel:+17608096717" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                <Phone className="h-4 w-4" />
                <span>760.809.6717</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white/60">
        <div className="container mx-auto px-4 text-center">
          <p className="lr-heading text-xs">
            2016 Land Rover LR4 HSE &bull; Private Sale &bull; Park City, UT
          </p>
          <p className="mt-4 text-xs text-white/40">
            Photos and details accurate as of listing date. Vehicle sold as-is.
          </p>
        </div>
      </footer>
    </main>
  );
}
