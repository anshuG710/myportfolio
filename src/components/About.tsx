import { motion } from 'motion/react';
import { STATS } from '../constants/data';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-green-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-khaki tracking-[0.3em] uppercase text-xs font-bold mb-4 block">
              ABOUT ME
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
              Who Am I?
            </h2>
            
            <div className="space-y-6 text-mint text-lg leading-relaxed">
              <p>
                I'm a 20-year-old BIM student at Orchid International College (2024–2028) based in Kathmandu, Nepal. 
                I'm on a mission to blend business intelligence with cutting-edge IT to build smart, scalable solutions.
              </p>
              <p>
                My journey started with a background in Science (Biology), but my heart was always in tech. 
                Now, I'm deeply passionate about AI, UI/UX design, and full-stack development. 
                I spend my days learning Flutter and React while experimenting with the latest AI tools.
              </p>
              <p>
                When I'm not coding, you'll find me following cricket, exploring the latest gadgets, 
                or traveling through the beautiful mountains of Nepal. I speak Maithili, Nepali, Hindi, and English.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              {[
                { icon: '🏔️', text: 'Based in Kathmandu' },
                { icon: '🎓', text: 'Orchid College (2024–28)' },
                { icon: '🗣️', text: '4 Languages Spoken' },
                { icon: '🤖', text: 'AI Tools Every Day' }
              ].map((fact, i) => (
                <div key={i} className="flex items-center gap-3 text-mint-light">
                  <span className="text-2xl">{fact.icon}</span>
                  <span className="text-sm font-medium">{fact.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-2xl text-center group hover:border-khaki/50 transition-all"
              >
                <motion.span 
                  className="block text-5xl font-bold text-khaki mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-mint text-sm uppercase tracking-wider font-medium group-hover:text-mint-light transition-colors">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-24 w-64 h-64 bg-khaki/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-64 h-64 bg-mint/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
