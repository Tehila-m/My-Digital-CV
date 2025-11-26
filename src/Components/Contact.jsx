import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function Contact({ user, language, t }) {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mx-auto" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.contactTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {user?.email && (
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className={language === 'he' ? 'text-right' : 'text-left'}>
                  <p className="text-sm text-gray-400">{t.email}</p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
              </a>
            )}

            {user?.phone && (
              <a
                href={`tel:${user.phone}`}
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className={language === 'he' ? 'text-right' : 'text-left'}>
                  <p className="text-sm text-gray-400">{t.phone}</p>
                  <p className="text-white font-medium">{user.phone}</p>
                </div>
              </a>
            )}

            {user?.location && (
              <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:col-span-2">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className={language === 'he' ? 'text-right' : 'text-left'}>
                  <p className="text-sm text-gray-400">{t.location}</p>
                  <p className="text-white font-medium">{user.location}</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            {user?.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:border-teal-400/50 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            )}
            {user?.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:border-teal-400/50 transition-all duration-300"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
            )}
            {user?.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:border-teal-400/50 transition-all duration-300"
              >
                <Globe className="w-6 h-6 text-white" />
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {user?.full_name || 'Your Name'}. {t.allRights}.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}