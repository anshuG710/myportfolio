import { 
  Home, 
  FolderKanban, 
  Github, 
  Instagram, 
  Zap, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  Code2,
  Layout,
  Database,
  BrainCircuit
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Skills', href: '#skills', icon: Zap },
  { name: 'About', href: '#about', icon: FileText },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/anshug710', icon: Github },
  { name: 'Instagram', href: 'https://instagram.com/', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/anshu-gupta', icon: Linkedin },
];

export const ROLES = [
  "BIM Student & Developer",
  "UI/UX Designer",
  "AI Enthusiast",
  "Flutter & React Dev"
];

export const TECH_STACK = [
  "React", "Flutter", "Node.js", "MongoDB", "Tailwind", "Python", "Figma", 
  "Three.js", "Git", "Express", "AI/ML"
];

export const STATS = [
  { label: 'Age', value: '20' },
  { label: 'Projects built', value: '3+' },
  { label: 'Languages spoken', value: '4' },
  { label: 'Coffee consumed', value: '∞' },
];

export const SKILLS = [
  {
    category: 'Frontend Development',
    icon: Layout,
    items: ['React.js', 'Flutter', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    category: 'Backend & Database',
    icon: Database,
    items: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs']
  },
  {
    category: 'Design & Tools',
    icon: Code2,
    items: ['Figma', 'UI/UX Design', 'Git', 'GitHub', 'VS Code']
  },
  {
    category: 'AI & Emerging Tech',
    icon: BrainCircuit,
    items: ['AI Prompt Engineering', 'Python basics', 'AI tool integration']
  }
];

export const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'imgupta.anshu@gmail.com', href: 'mailto:imgupta.anshu@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977-9824850184', href: 'tel:+9779824850184' },
  { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal', href: '#' },
];

export const PROJECTS = [
  {
    _id: "local-0",
    title: "BIM Quizer",
    description: "An AI-powered quiz application built for TU (Tribhuvan University) BIM students. Features dynamic question generation, real-time scoring, and performance analytics.",
    tags: ["AI", "React", "Node.js", "MongoDB"],
    status: "In Development" as const,
    github: "https://github.com/anshug710",
    live: "",
    featured: true,
  },
  {
    _id: "local-1",
    title: "Mandala Tea Shop",
    description: "A beautiful, fully responsive website designed and built for a local tea shop in Kathmandu. Features menu showcase, ambiance gallery, and contact integration.",
    tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
    status: "Live" as const,
    github: "https://github.com/anshug710/mandala",
    live: "https://anshug710.github.io/mandala/",
    featured: true,
  }
];
