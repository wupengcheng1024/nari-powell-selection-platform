
import React from 'react';
import { TabType } from '../types';

interface DashboardHeaderProps {
  currentTab: TabType;
  onWarningClick: () => void;
  onMessageClick: () => void;
  onStandardsClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentTab, onWarningClick, onMessageClick, onStandardsClick }) => {
  const getTitle = () => {
    switch (currentTab) {
      case 'overview': return '平台总览 (Overview)';
      case 'projects': return '项目管理';
      case 'temp-projects': return '临时设计项目';
      case 'selection-platform': return '选配平台';
      case 'busbar-master': return '铜排大师软件';
      case 'busbar-conv': return '电工铜排转换';
      case 'standards': return '标准柜型方案库';
      case 'materials': return '元器件参数化模型库';
      case 'ai-assistant': return '智能布线';
      case 'bom-compare': return 'BOM对比分析';
      case 'drc': return '设计合规校验';
      default: return '智能数字化模块';
    }
  };

  return (
    <header className="h-20 bg-white flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm border-b border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
        {getTitle()}
      </h2>

      <div className="flex items-center gap-6">
        {/* Global Search */}
        <div className="relative group hidden md:block">
          <input
            type="text"
            placeholder="全站搜索..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs w-48 focus:w-64 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 border-r border-slate-200 pr-6 mr-2">
          <button onClick={onWarningClick} className="p-2 text-slate-400 hover:text-amber-500 transition-colors rounded-xl hover:bg-amber-50 relative group" title="预警中心">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={onStandardsClick}
            className={`p-2 transition-colors rounded-xl relative group ${currentTab === 'standards' ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
            title="标准方案库"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </button>
          <button onClick={onMessageClick} className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50 relative group" title="消息中心">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </button>
        </div>

        <div className="text-right">
          <span className="text-slate-400 text-[10px] block font-extrabold uppercase tracking-widest">Authenticated Designer</span>
          <span className="text-slate-800 font-bold text-sm">张工 (Engine No. 8823)</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">张</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
