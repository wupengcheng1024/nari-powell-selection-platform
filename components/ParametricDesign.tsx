
import React from 'react';

interface ParametricDesignProps {
  onPrev: () => void;
  onNext: () => void;
}

const ParametricDesign: React.FC<ParametricDesignProps> = ({ onPrev, onNext }) => {
  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800">柜体参数化详细设计 (钣金自动化)</h3>
          <p className="text-slate-500 text-sm">定义柜体结构、隔室细节、门型及孔位规则，实时生成 3D 钣金模型</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-blue-600 font-medium hover:underline">查看设计规范 AI 助手</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="w-72 bg-white rounded-xl border border-slate-200 overflow-y-auto p-4 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">设计目录</h4>
          <nav className="space-y-1">
            <a href="#" className="block px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">基本尺寸与外形</a>
            <a href="#" className="block px-3 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm transition">柜内隔室划分</a>
            <a href="#" className="block px-3 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm transition">断路器安装位</a>
            <a href="#" className="block px-3 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm transition">二次仪表门设计</a>
            <a href="#" className="block px-3 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm transition">通风与散热孔</a>
            <a href="#" className="block px-3 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm transition">接地与底座</a>
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <h4 className="font-bold text-slate-800">外形基本参数 - KYN28A</h4>
            <span className="text-xs text-slate-400">最后同步于: 2分钟前</span>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">柜体宽度 (W)</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={800} className="w-24 px-3 py-1 border rounded text-right outline-none focus:ring-1 focus:ring-blue-500" />
                  <span className="text-xs text-slate-400">mm</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">柜体高度 (H)</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={2200} className="w-24 px-3 py-1 border rounded text-right outline-none focus:ring-1 focus:ring-blue-500" />
                  <span className="text-xs text-slate-400">mm</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">柜体深度 (D)</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={1450} className="w-24 px-3 py-1 border rounded text-right outline-none focus:ring-1 focus:ring-blue-500" />
                  <span className="text-xs text-slate-400">mm</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">板材材质</label>
                <select className="w-40 px-3 py-1 border rounded text-sm outline-none">
                  <option>Q235-A (普碳钢)</option>
                  <option>SUS304 (不锈钢)</option>
                  <option>敷铝锌板</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">主要板厚 (T)</label>
                <div className="flex items-center gap-2">
                  <select className="w-24 px-3 py-1 border rounded text-sm outline-none">
                    <option>1.5</option>
                    <option>2.0</option>
                    <option>2.5</option>
                  </select>
                  <span className="text-xs text-slate-400">mm</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">折弯系数 (K)</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.01" defaultValue={0.44} className="w-24 px-3 py-1 border rounded text-right outline-none" />
                  <span className="text-xs text-slate-400">mm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-orange-50 border border-orange-100 p-6 rounded-xl flex gap-4">
             <div className="text-orange-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             </div>
             <div>
               <h5 className="text-orange-800 font-bold text-sm">参数校验提醒 (Rule Engine)</h5>
               <p className="text-orange-700 text-xs mt-1">当前柜宽 800mm 与所选断路器型号 VSI(12kV) 存在空间冲突警告。建议增加隔板间距或调整至 1000mm 柜宽。</p>
             </div>
          </div>
        </div>

        <div className="w-96 bg-slate-900 rounded-xl border border-slate-800 relative group overflow-hidden flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="p-2 bg-slate-800/80 backdrop-blur rounded shadow text-white/60 hover:text-blue-400 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>
          </div>
          <img src="input_file_2.png" className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition duration-700" alt="3D Real-time Model" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 to-transparent p-4 text-center text-[10px] text-white/40 font-mono tracking-widest">
            SOLIDWORKS CAD POOL READY | RT-SYNC ENABLED
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-600 bg-white hover:bg-slate-50 transition">上一步</button>
        <button onClick={onNext} className="px-10 py-2 nari-bg text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition">生成 3D 模型并进入铜排设计</button>
      </div>
    </div>
  );
};

export default ParametricDesign;
