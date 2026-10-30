import { useState, useEffect } from 'react';
import { User, GraduationCap, Briefcase, Award, Edit3, Check, RotateCcw } from 'lucide-react';

interface DeveloperProfile {
  name: string;
  course: string;
  institution: string;
  role: string;
  purpose: string;
  mentor: string;
  duration: string;
  email: string;
}

const DEFAULT_PROFILE: DeveloperProfile = {
  name: 'Sundaresan',
  course: 'B.Tech in Artificial Intelligence & Data Science',
  institution: 'School of Computer Science & Engineering',
  role: 'Machine Learning Intern',
  purpose: 'Internship Capstone Submission: Benchmarking Linear vs Non-Linear Inductive Biases in Multi-Class Classification',
  mentor: 'Internship Project Lead & Faculty Advisor',
  duration: '8-Week Intensive Machine Learning Internship',
  email: 'sundaresan377777@gmail.com',
};

export default function DeveloperSection() {
  const [profile, setProfile] = useState<DeveloperProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage if previously edited
  useEffect(() => {
    try {
      const saved = localStorage.getItem('iris_ml_dev_profile');
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('iris_ml_dev_profile', JSON.stringify(profile));
    } catch {
      // Ignore storage errors
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('iris_ml_dev_profile');
    } catch {
      // Ignore
    }
    setIsEditing(false);
  };

  return (
    <section id="developer" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
              08. Project Contributor
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
              About the Developer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Internship project documentation and candidate details. You can customize the fields below to fit your academic submission.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Details</span>
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5 text-blue-400" />
                <span>Edit Profile Placeholders</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Avatar & Basic Identifiers (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950 border border-blue-800 text-blue-400 text-2xl font-bold font-mono">
                {profile.name.charAt(0) || 'D'}
              </div>

              <div className="w-full">
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase text-slate-400">Developer Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                    <label className="text-[11px] font-mono uppercase text-slate-400">Internship Role</label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                    <p className="text-xs font-mono text-blue-400 mt-0.5">{profile.role}</p>
                    <p className="text-xs text-slate-400 mt-1">{profile.institution}</p>
                  </>
                )}
              </div>

              {/* Status Marker */}
              <div className="w-full pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <span className="text-slate-500">Program Duration:</span>
                <p className="text-slate-200 mt-0.5">{profile.duration}</p>
              </div>
            </div>

            {/* Right Column: Academic & Internship Details (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                  <div>
                    <label className="font-mono text-slate-400 uppercase text-[10px]">Course / Major</label>
                    <input
                      type="text"
                      value={profile.course}
                      onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 uppercase text-[10px]">Institution</label>
                    <input
                      type="text"
                      value={profile.institution}
                      onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 uppercase text-[10px]">Mentor / Advisor</label>
                    <input
                      type="text"
                      value={profile.mentor}
                      onChange={(e) => setProfile({ ...profile, mentor: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-slate-400 uppercase text-[10px]">Contact Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-mono text-slate-400 uppercase text-[10px]">Project Purpose & Objective</label>
                    <textarea
                      rows={2}
                      value={profile.purpose}
                      onChange={(e) => setProfile({ ...profile, purpose: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <GraduationCap className="h-4 w-4 text-blue-400" />
                      <span className="font-mono uppercase text-[11px]">Academic Course</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">{profile.course}</p>
                    <p className="mt-0.5 text-slate-400 text-xs">{profile.institution}</p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Award className="h-4 w-4 text-blue-400" />
                      <span className="font-mono uppercase text-[11px]">Project Supervisor</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">{profile.mentor}</p>
                    <p className="mt-0.5 text-slate-400 text-xs">Academic & Technical Evaluation</p>
                  </div>

                  <div className="sm:col-span-2 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Briefcase className="h-4 w-4 text-blue-400" />
                      <span className="font-mono uppercase text-[11px]">Internship Project Purpose</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                      {profile.purpose}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
