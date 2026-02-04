import React from 'react';

interface SelectionPlatformIntroProps {
  onNavigate: (tab: any) => void;
}

const SelectionPlatformIntro: React.FC<SelectionPlatformIntroProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">数字化选配平台 (Selection Platform)</h3>
            <p className="text-sm text-slate-500 mt-1">基于参数化驱动的智能三维方案生成引擎</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left Content: Description & Features */}
        <div className="w-1/3 flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              平台核心功能
            </h4>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <p className="font-bold text-slate-800">建立 3D 方案柜体选型数据库</p>
              <p>
                整理公司常用柜体方案数据，建立从一次方案选配后关联到 3D 装配体模型的方案选型库。
              </p>
              <hr className="border-slate-100" />
              <p className="font-bold text-slate-800">建立参数化钣金方案库</p>
              <p>
                提供标准化的调用机制。模板关联可配置参数形式存储，支持用户在界面选取模板并赋值。
              </p>
              <hr className="border-slate-100" />
              <p className="font-bold text-slate-800">快速更新驱动生成</p>
              <p>
                基于输入的参数实时驱动 CAD 引擎，快速生成全新的三维模型方案，实现设计自动化。
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <button
              onClick={() => onNavigate('standards')}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <span>浏览标准方案库</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <span>开始新项目选配</span>
            </button>
          </div>
        </div>

        {/* Right Content: Visual Representation (No Image, Feature Grid) */}
        <div className="flex-1 bg-slate-50/50 rounded-3xl border border-slate-200 p-8 flex flex-col gap-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 h-full content-start">
            <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden group min-h-[240px]">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold">3D 参数化数据库</h4>
                  <p className="text-indigo-200 text-sm mt-2 max-w-md">
                    中央仓库用于参数化钣金模板和装配逻辑。
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">120+</div>
                    <div className="text-[9px] uppercase text-slate-300 mt-1">智能模板</div>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">15ms</div>
                    <div className="text-[9px] uppercase text-slate-300 mt-1">查询 latency</div>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/10 text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-[9px] uppercase text-slate-300 mt-1">PLM Synced</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-400 transition group cursor-default">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h5 className="font-bold text-slate-800">参数化定义</h5>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                支持 H/W/D 维度、板厚 T、折弯系数 K 等关键参数的动态配置与约束校验。
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-400 transition group cursor-default">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h5 className="font-bold text-slate-800">实时驱动引擎</h5>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                修改参数后自动触发模型重建，生成符合 NARI 制造标准的 SolidWorks 工程图。
              </p>
            </div>

            <div className="col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h5 className="font-bold text-indigo-900">当前工作区状态</h5>
                <p className="text-xs text-indigo-700">Selection Workspace Active</p>
              </div>
              <div className="px-3 py-1 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPlatformIntro;