/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import AboutProject from './components/AboutProject';
import DatasetSection from './components/DatasetSection';
import ModelsSection from './components/ModelsSection';
import PerformanceSection from './components/PerformanceSection';
import WorkflowSection from './components/WorkflowSection';
import InferencePlayground from './components/InferencePlayground';
import NotebookViewer from './components/NotebookViewer';
import DeveloperSection from './components/DeveloperSection';
import Footer from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onExploreClick={() => scrollToSection('evaluation')}
          onPlaygroundClick={() => scrollToSection('playground')}
        />
        <AboutProject />
        <DatasetSection />
        <ModelsSection />
        <PerformanceSection />
        <WorkflowSection />
        <InferencePlayground />
        <NotebookViewer />
        <DeveloperSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
