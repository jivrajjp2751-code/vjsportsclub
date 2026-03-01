import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Clock, Shield, Users, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import pool1 from "@/assets/pool-1.jpg";
import pool2 from "@/assets/pool-2.jpg";
import pool3 from "@/assets/pool-3.jpg";
import pool4 from "@/assets/pool-4.jpg";
import pool5 from "@/assets/pool-5.jpg";

const carouselImages = [
  { src: pool1, alt: "VJ's Sports Club Swimming Pool signboard", caption: "Admission Open" },
  { src: pool2, alt: "Aerial view of swimmers enjoying the pool", caption: "Crystal-Clear Waters" },
  { src: pool3, alt: "Pool with beautiful dolphin mosaic art", caption: "Dolphin Mosaic Art" },
  { src: pool4, alt: "Wide sparkling pool with ladder access", caption: "Sparkling Pool" },
  { src: pool5, alt: "Wide angle view of pool with dolphin art", caption: "Full Pool View" },
];

const features = [
  { icon: Waves, title: "Olympic-Standard Pool", desc: "25m heated pool with crystal-clear filtered water." },
  { icon: Shield, title: "Safety & Hygiene", desc: "UV-treated water, lifeguards on duty, regular sanitation." },
  { icon: Users, title: "Coaching Available", desc: "Certified coaches for beginners, intermediate & advanced swimmers." },
  { icon: Clock, title: "Flexible Timings", desc: "Open 6 AM – 9 PM, 7 days a week." },
];

const ageCategories = [
  { age: "Kids (5–12 yrs)", timing: "7:00 AM – 9:00 AM", note: "With parental supervision" },
  { age: "Teens (13–17 yrs)", timing: "9:00 AM – 11:00 AM", note: "Group coaching available" },
  { age: "Adults (18+)", timing: "6:00 AM – 9:00 PM", note: "All sessions open" },
  { age: "Ladies Only", timing: "3:00 PM – 5:00 PM", note: "Female coach available" },
];

const SwimmingPool = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const len = carouselImages.length;

  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setCurrent(((idx % len) + len) % len);
    },
    [len]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Swimming Pool - Coaching & Sessions"
        description="Enjoy our Olympic-standard swimming pool with certified coaching. Sessions available for kids, ladies, and adults. UV-treated hygienic water."
        keywords="Swimming Pool, Swimming Coaching, Vikram Jadhav, Ladies Only Swimming, Kids Swimming"
      />
      <Navbar />

      {/* ───── Hero Carousel ───── */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={carouselImages[current].src}
            alt={carouselImages[current].alt}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

        {/* Caption badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-24 sm:bottom-28 left-0 right-0 z-20 flex justify-center"
          >
            <span className="bg-black/50 px-5 py-2 rounded-full text-sm sm:text-base font-medium text-white border border-white/20">
              {carouselImages[current].caption}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current
                ? "w-8 h-2 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                : "w-2 h-2 bg-foreground/30 hover:bg-foreground/60"
                }`}
            />
          ))}
        </div>

        {/* Title overlay */}
        <div className="absolute top-24 sm:top-32 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl sm:text-7xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)] text-glow"
          >
            Swimming Pool
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mt-2 text-lg sm:text-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Dive into wellness. Every stroke counts.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-lg p-6"
              >
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display text-xl text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Age categories */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-6 mb-16"
          >
            <h2 className="font-display text-3xl text-foreground mb-6">Timings by Age</h2>
            <div className="space-y-4">
              {ageCategories.map((c) => (
                <div key={c.age} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <span className="font-medium text-foreground">{c.age}</span>
                    <span className="text-xs text-muted-foreground ml-2">({c.note})</span>
                  </div>
                  <span className="text-primary font-medium text-sm">{c.timing}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="font-display text-2xl text-foreground mb-4">Interested? Get in touch!</h3>
            <Button variant="hero" size="lg" asChild>
              <a href="/contact">
                <Phone className="w-4 h-4 mr-2" /> Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SwimmingPool;
