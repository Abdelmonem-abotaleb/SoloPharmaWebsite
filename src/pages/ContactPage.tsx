import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us — SoloPharma';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would POST to an API / email service
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'WhatsApp / Phone',
      detail: '+20 100 088 9707',
      sub: 'Available Sun – Thu, 9am – 5pm',
      href: 'https://wa.me/201000889707',
      color: '#25d366',
      bg: 'from-emerald-50 to-green-50',
      border: '#bbf7d0',
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'info@esolopharma.com',
      sub: 'We reply within 24 hours',
      href: 'mailto:info@esolopharma.com',
      color: '#0077b6',
      bg: 'from-sky-50 to-blue-50',
      border: '#bae6fd',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      detail: '4B Bank Misr Buildings',
      sub: 'Khatem el Morsalin, Giza, Egypt',
      href: 'https://www.google.com/maps/place/Solopharma/@30.0045124,31.2022084,21z',
      color: '#e11d48',
      bg: 'from-pink-50 to-rose-50',
      border: '#fecdd3',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      detail: 'Sun – Thu: 9am – 5pm',
      sub: 'Fri & Sat: Closed',
      href: null,
      color: '#d97706',
      bg: 'from-amber-50 to-orange-50',
      border: '#fed7aa',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#022047] via-[#0077b6] to-[#00b4d8] py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <span className="inline-block text-sky-200 font-semibold text-xs uppercase tracking-[4px] mb-4">
            Get In Touch
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-sky-100 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question about our products? We'd love to hear from you — reach out and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-[#f8fbff]">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map(({ icon: Icon, title, detail, sub, href, color, bg, border }) => {
              const card = (
                <div
                  className={`bg-gradient-to-br ${bg} rounded-2xl p-7 border card-hover h-full`}
                  style={{ borderColor: border }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5" style={{ color }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{title}</h3>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{detail}</p>
                  <p className="text-slate-400 text-xs">{sub}</p>
                </div>
              );
              return href ? (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                <div key={title}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Form */}
            <div>
              <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">Send a Message</span>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 tracking-tight">
                We'd Love to Hear From You
              </h2>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="text-[#0077b6] font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/10 transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/10 transition-colors bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/10 transition-colors bg-white"
                    >
                      <option value="">Select a topic…</option>
                      <option value="product">Product Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/10 transition-colors bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold text-base rounded-2xl shadow-lg shadow-sky-300/30 hover:opacity-90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div>
                <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">Find Us</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Visit Our Office
                </h2>
                <p className="text-slate-500 mb-6">
                  4B Bank Misr Buildings, Khatem el Morsalin, Giza, Egypt
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-80 lg:h-96">
                <iframe
                  title="SoloPharma Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91.85847297!2d31.2022084!3d30.0045124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847996b57e86f%3A0x931a4fe78956d2fd!2sSolopharma!5e0!3m2!1sen!2seg!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Solopharma/@30.0045124,31.2022084,21z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0077b6] font-semibold hover:gap-3 transition-all text-sm"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-14 bg-[#f8fbff] border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 mb-4">Looking for our products?</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-sky-300/30 hover:opacity-90 transition-all hover:-translate-y-0.5"
          >
            Browse the Shop →
          </Link>
        </div>
      </section>
    </main>
  );
}
