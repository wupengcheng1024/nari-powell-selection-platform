
import React, { useState } from 'react';
import { WorkflowStep } from '../types';
import MissionReception from '../components/MissionReception';
import CabinetSelection from '../components/CabinetSelection';
import ParametricDesign from '../components/ParametricDesign';
import BusbarDesign from '../components/BusbarDesign';
import MainBusbarAssembly from '../components/MainBusbarAssembly';
import OutputExport from '../components/OutputExport';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(WorkflowStep.MISSION_RECEPTION);
  
  const steps = [
    { title: '任务接收', desc: 'PLM对接' },
    { title: '项目创建', desc: '柜位布局' },
    { title: '柜型匹配', desc: '一次图选型' },
    { title: '参数设计', desc: '钣金自动化' },
    { title: '铜排设计', desc: '交互式建模' },
    { title: '主母排拼柜', desc: '总装拼接' },
    { title: '成果输出', desc: 'BOM与图纸' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case WorkflowStep.MISSION_RECEPTION:
        return <MissionReception onNext={() => setCurrentStep(WorkflowStep.CABINET_SELECTION)} />;
      case WorkflowStep.CABINET_SELECTION:
        return <CabinetSelection onPrev={() => setCurrentStep(WorkflowStep.MISSION_RECEPTION)} onNext={() => setCurrentStep(WorkflowStep.PARAMETRIC_DESIGN)} />;
      case WorkflowStep.PARAMETRIC_DESIGN:
        return <ParametricDesign onPrev={() => setCurrentStep(WorkflowStep.CABINET_SELECTION)} onNext={() => setCurrentStep(WorkflowStep.BUSBAR_DESIGN)} />;
      case WorkflowStep.BUSBAR_DESIGN:
        return <BusbarDesign onPrev={() => setCurrentStep(WorkflowStep.PARAMETRIC_DESIGN)} onNext={() => setCurrentStep(WorkflowStep.MAIN_BUSBAR_ASSEMBLY)} />;
      case WorkflowStep.MAIN_BUSBAR_ASSEMBLY:
        return <MainBusbarAssembly onPrev={() => setCurrentStep(WorkflowStep.BUSBAR_DESIGN)} onNext={() => setCurrentStep(WorkflowStep.OUTPUT_EXPORT)} />;
      case WorkflowStep.OUTPUT_EXPORT:
        return <OutputExport onPrev={() => setCurrentStep(WorkflowStep.MAIN_BUSBAR_ASSEMBLY)} />;
      default:
        return <div>Step {currentStep} under development</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h2 className="font-semibold text-slate-800">数字化设计项目 PRJ-2025-001</h2>
            <p className="text-xs text-slate-400">PLM 状态: 已同步 | 负责人: 张工</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-right mr-4 border-r pr-4 border-slate-200">
            <span className="text-slate-400 block">当前环节</span>
            <span className="nari-blue font-bold">{steps[currentStep] ? steps[currentStep].title : '未知'}</span>
          </div>
          <button className="px-4 py-2 border border-slate-200 text-sm rounded-lg hover:bg-slate-50">保存草稿</button>
          <button className="px-4 py-2 nari-bg text-white text-sm rounded-lg hover:shadow-lg transition">提交审核</button>
        </div>
      </header>

      {/* Workflow Stepper */}
      <div className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-[96%] mx-auto flex items-center justify-between">
          {steps.map((s, idx) => (
            <React.Fragment key={idx}>
              <div 
                className={`flex flex-col items-center gap-1 flex-1 relative ${currentStep === idx ? 'text-blue-600' : idx < currentStep ? 'text-slate-800' : 'text-slate-300'}`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-1 transition-all
                  ${currentStep === idx ? 'border-blue-600 bg-blue-50' : idx < currentStep ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white'}`}
                >
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span className="text-[11px] font-medium whitespace-nowrap">{s.title}</span>
                <span className="text-[9px] opacity-60 whitespace-nowrap">{s.desc}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-[1px] flex-1 mx-4 ${idx < currentStep ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[96%] mx-auto h-full">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
