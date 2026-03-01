import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Leaf, UtensilsCrossed, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import cafe1 from "@/assets/cafe-1.png";
import cafe2 from "@/assets/cafe-2.png";
import cafe3 from "@/assets/cafe-3.png";
import cafe4 from "@/assets/cafe-4.png";
import cafe5 from "@/assets/cafe-5.png";

const carouselImages = [
  { src: cafe1, alt: "Outdoor Seating Area — Guests enjoying food next to the turf", caption: "Open-Air Seating" },
  { src: cafe2, alt: "Lantern-lit Café Canopy with warm fairy lights", caption: "Cozy Lantern Canopy" },
  { src: cafe3, alt: "Bustling Café with families and players relaxing", caption: "Where Players Unwind" },
  { src: cafe4, alt: "Café walkway with checkered tile flooring", caption: "Welcoming Entrance" },
  { src: cafe5, alt: "Beautiful rooftop-style café structure at dusk", caption: "Evening Ambiance" },
];

const menuCategories = [
  {
    title: "Coffee & Tea",
    icon: "☕",
    items: [
      { name: "Espresso", price: "₹99", desc: "Rich single-shot espresso" },
      { name: "Cappuccino", price: "₹149", desc: "Espresso with steamed milk foam" },
      { name: "Cold Coffee", price: "₹129", desc: "Chilled coffee with ice cream" },
      { name: "Masala Chai", price: "₹49", desc: "Traditional Indian spiced tea" },
      { name: "Green Tea", price: "₹79", desc: "Refreshing Japanese green tea" },
    ],
  },
  {
    title: "Shakes & Smoothies",
    icon: "🥤",
    items: [
      { name: "Mango Shake", price: "₹149", desc: "Fresh mango, milk, sugar" },
      { name: "Oreo Shake", price: "₹169", desc: "Oreo cookies, vanilla ice cream, milk" },
      { name: "Banana Smoothie", price: "₹129", desc: "Banana, yogurt, honey" },
      { name: "Mixed Fruit Juice", price: "₹139", desc: "Seasonal fresh fruits blend" },
    ],
  },
  {
    title: "Snacks & Meals",
    icon: "🍔",
    items: [
      { name: "Veg Sandwich", price: "₹99", desc: "Grilled veggies, cheese, toast" },
      { name: "Chicken Wrap", price: "₹179", desc: "Grilled chicken, veggies, mayo wrap" },
      { name: "Paneer Tikka", price: "₹199", desc: "Spiced paneer, grilled with veggies" },
      { name: "French Fries", price: "₹99", desc: "Crispy golden fries with ketchup" },
      { name: "Pasta", price: "₹169", desc: "Penne in creamy white/red sauce" },
    ],
  },
  {
    title: "Desserts",
    icon: "🍰",
    items: [
      { name: "Brownie", price: "₹129", desc: "Warm chocolate brownie with ice cream" },
      { name: "Waffle", price: "₹149", desc: "Belgian waffle with maple syrup" },
      { name: "Ice Cream Sundae", price: "₹139", desc: "Vanilla, chocolate, strawberry" },
    ],
  },
];

const Cafe = () => {
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
        title="Café — VJ Army | Relax & Refuel After Your Game"
        description="Enjoy great food, coffee & refreshments at VJ Army's open-air café right next to the turf. Perfect hangout spot for players and families."
        keywords="VJ Army Cafe, Sports Cafe Aurangabad, Coffee near turf, Cafe near swimming pool"
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

        {/* Gradient overlay — light so images stay crisp */}
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
            Our Café
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mt-2 text-lg sm:text-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Relax · Refresh · Recharge
          </motion.p>
        </div>
      </section>



      {/* ───── Menu ───── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <Coffee className="w-6 h-6 text-primary" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl text-foreground"
            >
              Our Menu
            </motion.h2>
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-12 max-w-lg mx-auto"
          >
            Fresh, delicious food & beverages to fuel your game and your day.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-display text-2xl text-accent">{cat.title}</h3>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-start group py-2 border-b border-border/30 last:border-0"
                    >
                      <div>
                        <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <span className="text-primary font-semibold whitespace-nowrap ml-4 text-sm">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Visit CTA ───── */}
      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 sm:p-12 text-center"
          >
            <UtensilsCrossed className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-3xl text-foreground mb-3">Visit Us Today</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Grab a refreshing drink or a hearty meal right next to the turf. Perfect for players, families & friends.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Open daily · 7 AM – 10 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Inside VJ Army Complex, Aurangabad</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cafe;
