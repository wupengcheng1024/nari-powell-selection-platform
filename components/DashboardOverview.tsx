
import React from 'react';
import { Project, ProjectStatus } from '../types';

interface DashboardOverviewProps {
  projects: Project[];
  onNavigate: (tab: any) => void;
  onSelectProject: (id: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ projects, onNavigate, onSelectProject }) => {
  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">平台指挥总览 (Overview)</h3>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">设计任务总数</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">156</div>
          <div className="text-green-500 text-[11px] font-bold mt-4 flex items-center gap-1">
            <span>↑ 12.5% 本月新增</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl group-hover:bg-amber-500 transition-colors">
              <svg className="w-6 h-6 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">待评审项目</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">24</div>
          <div className="text-slate-400 text-[11px] font-bold mt-4">昨日已完成 8 项</div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 rounded-2xl group-hover:bg-green-600 transition-colors">
              <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">本月发布 BOM 数</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">42</div>
          <div className="text-green-500 text-[11px] font-bold mt-4 flex items-center gap-1">
            <span>✔ 100% 同步 PLM</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">AI 设计替代率</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">45%</div>
          <div className="text-blue-500 text-[11px] font-bold mt-4">较上季度 ↑ 15%</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden py-4">
        <div className="px-8 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-700 flex items-center gap-3">
            <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
            当前执行中的数字化项目
          </h3>
          <button onClick={() => onNavigate('projects')} className="text-blue-600 text-xs font-bold hover:underline">进入管理中心</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
            <tr><th className="px-8 py-4 font-extrabold">WBS号</th><th className="px-8 py-4 font-extrabold">项目名称</th><th className="px-8 py-4 font-extrabold text-center">阶段</th><th className="px-8 py-4 text-right font-extrabold">管理</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {projects.slice(0, 3).map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition">
                <td className="px-8 py-5 font-mono text-xs text-slate-400 font-bold">{p.wbs}</td>
                <td className="px-8 py-5 font-bold text-slate-700">{p.name}</td>
                <td className="px-8 py-5 text-center">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${p.status === ProjectStatus.DESIGNING ? 'bg-blue-50 text-blue-600' :
                      p.status === ProjectStatus.REVIEWING ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-100 text-slate-500'
                    }`}>{p.status}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button onClick={() => onSelectProject(p.id)} className="px-5 py-1.5 rounded-lg border border-blue-200 text-blue-600 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">进入设计</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;
