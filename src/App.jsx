import React, { useState } from 'react';

// --- INITIAL STATE (Generic Data) ---
const INITIAL_DATA = {
  sectionTitles: {
    education: "Education",
    experience: "Professional Experience",
    projects: "Leadership & Activities", // Can be renamed to "Publications" or "Volunteering"
    skills: "Skills & Interests"
  },
  header: {
    name: "ALEX TAYLOR",
    address: "New York, NY",
    phone: "(212) 555-0199",
    email: "alex.taylor@university.edu",
    linkedin: "linkedin.com/in/alextaylor",
    website: "" // Replaces GitHub (can be Behance, Blog, or empty)
  },
  education: [
    {
      school: "University of Pennsylvania",
      location: "Philadelphia, PA",
      degree: "Bachelor of Arts in Economics",
      date: "May 2025",
      details: "GPA: 3.8/4.0\nDean's List 2023-2024"
    }
  ],
  experience: [
    {
      company: "Goldman Sachs",
      location: "New York, NY",
      role: "Summer Analyst",
      date: "Jun 2024 – Aug 2024",
      bullets: "Conducted market research on renewable energy sectors.\nPrepared pitch decks for client meetings."
    }
  ],
  projects: [
    {
      name: "Student Government Association",
      subtitle: "Treasurer", // Was 'Tech Stack'
      bullets: "Managed an annual budget of $50,000.\nAllocated funds to 30+ student organizations."
    }
  ],
  skills: [
    { category: "Certifications", list: "CFA Level 1 Candidate, Bloomberg Market Concepts" },
    { category: "Software", list: "Microsoft Excel (Advanced), PowerPoint, Tableau" },
    { category: "Languages", list: "English (Native), Spanish (Fluent)" }
  ]
};

const UniversalResumeBuilder = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeSection, setActiveSection] = useState('header');

  const handlePrint = () => window.print();

  // --- GENERIC UPDATERS ---
  const updateNested = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

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

  // --- UI COMPONENTS ---
  const Section = ({ title, id, children }) => (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setActiveSection(activeSection === id ? null : id)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold text-gray-700">{title}</span>
        <span className="text-gray-500 text-sm">{activeSection === id ? '▲' : '▼'}</span>
      </button>
      {activeSection === id && <div className="p-4 bg-white">{children}</div>}
    </div>
  );

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

  const TextArea = ({ label, value, onChange, placeholder }) => (
    <div className="mb-3">
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label} (Enter for new bullet)</label>
      <textarea 
        rows={3}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* --- EDITOR --- */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-300 overflow-y-auto h-screen shadow-xl z-10 print:hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-800 text-white flex justify-between items-center sticky top-0 z-20">
          <h1 className="font-bold text-lg">Resume Builder</h1>
          <button onClick={handlePrint} className="bg-white text-gray-800 px-4 py-1 rounded text-sm font-bold hover:bg-gray-100">
            Download PDF
          </button>
        </div>

        {/* 1. HEADER */}
        <Section title="1. Contact Info" id="header">
          <Input label="Name" value={data.header.name} onChange={(v) => updateNested('header', 'name', v)} />
          <Input label="Location" value={data.header.address} onChange={(v) => updateNested('header', 'address', v)} />
          <Input label="Phone" value={data.header.phone} onChange={(v) => updateNested('header', 'phone', v)} />
          <Input label="Email" value={data.header.email} onChange={(v) => updateNested('header', 'email', v)} />
          <Input label="LinkedIn" value={data.header.linkedin} onChange={(v) => updateNested('header', 'linkedin', v)} />
          <Input label="Portfolio / Website (Optional)" value={data.header.website} onChange={(v) => updateNested('header', 'website', v)} />
        </Section>

        {/* 2. EDUCATION */}
        <Section title="2. Education" id="education">
          <Input label="Section Title" value={data.sectionTitles.education} onChange={(v) => updateNested('sectionTitles', 'education', v)} />
          <hr className="my-3"/>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-4 pb-4 border-b border-gray-100 relative">
              <button onClick={() => removeArrayItem('education', idx)} className="absolute top-0 right-0 text-red-500 text-xs font-bold">REMOVE</button>
              <Input label="School" value={edu.school} onChange={(v) => updateArrayItem('education', idx, 'school', v)} />
              <Input label="Degree" value={edu.degree} onChange={(v) => updateArrayItem('education', idx, 'degree', v)} />
              <Input label="Date" value={edu.date} onChange={(v) => updateArrayItem('education', idx, 'date', v)} />
              <TextArea label="Details" value={edu.details} onChange={(v) => updateArrayItem('education', idx, 'details', v)} />
            </div>
          ))}
          <button onClick={() => addArrayItem('education', { school: '', degree: '', date: '', details: '' })} className="text-blue-600 text-sm font-bold">+ Add School</button>
        </Section>

        {/* 3. EXPERIENCE */}
        <Section title="3. Experience" id="experience">
          <Input label="Section Title" value={data.sectionTitles.experience} onChange={(v) => updateNested('sectionTitles', 'experience', v)} />
           <hr className="my-3"/>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 pb-4 border-b border-gray-100 relative">
              <button onClick={() => removeArrayItem('experience', idx)} className="absolute top-0 right-0 text-red-500 text-xs font-bold">REMOVE</button>
              <Input label="Company" value={exp.company} onChange={(v) => updateArrayItem('experience', idx, 'company', v)} />
              <Input label="Role" value={exp.role} onChange={(v) => updateArrayItem('experience', idx, 'role', v)} />
              <Input label="Location" value={exp.location} onChange={(v) => updateArrayItem('experience', idx, 'location', v)} />
              <Input label="Date" value={exp.date} onChange={(v) => updateArrayItem('experience', idx, 'date', v)} />
              <TextArea label="Bullets" value={exp.bullets} onChange={(v) => updateArrayItem('experience', idx, 'bullets', v)} />
            </div>
          ))}
          <button onClick={() => addArrayItem('experience', { company: '', role: '', location: '', date: '', bullets: '' })} className="text-blue-600 text-sm font-bold">+ Add Job</button>
        </Section>

        {/* 4. OPTIONAL SECTION (Leadership/Projects) */}
        <Section title="4. Leadership / Projects" id="projects">
          <Input label="Section Title (e.g. Leadership, Volunteering)" value={data.sectionTitles.projects} onChange={(v) => updateNested('sectionTitles', 'projects', v)} />
           <hr className="my-3"/>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="mb-4 pb-4 border-b border-gray-100 relative">
               <button onClick={() => removeArrayItem('projects', idx)} className="absolute top-0 right-0 text-red-500 text-xs font-bold">REMOVE</button>
              <Input label="Organization / Name" value={proj.name} onChange={(v) => updateArrayItem('projects', idx, 'name', v)} />
              <Input label="Role / Subtitle (Optional)" value={proj.subtitle} onChange={(v) => updateArrayItem('projects', idx, 'subtitle', v)} />
              <TextArea label="Bullets" value={proj.bullets} onChange={(v) => updateArrayItem('projects', idx, 'bullets', v)} />
            </div>
          ))}
          <button onClick={() => addArrayItem('projects', { name: '', subtitle: '', bullets: '' })} className="text-blue-600 text-sm font-bold">+ Add Item</button>
        </Section>

        {/* 5. SKILLS / OTHERS */}
        <Section title="5. Skills / Interests" id="skills">
          <Input label="Section Title" value={data.sectionTitles.skills} onChange={(v) => updateNested('sectionTitles', 'skills', v)} />
           <hr className="my-3"/>
          {data.skills.map((skill, idx) => (
            <div key={idx} className="mb-2 relative">
               <button onClick={() => removeArrayItem('skills', idx)} className="absolute top-0 right-0 text-red-500 text-xs font-bold">X</button>
              <Input label="Category Name" value={skill.category} onChange={(v) => updateArrayItem('skills', idx, 'category', v)} placeholder="e.g. Certifications" />
              <Input label="List Items" value={skill.list} onChange={(v) => updateArrayItem('skills', idx, 'list', v)} placeholder="e.g. CPA, CFA" />
            </div>
          ))}
          <button onClick={() => addArrayItem('skills', { category: '', list: '' })} className="text-blue-600 text-sm font-bold">+ Add Category</button>
        </Section>
      </div>

      {/* --- PREVIEW --- */}
      <div className="flex-1 bg-gray-500 p-8 overflow-auto flex justify-center print:p-0 print:bg-white print:w-full print:block print:overflow-visible">
        <div 
          className="bg-white w-[8.5in] min-h-[11in] shadow-2xl p-[0.5in] text-black print:shadow-none print:w-full print:h-auto"
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
              {data.header.website && <span className="mx-1">• {data.header.website.replace(/^https?:\/\//, '')}</span>}
            </div>
          </header>

          {/* EDUCATION */}
          {data.education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">{data.sectionTitles.education}</h2>
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
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">{data.sectionTitles.experience}</h2>
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

          {/* DYNAMIC SECTION (Projects/Leadership) */}
          {data.projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">{data.sectionTitles.projects}</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-base">{proj.name}</span>
                      {proj.subtitle && <span className="text-sm italic ml-1"> — {proj.subtitle}</span>}
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
          {data.skills.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black mb-2">{data.sectionTitles.skills}</h2>
              <div className="text-sm leading-snug">
                {data.skills.map((skill, index) => (
                   <p key={index} className="mb-1">
                     <span className="font-bold">{skill.category}:</span> {skill.list}
                   </p>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default UniversalResumeBuilder;
