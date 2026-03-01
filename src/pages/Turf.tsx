import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import turf1 from "@/assets/turf-1.jpg";
import turf2 from "@/assets/turf-2.jpg";
import turf3 from "@/assets/turf-3.jpg";
import turf4 from "@/assets/turf-4.jpg";
import { format, addDays, isSameDay } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

const carouselImages = [
  { src: turf1, alt: "Wide view of turf with goal posts and striped grass", caption: "Professional Turf" },
  { src: turf2, alt: "Elevated view of striped turf with yellow gate", caption: "Aerial View" },
  { src: turf3, alt: "Ground-level view of turf with goal and floodlights", caption: "Evening Play" },
  { src: turf4, alt: "Close-up grass-level shot of premium turf", caption: "Premium Grass" },
];

const sports = ["Football", "Cricket", "Badminton", "Tennis"];

const timeSlots = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM",
];

const Turf = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBoostedSlots] = useState<string[]>([]);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");

  // Carousel state
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

  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    fetchBookedSlots();
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const { data } = await supabase
      .from("turf_bookings")
      .select("time_slot")
      .eq("booking_date", dateKey);
    if (data) setBoostedSlots(data.map((d) => d.time_slot));
  };

  const handleBook = async () => {
    if (!selectedSlot || !bookingName) return;
    setLoading(true);
    const { error } = await supabase.from("turf_bookings").insert({
      name: bookingName,
      phone: bookingPhone || null,
      sport: selectedSport,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      time_slot: selectedSlot,
    });
    setLoading(false);
    if (!error) {
      setBooked(true);
      fetchBookedSlots();
      setTimeout(() => {
        setBooked(false);
        setSelectedSlot(null);
        setBookingName("");
        setBookingPhone("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Book Sports Turf - Football & Cricket"
        description="Book premium sports turf for Football, Cricket, Badminton and Tennis. Competitive rates and top-quality facilities at Vikram Jadhav's premium destination."
        keywords="Turf Booking, Football Turf, Box Cricket, Vikram Jadhav, Sports Facility"
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
            Sports Turf
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mt-2 text-lg sm:text-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Book your slot. Play your game.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          {/* Sport Selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h3 className="font-display text-2xl text-foreground mb-4">Select Sport</h3>
            <div className="flex flex-wrap gap-3">
              {sports.map((s) => (
                <Button key={s} variant={selectedSport === s ? "hero" : "secondary"} size="sm" onClick={() => setSelectedSport(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Date Selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-8">
            <h3 className="font-display text-2xl text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Select Date
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {days.map((d) => (
                <button
                  key={d.toISOString()}
                  onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                  className={`flex flex-col items-center px-4 py-3 rounded-lg border transition-all min-w-[70px] ${isSameDay(d, selectedDate) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50"
                    }`}
                >
                  <span className="text-xs font-medium">{format(d, "EEE")}</span>
                  <span className="text-lg font-semibold">{format(d, "dd")}</span>
                  <span className="text-xs">{format(d, "MMM")}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Time Slots */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-8">
            <h3 className="font-display text-2xl text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Available Slots
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 px-2 rounded-lg text-sm font-medium border transition-all ${isBooked
                      ? "border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed line-through"
                      : isSelected
                        ? "border-primary bg-primary/20 text-primary neon-border"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                      }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Booking Form */}
          {selectedSlot && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-lg p-6 mb-6">
              <h3 className="font-display text-xl text-foreground mb-3">Booking Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Your Name *" value={bookingName} onChange={(e) => setBookingName(e.target.value)} className="bg-card border-border text-foreground placeholder:text-muted-foreground" required />
                <Input type="tel" placeholder="Phone Number" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div><span className="text-muted-foreground">Sport:</span> <span className="text-foreground font-medium">{selectedSport}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground font-medium">{format(selectedDate, "dd MMM yyyy")}</span></div>
                <div><span className="text-muted-foreground">Time:</span> <span className="text-primary font-medium">{selectedSlot}</span></div>
                <div><span className="text-muted-foreground">Duration:</span> <span className="text-foreground font-medium">1 Hour</span></div>
              </div>
              <Button variant="hero" size="lg" onClick={handleBook} className="w-full" disabled={!bookingName || loading}>
                {booked ? (
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Booked Successfully!</span>
                ) : loading ? "Booking..." : "Confirm & Book"}
              </Button>
            </motion.div>
          )}

          {/* Turf Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-lg p-6">
            <h3 className="font-display text-2xl text-foreground mb-4">Turf Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="text-foreground font-medium mb-2">Sports Supported</h4>
                <ul className="space-y-1">
                  <li>⚽ Football (5v5, 7v7)</li>
                  <li>🏏 Cricket (Box Cricket)</li>
                  <li>🏸 Badminton</li>
                  <li>🎾 Tennis</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-2">Timings & Rules</h4>
                <ul className="space-y-1">
                  <li>🕐 6:00 AM – 10:00 PM daily</li>
                  <li>👟 Sports shoes mandatory</li>
                  <li>🚫 No food/drinks on turf</li>
                  <li>📞 Cancel 2 hrs before for full refund</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Turf;
