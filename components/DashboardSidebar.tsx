
import React from 'react';
import { TabType } from '../types';

interface DashboardSidebarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ currentTab, onTabChange, onLogout }) => {
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col fixed h-full z-20 shadow-2xl font-sans">
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 pb-4">
          <img src="images/login/logo.png" alt="NARI Logo" className="mb-8 object-contain" />
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">核心设计中枢</h4>
          <nav className="space-y-2">
            <button onClick={() => onTabChange('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              平台总览
            </button>
            <button onClick={() => onTabChange('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              项目管理
            </button>
            <button onClick={() => onTabChange('temp-projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'temp-projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              临时设计项目
            </button>
          </nav>
        </div>

        <div className="px-8 py-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">数字化选型工具</h4>
          <nav className="space-y-2">
            <button onClick={() => onTabChange('selection-platform')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'selection-platform' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              选配平台
            </button>
            <button onClick={() => onTabChange('busbar-master')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'busbar-master' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              铜排大师软件
            </button>
            <button onClick={() => onTabChange('busbar-conv')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'busbar-conv' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              电工铜排转换
            </button>
          </nav>
        </div>

        <div className="px-8 py-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">数据管理平台</h4>
          <nav className="space-y-2">
            <button onClick={() => onTabChange('standards')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'standards' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
              标准柜型方案库
            </button>
            <button onClick={() => onTabChange('materials')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'materials' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              元器件参数化模型库
            </button>
          </nav>
        </div>

        <div className="px-8 py-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">智能平台能力 (Future)</h4>
          <nav className="space-y-2">
            <button onClick={() => onTabChange('ai-assistant')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'ai-assistant' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              智能布线
            </button>
            <button onClick={() => onTabChange('bom-compare')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'bom-compare' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              BOM对比分析
            </button>
            <button onClick={() => onTabChange('drc')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'drc' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              设计合规校验
            </button>
          </nav>
        </div>
      </div>

      <div className="p-6 border-t border-slate-800 shrink-0">
        <button onClick={onLogout} className="w-full px-4 py-3 border border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition">退出平台系统</button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
