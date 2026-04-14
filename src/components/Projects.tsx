import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'Live' | 'In Development' | 'Archived';
  github: string;
  live: string;
  featured: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-slate-green-deep relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-khaki tracking-[0.3em] uppercase text-xs font-bold mb-4 block"
          >
            PORTFOLIO
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gradient"
          >
            Featured Projects
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            // Skeleton Loading
            [...Array(4)].map((_, i) => (
              <div key={i} className="glass p-8 rounded-2xl h-[300px] animate-pulse">
                <div className="h-6 w-1/3 bg-khaki/10 rounded mb-6" />
                <div className="h-8 w-2/3 bg-khaki/10 rounded mb-4" />
                <div className="h-20 w-full bg-khaki/10 rounded mb-6" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-khaki/10 rounded-full" />
                  <div className="h-6 w-16 bg-khaki/10 rounded-full" />
                </div>
              </div>
            ))
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass p-8 rounded-2xl relative group hover:border-khaki/40 transition-all"
              >
                {project.featured && (
                  <div className="absolute top-6 right-6 text-khaki" data-tooltip="Featured Project">
                    <Star size={20} fill="currentColor" />
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    project.status === 'Live' ? "bg-green-500/20 text-green-400" : "bg-khaki/20 text-khaki"
                  )}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-khaki mb-4 group-hover:text-mint-light transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-mint text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-khaki/10 text-khaki text-[10px] font-medium border border-khaki/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-green-deep text-mint hover:text-khaki hover:bg-slate-green-mid transition-all"
                      data-tooltip="View Source"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-green-deep text-mint hover:text-khaki hover:bg-slate-green-mid transition-all"
                      data-tooltip="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
