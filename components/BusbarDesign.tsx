
import React, { useState } from 'react';

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
  
  // 驱动选型数据状态
  const [busbarConfig, setBusbarConfig] = useState({
    material: 'TMY (T2紫铜排)',
    size: '100x10',
    plating: '镀锡',
    phaseSpacing: '125',
    ratedCurrent: 3150
  });

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
    if (generationProgress < 50) return "计算主母排载流量与温升...";
    if (generationProgress < 75) return "生成相位打断与连接件模型...";
    return "校验电气间隙与爬电距离...";
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">铜排数字化设计 <span className="text-blue-600 font-mono text-sm ml-2">Busbar Algorithm Engine</span></h3>
          <p className="text-slate-500 text-sm mt-1">主母排自动拓扑路由与分支排 AI 辅助生成系统</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 border border-slate-200 text-sm rounded-xl bg-white font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm">导入 ERP 实时铜价</button>
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 nari-bg text-white text-sm rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95">母线贯通/打断配置</button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden relative flex">
        {/* 工具栏 */}
        <div className="absolute top-8 left-8 flex flex-col gap-3 z-20">
          <button className="w-12 h-12 bg-slate-800/80 backdrop-blur rounded-2xl flex items-center justify-center text-blue-400 border border-slate-700 hover:bg-slate-700 hover:scale-105 transition shadow-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg></button>
          <button className="w-12 h-12 bg-slate-800/80 backdrop-blur rounded-2xl flex items-center justify-center text-slate-400 border border-slate-700 hover:bg-slate-700 hover:scale-105 transition shadow-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></button>
        </div>

        {/* 3D 可视化区 */}
        <div className="flex-1 flex items-center justify-center p-12 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black relative">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-8 z-20">
               <div className="relative w-40 h-40">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                   <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={477} strokeDashoffset={477 - (477 * generationProgress) / 100} className="text-blue-500 transition-all duration-300" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-3xl font-mono">{generationProgress}%</div>
               </div>
               <div className="text-center">
                 <h4 className="text-white font-bold text-xl mb-2">{getGenerationMessage()}</h4>
                 <p className="text-slate-500 text-xs font-mono">NARI-CLOUD GPU RENDERING ENGINE ACTIVE</p>
               </div>
            </div>
          ) : (
            <div className="relative w-full max-w-5xl h-96 border border-slate-700/50 rounded-[3rem] shadow-inner flex flex-col items-center justify-center overflow-hidden bg-slate-900/40">
               {/* 标尺背景 */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               
               {/* 模拟母排主体 */}
               <div className="w-full h-32 relative flex items-center justify-center group cursor-grab">
                 <div className={`w-[92%] h-24 rounded-lg relative transition-all duration-1000 ${isGenerated ? 'bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-[0_0_60px_rgba(249,115,22,0.3)] border-y-4 border-orange-300' : 'bg-orange-600/10 border-y-2 border-orange-500'}`}>
                    {/* 相位分层效果 */}
                    <div className="absolute inset-0 flex flex-col justify-around py-1 opacity-20">
                       <div className="h-4 bg-black/40 w-full"></div>
                       <div className="h-4 bg-black/40 w-full"></div>
                       <div className="h-4 bg-black/40 w-full"></div>
                    </div>
                    {/* 支撑绝缘子模拟点 */}
                    <div className="absolute inset-0 flex items-center justify-around px-8">
                       {Array.from({length: 8}).map((_, i) => (
                         <div key={i} className={`w-6 h-6 rounded-lg border-2 transition-all duration-700 ${isGenerated ? 'bg-slate-900 border-orange-300 scale-110 shadow-[0_0_20px_orange]' : 'bg-slate-800 border-orange-600'}`}></div>
                       ))}
                    </div>
                 </div>
               </div>
               
               {/* 节点控制层 */}
               <div className="absolute inset-0 flex items-center justify-between px-16 pointer-events-none">
                  {joints.map((j) => (
                    <div key={j.id} className="relative h-full flex items-center group/joint pointer-events-auto cursor-pointer">
                      <div className={`w-[1px] h-48 transition-all ${j.isBroken ? 'border-l-2 border-dashed border-red-500/60' : isGenerated ? 'border-l-2 border-blue-500/40' : 'border-l border-white/5'}`}>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded bg-slate-800 border text-[9px] font-bold font-mono transition-opacity ${j.isBroken ? 'text-red-400 border-red-500/50' : 'text-blue-400 border-blue-500/50 opacity-0 group-hover/joint:opacity-100'}`}>
                          {j.isBroken ? 'GAP:10mm' : `ID:${j.id}`}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-[10px] font-mono tracking-widest uppercase">
                 Interactive 3D Viewport - V2025.0
               </div>
            </div>
          )}
        </div>

        {/* 右侧：驱动选型选型看板 */}
        <div className="w-[360px] bg-slate-900/90 border-l border-slate-700/50 p-8 flex flex-col gap-8 backdrop-blur-md">
          <section>
            <h4 className="text-white font-extrabold text-xs mb-6 pb-2 border-b border-slate-800 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              母排驱动选型配置
            </h4>
            <div className="space-y-5 text-[11px]">
              <div>
                <label className="text-slate-500 uppercase font-bold mb-2 block tracking-tight">导体材质 (Material)</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 text-blue-400 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={busbarConfig.material}
                  onChange={(e) => setBusbarConfig({...busbarConfig, material: e.target.value})}
                >
                  <option>TMY (T2紫铜排)</option>
                  <option>LMY (硬铝母排)</option>
                  <option>TMY-Q (低氧铜)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500 uppercase font-bold mb-2 block tracking-tight">截面规格 (Spec)</label>
                <div className="flex gap-2">
                  <select className="flex-1 bg-slate-800 border border-slate-700 text-blue-400 p-2.5 rounded-xl outline-none">
                    <option>TMY-3(80x10)</option>
                    <option selected>TMY-3(100x10)</option>
                    <option>TMY-3(120x10)</option>
                    <option>TMY-3(2x100x10)</option>
                  </select>
                  <button className="px-3 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl hover:text-white transition">📏</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-500 uppercase font-bold mb-2 block tracking-tight">表面处理</label>
                  <select className="w-full bg-slate-800 border border-slate-700 text-blue-400 p-2.5 rounded-xl outline-none">
                    <option>镀锡 (标配)</option>
                    <option>镀银 (高性能)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 uppercase font-bold mb-2 block tracking-tight">相间距 (mm)</label>
                  <input type="number" defaultValue={125} className="w-full bg-slate-800 border border-slate-700 text-blue-400 p-2.5 rounded-xl outline-none text-center" />
                </div>
              </div>
            </div>
          </section>

          {/* 实时校验选型看板 */}
          <section className="bg-black/30 p-5 rounded-3xl border border-slate-800 shadow-inner">
             <h4 className="text-slate-500 font-bold text-[10px] mb-4 uppercase tracking-widest">仿真校验选型数据 (Calculated)</h4>
             <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px]">额定载流量 (Ir)</span>
                  <span className="text-emerald-500 font-bold text-sm">3150 A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px]">校验温升 (ΔT)</span>
                  <span className={`text-sm font-bold ${isGenerated ? 'text-blue-400' : 'text-slate-600'}`}>+42.5 K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px]">动稳定峰值 (Ipk)</span>
                  <span className="text-slate-300 font-bold text-sm">80 kA</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
                   <div className={`h-full bg-blue-500 transition-all duration-1000 ${isGenerated ? 'w-4/5' : 'w-0'}`}></div>
                </div>
                <p className="text-[9px] text-slate-600 mt-2 leading-tight font-sans italic">系统已根据 3150A 负载自动推荐最佳导体截面，并已通过 GB/T 标准校验。</p>
             </div>
          </section>

          <div className="mt-auto space-y-3">
            {!isGenerated ? (
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 nari-bg text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? '正在执行设计规则引擎...' : '驱动生成全柜主母排'}
              </button>
            ) : (
              <button 
                onClick={() => setIsGenerated(false)}
                className="w-full py-4 border border-blue-500/50 text-blue-400 font-extrabold rounded-2xl hover:bg-blue-500/10 transition"
              >
                重置驱动选型参数
              </button>
            )}
            <div className="flex gap-2">
               <button className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-xl hover:text-white border border-slate-700 flex items-center justify-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 导下料清单
               </button>
               <button className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-xl hover:text-white border border-slate-700 flex items-center justify-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 导出 3D 模型
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mt-4">
        <button onClick={onPrev} className="px-8 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95">返回上一步</button>
        <div className="flex items-center gap-4">
           <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 italic"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div> 算法已完成主回路电气安全冗余校验 (Factor: 1.25)</span>
           <button onClick={onNext} disabled={!isGenerated} className={`px-12 py-2.5 rounded-xl font-extrabold shadow-xl transition active:scale-95 ${isGenerated ? 'nari-bg text-white hover:bg-blue-700 shadow-blue-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
             确认为最终设计并导出成果
           </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
              <h4 className="text-xl font-black text-slate-800">柜间贯通/打断配置 (Link Topology)</h4>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-200 rounded-2xl transition"><svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b">
                  <tr><th className="px-6 py-4">柜位节点</th><th className="px-6 py-4 text-center">间距 (mm)</th><th className="px-6 py-4 text-right">模式</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {joints.map((joint) => (
                    <tr key={joint.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-5 font-bold text-slate-700">{joint.fromCabinet} ➔ {joint.toCabinet}</td>
                      <td className="px-6 py-5 text-center">
                        <input type="number" className="w-20 px-3 py-1 border rounded-lg text-center font-mono text-xs focus:ring-2 focus:ring-blue-500/20 outline-none" value={joint.spacing} onChange={(e) => updateJoint(joint.id, 'spacing', parseInt(e.target.value) || 0)} />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => updateJoint(joint.id, 'isBroken', !joint.isBroken)} 
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${joint.isBroken ? 'bg-red-50 text-red-600 border-red-200 shadow-sm' : 'bg-green-50 text-green-600 border-green-200'}`}
                        >
                          {joint.isBroken ? '隔离打断 (Gap)' : '母线贯通 (Linked)'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 border-t bg-slate-50/80 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:bg-white transition">返回取消</button>
              <button onClick={handleGenerate} className="px-12 py-2.5 nari-bg text-white rounded-xl text-sm font-extrabold shadow-lg hover:bg-blue-700">更新并重新计算</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusbarDesign;
