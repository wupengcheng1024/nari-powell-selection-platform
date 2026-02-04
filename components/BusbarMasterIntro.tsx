
import React from 'react';

const BusbarMasterIntro: React.FC = () => {
  const handleOpenBusbarSoftware = () => {
    const userAgent = window.navigator.userAgent;
    const isWindows = userAgent.includes('Windows');

    if (isWindows) {
      // 在浏览器中，通常通过自定义 URL Protocol (如 nari-tpds://) 来唤起本地应用
      // 这里模拟唤起过程
      const confirmOpen = window.confirm("检测到 Windows 环境。即将尝试通过 'nari-tpds://' 协议唤起本地安装的铜排大师软件。\n\n请确认您已安装该客户端。");
      if (confirmOpen) {
        window.location.href = "nari-tpds://launch";
      }
    } else {
      alert("系统检测到当前非 Windows 操作系统。\n\n铜排大师 (NARI Busbar Master) 仅支持在 Windows 环境下运行。请切换设备后重试。");
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 shrink-0">
         <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
             <div>
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">铜排大师 (NARI Busbar Master)</h3>
               <p className="text-sm text-slate-500 mt-1">行业领先的母线槽与铜排三维辅助设计软件</p>
             </div>
          </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left Content */}
        <div className="w-1/3 flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              软件核心能力
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <strong className="block text-slate-800">智能拓扑路由</strong>
                  基于电气原理图自动规划母排走向，智能避让结构干涉。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <div>
                  <strong className="block text-slate-800">参数化三维建模</strong>
                  内置 NARI 标准铜排库，支持快速拉伸、折弯、冲孔等参数化操作。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <strong className="block text-slate-800">自动生成加工图</strong>
                  一键导出 DXF 展开图与 CNC 加工代码，无缝对接生产设备。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">4</div>
                <div>
                  <strong className="block text-slate-800">温升与载流仿真</strong>
                  集成物理仿真引擎，实时校验设计方案的电气性能安全性。
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
             <button 
               onClick={handleOpenBusbarSoftware}
               className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               启动铜排大师软件
             </button>
             <p className="text-center text-xs text-slate-400 mt-4 px-4">
               * 仅支持 Windows 操作系统。若未安装客户端，系统将无响应或提示下载。
             </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden relative group">
           <div className="absolute inset-0 flex items-center justify-center p-8">
             <img 
               src="images/tpds/introduction.png" 
               alt="Copper Bar Master Software Interface" 
               className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition duration-700"
               onError={(e) => {
                 e.currentTarget.src = 'https://placehold.co/800x600/f1f5f9/94a3b8?text=Software+Preview+Image';
               }}
             />
           </div>
           <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-slate-200 p-6 flex justify-between items-center">
              <div>
                <h5 className="font-bold text-slate-800">最新版本: V2025.3.1 (Build 8823)</h5>
                <p className="text-xs text-slate-500">更新时间: 2025-06-15</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100">已授权</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BusbarMasterIntro;
