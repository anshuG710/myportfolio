import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project';

const router = express.Router();

// Seed data
const initialProjects = [
  {
    title: "BIM Quizer",
    description: "An AI-powered quiz application built for TU (Tribhuvan University) BIM students. Features dynamic question generation, real-time scoring, and performance analytics.",
    tags: ["AI", "React", "Node.js", "MongoDB"],
    status: "In Development",
    github: "https://github.com/anshug710",
    live: "",
    featured: true,
    order: 1
  },
  {
    title: "Mandala Tea Shop",
    description: "A beautiful, fully responsive website designed and built for a local tea shop in Kathmandu. Features menu showcase, ambiance gallery, and contact integration.",
    tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
    status: "Live",
    github: "https://github.com/anshug710/mandala",
    live: "https://anshug710.github.io/mandala/",
    featured: true,
    order: 2
  }
];

router.get('/', async (req, res) => {
  try {
    // Check if MongoDB is connected (readyState 1)
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, serving initial projects.');
      return res.json({ success: true, data: initialProjects.map((p, i) => ({ ...p, _id: `local-${i}` })) });
    }

    let projects = await Project.find().sort({ order: 1 });
    
    // Seed if empty
    if (projects.length === 0) {
      await Project.insertMany(initialProjects);
      projects = await Project.find().sort({ order: 1 });
    }

    res.json({ success: true, data: projects });
  } catch (error: any) {
    // Fallback on error as well
    res.json({ success: true, data: initialProjects.map((p, i) => ({ ...p, _id: `local-${i}` })) });
  }
});

export default router;
