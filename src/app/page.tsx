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
  { src: "/images/gallery-1.png", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-060.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-065.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-067.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-068.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-069.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-071.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-073.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-074.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-075.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-086.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-087.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-088.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-089.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-090.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-106.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-107.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-111.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-113.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-121.jpg", alt: "2016 Land Rover LR4" },
  { src: "/images/defender-octa-147.jpg", alt: "2016 Land Rover LR4" },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationId: number;
    let isEnded = false;

    const updateOpacity = () => {
      if (!video.duration) {
        animationId = requestAnimationFrame(updateOpacity);
        return;
      }

      if (isEnded) {
        video.style.opacity = "0";
        animationId = requestAnimationFrame(updateOpacity);
        return;
      }

      const timeRemaining = video.duration - video.currentTime;
      let opacity = 1;

      if (timeRemaining < 3) {
        opacity = timeRemaining / 3;
      } else if (video.currentTime < 1.5) {
        opacity = video.currentTime / 1.5;
      }

      video.style.opacity = String(opacity);
      animationId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      isEnded = true;
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        isEnded = false;
        video.play();
      }, 2500);
    };

    animationId = requestAnimationFrame(updateOpacity);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelAnimationFrame(animationId);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % vehicleImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + vehicleImages.length) % vehicleImages.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for your interest! I'll be in touch soon.");
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <video
          ref={videoRef}
          src="/images/hero.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 pb-32 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-4">
            LR4 HSE
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-8 font-light">
            Legendary capability meets refined luxury. One owner, meticulously maintained.
          </p>
          <a href="#contact" className="lr-btn bg-white text-foreground border-white hover:bg-transparent hover:text-white">
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

      {/* Section Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 overflow-x-auto">
            <div className="flex gap-8">
              <a href="#gallery" className="lr-heading text-xs hover:text-lr-green transition-colors whitespace-nowrap">Gallery</a>
              <a href="#features" className="lr-heading text-xs hover:text-lr-green transition-colors whitespace-nowrap">Features</a>
              <a href="#condition" className="lr-heading text-xs hover:text-lr-green transition-colors whitespace-nowrap">Condition</a>
              <a href="#contact" className="lr-heading text-xs hover:text-lr-green transition-colors whitespace-nowrap">Contact</a>
            </div>
            <a href="#contact" className="lr-btn lr-btn-primary text-xs py-2 px-6 hidden md:block">
              Contact Seller
            </a>
          </div>
        </div>
      </nav>

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
                      src={vehicleImages[currentImage].src}
                      alt={vehicleImages[currentImage].alt}
                      fill
                      className="object-cover"
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

      {/* Full Bleed Feature Image 1 */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="/images/terrain.png"
          alt="2016 Land Rover LR4"
          fill
          className="object-cover"
          quality={100}
          unoptimized
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
            <div className="bg-white p-12">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Powertrain</p>
              <h3 className="text-2xl font-light mb-4">3.0L Supercharged V6</h3>
              <p className="text-muted-foreground">340 horsepower with smooth 8-speed automatic transmission. Responsive power delivery for both highway passing and trail climbing.</p>
            </div>
            <div className="bg-white p-12">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Suspension</p>
              <h3 className="text-2xl font-light mb-4">Adaptive Air Suspension</h3>
              <p className="text-muted-foreground">Height-adjustable air springs provide a smooth ride on pavement and increased clearance when venturing off-road.</p>
            </div>
            <div className="bg-white p-12">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Audio</p>
              <h3 className="text-2xl font-light mb-4">Meridian Sound System</h3>
              <p className="text-muted-foreground">Premium British audio engineering delivers exceptional sound quality throughout the cabin.</p>
            </div>
            <div className="bg-white p-12">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Safety</p>
              <h3 className="text-2xl font-light mb-4">Surround Camera System</h3>
              <p className="text-muted-foreground">360-degree visibility for confident maneuvering in tight spaces and trail navigation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Bleed Feature Image 2 */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="/images/heritage.png"
          alt="2016 Land Rover LR4"
          fill
          className="object-cover"
          quality={100}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl ml-auto text-right">
            <p className="lr-heading text-xs text-white/60 mb-4">Heritage</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">The Last True Discovery</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              The LR4 represents the final evolution of the legendary Discovery lineage.
              Before the shift to the road-focused Discovery 5, this was the ultimate expression of
              Land Rover&apos;s go-anywhere philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* Condition Section */}
      <section id="condition" className="py-24">
        <div className="container mx-auto px-4">
          <p className="lr-heading text-xs text-muted-foreground text-center mb-4">Transparency</p>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Vehicle Condition</h2>

          <div className="grid md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
            <div className="bg-secondary p-8 text-center">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Exterior</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Minor wear consistent with age</p>
            </div>
            <div className="bg-secondary p-8 text-center">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Interior</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Leather in great condition</p>
            </div>
            <div className="bg-secondary p-8 text-center">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Mechanical</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Recently serviced</p>
            </div>
            <div className="bg-secondary p-8 text-center">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Tires</p>
              <p className="text-3xl font-light mb-2">Good</p>
              <p className="text-sm text-muted-foreground">Adequate tread remaining</p>
            </div>
            <div className="bg-secondary p-8 text-center">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Brakes</p>
              <p className="text-3xl font-light text-lr-green mb-2">Excellent</p>
              <p className="text-sm text-muted-foreground">Recently replaced</p>
            </div>
            <div className="bg-secondary p-8 text-center">
              <p className="lr-heading text-xs text-muted-foreground mb-4">Title</p>
              <p className="text-3xl font-light text-lr-green mb-2">Clean</p>
              <p className="text-sm text-muted-foreground">No accidents reported</p>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-12">
            Full service records available upon request
          </p>
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
