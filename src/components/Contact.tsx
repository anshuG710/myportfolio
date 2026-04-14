import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants/data';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    console.log('Sending message:', formState);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (data.success) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Server returned error:', data.message);
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-khaki tracking-[0.3em] uppercase text-xs font-bold mb-4 block">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-mint text-lg mb-12">
              Open to freelance, collaborations & coffee chats ☕
            </p>

            <div className="space-y-8">
              {CONTACT_INFO.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-khaki/10 flex items-center justify-center text-khaki group-hover:bg-khaki group-hover:text-slate-green-deep transition-all duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <span className="block text-xs text-mint/60 uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="text-mint-light font-medium group-hover:text-khaki transition-colors">{item.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-8 md:p-10 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-khaki uppercase tracking-widest ml-1">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-slate-green-deep/80 border border-khaki/20 rounded-xl px-4 py-3 text-mint-light placeholder:text-mint/30 focus:outline-none focus:border-khaki transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-khaki uppercase tracking-widest ml-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-slate-green-deep/80 border border-khaki/20 rounded-xl px-4 py-3 text-mint-light placeholder:text-mint/30 focus:outline-none focus:border-khaki transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-khaki uppercase tracking-widest ml-1">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="What's this about?"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-slate-green-deep/80 border border-khaki/20 rounded-xl px-4 py-3 text-mint-light placeholder:text-mint/30 focus:outline-none focus:border-khaki transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-khaki uppercase tracking-widest ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-slate-green-deep/80 border border-khaki/20 rounded-xl px-4 py-3 text-mint-light placeholder:text-mint/30 focus:outline-none focus:border-khaki transition-all resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                className={cn(
                  "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300",
                  status === 'success' 
                    ? "bg-green-500 text-white" 
                    : "bg-khaki text-slate-green-deep hover:shadow-[0_0_30px_rgba(242,183,89,0.4)]"
                )}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
              
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm font-medium">
                  {errorMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
