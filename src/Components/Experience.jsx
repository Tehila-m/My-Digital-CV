import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export default function Experience({ user, language, t }) {
  const experiences = user?.experience || [];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.experienceTitle}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Content card */}
                  <div className="w-full">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {exp.position}
                          </h3>
                          <p className="text-lg text-teal-600 font-semibold mb-2">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            {exp.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{exp.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.start_date} - {exp.end_date || t.present}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-gray-600 mb-4">{exp.description}</p>
                      )}

                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {experiences.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>{t.noExperience}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}