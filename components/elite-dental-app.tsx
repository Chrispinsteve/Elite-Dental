"use client";

import React, { useState } from 'react';
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
  User,
  Menu,
  X,
  Calendar,
  Users,
  CreditCard,
  Plus,
  Award,
  Target,
  Smile,
} from 'lucide-react';

const colors = {
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  secondary: '#00CED1',
  accent: '#E5E7EB',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#1F2937',
  textLight: '#6B7280',
  textMuted: '#9CA3AF',
  success: '#10B981',
};

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

const Navigation = ({ currentPage, setCurrentPage, isLoggedIn, userRole, setIsLoggedIn }: NavigationProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ['Home', 'About', 'Services', 'Doctors', 'Contact'];

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${colors.accent}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        <div onClick={() => setCurrentPage('home')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ width: '44px', height: '44px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={24} color="white" />
          </div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: colors.text }}>Elite Dental</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item.toLowerCase())}
              style={{
                padding: '10px 16px',
                background: currentPage === item.toLowerCase() ? `${colors.primary}10` : 'transparent',
                border: 'none',
                borderRadius: '10px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: currentPage === item.toLowerCase() ? colors.primary : colors.text,
                cursor: 'pointer',
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setCurrentPage(userRole === 'admin' ? 'admin' : 'portal')}
                style={{ padding: '10px 20px', background: 'transparent', border: `2px solid ${colors.primary}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.primary, cursor: 'pointer' }}
              >
                Dashboard
              </button>
              <button
                onClick={() => { setIsLoggedIn(false); setCurrentPage('home'); }}
                style={{ padding: '10px 20px', background: colors.primary, border: 'none', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: 'white', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentPage('login')}
                style={{ padding: '10px 20px', background: 'transparent', border: `2px solid ${colors.primary}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.primary, cursor: 'pointer' }}
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentPage('booking')}
                style={{ padding: '10px 20px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: 'white', cursor: 'pointer' }}
              >
                Book Now
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const HomePage = ({ setCurrentPage }: PageProps) => {
  const features = [
    { icon: Shield, title: 'Advanced Technology', desc: 'State-of-the-art equipment for precise treatments' },
    { icon: Heart, title: 'Gentle Care', desc: 'Comfortable experience with compassionate staff' },
    { icon: Award, title: 'Expert Team', desc: '25+ years of combined dental expertise' },
    { icon: Clock, title: 'Flexible Hours', desc: 'Evening & weekend appointments available' },
  ];

  const services = [
    { icon: Sparkles, title: 'General Dentistry', desc: 'Comprehensive care for your entire family' },
    { icon: Star, title: 'Cosmetic Dentistry', desc: 'Transform your smile with modern techniques' },
    { icon: Shield, title: 'Orthodontics', desc: 'Straighten teeth with Invisalign & braces' },
    { icon: Zap, title: 'Dental Implants', desc: 'Permanent solutions for missing teeth' },
  ];

  const testimonials = [
    { name: 'Sarah M.', text: 'Best dental experience I\'ve ever had. The team made me feel so comfortable!', rating: 5 },
    { name: 'James L.', text: 'Dr. Morgan is amazing. My smile has never looked better after the whitening treatment.', rating: 5 },
    { name: 'Emily R.', text: 'Finally found a dentist I actually look forward to visiting. Highly recommend!', rating: 5 },
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ padding: '100px 24px', background: `linear-gradient(135deg, ${colors.surface} 0%, white 100%)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: `${colors.primary}10`, borderRadius: '50px', marginBottom: '24px' }}>
              <Sparkles size={16} color={colors.primary} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.primary }}>Premium Dental Care</span>
            </div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 700, color: colors.text, lineHeight: 1.1, marginBottom: '24px' }}>
              Your Perfect Smile Starts Here
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: colors.textLight, lineHeight: 1.7, marginBottom: '40px' }}>
              Experience world-class dental care with our team of experts. We combine advanced technology with gentle care for your best smile.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => setCurrentPage('booking')}
                style={{ padding: '18px 32px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)' }}
              >
                Book Appointment <ArrowRight size={20} />
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                style={{ padding: '18px 32px', background: 'white', border: `2px solid ${colors.accent}`, borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: colors.text, cursor: 'pointer' }}
              >
                Our Services
              </button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '1', background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`, borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smile size={200} color={colors.primary} strokeWidth={1} />
            </div>
            <div style={{ position: 'absolute', bottom: '40px', left: '-40px', background: 'white', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '50px', height: '50px', background: `${colors.success}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={24} color={colors.success} />
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 700, color: colors.text }}>15,000+</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>Happy Patients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: colors.text, marginBottom: '16px' }}>Why Choose Elite Dental?</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: colors.textLight, maxWidth: '600px', margin: '0 auto' }}>We're committed to providing exceptional dental care in a comfortable environment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {features.map((feature, i) => (
              <div key={i} style={{ padding: '32px', background: colors.surface, borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.3)' }}>
                  <feature.icon size={32} color="white" />
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: colors.text, marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: colors.textLight, lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '100px 24px', background: colors.surface }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: colors.text, marginBottom: '16px' }}>Our Services</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: colors.textLight, maxWidth: '600px', margin: '0 auto' }}>Comprehensive dental solutions tailored to your needs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {services.map((service, i) => (
              <div key={i} style={{ padding: '40px', background: 'white', borderRadius: '24px', display: 'flex', gap: '24px', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentPage('services')}>
                <div style={{ width: '70px', height: '70px', background: `${colors.primary}10`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <service.icon size={32} color={colors.primary} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 600, color: colors.text, marginBottom: '8px' }}>{service.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: colors.textLight, lineHeight: 1.6, marginBottom: '16px' }}>{service.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.primary, fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500 }}>
                    Learn More <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: colors.text, marginBottom: '16px' }}>What Our Patients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((testimonial, i) => (
              <div key={i} style={{ padding: '32px', background: colors.surface, borderRadius: '24px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={20} fill={colors.primary} color={colors.primary} />
                  ))}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: colors.text, lineHeight: 1.7, marginBottom: '20px' }}>"{testimonial.text}"</p>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.primary }}>{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 24px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Ready for Your Best Smile?</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px' }}>Book your appointment today and take the first step towards a healthier, more beautiful smile.</p>
          <button
            onClick={() => setCurrentPage('booking')}
            style={{ padding: '20px 40px', background: 'white', border: 'none', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: 600, color: colors.primary, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            Book Your Visit <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

const AboutPage = ({ setCurrentPage }: PageProps) => {
  const values = [
    { icon: Heart, title: 'Patient-Centered Care', desc: 'Your comfort and wellbeing are our top priorities.' },
    { icon: Target, title: 'Excellence', desc: 'We strive for perfection in every procedure.' },
    { icon: Shield, title: 'Trust & Transparency', desc: 'Honest communication and clear treatment plans.' },
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ padding: '80px 24px 60px', background: colors.surface, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>About Elite Dental</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: colors.textLight, maxWidth: '700px', margin: '0 auto' }}>Dedicated to providing exceptional dental care since 1998</p>
      </section>
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>Our Story</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: colors.textLight, lineHeight: 1.8, marginBottom: '20px' }}>
              Founded by Dr. Elizabeth Morgan, Elite Dental has been serving our community with excellence for over 25 years. What started as a small practice has grown into a state-of-the-art facility known for combining advanced technology with personalized patient care.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: colors.textLight, lineHeight: 1.8 }}>
              Our team of specialists is committed to making every visit comfortable while delivering outstanding results. We believe everyone deserves a healthy, beautiful smile.
            </p>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`, borderRadius: '24px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={200} color={colors.primary} strokeWidth={1} />
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 24px', background: colors.surface }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: colors.text, marginBottom: '48px', textAlign: 'center' }}>Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {values.map((value, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.3)' }}>
                  <value.icon size={40} color="white" />
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 600, color: colors.text, marginBottom: '12px' }}>{value.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: colors.textLight, lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ setCurrentPage }: PageProps) => {
  const [activeService, setActiveService] = useState(0);
  const services = [
    { id: 'general', title: 'General Dentistry', icon: Sparkles, desc: 'Comprehensive preventive care including cleanings, exams, and fillings to maintain your oral health.', benefits: ['Regular checkups & cleanings', 'Cavity detection & fillings', 'Gum disease treatment', 'Oral cancer screening'], process: ['Initial examination', 'X-rays if needed', 'Professional cleaning', 'Treatment recommendations'] },
    { id: 'cosmetic', title: 'Cosmetic Dentistry', icon: Star, desc: 'Transform your smile with our advanced cosmetic treatments designed to enhance your appearance.', benefits: ['Teeth whitening', 'Porcelain veneers', 'Bonding & contouring', 'Smile makeovers'], process: ['Smile assessment', 'Treatment planning', 'Custom procedure', 'Follow-up care'] },
    { id: 'orthodontics', title: 'Orthodontics', icon: Shield, desc: 'Straighten your teeth with modern orthodontic solutions including Invisalign and traditional braces.', benefits: ['Invisalign clear aligners', 'Traditional braces', 'Retainer fitting', 'Bite correction'], process: ['Consultation', 'Custom treatment plan', 'Regular adjustments', 'Retention phase'] },
    { id: 'implants', title: 'Dental Implants', icon: Zap, desc: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.', benefits: ['Single tooth implants', 'Implant-supported bridges', 'All-on-4 solutions', 'Bone grafting'], process: ['Evaluation', 'Implant placement', 'Healing period', 'Crown attachment'] },
    { id: 'emergency', title: 'Emergency Care', icon: Heart, desc: 'Immediate care for dental emergencies including pain relief and urgent treatments.', benefits: ['Same-day appointments', 'Pain management', 'Broken tooth repair', '24/7 phone support'], process: ['Emergency assessment', 'Pain relief', 'Treatment', 'Follow-up plan'] },
  ];
  const current = services[activeService];

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ padding: '80px 24px 0', background: colors.surface, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>Our Services</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: colors.textLight, maxWidth: '700px', margin: '0 auto' }}>Comprehensive dental solutions tailored to your needs</p>
      </section>
      <section style={{ padding: '0 24px', background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', overflowX: 'auto', padding: '24px 0', borderBottom: `1px solid ${colors.accent}` }}>
          {services.map((service, i) => (
            <button key={service.id} onClick={() => setActiveService(i)} style={{ padding: '14px 24px', background: activeService === i ? colors.primary : colors.surface, border: 'none', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: activeService === i ? 'white' : colors.text, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}><service.icon size={18} /> {service.title}</button>
          ))}
        </div>
      </section>
      <section style={{ padding: '60px 24px 100px', background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px' }}>
          <div>
            <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.3)' }}><current.icon size={40} color="white" /></div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: colors.text, marginBottom: '16px' }}>{current.title}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: colors.textLight, lineHeight: 1.8, marginBottom: '32px' }}>{current.desc}</p>
            <button onClick={() => setCurrentPage('booking')} style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)' }}>Book Appointment <ArrowRight size={20} /></button>
          </div>
          <div>
            <div style={{ padding: '32px', background: colors.surface, borderRadius: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: colors.text, marginBottom: '20px' }}>Key Benefits</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {current.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', background: `${colors.success}15`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} color={colors.success} /></div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: colors.text }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '32px', background: 'white', border: `1px solid ${colors.accent}`, borderRadius: '24px' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: colors.text, marginBottom: '24px' }}>Treatment Process</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {current.process.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, color: 'white' }}>{i + 1}</div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: colors.text, paddingTop: '5px' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DoctorsPage = ({ setCurrentPage }: PageProps) => {
  const doctors = [
    { name: 'Dr. Elizabeth Morgan', title: 'Founder & Lead Dentist', specialty: 'General & Cosmetic', experience: '25+ years', bio: 'Dr. Morgan founded Elite Dental with a vision to create patient-centered care.' },
    { name: 'Dr. Michael Chen', title: 'Orthodontic Specialist', specialty: 'Orthodontics', experience: '15+ years', bio: 'Dr. Chen is a leading expert in modern orthodontics and Invisalign.' },
    { name: 'Dr. Sarah Williams', title: 'Implant Specialist', specialty: 'Oral Surgery', experience: '18+ years', bio: 'Dr. Williams specializes in complex implant cases and oral surgery.' },
    { name: 'Dr. James Park', title: 'Pediatric Dentist', specialty: 'Pediatric Care', experience: '12+ years', bio: 'Dr. Park has a special gift for making children feel at ease.' },
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ padding: '80px 24px 60px', background: colors.surface, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>Meet Our Expert Doctors</h1>
      </section>
      <section style={{ padding: '60px 24px 100px', background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {doctors.map((doctor, i) => (
              <div key={i} style={{ background: colors.surface, borderRadius: '24px', overflow: 'hidden' }}>
                <div style={{ height: '200px', background: `linear-gradient(135deg, ${colors.secondary}30, ${colors.primary}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100px', height: '100px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>{doctor.name.split(' ').slice(1, 3).map(n => n[0]).join('')}</div>
                </div>
                <div style={{ padding: '32px' }}>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{doctor.name}</h3>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.primary, fontWeight: 500, marginBottom: '8px' }}>{doctor.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight, marginBottom: '16px' }}>{doctor.specialty} • {doctor.experience}</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight, lineHeight: 1.7, marginBottom: '20px' }}>{doctor.bio}</p>
                  <button onClick={() => setCurrentPage('booking')} style={{ width: '100%', padding: '14px', background: 'transparent', border: `2px solid ${colors.primary}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.primary, cursor: 'pointer' }}>Book with {doctor.name.split(' ')[1]}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const BookingPage = ({ setCurrentPage }: PageProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ service: '', doctor: '', date: '', time: '', firstName: '', lastName: '', email: '', phone: '' });
  const services = [
    { id: 'general', name: 'General Dentistry', icon: Sparkles },
    { id: 'cosmetic', name: 'Cosmetic Dentistry', icon: Star },
    { id: 'orthodontics', name: 'Orthodontics', icon: Shield },
    { id: 'implants', name: 'Dental Implants', icon: Zap },
    { id: 'emergency', name: 'Emergency Care', icon: Heart },
  ];
  const doctors = [
    { id: 'morgan', name: 'Dr. Elizabeth Morgan', specialty: 'General & Cosmetic' },
    { id: 'chen', name: 'Dr. Michael Chen', specialty: 'Orthodontics' },
    { id: 'any', name: 'No Preference', specialty: 'First Available' },
  ];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: colors.surface }}>
      <section style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {step < 6 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <React.Fragment key={s}>
                  <div style={{ width: '36px', height: '36px', background: step >= s ? colors.primary : colors.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: step >= s ? 'white' : colors.textMuted }}>{step > s ? <Check size={18} /> : s}</div>
                  {s < 5 && <div style={{ width: '40px', height: '3px', background: step > s ? colors.primary : colors.accent, borderRadius: '2px' }} />}
                </React.Fragment>
              ))}
            </div>
          )}
          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            {step === 1 && (
              <>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '32px' }}>Select a Service</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {services.map((service) => (
                    <button key={service.id} onClick={() => setFormData({ ...formData, service: service.id })} style={{ padding: '20px 24px', background: formData.service === service.id ? `${colors.primary}08` : colors.surface, border: `2px solid ${formData.service === service.id ? colors.primary : 'transparent'}`, borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: '48px', height: '48px', background: formData.service === service.id ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : `${colors.primary}10`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><service.icon size={24} color={formData.service === service.id ? 'white' : colors.primary} /></div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 500, color: colors.text }}>{service.name}</span>
                      {formData.service === service.id && <Check size={20} color={colors.primary} style={{ marginLeft: 'auto' }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '32px' }}>Choose a Doctor</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {doctors.map((doctor) => (
                    <button key={doctor.id} onClick={() => setFormData({ ...formData, doctor: doctor.id })} style={{ padding: '20px 24px', background: formData.doctor === doctor.id ? `${colors.primary}08` : colors.surface, border: `2px solid ${formData.doctor === doctor.id ? colors.primary : 'transparent'}`, borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: '48px', height: '48px', background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: colors.primary }}>{doctor.id === 'any' ? '?' : doctor.name.split(' ')[1][0]}</div>
                      <div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 500, color: colors.text }}>{doctor.name}</div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: colors.textLight }}>{doctor.specialty}</div></div>
                      {formData.doctor === doctor.id && <Check size={20} color={colors.primary} style={{ marginLeft: 'auto' }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '32px' }}>Pick Date & Time</h2>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Date</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '16px', background: colors.surface }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '12px' }}>Available Times</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {times.map((time) => (<button key={time} onClick={() => setFormData({ ...formData, time })} style={{ padding: '12px', background: formData.time === time ? colors.primary : colors.surface, border: 'none', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: formData.time === time ? 'white' : colors.text, cursor: 'pointer' }}>{time}</button>))}
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '32px' }}>Your Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div><label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>First Name</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="John" style={{ width: '100%', padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: colors.surface }} /></div>
                  <div><label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Last Name</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Doe" style={{ width: '100%', padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: colors.surface }} /></div>
                </div>
                <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" style={{ width: '100%', padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: colors.surface }} /></div>
                <div><label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(561) 000-0000" style={{ width: '100%', padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: colors.surface }} /></div>
              </>
            )}
            {step === 5 && (
              <>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '32px' }}>Review & Confirm</h2>
                <div style={{ background: colors.surface, borderRadius: '16px', padding: '24px' }}>
                  {[{ label: 'Service', value: services.find(s => s.id === formData.service)?.name }, { label: 'Doctor', value: doctors.find(d => d.id === formData.doctor)?.name }, { label: 'Date', value: formData.date }, { label: 'Time', value: formData.time }, { label: 'Name', value: `${formData.firstName} ${formData.lastName}` }, { label: 'Email', value: formData.email }].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 5 ? `1px solid ${colors.accent}` : 'none' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>{item.label}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: colors.text }}>{item.value || '—'}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === 6 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '80px', height: '80px', background: `${colors.success}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Check size={40} color={colors.success} /></div>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>Booking Confirmed!</h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: colors.textLight, marginBottom: '32px' }}>We've sent a confirmation email to {formData.email}.</p>
                <button onClick={() => setCurrentPage('home')} style={{ padding: '16px 32px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', cursor: 'pointer' }}>Back to Home</button>
              </div>
            )}
            {step < 6 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                {step > 1 ? (<button onClick={() => setStep(step - 1)} style={{ padding: '14px 28px', background: colors.surface, border: 'none', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: colors.text, cursor: 'pointer' }}>Back</button>) : <div />}
                <button onClick={() => step === 5 ? setStep(6) : setStep(step + 1)} style={{ padding: '14px 32px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>{step === 5 ? 'Confirm Booking' : 'Continue'} <ArrowRight size={18} /></button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = ({ setCurrentPage }: PageProps) => (
  <div style={{ paddingTop: '80px' }}>
    <section style={{ padding: '80px 24px 60px', background: colors.surface, textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>Get In Touch</h1>
    </section>
    <section style={{ padding: '60px 24px 100px', background: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px' }}>
        <div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>Visit Our Clinic</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
            {[{ icon: MapPin, label: 'Address', value: '4750 Jog Road\nLake Worth, FL 33467' }, { icon: Phone, label: 'Phone', value: '(561) 432-1718' }, { icon: Mail, label: 'Email', value: 'elite-dental@hotmail.com' }, { icon: Clock, label: 'Hours', value: 'Mon-Fri: 8AM-6PM\nSat: 9AM-4PM' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '50px', height: '50px', background: `${colors.primary}10`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><item.icon size={22} color={colors.primary} /></div>
                <div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: colors.text, whiteSpace: 'pre-line' }}>{item.value}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: colors.surface, borderRadius: '24px', padding: '40px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: colors.text, marginBottom: '32px' }}>Send a Message</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="text" placeholder="Name" style={{ padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: 'white' }} />
              <input type="tel" placeholder="Phone" style={{ padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: 'white' }} />
            </div>
            <input type="email" placeholder="Email" style={{ padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: 'white' }} />
            <textarea placeholder="How can we help you?" rows={5} style={{ padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: 'white', resize: 'none' }} />
            <button style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', cursor: 'pointer', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)' }}>Send Message</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const LoginPage = ({ setCurrentPage, setIsLoggedIn, setUserRole }: LoginPageProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogin = () => { setUserRole(isAdmin ? 'admin' : 'patient'); setIsLoggedIn(true); setCurrentPage(isAdmin ? 'admin' : 'portal'); };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '440px', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '60px', height: '60px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><User size={28} color="white" /></div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>Welcome Back</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: colors.textLight }}>Sign in to access your account</p>
          </div>
          <div style={{ display: 'flex', background: colors.surface, borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
            <button onClick={() => setIsAdmin(false)} style={{ flex: 1, padding: '12px', background: !isAdmin ? 'white' : 'transparent', border: 'none', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: !isAdmin ? colors.primary : colors.textLight, cursor: 'pointer', boxShadow: !isAdmin ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>Patient</button>
            <button onClick={() => setIsAdmin(true)} style={{ flex: 1, padding: '12px', background: isAdmin ? 'white' : 'transparent', border: 'none', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: isAdmin ? colors.primary : colors.textLight, cursor: 'pointer', boxShadow: isAdmin ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>Staff</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="email" placeholder="Email" style={{ padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: colors.surface }} />
            <input type="password" placeholder="Password" style={{ padding: '14px 16px', border: `1px solid ${colors.accent}`, borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px', background: colors.surface }} />
            <button onClick={handleLogin} style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`, border: 'none', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', cursor: 'pointer', marginTop: '8px' }}>Sign In</button>
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>New patient? <span onClick={() => setCurrentPage('booking')} style={{ color: colors.primary, cursor: 'pointer', fontWeight: 500 }}>Book your first appointment</span></p>
        </div>
      </div>
    </div>
  );
};

const PatientPortal = ({ setCurrentPage }: PageProps) => {
  const appointments = [
    { id: 1, date: 'Feb 15, 2025', time: '10:00 AM', service: 'General Checkup', doctor: 'Dr. Morgan', status: 'upcoming' },
    { id: 2, date: 'Jan 20, 2025', time: '2:30 PM', service: 'Teeth Cleaning', doctor: 'Dr. Morgan', status: 'completed' },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: colors.surface }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>Welcome back, John</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: colors.textLight }}>Manage your appointments and dental history</p>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: colors.text }}>Your Appointments</h2>
            <button onClick={() => setCurrentPage('booking')} style={{ padding: '10px 20px', background: colors.primary, border: 'none', borderRadius: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={18} /> Book New</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {appointments.map((apt) => (
              <div key={apt.id} style={{ padding: '20px 24px', background: colors.surface, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '50px', height: '50px', background: apt.status === 'upcoming' ? `${colors.primary}15` : `${colors.success}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={22} color={apt.status === 'upcoming' ? colors.primary : colors.success} /></div>
                  <div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: colors.text }}>{apt.service}</div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>{apt.date} at {apt.time} • {apt.doctor}</div></div>
                </div>
                <div style={{ padding: '6px 12px', background: apt.status === 'upcoming' ? `${colors.primary}15` : `${colors.success}15`, borderRadius: '20px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: apt.status === 'upcoming' ? colors.primary : colors.success, textTransform: 'capitalize' }}>{apt.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ setCurrentPage }: PageProps) => {
  const stats = [
    { label: "Today's Appointments", value: '12', change: '+2', icon: Calendar },
    { label: 'Total Patients', value: '1,247', change: '+18', icon: Users },
    { label: 'This Week Revenue', value: '$8,420', change: '+12%', icon: CreditCard },
    { label: 'Avg. Rating', value: '4.9', change: '+0.1', icon: Star },
  ];
  const appointments = [
    { time: '9:00 AM', patient: 'Sarah Johnson', service: 'General Checkup', doctor: 'Dr. Morgan', status: 'confirmed' },
    { time: '10:00 AM', patient: 'Michael Brown', service: 'Teeth Cleaning', doctor: 'Dr. Morgan', status: 'in-progress' },
    { time: '11:00 AM', patient: 'Emily Davis', service: 'Orthodontics', doctor: 'Dr. Chen', status: 'confirmed' },
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: colors.surface }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div><h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>Admin Dashboard</h1><p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: colors.textLight }}>Here's what's happening today.</p></div>
          <button style={{ padding: '12px 24px', background: colors.primary, border: 'none', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={18} /> New Appointment</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: `${colors.primary}10`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><stat.icon size={24} color={colors.primary} /></div>
                <div style={{ padding: '4px 10px', background: `${colors.success}15`, borderRadius: '20px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: colors.success }}>{stat.change}</div>
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '32px' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: colors.text, marginBottom: '24px' }}>Today's Schedule</h2>
          <div style={{ border: `1px solid ${colors.accent}`, borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: colors.surface }}>{['Time', 'Patient', 'Service', 'Doctor', 'Status'].map((h, i) => (<th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase' }}>{h}</th>))}</tr></thead>
              <tbody>
                {appointments.map((apt, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${colors.accent}` }}>
                    <td style={{ padding: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.text }}>{apt.time}</td>
                    <td style={{ padding: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.text }}>{apt.patient}</td>
                    <td style={{ padding: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>{apt.service}</td>
                    <td style={{ padding: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: colors.textLight }}>{apt.doctor}</td>
                    <td style={{ padding: '16px' }}><span style={{ padding: '4px 10px', background: apt.status === 'confirmed' ? `${colors.success}15` : `${colors.primary}15`, borderRadius: '20px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, color: apt.status === 'confirmed' ? colors.success : colors.primary, textTransform: 'capitalize' }}>{apt.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setCurrentPage }: PageProps) => (
  <footer style={{ background: colors.text, padding: '80px 24px 40px' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={24} color="white" /></div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: 'white' }}>Elite Dental</div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>Premium dental care you can trust.</p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Quick Links</h4>
          {['Home', 'About', 'Services', 'Doctors', 'Contact'].map((link) => (<div key={link} onClick={() => setCurrentPage(link.toLowerCase())} style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', cursor: 'pointer' }}>{link}</div>))}
        </div>
        <div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Services</h4>
          {['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Implants', 'Emergency Care'].map((service) => (<div key={service} onClick={() => setCurrentPage('services')} style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', cursor: 'pointer' }}>{service}</div>))}
        </div>
        <div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Contact</h4>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}><MapPin size={18} color={colors.secondary} style={{ marginTop: '2px' }} /><span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>4750 Jog Road<br />Lake Worth, FL 33467</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Phone size={18} color={colors.secondary} /><span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>(561) 432-1718</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Mail size={18} color={colors.secondary} /><span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>elite-dental@hotmail.com</span></div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>© 2025 Elite Dental. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '24px' }}>{['Privacy Policy', 'Terms of Service'].map((link) => (<span key={link} style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{link}</span>))}</div>
      </div>
    </div>
  </footer>
);

export default function EliteDentalApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('patient');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'services': return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'doctors': return <DoctorsPage setCurrentPage={setCurrentPage} />;
      case 'booking': return <BookingPage setCurrentPage={setCurrentPage} />;
      case 'contact': return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'login': return <LoginPage setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />;
      case 'portal': return <PatientPortal setCurrentPage={setCurrentPage} />;
      case 'admin': return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', background: colors.background, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; }
        input, select, textarea, button { outline: none; }
        input:focus, select:focus, textarea:focus { border-color: ${colors.primary} !important; }
        ::placeholder { color: ${colors.textMuted}; }
      `}</style>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} userRole={userRole} setIsLoggedIn={setIsLoggedIn} />
      {renderPage()}
      {!['login', 'portal', 'admin', 'booking'].includes(currentPage) && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
}
