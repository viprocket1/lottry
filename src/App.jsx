import React, { useState } from 'react';

// --- INITIAL STATE (Placeholder Data) ---
const INITIAL_DATA = {
  header: {
    name: "JOHN A. HARVARD",
    address: "Cambridge, MA",
    phone: "(555) 123-4567",
    email: "john@college.edu",
    linkedin: "linkedin.com/in/john",
    github: "github.com/john"
  },
  education: [
    {
      school: "Harvard University",
      location: "Cambridge, MA",
      degree: "Bachelor of Science in Computer Science",
      date: "May 2025",
      details: "GPA: 3.9/4.0\nRelevant Coursework: Data Structures, Algorithms"
    }
  ],
  experience: [
    {
      company: "Tech Giant Corp",
      location: "San Francisco, CA",
      role: "Software Engineering Intern",
      date: "May 2024 – Aug 2024",
      bullets: "Engineered a scalable microservice using Go.\nReduced latency by 40%."
    }
  ],
  projects: [
    {
      name: "Algorithmic Trading Bot",
      tech: "Python, AWS",
      bullets: "Built a high-frequency trading bot.\nBacktested strategies over 5 years."
    }
  ],
  skills: {
    languages: "Java, Python, C++, JavaScript",
    frameworks: "React, Node.js, Express",
    tools: "Git, Docker, AWS"
  }
};

const ResumeBuilder = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeSection, setActiveSection] = useState('header');

  // --- HANDLERS ---
  const handlePrint = () => {
    window.print();
  };

  const updateHeader = (field, value) => {
    setData(prev => ({ ...prev, header: { ...prev.header, [field]: value } }));
  };

  const updateSkills = (field, value) => {
    setData(prev => ({ ...prev, skills: { ...prev.skills, [field]: value } }));
  };

  // Generic handler for arrays (Education, Experience, Projects)
  const updateArrayItem = (section, index, field, value) => {
    const newArr = [...data[section]];
    newArr[index][field] = value;
    setData(prev => ({ ...prev, [section]: newArr }));
  };

  const addArrayItem = (section, template) => {
    setData(prev => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const removeArrayItem = (section, index) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  // --- SUB-COMPONENTS ---
  
  // 1. Accordion Section Wrapper
  const Section = ({ title, id, children }) => (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setActiveSection(activeSection === id ? null : id)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold text-gray-700">{title}</span>
        <span className="text-gray-500 text-sm">
          {activeSection === id ? '▲' : '▼'}
        </span>
      </button>
      {activeSection === id && <div className="p-4 bg-white">{children}</div>}
    </div>
  );

  // 2. Input Helper
  const Input = ({ label, value, onChange, placeholder }) => (
    <div className="mb-3">
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
    </div>
  );

  // 3. TextArea Helper (for bullets)
  const TextArea = ({ label, value, onChange, placeholder }) => (
    <div className="mb-3">
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label} (One per line)</label>
      <textarea 
        rows={4}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDE: EDITOR (Questionnaire) */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-300 overflow-y-auto h-screen shadow-xl z-10 print:hidden">
        <div className="p-4 border-b border-gray-200 bg-blue-600 text-white flex justify-between items-center sticky top-0 z-20">
          <h1 className="font-bold text-lg">Resume Builder</h1>
          <button onClick={handlePrint} className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-bold hover:bg-blue-50 shadow-sm">
            Print / PDF
          </button>
        </div>

        {/* 1. HEADER FORM */}
        <Section title="1. Contact Information" id="header">
          <Input label="Full Name" value={data.header.name} onChange={(v) => updateHeader('name', v)} />
          <Input label="Location (City, State)" value={data.header.address} onChange={(v) => updateHeader('address', v)} />
          <Input label="Phone Number" value={data.header.phone} onChange={(v) => updateHeader('phone', v)} />
          <Input label="Email" value={data.header.email} onChange={(v) => updateHeader('email', v)} />
          <Input label="LinkedIn (URL or User)" value={data.header.linkedin} onChange={(v) => updateHeader('linkedin', v)} />
          <Input label="GitHub (URL or User)" value={data.header.github} onChange={(v) => updateHeader('github', v)} />
        </Section>

        {/* 2. EDUCATION FORM */}
        <Section title="2. Education" id="education">
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-gray-100 last:border-0 relative group">
              <button 
                onClick={() => removeArrayItem('education', idx)}
                className="absolute top-0 right-0 text-red-500 text-xs font-bold hover:text-red-700 px-2 py-1 bg-red-50 rounded"
              >
                REMOVE
              </button>
              <Input label="University" value={edu.school} onChange={(v) => updateArrayItem('education', idx, 'school', v)} />
              <Input label="Degree" value={edu.degree} onChange={(v) => updateArrayItem('education', idx, 'degree', v)} />
              <Input label="Location" value={edu.location} onChange={(v) => updateArrayItem('education', idx, 'location', v)} />
              <Input label="Graduation Date" value={edu.date} onChange={(v) => updateArrayItem('education', idx, 'date', v)} />
              <TextArea 
                label="Details (GPA, Honors, etc)" 
                value={edu.details} 
                onChange={(v) => updateArrayItem('education', idx, 'details', v)} 
                placeholder="GPA: 3.9&#10;Honors: Dean's List"
              />
            </div>
          ))}
          <button 
            onClick={() => addArrayItem('education', { school: '', location: '', degree: '', date: '', details: '' })}
            className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded font-bold hover:border-blue-500 hover:text-blue-500"
          >
            + Add School
          </button>
        </Section>

        {/* 3. EXPERIENCE FORM */}
        <Section title="3. Experience" id="experience">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-gray-100 last:border-0 relative">
              <button 
                 onClick={() => removeArrayItem('experience', idx)}
                 className="absolute top-0 right-0 text-red-500 text-xs font-bold hover:text-red-700 px-2 py-1 bg-red-50 rounded"
              >
                REMOVE
              </button>
              <Input label="Company" value={exp.company} onChange={(v) => updateArrayItem('experience', idx, 'company', v)} />
              <Input label="Role Title" value={exp.role} onChange={(v) => updateArrayItem('experience', idx, 'role', v)} />
              <Input label="Location" value={exp.location} onChange={(v) => updateArrayItem('experience', idx, 'location', v)} />
              <Input label="Dates" value={exp.date} onChange={(v) => updateArrayItem('experience', idx, 'date', v)} />
              <TextArea 
                label="Achievements (Bullets)" 
                value={exp.bullets} 
                onChange={(v) => updateArrayItem('experience', idx, 'bullets', v)}
                placeholder="Built X using Y.&#10;Improved Z by 20%."
              />
            </div>
          ))}
           <button 
            onClick={() => addArrayItem('experience', { company: '', location: '', role: '', date: '', bullets: '' })}
            className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded font-bold hover:border-blue-500 hover:text-blue-500"
          >
            + Add Job
          </button>
        </Section>

        {/* 4. PROJECTS FORM */}
        <Section title="4. Projects" id="projects">
          {data.projects.map((proj, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-gray-100 last:border-0 relative">
              <button 
                 onClick={() => removeArrayItem('projects', idx)}
                 className="absolute top-0 right-0 text-red-500 text-xs font-bold hover:text-red-700 px-2 py-1 bg-red-50 rounded"
              >
                REMOVE
              </button>
              <Input label="Project Name" value={proj.name} onChange={(v) => updateArrayItem('projects', idx, 'name', v)} />
              <Input label="Tech Stack" value={proj.tech} onChange={(v) => updateArrayItem('projects', idx, 'tech', v)} />
              <TextArea 
                label="Details (Bullets)" 
                value={proj.bullets} 
                onChange={(v) => updateArrayItem('projects', idx, 'bullets', v)}
                placeholder="Features included X...&#10;Solved Y problem..."
              />
            </div>
          ))}
           <button 
            onClick={() => addArrayItem('projects', { name: '', tech: '', bullets: '' })}
            className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded font-bold hover:border-blue-500 hover:text-blue-500"
          >
            + Add Project
          </button>
        </Section>

         {/* 5. SKILLS FORM */}
         <Section title="5. Skills" id="skills">
          <Input label="Languages" value={data.skills.languages} onChange={(v) => updateSkills('languages', v)} />
          <Input label="Frameworks" value={data.skills.frameworks} onChange={(v) => updateSkills('frameworks', v)} />
          <Input label="Tools" value={data.skills.tools} onChange={(v) => updateSkills('tools', v)} />
        </Section>
      </div>

      {/* RIGHT SIDE: PREVIEW (The Harvard Resume) */}
      <div className="flex-1 bg-gray-500 p-8 overflow-auto flex justify-center print:p-0 print:bg-white print:w-full print:block print:overflow-visible">
        <div 
          className="bg-white w-[8.5in] h-[11in] shadow-2xl p-[0.5in] text-black print:shadow-none print:w-full print:h-auto"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          
          {/* HEADER */}
          <header className="text-center mb-6 border-b-0">
            <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">{data.header.name}</h1>
            <div className="text-sm">
              {data.header.address && <span>{data.header.address}</span>}
              {data.header.phone && <span className="mx-1">• {data.header.phone}</span>}
              {data.header.email && <span className="mx-1">• {data.header.email}</span>}
              {data.header.linkedin && <span className="mx-1">• {data.header.linkedin.replace(/^https?:\/\//, '')}</span>}
              {data.header.github && <span className="mx-1">• {data.header.github.replace(/^https?:\/\//, '')}</span>}
            </div>
          </header>

          {/* EDUCATION */}
          {data.education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">{edu.school}</h3>
                    <span className="text-sm">{edu.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic">
                    <span className="text-sm">{edu.degree}</span>
                    <span className="text-sm">{edu.date}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-1 text-sm leading-tight">
                    {edu.details.split('\n').map((line, i) => line && <li key={i}>{line}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* EXPERIENCE */}
          {data.experience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Experience</h2>
              {data.experience.map((job, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">{job.company}</h3>
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic mb-1">
                    <span className="text-sm">{job.role}</span>
                    <span className="text-sm">{job.date}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm leading-snug">
                    {job.bullets.split('\n').map((line, i) => line && <li key={i} className="mb-0.5">{line}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {data.projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Leadership & Projects</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-base">{proj.name}</span>
                      <span className="text-sm italic ml-1"> — {proj.tech}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-1 text-sm leading-snug">
                    {proj.bullets.split('\n').map((line, i) => line && <li key={i} className="mb-0.5">{line}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Technical Skills & Interests</h2>
            <div className="text-sm leading-snug">
              {data.skills.languages && <p className="mb-1"><span className="font-bold">Languages:</span> {data.skills.languages}</p>}
              {data.skills.frameworks && <p className="mb-1"><span className="font-bold">Frameworks:</span> {data.skills.frameworks}</p>}
              {data.skills.tools && <p><span className="font-bold">Tools:</span> {data.skills.tools}</p>}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
