import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Skills({ user, language, t }) {
  const skills = user?.skills || [];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.skillsTitle}
            </h2>
          </div>

          <div className="grid gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300">
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h3 className="text-lg font-bold text-teal-400 min-w-fit">
                      {skillGroup.category}
                    </h3>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-gray-300 text-sm"
                      >
                        {skill}{skillIndex < skillGroup.items.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {skills.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>{t.noSkills}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}