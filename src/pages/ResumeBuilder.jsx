import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Globe, Plus, Trash2 } from 'lucide-react';

const placeholderData = {
  name: 'BENJAMIN GARCIA',
  role: 'IT Intern | Technology Enthusiast | Problem Solver',
  phone: '+1 555 555 5555',
  email: 'help@example.com',
  linkedin: 'linkedin.com/in/benjamin',
  location: 'Phoenix, Arizona',
  summary: 'As an aspiring IT professional, my goal is to leverage my skills in Java, Python, and cybersecurity to contribute effectively in a technology-driven environment. My experience as a team leader positions me well to make a meaningful impact.',
  skills: 'Java, Python, SQL, Cybersecurity Fundamentals, Data Analysis, Project Management',
};

const ResumeBuilder = () => {
  const [data, setData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    linkedin: '',
    location: '',
    summary: '',
    experience: [],
    education: [],
    skills: '',
    achievements: [],
    customSections: []
  });

  const [settings, setSettings] = useState({
    template: 'modern',
    font: 'Times New Roman, serif',
    color: '#111111'
  });

  const handleBasicChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleSettingsChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });

  // Array Handlers
  const handleArrayAdd = (field, emptyObj) => {
    setData({ ...data, [field]: [...data[field], { id: Date.now(), ...emptyObj }] });
  };
  const handleArrayRemove = (field, id) => {
    setData({ ...data, [field]: data[field].filter(item => item.id !== id) });
  };
  const handleArrayChange = (field, id, key, value) => {
    setData({
      ...data,
      [field]: data[field].map(item => item.id === id ? { ...item, [key]: value } : item)
    });
  };

  const handlePrint = () => window.print();

  const preview = {
    name: data.name || placeholderData.name,
    role: data.role || placeholderData.role,
    phone: data.phone || placeholderData.phone,
    email: data.email || placeholderData.email,
    linkedin: data.linkedin || placeholderData.linkedin,
    location: data.location || placeholderData.location,
    summary: data.summary || placeholderData.summary,
    skills: data.skills || placeholderData.skills,
    experience: data.experience,
    education: data.education,
    achievements: data.achievements,
    customSections: data.customSections
  };

  return (
    <div className="resume-builder-layout">
      {/* LEFT SIDE: FORM */}
      <div className="form-section">
        <h2>Resume Details</h2>
        <p className="form-subtitle">Customize your resume data, fonts, and colors.</p>
        
        {/* DESIGN SETTINGS */}
        <div className="settings-panel">
          <div>
            <label>Template</label>
            <select name="template" value={settings.template} onChange={handleSettingsChange} className="form-input">
              <option value="modern">Modern ATS (Left Aligned)</option>
              <option value="centered">Classic ATS (Centered)</option>
            </select>
          </div>
          <div>
            <label>Font Style</label>
            <select name="font" value={settings.font} onChange={handleSettingsChange} className="form-input">
              <option value="Times New Roman, serif">Serif (Times New Roman)</option>
              <option value="Georgia, serif">Serif (Georgia)</option>
              <option value="Arial, sans-serif">Sans-Serif (Arial)</option>
              <option value="Helvetica, sans-serif">Sans-Serif (Helvetica)</option>
              <option value="Inter, sans-serif">Sans-Serif (Inter)</option>
            </select>
          </div>
          <div>
            <label>Accent Color</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="color" name="color" value={settings.color} onChange={handleSettingsChange} style={{ width: '40px', padding: '0', height: '38px', cursor: 'pointer', border: 'none', background: 'none' }} />
              <input type="text" name="color" value={settings.color} onChange={handleSettingsChange} className="form-input" style={{ flex: 1 }} />
            </div>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="form-group-grid">
          <input type="text" name="name" placeholder={placeholderData.name} value={data.name} onChange={handleBasicChange} className="form-input" />
          <input type="text" name="role" placeholder={placeholderData.role} value={data.role} onChange={handleBasicChange} className="form-input" />
          <input type="email" name="email" placeholder={placeholderData.email} value={data.email} onChange={handleBasicChange} className="form-input" />
          <input type="text" name="phone" placeholder={placeholderData.phone} value={data.phone} onChange={handleBasicChange} className="form-input" />
          <input type="text" name="location" placeholder={placeholderData.location} value={data.location} onChange={handleBasicChange} className="form-input" />
          <input type="text" name="linkedin" placeholder={placeholderData.linkedin} value={data.linkedin} onChange={handleBasicChange} className="form-input" />
        </div>

        <h3>Professional Summary</h3>
        <textarea name="summary" placeholder={placeholderData.summary} value={data.summary} onChange={handleBasicChange} className="form-textarea" />

        <h3>Skills (Comma separated)</h3>
        <textarea name="skills" placeholder={placeholderData.skills} value={data.skills} onChange={handleBasicChange} className="form-textarea" style={{minHeight: '60px'}} />

        {/* EXPERIENCE */}
        <div className="array-section">
          <div className="array-header">
            <h3>Experience</h3>
            <button className="add-btn" onClick={() => handleArrayAdd('experience', { title: '', company: '', date: '', location: '', desc: '' })}><Plus size={16}/> Add</button>
          </div>
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="array-item">
              <div className="array-item-header">
                <span>Job #{idx + 1}</span>
                <button onClick={() => handleArrayRemove('experience', exp.id)} className="remove-btn"><Trash2 size={14}/></button>
              </div>
              <div className="form-group-grid">
                <input type="text" placeholder="Job Title" value={exp.title} onChange={e => handleArrayChange('experience', exp.id, 'title', e.target.value)} className="form-input" />
                <input type="text" placeholder="Company" value={exp.company} onChange={e => handleArrayChange('experience', exp.id, 'company', e.target.value)} className="form-input" />
                <input type="text" placeholder="Date (e.g. 2020 - 2023)" value={exp.date} onChange={e => handleArrayChange('experience', exp.id, 'date', e.target.value)} className="form-input" />
                <input type="text" placeholder="Location" value={exp.location} onChange={e => handleArrayChange('experience', exp.id, 'location', e.target.value)} className="form-input" />
                <textarea placeholder="- Bullet point 1&#10;- Bullet point 2" value={exp.desc} onChange={e => handleArrayChange('experience', exp.id, 'desc', e.target.value)} className="form-textarea" style={{ gridColumn: 'span 2' }} />
              </div>
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <div className="array-section">
          <div className="array-header">
            <h3>Education</h3>
            <button className="add-btn" onClick={() => handleArrayAdd('education', { degree: '', school: '', date: '', location: '' })}><Plus size={16}/> Add</button>
          </div>
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="array-item">
              <div className="array-item-header">
                <span>Degree #{idx + 1}</span>
                <button onClick={() => handleArrayRemove('education', edu.id)} className="remove-btn"><Trash2 size={14}/></button>
              </div>
              <div className="form-group-grid">
                <input type="text" placeholder="Degree / Major" value={edu.degree} onChange={e => handleArrayChange('education', edu.id, 'degree', e.target.value)} className="form-input" />
                <input type="text" placeholder="School / University" value={edu.school} onChange={e => handleArrayChange('education', edu.id, 'school', e.target.value)} className="form-input" />
                <input type="text" placeholder="Date" value={edu.date} onChange={e => handleArrayChange('education', edu.id, 'date', e.target.value)} className="form-input" />
                <input type="text" placeholder="Location" value={edu.location} onChange={e => handleArrayChange('education', edu.id, 'location', e.target.value)} className="form-input" />
              </div>
            </div>
          ))}
        </div>

        {/* ACHIEVEMENTS */}
        <div className="array-section">
          <div className="array-header">
            <h3>Key Achievements</h3>
            <button className="add-btn" onClick={() => handleArrayAdd('achievements', { title: '', desc: '' })}><Plus size={16}/> Add</button>
          </div>
          {data.achievements.map((ach, idx) => (
            <div key={ach.id} className="array-item">
              <div className="array-item-header">
                <span>Achievement #{idx + 1}</span>
                <button onClick={() => handleArrayRemove('achievements', ach.id)} className="remove-btn"><Trash2 size={14}/></button>
              </div>
              <div className="form-group-grid">
                <input type="text" placeholder="Title (e.g. Creative Problem-Solving)" value={ach.title} onChange={e => handleArrayChange('achievements', ach.id, 'title', e.target.value)} className="form-input" style={{ gridColumn: 'span 2' }} />
                <textarea placeholder="Description" value={ach.desc} onChange={e => handleArrayChange('achievements', ach.id, 'desc', e.target.value)} className="form-textarea" style={{ gridColumn: 'span 2', minHeight: '60px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOM SECTIONS */}
        <div className="array-section" style={{ marginBottom: '40px' }}>
          <div className="array-header">
            <h3>Custom Sections</h3>
            <button className="add-btn" onClick={() => handleArrayAdd('customSections', { heading: '', content: '' })}><Plus size={16}/> Add Custom Section</button>
          </div>
          {data.customSections.map((sec, idx) => (
            <div key={sec.id} className="array-item">
              <div className="array-item-header">
                <span>Custom Section #{idx + 1}</span>
                <button onClick={() => handleArrayRemove('customSections', sec.id)} className="remove-btn"><Trash2 size={14}/></button>
              </div>
              <div className="form-group-grid">
                <input type="text" placeholder="Heading (e.g. Certifications, Volunteering)" value={sec.heading} onChange={e => handleArrayChange('customSections', sec.id, 'heading', e.target.value)} className="form-input" style={{ gridColumn: 'span 2' }} />
                <textarea placeholder="Details / Content" value={sec.content} onChange={e => handleArrayChange('customSections', sec.id, 'content', e.target.value)} className="form-textarea" style={{ gridColumn: 'span 2', minHeight: '80px' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* RIGHT SIDE: A4 PREVIEW */}
      <div className="preview-section">
        <div 
          className={`resume-paper template-${settings.template}`} 
          id="resume-preview" 
          style={{ 
            fontFamily: settings.font,
            '--accent-color': settings.color 
          }}
        >
          
          {settings.template === 'modern' ? (
            /* MODERN TEMPLATE (Left Aligned) */
            <>
              <div className="resume-header">
                <h1 className="resume-name" style={{ color: settings.color }}>{preview.name}</h1>
                <h2 className="resume-role">{preview.role}</h2>
                <div className="resume-contact">
                  {preview.phone && <span><Phone size={12} color={settings.color}/> {preview.phone}</span>}
                  {preview.email && <span><Mail size={12} color={settings.color}/> {preview.email}</span>}
                  {preview.linkedin && <span><Globe size={12} color={settings.color}/> {preview.linkedin}</span>}
                  {preview.location && <span><MapPin size={12} color={settings.color}/> {preview.location}</span>}
                </div>
              </div>

              {preview.summary && (
                <div className="resume-section">
                  <p className="resume-summary">{preview.summary}</p>
                </div>
              )}

              {preview.experience.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title" style={{ borderColor: settings.color, color: settings.color }}>EXPERIENCE</h3>
                  <div className="section-content">
                    {preview.experience.map(exp => (
                      <div key={exp.id} className="experience-item">
                        <h4 className="item-title">{exp.title}</h4>
                        <div className="item-subtitle">{exp.company}</div>
                        <div className="item-meta">
                          {exp.date && <span><Calendar size={10} color={settings.color}/> {exp.date}</span>}
                          {exp.location && <span><MapPin size={10} color={settings.color}/> {exp.location}</span>}
                        </div>
                        <div className="item-desc">
                          {exp.desc.split('\n').map((line, i) => (
                            line.startsWith('- ') ? <li key={i}>{line.substring(2)}</li> : <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.education.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title" style={{ borderColor: settings.color, color: settings.color }}>EDUCATION</h3>
                  <div className="section-content">
                    {preview.education.map(edu => (
                      <div key={edu.id} className="experience-item">
                        <h4 className="item-title">{edu.degree}</h4>
                        <div className="item-subtitle">{edu.school}</div>
                        <div className="item-meta">
                          {edu.date && <span><Calendar size={10} color={settings.color}/> {edu.date}</span>}
                          {edu.location && <span><MapPin size={10} color={settings.color}/> {edu.location}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.achievements.length > 0 && (
                <div className="resume-section">
                  <h3 className="section-title" style={{ borderColor: settings.color, color: settings.color }}>KEY ACHIEVEMENTS</h3>
                  <div className="achievements-grid">
                    {preview.achievements.map(ach => (
                      <div key={ach.id} className="achievement-item">
                        <div className="ach-icon"><Award size={16} color={settings.color}/></div>
                        <div className="ach-text">
                          <h4 style={{ color: settings.color }}>{ach.title}</h4>
                          <p>{ach.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.skills && (
                <div className="resume-section">
                  <h3 className="section-title" style={{ borderColor: settings.color, color: settings.color }}>SKILLS</h3>
                  <div className="skills-container">
                    {preview.skills.split(',').map((skill, i) => (
                      <span key={i} className="skill-badge">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOM SECTIONS RENDER */}
              {preview.customSections.map(sec => (
                sec.heading && (
                  <div key={sec.id} className="resume-section">
                    <h3 className="section-title" style={{ borderColor: settings.color, color: settings.color }}>{sec.heading.toUpperCase()}</h3>
                    <div className="item-desc">
                      {sec.content.split('\n').map((line, i) => (
                        line.startsWith('- ') ? <li key={i}>{line.substring(2)}</li> : <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </>
          ) : (
            /* CENTERED TEMPLATE (Classic ATS) */
            <>
              <div className="resume-header centered-header">
                <h1 className="resume-name" style={{ color: settings.color }}>{preview.name}</h1>
                <h2 className="resume-role">{preview.role}</h2>
                <div className="resume-contact centered-contact">
                  {preview.email && <span>{preview.email}</span>}
                  {preview.phone && <span style={{ color: settings.color }}>•</span>}
                  {preview.phone && <span>{preview.phone}</span>}
                  {preview.linkedin && <span style={{ color: settings.color }}>•</span>}
                  {preview.linkedin && <span>{preview.linkedin}</span>}
                  {preview.location && <span style={{ color: settings.color }}>•</span>}
                  {preview.location && <span>{preview.location}</span>}
                </div>
              </div>

              {preview.summary && (
                <div className="resume-section centered-section">
                  <h3 className="section-title centered-title" style={{ borderColor: settings.color, color: settings.color }}>Summary</h3>
                  <p className="resume-summary">{preview.summary}</p>
                </div>
              )}

              {preview.experience.length > 0 && (
                <div className="resume-section centered-section">
                  <h3 className="section-title centered-title" style={{ borderColor: settings.color, color: settings.color }}>Experience</h3>
                  <div className="section-content">
                    {preview.experience.map(exp => (
                      <div key={exp.id} className="experience-item split-item">
                        <div className="split-row">
                          <div className="split-left">
                            <h4 className="item-subtitle">{exp.company}</h4>
                            <h4 className="item-title">{exp.title}</h4>
                          </div>
                          <div className="split-right">
                            <div className="item-meta">{exp.location}</div>
                            <div className="item-meta">{exp.date}</div>
                          </div>
                        </div>
                        <div className="item-desc">
                          {exp.desc.split('\n').map((line, i) => (
                            line.startsWith('- ') ? <li key={i}>{line.substring(2)}</li> : <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.education.length > 0 && (
                <div className="resume-section centered-section">
                  <h3 className="section-title centered-title" style={{ borderColor: settings.color, color: settings.color }}>Education</h3>
                  <div className="section-content">
                    {preview.education.map(edu => (
                      <div key={edu.id} className="experience-item split-item">
                        <div className="split-row">
                          <div className="split-left">
                            <h4 className="item-subtitle">{edu.school}</h4>
                            <h4 className="item-title">{edu.degree}</h4>
                          </div>
                          <div className="split-right">
                            <div className="item-meta">{edu.location}</div>
                            <div className="item-meta">{edu.date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.achievements.length > 0 && (
                <div className="resume-section centered-section">
                  <h3 className="section-title centered-title" style={{ borderColor: settings.color, color: settings.color }}>Strengths & Achievements</h3>
                  <div className="achievements-grid">
                    {preview.achievements.map(ach => (
                      <div key={ach.id} className="achievement-item">
                        <div className="ach-icon"><Award size={16} color={settings.color}/></div>
                        <div className="ach-text">
                          <h4 style={{ color: settings.color }}>{ach.title}</h4>
                          <p>{ach.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.skills && (
                <div className="resume-section centered-section">
                  <h3 className="section-title centered-title" style={{ borderColor: settings.color, color: settings.color }}>Skills</h3>
                  <div className="skills-centered">
                    {preview.skills.split(',').map((s, i, arr) => (
                      <span key={i}>
                        {s.trim()}
                        {i < arr.length - 1 && <span style={{ color: settings.color, margin: '0 8px' }}>•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOM SECTIONS RENDER */}
              {preview.customSections.map(sec => (
                sec.heading && (
                  <div key={sec.id} className="resume-section centered-section">
                    <h3 className="section-title centered-title" style={{ borderColor: settings.color, color: settings.color }}>{sec.heading}</h3>
                    <div className="item-desc" style={{ textAlign: 'center' }}>
                      {sec.content.split('\n').map((line, i) => (
                        line.startsWith('- ') ? (
                          <li style={{ textAlign: 'left', display: 'inline-block', width: '100%' }} key={i}>{line.substring(2)}</li>
                        ) : <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                )
              ))}

            </>
          )}
          
        </div>
        
        <div className="print-action">
          <button className="primary-btn" onClick={handlePrint}>Download / Print PDF</button>
        </div>
      </div>

      <style>{`
        .resume-builder-layout {
          display: grid;
          grid-template-columns: 450px 1fr;
          gap: 2rem;
          height: calc(100vh - 150px);
        }

        .form-section {
          background: var(--surface-color);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          overflow-y: auto;
        }

        .form-subtitle {
          color: var(--muted-color);
          margin-bottom: 24px;
          font-size: 0.9rem;
        }

        .settings-panel {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
          background: #f1f5f9;
          padding: 16px;
          border-radius: 8px;
        }

        .settings-panel label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .form-group-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .form-group-grid input:first-child, .form-group-grid input:nth-child(2) {
          grid-column: span 2;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-family: var(--font-family);
          font-size: 0.9rem;
          box-sizing: border-box;
          background: #fff;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: #94a3b8;
          opacity: 0.6;
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
          margin-bottom: 24px;
          margin-top: 8px;
        }

        .array-section {
          margin-bottom: 24px;
        }

        .array-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .array-header h3 {
          margin: 0;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .array-item {
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .array-item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
        }

        .preview-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          padding-bottom: 40px;
        }

        .resume-paper {
          background: white;
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          box-sizing: border-box;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          color: #333;
          transition: all 0.3s;
        }

        /* RESUME STYLES */
        
        .template-modern .resume-header { text-align: left; margin-bottom: 20px; }
        .template-modern .resume-name { font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; }
        .template-modern .resume-role { font-size: 18px; font-weight: 600; color: #555; margin: 0 0 12px 0; }
        .template-modern .resume-contact { display: flex; flex-wrap: wrap; gap: 16px; font-family: 'Arial', sans-serif; font-size: 11px; color: #444; }
        .template-modern .resume-contact span { display: flex; align-items: center; gap: 4px; }
        
        .template-modern .section-title {
          font-family: 'Arial', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 2px solid;
          padding-bottom: 4px;
          margin: 0 0 16px 0;
        }
        
        .template-modern .item-meta { display: flex; gap: 16px; font-family: 'Arial', sans-serif; font-size: 10px; color: #777; margin-bottom: 8px; }
        .template-modern .item-meta span { display: flex; align-items: center; gap: 4px; }
        .template-modern .skills-container { display: flex; flex-wrap: wrap; gap: 12px; }
        .template-modern .skill-badge { font-family: 'Arial', sans-serif; font-size: 12px; font-weight: 600; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 2px; }

        .template-centered .centered-header { text-align: center; margin-bottom: 20px; }
        .template-centered .resume-name { font-size: 28px; font-weight: 700; text-transform: uppercase; margin: 0 0 4px 0; }
        .template-centered .resume-role { font-family: 'Arial', sans-serif; font-size: 13px; font-weight: 400; color: #444; margin: 0 0 4px 0; }
        .template-centered .centered-contact { justify-content: center; display: flex; flex-wrap: wrap; gap: 8px; font-family: 'Arial', sans-serif; font-size: 11px; color: #444; }
        .template-centered .centered-section { margin-bottom: 16px; }
        
        .template-centered .centered-title {
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          border-top: 1px solid;
          border-bottom: 1px solid;
          padding: 4px 0;
          margin: 0 0 12px 0;
        }
        
        .template-centered .split-item { margin-bottom: 16px; }
        .template-centered .split-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
        .template-centered .split-left { text-align: left; }
        .template-centered .split-right { text-align: right; }
        .template-centered .item-title { font-family: 'Arial', sans-serif; font-weight: 400; font-size: 12px; margin: 2px 0 0 0; }
        .template-centered .item-subtitle { font-family: 'Arial', sans-serif; font-weight: 700; font-size: 12px; color: #333; margin: 0; }
        .template-centered .item-meta { font-family: 'Arial', sans-serif; font-size: 12px; color: #333; margin-bottom: 2px; }
        .template-centered .skills-centered { font-family: 'Arial', sans-serif; font-size: 12px; text-align: center; line-height: 1.6; }

        .resume-section { margin-bottom: 20px; }
        .resume-summary { font-family: 'Arial', sans-serif; font-size: 12px; line-height: 1.5; color: #333; text-align: justify; }
        .item-desc { font-family: 'Arial', sans-serif; font-size: 11px; line-height: 1.5; color: #333; }
        .item-desc p { margin: 0 0 4px 0; }
        .item-desc li { margin-left: 16px; margin-bottom: 2px; }
        
        .achievements-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .achievement-item { display: flex; gap: 12px; }
        .ach-icon { padding-top: 2px; }
        .ach-text h4 { font-family: 'Arial', sans-serif; font-size: 12px; margin: 0 0 4px 0; }
        .ach-text p { font-family: 'Arial', sans-serif; font-size: 11px; margin: 0; color: #444; line-height: 1.4; }

        .print-action { margin-top: 24px; }

        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; left: 0; top: 0; box-shadow: none; width: 100%; margin: 0; padding: 0; }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
