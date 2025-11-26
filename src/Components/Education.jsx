import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function Education({ user, language, t }) {
  const education = user?.education || [];

  return (
    <section className="py-24 bg-white">
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
              {t.educationTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 relative overflow-hidden">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl shadow-lg">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-lg text-teal-600 font-semibold mb-2">
                            {edu.field}
                          </p>
                        )}
                        <p className="text-gray-700 font-medium mb-2">
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.start_date} - {edu.end_date || t.present}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      {edu.gpa && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4 text-teal-500" />
                          <span className="font-medium">{t.gpa}:</span>
                          <span>{edu.gpa}</span>
                        </div>
                      )}
                      {edu.honors && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <Award className="w-4 h-4 text-teal-500 mt-1" />
                          <div>
                            <span className="font-medium">{t.honors}:</span>
                            <p className="text-gray-600">{edu.honors}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {education.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>{t.noEducation}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}