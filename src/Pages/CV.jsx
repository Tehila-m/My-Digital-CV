import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Briefcase, GraduationCap, Sparkles, Code, Mail, Languages } from 'lucide-react';

import Hero from '../Components/Hero';
import About from '../Components/About';
import Experience from '../Components/Experience';
import Education from '../Components/Education';
import Skills from '../Components/Skills';
import Projects from '../Components/Projects';
import Contact from '../Components/Contact';
import { translations, userData as userDataByLanguage } from '../components/cvData';

export default function CV() {
  const [activeSection, setActiveSection] = useState('hero');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

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
  const userData = userDataByLanguage[language];

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
          className={
            ['hero', 'skills', 'contact'].includes(activeSection)
              ? "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
              : "bg-slate-900/10 backdrop-blur-sm border border-slate-900/20 hover:bg-slate-900/20 text-slate-900"
          }
          size="icon"
          title={language === 'he' ? 'English' : 'עברית'}
        >
          <Languages className="w-5 h-5" />
        </Button>
      </div>

      {/* CV Sections */}
      <div id="hero"><Hero user={userData} language={language} t={t} /></div>
      <div id="about"><About user={userData} language={language} t={t} /></div>
      <div id="experience"><Experience user={userData} language={language} t={t} /></div>
      <div id="education"><Education user={userData} language={language} t={t} /></div>
      <div id="skills"><Skills user={userData} language={language} t={t} /></div>
      <div id="projects"><Projects user={userData} language={language} t={t} /></div>
      <div id="contact"><Contact user={userData} language={language} t={t} /></div>
    </div>
  );
}