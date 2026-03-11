
import React, { useState } from 'react';

interface BusbarDesignProps {
  onPrev: () => void;
  onNext: () => void;
}

const BusbarDesign: React.FC<BusbarDesignProps> = ({ onPrev, onNext }) => {
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

  // 新增：铜排结构参数状态
  const [structureParams, setStructureParams] = useState({
    insulatorHeight: 130,
    insulatorSpec: 'SM76',
    bushingSpacing: 280
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // 优化：目标时间 2.5秒 (2500ms)
    // 使用 50ms 间隔，减少渲染次数，提高流畅度
    // 2500ms / 50ms = 50次更新
    // 100% / 50次 = 每次增加 2%
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsGenerated(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const getGenerationMessage = () => {
    if (generationProgress < 25) return "同步绝缘子与套管结构参数...";
    if (generationProgress < 50) return "更新支撑位置与安装孔位...";
    if (generationProgress < 75) return "调整母排折弯路径以适配新间距...";
    return "重新生成子装配体三维模型...";
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
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden relative flex">
        {/* 工具栏 */}
        <div className="absolute top-8 left-8 flex flex-col gap-3 z-20">
          <button className="w-12 h-12 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-blue-600 border border-slate-200 hover:bg-slate-50 hover:scale-105 transition shadow-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg></button>
          <button className="w-12 h-12 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200 hover:bg-slate-50 hover:scale-105 transition shadow-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></button>
        </div>

        {/* 3D 可视化区 */}
        <div className="flex-1 flex items-center justify-center p-12 bg-slate-50 relative min-w-0 min-h-0 overflow-hidden">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-8 z-20">
              <div className="relative w-40 h-40">
                {/* Added viewBox to prevent clipping */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                  {/* Circumference = 2 * PI * 70 ≈ 440 */}
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * generationProgress) / 100} strokeLinecap="round" className="text-blue-600 transition-all duration-75 ease-linear" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800 text-3xl font-mono">{generationProgress}%</div>
              </div>
              <div className="text-center">
                <h4 className="text-slate-800 font-bold text-xl mb-2">{getGenerationMessage()}</h4>
                <p className="text-slate-400 text-xs font-mono">Xxxx-CLOUD GPU RENDERING ENGINE ACTIVE</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="images/darametric-design/comp-busbar_1200*800.png"
                // 缩放
                style={{ transform: 'scale(0.8)' }}
                alt="Busbar 3D Structure"
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1200x800/ffffff/e2e8f0?text=Busbar+3D+Structure+Preview';
                }}
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-[10px] font-mono tracking-widest uppercase bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm border border-slate-200">
                Interactive 3D Viewport - V2025.0
              </div>
            </div>
          )}
        </div>

        {/* 右侧：驱动选型选型看板 */}
        <div className="w-[360px] bg-slate-900 border-l border-slate-800 p-8 flex flex-col gap-8 shadow-2xl z-10">
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
                  onChange={(e) => setBusbarConfig({ ...busbarConfig, material: e.target.value })}
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

          {/* 铜排参数输入 */}
          <section className="bg-black/30 p-5 rounded-3xl border border-slate-800 shadow-inner">
            <h4 className="text-slate-500 font-bold text-[10px] mb-4 uppercase tracking-widest">铜排结构参数 (Structure Params)</h4>
            <div className="space-y-4 text-[11px]">
              <div>
                <label className="text-slate-500 uppercase font-bold mb-1.5 block tracking-tight">绝缘子高度 (Height)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-xl outline-none focus:border-blue-500 transition font-mono"
                    value={structureParams.insulatorHeight}
                    onChange={(e) => setStructureParams({ ...structureParams, insulatorHeight: parseInt(e.target.value) || 0 })}
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500 text-[10px]">mm</span>
                </div>
              </div>

              <div>
                <label className="text-slate-500 uppercase font-bold mb-1.5 block tracking-tight">绝缘子规格 (Spec)</label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                  value={structureParams.insulatorSpec}
                  onChange={(e) => setStructureParams({ ...structureParams, insulatorSpec: e.target.value })}
                >
                  <option>SM76</option>
                  <option>SM51</option>
                  <option>SM40</option>
                  <option>SM35</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 uppercase font-bold mb-1.5 block tracking-tight">穿墙套管间距 (Spacing)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-xl outline-none focus:border-blue-500 transition font-mono"
                    value={structureParams.bushingSpacing}
                    onChange={(e) => setStructureParams({ ...structureParams, bushingSpacing: parseInt(e.target.value) || 0 })}
                  />
                  <span className="absolute right-3 top-2.5 text-slate-500 text-[10px]">mm</span>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-auto space-y-3">
            {!isGenerated ? (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 xxxx-bg text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? '正在更新子装配...' : '驱动更新子装配'}
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
          <button onClick={onNext} disabled={!isGenerated} className={`px-12 py-2.5 rounded-xl font-extrabold shadow-xl transition active:scale-95 ${isGenerated ? 'xxxx-bg text-white hover:bg-blue-700 shadow-blue-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
            完成设计并进入主母排拼柜
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusbarDesign;
