import React, { useEffect, useState } from 'react';
import { Button } from '../Components/ui/button';
import { User, Briefcase, GraduationCap, Sparkles, Code, Mail, Languages } from 'lucide-react';

import Hero from '../Components/Hero';
import About from '../Components/About';
import Experience from '../Components/Experience';
import Education from '../Components/Education';
import Skills from '../Components/Skills';
import Projects from '../Components/Projects';
import Contact from '../Components/Contact';

const translations = {
  he: {
    about: 'אודות',
    experience: 'ניסיון',
    education: 'השכלה',
    skills: 'כישורים',
    projects: 'פרויקטים',
    contact: 'צור קשר'
  },
  en: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact'
  }
};

// עדכן את המידע שלך כאן
const userData = {
  full_name: 'Tehila Rosen',
  email: 'tehila40996@gmail.com',
  title: 'Motivate Full Stack Developer',
  phone: '+972-54-854-0996',
  location: 'Jerusalem, Isreal',
  github: 'https://github.com/tehila-m',
  website: 'https://yourwebsite.com',
  bio: 'Hi, I’m Tehila Rosen — a motivate developer with a passion for solving real problems through clean, thoughtful, and efficient solutions. I enjoy diving into complex systems, optimizing performance, and bringing ideas to life through smart, practical development. Alongside my work in software and data-oriented projects, I currently serve in the Israel Fire and Rescue Authority, where I focus on improving operational performance and creating tools that make processes faster, clearer, and more effective. This role has strengthened my ability to stay calm under pressure, think analytically, and deliver results when it matters. I’m driven by curiosity, professionalism, and a genuine love for continuous learning — always looking for the next challenge that will help me grow and make an impact',
  experience: [
    {
      company: 'National Fire And Rescue Authority',
      position: 'Full Stack Developer',
      location: 'Jerusalem, Bat-Yam',
      start_date: 'Jul 2025',
      end_date: 'Present',
      description: 'Designing, building, and maintaining scalable microservices using Node.js, React, SQL, and MongoDB, with a strong focus on high availability, reliability, and clean architecture.',
      highlights: [
        'Implementing real-time distributed systems with RabbitMQ, Redis, and Docker, enabling efficient messaging, caching, and containerized deployments.',
        'Leading the development of authentication flows, validation layers, and robust database integrations, ensuring secure, consistent, and fault-tolerant data pipelines.',
        'Contributing across the full development lifecycle—from system design and modeling to deployment—within agile teams using GitHub, CI/CD workflows, and internal tools such as Toffy Forms.',
        'Applying strong knowledge of OOP, data modeling, workflow orchestration, and system scalability to deliver production-ready services optimized for performance and maintainability.',
        'Gaining hands-on exposure to cloud-native patterns, microservice observability, and modern API design, with growing experience in integrating AI-powered components into existing systems.',
        'References available upon request.'
      ]
    }
  ],
  education: [
    {
      institution: 'שם המוסד האקדמי',
      degree: 'תואר ראשון במדעי המחשב',
      field: 'מדעי המחשב',
      start_date: '2015',
      end_date: '2019',
      gpa: '95',
      honors: 'בהצטיינות'
    }
  ],
  skills: [
    {
      category: 'Programming Languages',
      items: ['Java', 'C#', 'C++', 'Python', 'JavaScript', 'SQL']
    },
    {
      category: 'Web Development',
      items: ['HTML', 'CSS', 'React', 'Redux']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['Node.js', 'Express', 'Fastify', 'ASP.NET Core', 'Entity Framework']
    },
    {
      category: 'Databases',
      items: ['MySQL', 'SQL Server', 'MongoDB']
    },
    {
      category: 'Message Brokers & Caching',
      items: ['RabbitMQ', 'Redis']
    },
    {
      category: 'Tools & Practices',
      items: ['OOP', 'REST APIs', 'Git', 'Design Patterns', 'Docker']
    },
    {
      category: 'Other',
      items: ['Linux', 'WinForms', 'Workflow Automation']
    }
  ],
  projects: [
    {
      name: 'Tetris Game with OpenCV',
      description: 'Developed a visual Tetris game with OpenCV and NumPy, applying real-time data processing, arrays, and matrices to simulate stream processing and decision logic.',
      technologies: ['Python', 'OpenCV', 'NumPy'],
      link: 'https://github.com/Tehila-m/python-openCV-tetris-game',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
    },
    {
      name: 'Event Booking Platform',
      description: 'An event management platform where users can browse upcoming company events, register, cancel, and receive timely notifications. Designed with scalability in mind, combining SQL, MongoDB, Redis, and RabbitMQ for robust performance.',
      technologies: ['React', 'Node.js', 'Redis', 'RabbitMQ', 'Fastify', 'SQL', 'MongoDB'],
      link: 'https://github.com/Tehila-m/Event_Booking',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
    }, 
    {
      name: 'Smart time management system for independent education:',
      description: 'The system was developed for the Independent Education to manage and plan school timetables, in accordance with student and teacher profiles. The project is fully dynamic data management. On the server side, RESTful API and MERN Stack (MongoDB, Express.js, React.js, Node.js) based models were developed in Mongoose with a detailed permissions system that distinguishes between management, supervisors, and teachers. On the client side, an advanced React interface was built that includes status management, smart forms, and real-time updates. The system is characterized by modular architecture, basic information security, and fully responsive design. ',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      link: 'https://github.com/Tehila-m/Smart-Time-Management-System',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
    }
  ]
};

export default function CV() {
  const [activeSection, setActiveSection] = useState('hero');
  const [language, setLanguage] = useState('he');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getButtonClass = (section) => {
    const isActive = activeSection === section;
    const isDarkBg = ['hero', 'skills', 'contact'].includes(activeSection);
    
    if (isActive) {
      return "bg-teal-500 hover:bg-teal-600 text-white shadow-lg";
    }
    
    if (isDarkBg) {
      return "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white";
    }
    
    return "bg-slate-900/10 backdrop-blur-sm border border-slate-900/20 hover:bg-slate-900/20 text-slate-900";
  };

  const t = translations[language];

  return (
    <div className="relative">
      {/* Navigation Menu - Fixed Right Side */}
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 flex flex-col gap-2">
        <Button
          onClick={() => scrollToSection('about')}
          className={getButtonClass('about')}
          size="icon"
          title={t.about}
        >
          <User className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => scrollToSection('experience')}
          className={getButtonClass('experience')}
          size="icon"
          title={t.experience}
        >
          <Briefcase className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => scrollToSection('education')}
          className={getButtonClass('education')}
          size="icon"
          title={t.education}
        >
          <GraduationCap className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => scrollToSection('skills')}
          className={getButtonClass('skills')}
          size="icon"
          title={t.skills}
        >
          <Sparkles className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => scrollToSection('projects')}
          className={getButtonClass('projects')}
          size="icon"
          title={t.projects}
        >
          <Code className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => scrollToSection('contact')}
          className={getButtonClass('contact')}
          size="icon"
          title={t.contact}
        >
          <Mail className="w-5 h-5" />
        </Button>

        <div className="my-2 h-px bg-white/20" />

        <Button
          onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
          size="icon"
          title={language === 'he' ? 'English' : 'עברית'}
        >
          <Languages className="w-5 h-5" />
        </Button>
      </div>

      {/* CV Sections */}
      <div id="hero"><Hero user={userData} /></div>
      <div id="about"><About user={userData} /></div>
      <div id="experience"><Experience user={userData} /></div>
      <div id="education"><Education user={userData} /></div>
      <div id="skills"><Skills user={userData} /></div>
      <div id="projects"><Projects user={userData} /></div>
      <div id="contact"><Contact user={userData} /></div>
    </div>
  );
}