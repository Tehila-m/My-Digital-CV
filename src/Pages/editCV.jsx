import React, { useEffect, useState } from 'react';
// import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';

export default function EditCV() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    photo_url: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
    //   const userData = await base44.auth.me();
      setUser(userData);
      setFormData({
        title: userData.title || '',
        bio: userData.bio || '',
        photo_url: userData.photo_url || '',
        phone: userData.phone || '',
        location: userData.location || '',
        linkedin: userData.linkedin || '',
        github: userData.github || '',
        website: userData.website || '',
        experience: userData.experience || [],
        education: userData.education || [],
        skills: userData.skills || [],
        projects: userData.projects || []
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
    //   await base44.auth.updateMe(formData);
      window.location.href = createPageUrl('CV');
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        company: '',
        position: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        highlights: []
      }]
    });
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index)
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, experience: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        institution: '',
        degree: '',
        field: '',
        start_date: '',
        end_date: '',
        gpa: '',
        honors: ''
      }]
    });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  const addSkillGroup = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { category: '', items: [] }]
    });
  };

  const removeSkillGroup = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const updateSkillGroup = (index, field, value) => {
    const updated = [...formData.skills];
    if (field === 'items') {
      updated[index].items = value.split(',').map(s => s.trim()).filter(s => s);
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, skills: updated });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, {
        name: '',
        description: '',
        technologies: [],
        link: '',
        image_url: ''
      }]
    });
  };

  const removeProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...formData.projects];
    if (field === 'technologies') {
      updated[index].technologies = value.split(',').map(s => s.trim()).filter(s => s);
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, projects: updated });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('CV')}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">Edit Your CV</h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-teal-500 to-blue-500"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Changes
          </Button>
        </div>

        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={user?.full_name || ''} disabled className="bg-gray-100" />
                <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
              </div>
              <div>
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled className="bg-gray-100" />
                <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
              </div>
              <div>
                <Label>Professional Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <Label>Photo URL</Label>
                <Input
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label>GitHub</Label>
                <Input
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Website</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
            <div>
              <Label>Professional Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Write a brief summary about yourself..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                <Button
                  onClick={() => removeExperience(index)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Tech Corp"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(index, 'location', e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={exp.start_date}
                        onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={exp.end_date}
                        onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Describe your role..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                <Button
                  onClick={() => removeEducation(index)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Start</Label>
                      <Input
                        value={edu.start_date}
                        onChange={(e) => updateEducation(index, 'start_date', e.target.value)}
                        placeholder="2015"
                      />
                    </div>
                    <div>
                      <Label>End</Label>
                      <Input
                        value={edu.end_date}
                        onChange={(e) => updateEducation(index, 'end_date', e.target.value)}
                        placeholder="2019"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                  <div>
                    <Label>Honors (Optional)</Label>
                    <Input
                      value={edu.honors}
                      onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                      placeholder="Summa Cum Laude"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button onClick={addSkillGroup} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Skill Group
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.skills.map((skill, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                <Button
                  onClick={() => removeSkillGroup(index)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <div className="space-y-3">
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={skill.category}
                      onChange={(e) => updateSkillGroup(index, 'category', e.target.value)}
                      placeholder="e.g. Programming Languages"
                    />
                  </div>
                  <div>
                    <Label>Skills (comma separated)</Label>
                    <Input
                      value={skill.items?.join(', ') || ''}
                      onChange={(e) => updateSkillGroup(index, 'items', e.target.value)}
                      placeholder="JavaScript, Python, React, Node.js"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button onClick={addProject} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                <Button
                  onClick={() => removeProject(index)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <Label>Project Link</Label>
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(index, 'link', e.target.value)}
                        placeholder="https://project.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Describe your project..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Technologies (comma separated)</Label>
                    <Input
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <Label>Image URL (Optional)</Label>
                    <Input
                      value={project.image_url}
                      onChange={(e) => updateProject(index, 'image_url', e.target.value)}
                      placeholder="https://example.com/project-image.jpg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-blue-500"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}