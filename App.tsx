import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Home from './pages/Home';
import BasicInfoEn from './pages/BasicInfoEn';
import BasicInfoId from './pages/BasicInfoId';
import SkillsInfoEn from './pages/SkillsInfoEn';
import SkillsInfoId from './pages/SkillsInfoId';
import LatestExperienceEn from './pages/LatestExperienceEn';
import LatestExperienceId from './pages/LatestExperienceId';
import OtherExperience2En from './pages/OtherExperience2En';
import OtherExperience2Id from './pages/OtherExperience2Id';
import OtherExperience3En from './pages/OtherExperience3En';
import OtherExperience3Id from './pages/OtherExperience3Id';
import OtherExperience4En from './pages/OtherExperience4En';
import OtherExperience4Id from './pages/OtherExperience4Id';
import OtherExperience5En from './pages/OtherExperience5En';
import OtherExperience5Id from './pages/OtherExperience5Id';
import OtherQuestionEn from './pages/OtherQuestionEn';
import OtherQuestionId from './pages/OtherQuestionId';
import OverseasEn from './pages/OverseasEn';
import CompletionEn from './pages/CompletionEn';
import CompletionId from './pages/CompletionId';

const App: React.FC = () => {
  return (
    <FormProvider>
      <HashRouter>
        <div className="font-sans text-[21px] leading-relaxed">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* English Routes */}
            <Route path="/en/basic-info" element={<BasicInfoEn />} />
            <Route path="/en/skills-info" element={<SkillsInfoEn />} />
            <Route path="/en/latest-experience" element={<LatestExperienceEn />} />
            <Route path="/en/other-experience-2" element={<OtherExperience2En />} />
            <Route path="/en/other-experience-3" element={<OtherExperience3En />} />
            <Route path="/en/other-experience-4" element={<OtherExperience4En />} />
            <Route path="/en/other-experience-5" element={<OtherExperience5En />} />
            <Route path="/en/other-question" element={<OtherQuestionEn />} />
            
            {/* Ending Pages */}
            <Route path="/en/overseas" element={<OverseasEn />} />
            <Route path="/en/completion" element={<CompletionEn />} />
            
            {/* Indonesian Routes */}
            <Route path="/id/basic-info" element={<BasicInfoId />} />
            <Route path="/id/skills-info" element={<SkillsInfoId />} />
            <Route path="/id/latest-experience" element={<LatestExperienceId />} />
            <Route path="/id/other-experience-2" element={<OtherExperience2Id />} />
            <Route path="/id/other-experience-3" element={<OtherExperience3Id />} />
            <Route path="/id/other-experience-4" element={<OtherExperience4Id />} />
            <Route path="/id/other-experience-5" element={<OtherExperience5Id />} />
            <Route path="/id/other-question" element={<OtherQuestionId />} />
            
            <Route path="/id/completion" element={<CompletionId />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </FormProvider>
  );
};

export default App;