
import React from 'react';

const BusbarConversionIntro: React.FC = () => {
  const handleOpenSolidWorks = () => {
    const userAgent = window.navigator.userAgent;
    const isWindows = userAgent.includes('Windows');

    if (isWindows) {
      const confirmOpen = window.confirm("检测到 Windows 环境。即将启动 SolidWorks 及其转换插件。\n\n这需要您本地已安装 SolidWorks 2022 或更高版本。\n确认启动？");
      if (confirmOpen) {
        // 使用 URL Protocol 唤起 SolidWorks 或插件
        window.location.href = "solidworks://launch?plugin=nari_conversion";
      }
    } else {
      alert("系统检测到当前非 Windows 操作系统。\n\nSolidWorks 及电工铜排转换插件仅支持在 Windows 环境下运行。");
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 shrink-0">
         <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
             <div>
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">电工铜排转换 (Electrician Busbar Conversion)</h3>
               <p className="text-sm text-slate-500 mt-1">智能特征识别与 SolidWorks 原生重构引擎</p>
             </div>
          </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left Content */}
        <div className="w-1/3 flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              核心转换能力
            </h4>
            <ul className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <strong className="block text-slate-800 mb-1">铜排特征的重建模</strong>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    识别实体中的铜排特征（截面、折弯、重叠面），驱动 SolidWorks 重新绘制该零件。将外部导入的不可编辑“死实体”转换为带完整特征树的 100% 原生零件。
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <div>
                  <strong className="block text-slate-800 mb-1">工艺合规化的自动纠偏</strong>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    消除外部工艺偏差（如折弯系数 K 因子不一致）。系统自动加载帕威尔标准工艺库，将非标特征（如 R 角、非标孔）强制修正为内部标准。
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <strong className="block text-slate-800 mb-1">数据纯净与安全</strong>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     最终存入帕威尔服务器的不再是充满未知风险的原始文件，而是由系统全新生成的纯净数据，消除了数据后门，实现了完全可编辑性。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
             <button 
               onClick={handleOpenSolidWorks}
               className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-bold shadow-xl shadow-red-500/30 hover:shadow-red-500/40 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
               启动 SolidWorks 转换插件
             </button>
             <p className="text-center text-xs text-slate-400 mt-4 px-4">
               * 需要本地安装 SolidWorks。转换过程将自动打开 SW 并加载 NARI 插件。
             </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden relative group">
           <div className="absolute inset-0 flex items-center justify-center p-8 bg-slate-900/5">
             <img 
               src="images/tpds/sw-conversion.png" 
               alt="SolidWorks Conversion Process" 
               className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition duration-700"
               onError={(e) => {
                 // Fallback placeholder
                 e.currentTarget.src = 'https://placehold.co/800x600/f8fafc/ef4444?text=SolidWorks+Feature+Reconstruction';
               }}
             />
           </div>
           
           {/* Decorative Overlay */}
           <div className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur rounded-2xl border border-slate-100 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-slate-700">Conversion Engine Ready</span>
              </div>
              <div className="space-y-1">
                 <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-red-500"></div>
                 </div>
                 <p className="text-[10px] text-slate-400">Standard Library v2025.1 Loaded</p>
              </div>
           </div>

           <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-slate-200 p-6 flex justify-between items-center">
              <div>
                <h5 className="font-bold text-slate-800">SolidWorks API Integration</h5>
                <p className="text-xs text-slate-500">支持版本: SW 2022 / 2023 / 2024</p>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">Plugin Active</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BusbarConversionIntro;
