import { motion } from 'motion/react';
import { SKILLS, TECH_STACK } from '../constants/data';

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-khaki tracking-[0.3em] uppercase text-xs font-bold mb-4 block"
          >
            SKILLS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gradient"
          >
            What I Work With
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {SKILLS.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl hover:border-khaki/40 transition-all group"
            >
              <div className="w-12 h-12 bg-khaki/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-khaki/20 transition-colors">
                <category.icon className="text-khaki" size={24} />
              </div>
              <h3 className="text-mint-light font-bold text-lg mb-6">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map((skill, i) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-mint">{skill}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-green-deep rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 - (i * 5)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-slate-green to-khaki rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee Strip */}
        <div className="relative w-full overflow-hidden py-10 border-y border-khaki/10">
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
            {[...TECH_STACK, ...TECH_STACK].map((skill, i) => (
              <div key={i} className="flex items-center mx-8">
                <span className="text-2xl font-bold text-mint/40 hover:text-khaki transition-colors cursor-default">
                  {skill}
                </span>
                <span className="ml-16 text-khaki font-bold text-xl">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
