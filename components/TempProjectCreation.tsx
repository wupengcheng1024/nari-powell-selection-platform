
import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';

interface TempProjectCreationProps {
  onCreate: (project: Project) => void;
}

const TempProjectCreation: React.FC<TempProjectCreationProps> = ({ onCreate }) => {
  const [tempName, setTempName] = useState('');
  const [tempCustomer, setTempCustomer] = useState('');
  const [tempType, setTempType] = useState('配电改造');
  const [tempPriority, setTempPriority] = useState('普通');

  const handleCreateTempProject = () => {
    if (!tempName || !tempCustomer) {
      alert("请填写项目名称和客户方信息");
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: tempName,
      wbs: `TEMP-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: ProjectStatus.PLANNING,
      progress: 0,
      customer: tempCustomer,
      updatedAt: '刚刚'
    };

    onCreate(newProject);

    // Reset form
    setTempName('');
    setTempCustomer('');
    setTempType('配电改造');
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
        {/* Creation Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">快速新建临时设计任务</h3>
                <p className="text-xs text-slate-400">Temporary Design Project Setup</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">项目名称 (Project Name)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                  placeholder="请输入项目全称..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">客户名称 (Customer)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                  placeholder="请输入客户方名称..."
                  value={tempCustomer}
                  onChange={(e) => setTempCustomer(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">项目类型 (Type)</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                    value={tempType}
                    onChange={(e) => setTempType(e.target.value)}
                  >
                    <option>配电改造</option>
                    <option>新建配电站</option>
                    <option>临时保电</option>
                    <option>方案投标</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">优先级 (Priority)</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                    value={tempPriority}
                    onChange={(e) => setTempPriority(e.target.value)}
                  >
                    <option>普通</option>
                    <option>紧急</option>
                    <option>特急</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleCreateTempProject}
                  className="w-full py-3.5 nari-bg text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  立即创建并进入管理
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-3">
                  点击创建后，该项目将自动同步至项目列表并生成临时 WBS 号。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Preview */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2 py-0.5 border border-white/20 rounded-lg text-[10px] uppercase font-mono tracking-widest text-blue-300">Preview</span>
                <span className="text-[10px] text-white/40">Generated by NARI AI</span>
              </div>

              <div className="space-y-1 mb-8">
                <h1 className="text-2xl font-bold">{tempName || '未命名项目...'}</h1>
                <p className="text-sm text-slate-400">{tempCustomer || '客户名称...'}</p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">WBS (Auto)</span>
                  <span className="text-blue-400">TEMP-{new Date().getFullYear()}...</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Status</span>
                  <span className="text-amber-400">PLANNING</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Created At</span>
                  <span className="text-slate-300">Just Now</span>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-blue-500"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500">0%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h5 className="font-bold text-blue-800 text-sm mb-1">设计助手提示</h5>
              <p className="text-xs text-blue-600 leading-relaxed">
                临时项目不强制要求关联 PLM 一次图文件，您可以直接进入选配平台进行手动配置。系统将在后续阶段提示您补全正式 WBS 信息。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempProjectCreation;
