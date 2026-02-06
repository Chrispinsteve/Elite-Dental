"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Shield,
  Zap,
  Heart,
  Check,
  ArrowRight,
  ArrowLeft,
  User,
  Calendar,
  Users,
  Award,
  Target,
  Smile,
  Menu,
  X,
  ChevronRight,
  Stethoscope,
  Microscope,
  Syringe,
  Eye,
  Timer,
  BadgeCheck,
  Quote,
} from "lucide-react";
import PatientDashboard from "@/components/patient-dashboard";
import StaffDashboard from "@/components/staff-dashboard";

interface PageProps {
  setCurrentPage: (page: string) => void;
}

interface LoginPageProps extends PageProps {
  setIsLoggedIn: (value: boolean) => void;
  setUserRole: (role: string) => void;
}

interface NavigationProps extends PageProps {
  currentPage: string;
  isLoggedIn: boolean;
  userRole: string;
  setIsLoggedIn: (value: boolean) => void;
}

/* ─── Tooth SVG Icon ─── */
function ToothIcon({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6.5 7.5 5 8.5 4 10C3 11.5 3 13.5 4 15C5 16.5 6 19 7 21C8 23 9 22 9.5 20C10 18 11 17 12 17C13 17 14 18 14.5 20C15 22 16 23 17 21C18 19 19 16.5 20 15C21 13.5 21 11.5 20 10C19 8.5 17.5 7.5 17 5.5C16.5 3.5 14.5 2 12 2Z" />
    </svg>
  );
}

/* ─── Navigation ─── */
function Navigation({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  userRole,
  setIsLoggedIn,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ["Home", "About", "Services", "Doctors", "Contact"];

  // Close mobile menu on page change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-teal-600 rounded-xl flex items-center justify-center">
              <ToothIcon className="text-white" size={22} />
            </div>
            <span className="font-bold text-lg lg:text-xl text-gray-900">
              Elite Dental
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === item.toLowerCase()
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(userRole === "admin" ? "admin" : "portal")
                  }
                  className="px-5 py-2.5 border border-teal-600 text-teal-700 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentPage("home");
                  }}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentPage("login")}
                  className="px-5 py-2.5 text-gray-700 font-semibold text-sm hover:text-teal-700 transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("booking")}
                  className="px-5 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
                >
                  Book Now
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCurrentPage(item.toLowerCase())}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    currentPage === item.toLowerCase()
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(userRole === "admin" ? "admin" : "portal")
                      }
                      className="w-full py-3 border border-teal-600 text-teal-700 rounded-xl font-semibold text-sm"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setCurrentPage("home");
                      }}
                      className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setCurrentPage("login")}
                      className="w-full py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage("booking")}
                      className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold text-sm"
                    >
                      Book Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Horizontal Scroll Container ─── */
function HScrollContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = ref.current;
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -ml-2 hidden md:flex"
          aria-label="Scroll left"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
      )}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -mr-2 hidden md:flex"
          aria-label="Scroll right"
        >
          <ArrowRight size={18} className="text-gray-700" />
        </button>
      )}
    </div>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ setCurrentPage }: PageProps) {
  const whyFeatures = [
    {
      icon: Shield,
      title: "Advanced Technology",
      desc: "State-of-the-art 3D imaging, laser dentistry, and digital impressions for precise, comfortable treatment.",
    },
    {
      icon: Heart,
      title: "Gentle Care",
      desc: "Compassionate approach with sedation options, ensuring a stress-free experience for every patient.",
    },
    {
      icon: Zap,
      title: "Quick Recovery",
      desc: "Minimally invasive techniques for faster healing, less discomfort, and fewer follow-up visits.",
    },
    {
      icon: Award,
      title: "Certified Experts",
      desc: "Board-certified dentists with combined 50+ years of experience and ongoing education.",
    },
  ];

  const services = [
    { icon: Smile, name: "General Dentistry", price: "From $75", duration: "30-60 min", desc: "Checkups, cleanings, and preventive care" },
    { icon: Sparkles, name: "Cosmetic Dentistry", price: "From $299", duration: "60-90 min", desc: "Whitening, veneers, and smile makeovers" },
    { icon: Target, name: "Orthodontics", price: "From $2,500", duration: "Varies", desc: "Clear aligners and traditional braces" },
    { icon: Shield, name: "Emergency Care", price: "From $150", duration: "Same day", desc: "Urgent pain relief and tooth repair" },
    { icon: Syringe, name: "Implants", price: "From $1,800", duration: "Multi-visit", desc: "Permanent tooth replacement solutions" },
    { icon: Eye, name: "Pediatric Dentistry", price: "From $60", duration: "30-45 min", desc: "Gentle dental care for children" },
  ];

  const doctors = [
    { name: "Dr. Sarah Mitchell", role: "Lead Dentist", specialty: "Cosmetic Dentistry", experience: "15 years", photo: "/doctor-sarah.svg" },
    { name: "Dr. James Wilson", role: "Orthodontist", specialty: "Orthodontics", experience: "12 years", photo: "/doctor-james.svg" },
    { name: "Dr. Emily Chen", role: "Pediatric Dentist", specialty: "Children's Dentistry", experience: "10 years", photo: "/doctor-emily.svg" },
    { name: "Dr. Michael Brown", role: "Oral Surgeon", specialty: "Oral Surgery", experience: "18 years", photo: "/doctor-michael.svg" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", text: "Best dental experience ever! The team made me feel so comfortable. I actually look forward to my visits now.", rating: 5 },
    { name: "Michael Chen", text: "Professional, caring, and thorough. Dr. Mitchell transformed my smile with veneers. Highly recommend!", rating: 5 },
    { name: "Emily Davis", text: "Finally found a dentist I trust. My kids love going here too. The pediatric team is amazing.", rating: 5 },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end lg:items-center overflow-hidden">
        <Image
          src="/hero-dental.svg"
          alt="Modern dental clinic interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20 lg:bg-gradient-to-r lg:from-gray-900/80 lg:via-gray-900/50 lg:to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 lg:py-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Award size={16} />
              Award-Winning Dental Care
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 text-balance">
              Premium Dental Care
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
              Experience world-class dentistry with cutting-edge technology and a gentle touch. Your perfect smile starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage("booking")}
                className="px-8 py-4 bg-teal-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
              >
                Book Appointment <ArrowRight size={20} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage("services")}
                className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/25 transition-colors border border-white/20"
              >
                Our Services
              </button>
            </div>
            <div className="flex items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">15k+</div>
                <div className="text-gray-300 text-sm">Happy Patients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">20+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">4.9</div>
                <div className="text-gray-300 text-sm flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" /> Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Elite Dental */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Why Choose Us</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Why Elite Dental?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              We combine expertise with compassion to deliver exceptional dental care tailored to you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFeatures.map((f, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal-600 transition-colors">
                  <f.icon size={24} className="text-teal-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Horizontal Scroll */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Services</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Services</h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage("services")}
              className="hidden sm:flex items-center gap-1 text-teal-600 font-semibold text-sm hover:text-teal-800 transition-colors"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          <HScrollContainer>
            {services.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage("services")}
                className="flex-shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow text-left group"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                  <s.icon size={24} className="text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-teal-700 font-semibold text-sm">{s.price}</span>
                  <span className="text-gray-400 text-xs flex items-center gap-1"><Timer size={12} /> {s.duration}</span>
                </div>
              </button>
            ))}
          </HScrollContainer>
          <button
            type="button"
            onClick={() => setCurrentPage("services")}
            className="sm:hidden flex items-center gap-1 text-teal-600 font-semibold text-sm mt-4 mx-auto"
          >
            View All Services <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Doctors - Horizontal Scroll */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Team</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Meet Our Doctors</h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage("doctors")}
              className="hidden sm:flex items-center gap-1 text-teal-600 font-semibold text-sm hover:text-teal-800 transition-colors"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          <HScrollContainer>
            {doctors.map((d, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[240px] sm:w-[260px] bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={d.photo || "/placeholder.svg"}
                    alt={d.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-0.5">{d.name}</h3>
                  <p className="text-teal-600 text-sm font-medium mb-2">{d.role}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <BadgeCheck size={14} /> {d.experience} experience
                  </div>
                </div>
              </div>
            ))}
          </HScrollContainer>
          <button
            type="button"
            onClick={() => setCurrentPage("doctors")}
            className="sm:hidden flex items-center gap-1 text-teal-600 font-semibold text-sm mt-4 mx-auto"
          >
            View All Doctors <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Testimonials</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">What Our Patients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 lg:p-8 rounded-2xl relative">
                <Quote size={32} className="text-teal-100 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{`"${t.text}"`}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-teal-700" />
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
            Ready for Your Best Smile?
          </h2>
          <p className="text-teal-100 mb-8 leading-relaxed">
            Book your appointment today and experience the Elite Dental difference. No account required.
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage("booking")}
            className="px-10 py-4 bg-white text-teal-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Schedule Now
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT PAGE ─── */
function AboutPage({ setCurrentPage }: PageProps) {
  const values = [
    { icon: Heart, title: "Patient-Centered", desc: "Your comfort and satisfaction are our top priorities. We listen, we care, and we deliver." },
    { icon: Award, title: "Excellence", desc: "Committed to the highest standards of dental care with board-certified professionals." },
    { icon: Users, title: "Community", desc: "Building lasting relationships with our patients and giving back to our community." },
    { icon: Target, title: "Innovation", desc: "Embracing the latest dental technology for more precise, comfortable treatments." },
  ];

  const milestones = [
    { year: "2004", text: "Founded in Lake Worth, FL with a vision of accessible premium dental care" },
    { year: "2010", text: "Expanded to our current 5,000 sq ft state-of-the-art facility" },
    { year: "2016", text: "Introduced 3D imaging and laser dentistry technology" },
    { year: "2020", text: "Surpassed 10,000 patients served with a 4.9-star rating" },
    { year: "2025", text: "Recognized as one of LA's top dental practices for the 5th consecutive year" },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <Image
          src="/about-clinic.svg"
          alt="Elite Dental clinic interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 to-gray-900/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="text-teal-300 font-semibold text-sm tracking-wide uppercase mb-3">About Us</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">About Elite Dental</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              For over 20 years, Elite Dental has been the trusted choice for families seeking exceptional dental care. Our mission is to provide personalized, compassionate treatment that helps every patient achieve their healthiest, most beautiful smile.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Certifications */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Mission</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dental Care with a Purpose</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                We believe everyone deserves access to high-quality dental care in a comfortable, welcoming environment. Our team combines decades of expertise with the latest technology to deliver treatments that not only look great but improve long-term oral health.
              </p>
              <div className="flex flex-wrap gap-3">
                {["ADA Certified", "AAFE Member", "Invisalign Provider", "ISO 9001"].map((cert) => (
                  <span key={cert} className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <BadgeCheck size={14} /> {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/happy-patient.svg" alt="Happy patient at Elite Dental" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Values</p>
            <h2 className="text-3xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="text-center bg-white p-6 rounded-2xl">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-teal-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Journey</p>
            <h2 className="text-3xl font-bold text-gray-900">Milestones</h2>
          </div>
          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-teal-700 font-bold">{m.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-teal-600 rounded-full" />
                  {idx < milestones.length - 1 && <div className="w-0.5 h-full min-h-[40px] bg-teal-200" />}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pb-4">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <button
            type="button"
            onClick={() => setCurrentPage("booking")}
            className="px-8 py-4 bg-white text-teal-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Book Your Visit
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── SERVICES PAGE ─��─ */
function ServicesPage({ setCurrentPage }: PageProps) {
  const services = [
    {
      name: "General Dentistry",
      icon: Smile,
      description: "Comprehensive care for your everyday dental health including cleanings, fillings, and preventive treatments to keep your smile healthy for years to come.",
      benefits: ["Regular checkups & cleanings", "Cavity fillings", "Gum disease treatment", "Oral cancer screening"],
      price: "From $75",
      duration: "30-60 min",
    },
    {
      name: "Cosmetic Dentistry",
      icon: Sparkles,
      description: "Transform your smile with our advanced cosmetic procedures designed to enhance your natural beauty and boost your confidence.",
      benefits: ["Professional teeth whitening", "Porcelain veneers", "Dental bonding", "Full smile makeovers"],
      price: "From $299",
      duration: "60-90 min",
    },
    {
      name: "Orthodontics",
      icon: Target,
      description: "Straighten your teeth and correct bite issues with our modern orthodontic solutions for patients of all ages.",
      benefits: ["Clear aligners (Invisalign)", "Traditional braces", "Custom retainers", "Bite correction"],
      price: "From $2,500",
      duration: "12-24 months",
    },
    {
      name: "Emergency Care",
      icon: Shield,
      description: "Same-day emergency appointments for urgent dental issues when you need us most. We are here for you around the clock.",
      benefits: ["Same-day appointments", "Pain relief", "Tooth repair & extraction", "24/7 phone support line"],
      price: "From $150",
      duration: "Immediate",
    },
    {
      name: "Dental Implants",
      icon: Syringe,
      description: "Permanent tooth replacement solutions that look, feel, and function just like your natural teeth.",
      benefits: ["Single tooth implants", "Full arch restoration", "All-on-4 implants", "Bone grafting"],
      price: "From $1,800",
      duration: "Multi-visit",
    },
    {
      name: "Pediatric Dentistry",
      icon: Eye,
      description: "Gentle, fun dental care tailored specifically for children from infancy through adolescence.",
      benefits: ["First tooth check", "Sealants & fluoride", "Cavity prevention", "Orthodontic evaluation"],
      price: "From $60",
      duration: "30-45 min",
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Services</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Comprehensive Dental Care</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              From routine checkups to advanced procedures, we provide a full range of dental services tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <s.icon size={24} className="text-teal-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-teal-700 font-semibold">{s.price}</span>
                        <span className="text-gray-400 flex items-center gap-1"><Timer size={12} /> {s.duration}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-4">{s.description}</p>
                  <button
                    type="button"
                    onClick={() => setCurrentPage("booking")}
                    className="inline-flex items-center gap-1 text-teal-600 font-semibold text-sm hover:text-teal-800 transition-colors"
                  >
                    Book This Service <ArrowRight size={16} />
                  </button>
                </div>
                <div className="lg:w-72 flex-shrink-0">
                  <div className="bg-white rounded-xl p-5">
                    <p className="text-sm font-semibold text-gray-900 mb-3">{"What's"} Included</p>
                    <div className="space-y-2.5">
                      {s.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={16} className="text-teal-600 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── DOCTORS PAGE ─── */
function DoctorsPage({ setCurrentPage }: PageProps) {
  const doctors = [
    { name: "Dr. Sarah Mitchell", role: "Lead Dentist", specialty: "Cosmetic Dentistry", experience: "15 years", photo: "/doctor-sarah.svg", bio: "Dr. Mitchell is passionate about creating beautiful, natural-looking smiles using the latest cosmetic techniques." },
    { name: "Dr. James Wilson", role: "Orthodontist", specialty: "Orthodontics", experience: "12 years", photo: "/doctor-james.svg", bio: "Dr. Wilson specializes in clear aligners and braces, helping patients of all ages achieve perfectly aligned teeth." },
    { name: "Dr. Emily Chen", role: "Pediatric Dentist", specialty: "Children's Dentistry", experience: "10 years", photo: "/doctor-emily.svg", bio: "Dr. Chen creates a fun, gentle environment that helps children develop positive associations with dental care." },
    { name: "Dr. Michael Brown", role: "Oral Surgeon", specialty: "Oral Surgery", experience: "18 years", photo: "/doctor-michael.svg", bio: "Dr. Brown is an experienced surgeon specializing in implants, extractions, and complex oral procedures." },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Our Team</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Doctors</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Expert care from our experienced team of board-certified dental professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {doctors.map((d, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56 sm:h-auto sm:w-48 lg:w-56 flex-shrink-0">
                  <Image
                    src={d.photo || "/placeholder.svg"}
                    alt={d.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{d.name}</h3>
                  <p className="text-teal-600 font-medium text-sm mb-3">{d.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{d.bio}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-medium">{d.specialty}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">{d.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book with Your Preferred Doctor</h2>
          <button
            type="button"
            onClick={() => setCurrentPage("booking")}
            className="px-8 py-4 bg-white text-teal-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Schedule Appointment
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
function ContactPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2">Contact</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              {"We're"} here to help with all your dental needs. Reach out anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              {[
                { icon: MapPin, title: "Address", content: "4750 Jog Road\nLake Worth, FL 33467" },
                { icon: Phone, title: "Phone", content: "(561) 432-1718" },
                { icon: Mail, title: "Email", content: "elite-dental@hotmail.com" },
                { icon: Clock, title: "Hours", content: "Mon-Fri: 8am - 6pm\nSat: 9am - 2pm\nSun: Closed" },
              ].map((c, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <c.icon size={20} className="text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{c.title}</h3>
                    <p className="text-gray-500 text-sm whitespace-pre-line">{c.content}</p>
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden mt-6">
                <iframe
                  title="Clinic location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.5!2d-80.1494!3d26.6195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d925e3!2s4750+Jog+Road+Lake+Worth+FL+33467!5e0!3m2!1sen!2sus!4v1699000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-base md:text-sm bg-white text-gray-900"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-base md:text-sm bg-white text-gray-900"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-base md:text-sm bg-white text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-base md:text-sm bg-white text-gray-900"
                      placeholder="(561) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-base md:text-sm bg-white text-gray-900"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none text-base md:text-sm bg-white text-gray-900"
                    placeholder="Tell us more..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── BOOKING PAGE ─── */
function BookingPage({ setCurrentPage }: PageProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const totalSteps = 5;

  const services = [
    { name: "General Checkup", icon: Smile, duration: "30 min" },
    { name: "Teeth Cleaning", icon: Sparkles, duration: "45 min" },
    { name: "Teeth Whitening", icon: Star, duration: "60 min" },
    { name: "Cavity Filling", icon: Shield, duration: "45 min" },
    { name: "Root Canal", icon: Syringe, duration: "90 min" },
    { name: "Orthodontics Consultation", icon: Target, duration: "30 min" },
  ];

  const doctors = [
    { name: "Dr. Sarah Mitchell", specialty: "Cosmetic Dentistry", photo: "/doctor-sarah.svg" },
    { name: "Dr. James Wilson", specialty: "Orthodontics", photo: "/doctor-james.svg" },
    { name: "Dr. Emily Chen", specialty: "Pediatric Dentistry", photo: "/doctor-emily.svg" },
    { name: "Dr. Michael Brown", specialty: "Oral Surgery", photo: "/doctor-michael.svg" },
  ];

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const stepLabels = ["Service", "Doctor", "Date", "Info", "Confirm"];

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
        <p className="text-gray-500 text-sm mb-8">No account required. Complete the steps below.</p>

        {/* Stepper */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {stepLabels.map((label, idx) => {
            const s = idx + 1;
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-colors ${
                      step > s
                        ? "bg-teal-600 text-white"
                        : step === s
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step > s ? <Check size={14} /> : s}
                  </div>
                  <span className={`text-[10px] font-medium ${step >= s ? "text-teal-700" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {s < totalSteps && (
                  <div className={`flex-1 h-0.5 min-w-[24px] mt-[-12px] ${step > s ? "bg-teal-600" : "bg-gray-200"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Choose a Service</h2>
              <p className="text-gray-500 text-sm mb-6">Select the dental service you need.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedService(s.name)}
                    className={`p-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                      selectedService === s.name
                        ? "bg-teal-600 text-white ring-2 ring-teal-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <s.icon size={20} className={selectedService === s.name ? "text-white" : "text-teal-600"} />
                    <div>
                      <div className="font-medium text-sm">{s.name}</div>
                      <div className={`text-xs ${selectedService === s.name ? "text-teal-100" : "text-gray-400"}`}>{s.duration}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => selectedService && setStep(2)}
                disabled={!selectedService}
                className="mt-8 w-full py-3.5 bg-teal-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Doctor */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Choose a Doctor</h2>
              <p className="text-gray-500 text-sm mb-6">Select your preferred doctor (optional).</p>
              <div className="space-y-3">
                {doctors.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setSelectedDoctor(d.name)}
                    className={`w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all ${
                      selectedDoctor === d.name
                        ? "bg-teal-600 text-white ring-2 ring-teal-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={d.photo || "/placeholder.svg"} alt={d.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{d.name}</div>
                      <div className={`text-xs ${selectedDoctor === d.name ? "text-teal-100" : "text-gray-400"}`}>{d.specialty}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
                >
                  {selectedDoctor ? "Continue" : "Skip"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Select Date & Time</h2>
              <p className="text-gray-500 text-sm mb-6">Choose a convenient time for your visit.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base md:text-sm bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Available Times</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl font-medium text-sm transition-all ${
                        selectedTime === time
                          ? "bg-teal-600 text-white ring-2 ring-teal-600"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => selectedDate && selectedTime && setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 py-3.5 bg-teal-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-teal-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Your Info */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Your Information</h2>
              <p className="text-gray-500 text-sm mb-6">We need a few details to confirm your booking.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base md:text-sm bg-white text-gray-900"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base md:text-sm bg-white text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base md:text-sm bg-white text-gray-900"
                    placeholder="(561) 000-0000"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => formData.name && formData.phone && setStep(5)}
                  disabled={!formData.name || !formData.phone}
                  className="flex-1 py-3.5 bg-teal-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-teal-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 text-sm mb-8">
                A confirmation will be sent to your email and phone.
              </p>

              <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium text-gray-900">{selectedService}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Doctor</span>
                  <span className="font-medium text-gray-900">{selectedDoctor || "Any Available"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-900">{formData.phone}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage("home")}
                  className="w-full py-3.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
                >
                  Back to Home
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("login")}
                  className="w-full py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Create an Account for More Features
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── LOGIN PAGE ─── */
function LoginPage({ setCurrentPage, setIsLoggedIn, setUserRole }: LoginPageProps) {
  const [isStaff, setIsStaff] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserRole(isStaff ? "admin" : "patient");
    setCurrentPage(isStaff ? "admin" : "portal");
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ToothIcon className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to your Elite Dental account</p>
        </div>

        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsStaff(false)}
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                !isStaff ? "bg-white text-teal-700 shadow-sm" : "text-gray-500"
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setIsStaff(true)}
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isStaff ? "bg-white text-teal-700 shadow-sm" : "text-gray-500"
              }`}
            >
              Staff
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base md:text-sm bg-white text-gray-900"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base md:text-sm bg-white text-gray-900"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── Patient/Admin Wrappers ─── */
interface DashboardProps extends PageProps {
  setIsLoggedIn: (value: boolean) => void
}

function PatientPortal({ setCurrentPage, setIsLoggedIn }: DashboardProps) {
  return <PatientDashboard setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
}

function AdminDashboard({ setCurrentPage, setIsLoggedIn }: DashboardProps) {
  return <StaffDashboard setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
}

/* ─── FOOTER ─── */
function Footer({ setCurrentPage }: PageProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center">
                <ToothIcon className="text-white" size={20} />
              </div>
              <span className="font-bold text-lg">Elite Dental</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing exceptional dental care for over 20 years in Lake Worth, FL.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Doctors", "Contact"].map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => setCurrentPage(link.toLowerCase())}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>4750 Jog Road</p>
              <p>Lake Worth, FL 33467</p>
              <p>(561) 432-1718</p>
              <p>elite-dental@hotmail.com</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Hours</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>Mon-Fri: 8am - 6pm</p>
              <p>Sat: 9am - 2pm</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>2026 Elite Dental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Page() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "about":
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case "services":
        return <ServicesPage setCurrentPage={setCurrentPage} />;
      case "doctors":
        return <DoctorsPage setCurrentPage={setCurrentPage} />;
      case "contact":
        return <ContactPage />;
      case "booking":
        return <BookingPage setCurrentPage={setCurrentPage} />;
      case "login":
        return (
          <LoginPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setUserRole={setUserRole}
          />
        );
      case "portal":
        return <PatientPortal setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
      case "admin":
        return <AdminDashboard setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const showPublicChrome = !["portal", "admin"].includes(currentPage);

  return (
    <div className="min-h-screen bg-white">
      {showPublicChrome && (
        <Navigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {renderPage()}
      {!["login", "portal", "admin", "booking"].includes(currentPage) && (
        <Footer setCurrentPage={setCurrentPage} />
      )}

      {/* Floating call button - visible on public pages only */}
      {showPublicChrome && (
        <a
          href="tel:5614321718"
          aria-label="Call Elite Dental"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all hover:shadow-xl group px-4 py-3 lg:px-5 lg:py-3"
        >
          <Phone size={20} className="shrink-0" />
          <span className="hidden lg:inline text-sm font-semibold whitespace-nowrap">
            (561) 432-1718
          </span>
        </a>
      )}
    </div>
  );
}
