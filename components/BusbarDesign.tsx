
import React, { useState, useEffect } from 'react';

interface BusbarDesignProps {
  onPrev: () => void;
  onNext: () => void;
}

interface CabinetJoint {
  id: string;
  fromCabinet: string;
  toCabinet: string;
  spacing: number;
  isBroken: boolean;
}

const BusbarDesign: React.FC<BusbarDesignProps> = ({ onPrev, onNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const [joints, setJoints] = useState<CabinetJoint[]>([
    { id: 'J1', fromCabinet: '#1 进线', toCabinet: '#2 馈线', spacing: 0, isBroken: false },
    { id: 'J2', fromCabinet: '#2 馈线', toCabinet: '#3 馈线', spacing: 0, isBroken: false },
    { id: 'J3', fromCabinet: '#3 馈线', toCabinet: '#4 联络', spacing: 10, isBroken: true },
    { id: 'J4', fromCabinet: '#4 联络', toCabinet: '#5 PT柜', spacing: 0, isBroken: false },
    { id: 'J5', fromCabinet: '#5 PT柜', toCabinet: '#6 馈线', spacing: 0, isBroken: false },
    { id: 'J6', fromCabinet: '#6 馈线', toCabinet: '#7 计量', spacing: 0, isBroken: false },
    { id: 'J7', fromCabinet: '#7 计量', toCabinet: '#8 进线', spacing: 10, isBroken: true },
  ]);

  const updateJoint = (id: string, field: keyof CabinetJoint, value: any) => {
    setJoints(prev => prev.map(j => j.id === id ? { ...j, [field]: value } : j));
  };

  const handleGenerate = () => {
    setIsModalOpen(false);
    setIsGenerating(true);
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsGenerated(true);
          return 100;
        }
        return prev + 4;
      });
    }, 120);
  };

  const getGenerationMessage = () => {
    if (generationProgress < 25) return "解析 8 面柜体拼接拓扑...";
    if (generationProgress < 50) return "计算主母排 TMY-3(100x10) 载流量...";
    if (generationProgress < 75) return "正在生成 J3/J7 段绝缘打断支架模型...";
    return "校验相位间距与电气爬电距离...";
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800">铜排数字化设计 (Busbar Engine)</h3>
          <p className="text-slate-500 text-sm">主母排自动拼柜路由与分支排路径 3D 辅助布线</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 text-sm rounded bg-white hover:bg-slate-50 transition">导入 PLM 元器件</button>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 nari-bg text-white text-sm rounded font-bold shadow-md hover:bg-blue-700 transition">主母排生成</button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative flex">
        <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
          <button className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 border border-slate-700 hover:bg-slate-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg></button>
          <button className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 border border-slate-700 hover:bg-slate-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></button>
        </div>

        <div className="flex-1 flex items-center justify-center p-12 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 relative">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-6 z-20">
               <div className="relative w-32 h-32">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                   <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * generationProgress) / 100} className="text-blue-500 transition-all duration-300" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-2xl">{generationProgress}%</div>
               </div>
               <div className="text-center">
                 <h4 className="text-white font-bold text-lg mb-1">{getGenerationMessage()}</h4>
                 <p className="text-slate-400 text-xs">正在调用 NARI-CLOUD-3D 算力中心</p>
               </div>
            </div>
          ) : (
            <div className="relative w-full max-w-4xl h-80 border border-slate-700 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
                 {Array.from({length: 72}).map((_, i) => <div key={i} className="border-[0.5px] border-white"></div>)}
               </div>
               
               <div className={`w-11/12 h-20 rounded relative transition-all duration-1000 ${isGenerated ? 'bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)] border-y-4 border-orange-400' : 'bg-orange-600/10 border-y-2 border-orange-500'}`}>
                  <div className="absolute inset-0 flex items-center justify-around px-8">
                     {Array.from({length: 8}).map((_, i) => (
                       <div key={i} className={`w-4 h-4 rounded-full border transition-all duration-500 ${isGenerated ? 'bg-slate-900 border-orange-300 scale-125 shadow-[0_0_10px_orange]' : 'bg-slate-700 border-orange-500'}`}></div>
                     ))}
                  </div>
               </div>
               
               <div className="absolute inset-0 flex items-center justify-between px-12 pointer-events-none">
                  {joints.map((j) => (
                    <div key={j.id} className="relative h-full flex items-center">
                      <div className={`w-[2px] h-32 transition-all ${j.isBroken ? 'border-l-2 border-dashed border-red-500' : isGenerated ? 'border-l-2 border-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-l border-white/10'}`}>
                        <div className="text-[8px] font-bold text-white bg-slate-800/80 px-1.5 py-0.5 rounded transform -rotate-90 whitespace-nowrap -translate-x-1/2">
                          {j.spacing}mm {j.isBroken ? '打断' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        <div className="w-80 bg-slate-800 border-l border-slate-700 p-6 flex flex-col">
          <h4 className="text-white font-bold text-sm mb-6 pb-2 border-b border-slate-700 uppercase tracking-widest">Busbar Specs</h4>
          <div className="space-y-6 text-xs text-slate-400">
            <div>
              <label className="block mb-2 font-bold uppercase tracking-wider">母排型号</label>
              <div className="p-3 bg-slate-900 rounded border border-slate-700 text-blue-400 font-mono shadow-inner">TMY-3(100x10)</div>
            </div>
            <div>
              <label className="block mb-2 font-bold uppercase tracking-wider">支路连接</label>
              <div className="p-2 bg-slate-900/50 rounded text-[10px] leading-relaxed">
                <span className="text-green-500">✔</span> 已自动生成 #1~#8 进线侧分支排<br/>
                <span className="text-orange-500">⚠</span> #4 联络柜相位间隙需人工校验
              </div>
            </div>
            <div className="pt-6 border-t border-slate-700 mt-auto flex flex-col gap-3">
              <button className="w-full py-3 nari-bg text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95" onClick={() => setIsModalOpen(true)}>配置并重新生成</button>
              <button className="w-full py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition flex items-center justify-center gap-2 text-[10px]"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>导出 DXF (Phase A-C)</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-600 bg-white hover:bg-slate-50 transition">上一步</button>
        <button onClick={onNext} disabled={!isGenerated} className={`px-10 py-2 rounded-lg font-bold shadow-lg transition ${isGenerated ? 'nari-bg text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>完成主母排并导出 BOM</button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h4 className="text-xl font-bold text-slate-800">柜间贯通/打断配置</h4>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition"><svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <tr><th className="px-6 py-4">节点</th><th className="px-6 py-4 text-center">间距(mm)</th><th className="px-6 py-4 text-center">模式</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {joints.map((joint) => (
                    <tr key={joint.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{joint.fromCabinet} ➔ {joint.toCabinet}</td>
                      <td className="px-6 py-4 text-center">
                        <input type="number" className="w-16 px-2 py-1 border rounded text-center text-xs" value={joint.spacing} onChange={(e) => updateJoint(joint.id, 'spacing', parseInt(e.target.value) || 0)} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => updateJoint(joint.id, 'isBroken', !joint.isBroken)} className={`px-4 py-1 rounded-full text-[10px] font-bold border ${joint.isBroken ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-50 text-green-600 border-green-200'}`}>{joint.isBroken ? '隔离打断' : '母线贯通'}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:bg-white transition">放弃</button>
              <button onClick={handleGenerate} className="px-10 py-2 nari-bg text-white rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700">生成主母排方案</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusbarDesign;
