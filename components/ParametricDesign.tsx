import React, { useState, useEffect } from 'react';

interface ParametricDesignProps {
  onPrev: () => void;
  onNext: () => void;
}

type DesignTab = 'dimension' | 'compartments' | 'breaker' | 'door' | 'ventilation' | 'grounding';

// [修改点 1] 定义图片映射表，方便你后续替换成真实图片路径
const IMAGE_MAP = {
  dimension: '../public/images/zhongya/STD-KYN28-IN.png', // 基本尺寸默认图
  compartments: {
    main: '../public/images/placeholders/compartments-main.png', // 隔室划分默认图
    '二次仪表室': '../public/images/placeholders/comp-meter.png',
    '母线室': '../public/images/darametric-design/comp-busbar.png',
    '断路器室': '../public/images/darametric-design/breaker-view1.png',
    '电缆室': '../public/images/darametric-design/comp-cable.png',
  },
  breaker: '../public/images/darametric-design/breaker-view1.png', // 断路器位图
  door: '../public/images/placeholders/door-view.png',       // 仪表门图
  default: '../public/images/zhongya/STD-KYN28-IN.png'       // 兜底默认图
};

const ParametricDesign: React.FC<ParametricDesignProps> = ({ onPrev, onNext }) => {
  const [activeTab, setActiveTab] = useState<DesignTab>('dimension');

  // [修改点 2] 新增预览图状态，初始化为 dimension 对应的图
  const [previewImage, setPreviewImage] = useState<string>(IMAGE_MAP.dimension);

  // [修改点 3] 处理 Tab 切换，同时切换图片
  const handleTabChange = (tab: DesignTab) => {
    setActiveTab(tab);
    // 根据 Tab 类型设置默认图片
    if (tab === 'dimension') setPreviewImage(IMAGE_MAP.dimension);
    else if (tab === 'compartments') setPreviewImage(IMAGE_MAP.compartments.main);
    else if (tab === 'breaker') setPreviewImage(IMAGE_MAP.breaker);
    else if (tab === 'door') setPreviewImage(IMAGE_MAP.door);
    // 其他 Tab 如果没有特定图，可以保持当前或设为默认
  };

  // 隔室数据状态
  const [compartments, setCompartments] = useState([
    { name: '二次仪表室', height: 400, color: 'bg-blue-500/20', borderColor: 'border-blue-500' },
    { name: '母线室', height: 600, color: 'bg-amber-500/20', borderColor: 'border-amber-500' },
    { name: '断路器室', height: 700, color: 'bg-emerald-500/20', borderColor: 'border-emerald-500' },
    { name: '电缆室', height: 500, color: 'bg-slate-500/20', borderColor: 'border-slate-500' },
  ]);

  const renderCompartmentConfig = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between pb-4 border-b">
        <h4 className="font-bold text-slate-800">柜内隔室划分 (Internal Partitioning)</h4>
        <span className="text-xs text-blue-600 font-bold px-2 py-1 bg-blue-50 rounded">总高度: 2200mm</span>
      </div>

      <div className="flex gap-10">
        {/* 参数设置 */}
        <div className="flex-1 space-y-6">
          {compartments.map((comp, idx) => (
            <div
              key={idx}
              // [修改点 4] 添加 cursor-pointer 和 hover 效果，表明可点击
              // 添加 onClick 事件来切换图片
              onClick={() => {
                // 类型断言或检查 key 是否存在于 map 中
                const imgKey = comp.name as keyof typeof IMAGE_MAP.compartments;
                if (IMAGE_MAP.compartments[imgKey]) {
                  setPreviewImage(IMAGE_MAP.compartments[imgKey]);
                }
              }}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md hover:bg-white transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${comp.color.replace('/20', '')}`}></div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{comp.name}</span>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {/* 注意：输入框点击需要阻止冒泡，防止触发外层的图片切换（如果只想点行切换的话，这里可以保留冒泡也行，看体验） */}
                  <input
                    type="number"
                    value={comp.height}
                    onChange={(e) => {
                      const newComps = [...compartments];
                      newComps[idx].height = parseInt(e.target.value) || 0;
                      setCompartments(newComps);
                    }}
                    className="w-20 px-2 py-1 bg-white border border-slate-200 rounded text-xs text-right font-mono"
                  />
                  <span className="text-[10px] text-slate-400">mm</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] text-slate-400 uppercase font-bold mb-1 block">防护等级</label>
                  <select className="w-full text-[10px] p-1.5 border rounded bg-white outline-none">
                    <option>IP2X</option>
                    <option>IP3X</option>
                    <option selected>IP4X</option>
                  </select>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] text-slate-400 uppercase font-bold mb-1 block">泄压方向</label>
                  <select className="w-full text-[10px] p-1.5 border rounded bg-white outline-none">
                    <option>顶部泄压</option>
                    <option>后部泄压</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <h5 className="text-[11px] font-bold text-blue-800 mb-1">设计校验建议</h5>
            <p className="text-[10px] text-blue-600 leading-relaxed">系统检测到“电缆室”空间较为局促，若采用 240mm² 双并电缆，建议高度不低于 600mm。</p>
          </div>
        </div>

        {/* 截面模拟预览 (保持不变) */}
        <div className="w-48 bg-slate-100 rounded-3xl p-4 border border-slate-200 flex flex-col gap-1 shadow-inner relative">
          <div className="absolute -left-12 inset-y-0 flex flex-col justify-between py-4 text-[10px] text-slate-400 font-mono">
            <span>2200</span>
            <span>1100</span>
            <span>0</span>
          </div>
          {compartments.map((comp, idx) => (
            <div
              key={idx}
              // 这里也可以加点击事件，让用户点右侧柱状图也能切换预览
              onClick={() => {
                const imgKey = comp.name as keyof typeof IMAGE_MAP.compartments;
                if (IMAGE_MAP.compartments[imgKey]) setPreviewImage(IMAGE_MAP.compartments[imgKey]);
              }}
              className={`${comp.color} ${comp.borderColor} border-2 rounded-xl flex items-center justify-center text-center transition-all duration-500 group relative hover:brightness-95 cursor-pointer`}
              style={{ flex: comp.height }}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-600 truncate px-2">{comp.name}</span>
                <span className="text-[8px] text-slate-500 font-mono">{comp.height}mm</span>
              </div>
              <div className="absolute -bottom-0.5 left-0 right-0 h-1 bg-slate-300 opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDimensionConfig = () => (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* ... (renderDimensionConfig 内容保持不变) ... */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h4 className="font-bold text-slate-800">外形基本参数 - KYN28A</h4>
        <span className="text-xs text-slate-400">最后同步于: 2分钟前</span>
      </div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 font-medium">柜体宽度 (W)</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={800} className="w-24 px-3 py-1.5 border rounded-lg text-right outline-none focus:ring-2 focus:ring-blue-500/20" />
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 font-medium">柜体高度 (H)</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={2200} className="w-24 px-3 py-1.5 border rounded-lg text-right outline-none focus:ring-2 focus:ring-blue-500/20" />
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 font-medium">柜体深度 (D)</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={1450} className="w-24 px-3 py-1.5 border rounded-lg text-right outline-none focus:ring-2 focus:ring-blue-500/20" />
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 font-medium">板材材质</label>
            <select className="w-40 px-3 py-1.5 border rounded-lg text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500/20">
              <option>敷铝锌板 (标准)</option>
              <option>Q235-A (普碳钢)</option>
              <option>SUS304 (不锈钢)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 font-medium">主要板厚 (T)</label>
            <div className="flex items-center gap-2">
              <select className="w-24 px-3 py-1.5 border rounded-lg text-sm outline-none bg-white">
                <option>1.5</option>
                <option selected>2.0</option>
                <option>2.5</option>
              </select>
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 font-medium">折弯系数 (K)</label>
            <div className="flex items-center gap-2">
              <input type="number" step="0.01" defaultValue={0.44} className="w-24 px-3 py-1.5 border rounded-lg text-right outline-none" />
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-orange-50 border border-orange-100 p-6 rounded-2xl flex gap-4">
        <div className="text-orange-600 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <div>
          <h5 className="text-orange-800 font-bold text-sm uppercase tracking-tight">参数规则冲突提醒 (Rule Engine)</h5>
          <p className="text-orange-700 text-xs mt-1 leading-relaxed">当前柜宽 800mm 与内部断路器导轨 VSI(12kV) 存在理论避让间距不足警告。建议增加隔板间距或调整设计公差。</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">柜体参数化详细设计 <span className="text-blue-600 font-mono text-sm ml-2">Sheet Metal AutoGen</span></h3>
          <p className="text-slate-500 text-sm mt-1">定义柜体结构、隔室细节及开孔规则，系统将实时驱动 CAD 引擎生成模型</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition">AI 自动化建模助手</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* 左侧导航 - [修改点 5] onClick 改为调用 handleTabChange */}
        <div className="w-72 bg-white rounded-2xl border border-slate-200 overflow-y-auto p-4 space-y-4 shadow-sm">
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2">Design Explorer</h4>
          <nav className="space-y-1">
            <button
              onClick={() => handleTabChange('dimension')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'dimension' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              基本尺寸与外形
            </button>
            <button
              onClick={() => handleTabChange('compartments')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'compartments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              柜内隔室划分
            </button>
            <button
              onClick={() => handleTabChange('breaker')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'breaker' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              断路器安装位
            </button>
            <button
              onClick={() => handleTabChange('door')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'door' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              二次仪表门设计
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-300 cursor-not-allowed">通风与散热孔</button>
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-300 cursor-not-allowed">接地与底座</button>
          </nav>
        </div>

        {/* 主配置区 */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-8 overflow-y-auto shadow-sm">
          {activeTab === 'dimension' ? renderDimensionConfig() :
            activeTab === 'compartments' ? renderCompartmentConfig() :
              <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-pulse">
                <div className="text-4xl mb-4">⚙️</div>
                <p className="font-bold">该模块配置逻辑正在载入中...</p>
              </div>}
        </div>

        {/* 3D 实时预览 */}
        <div className="w-[450px] bg-slate-900 rounded-3xl border border-slate-800 relative group overflow-hidden flex flex-col shadow-2xl">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="px-3 py-1 bg-blue-600/20 backdrop-blur border border-blue-500/30 rounded-full text-[9px] text-blue-400 font-bold uppercase tracking-widest font-mono">Real-time CAD Sync</div>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <button className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl text-white/60 hover:text-white transition shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black">
            {/* [修改点 6] src 绑定 previewImage 状态 */}
            <img
              src={previewImage}
              className="max-h-full max-w-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.2)] group-hover:scale-105 transition duration-500"
              alt="3D Real-time Model"
              onError={(e) => {
                // 图片加载失败时回退到默认图，防止占位符 404 导致裂图
                e.currentTarget.src = IMAGE_MAP.default;
              }}
            />
          </div>
          <div className="h-12 bg-black/40 border-t border-slate-800/50 flex items-center justify-between px-6 text-[9px] font-mono tracking-tighter text-slate-500 uppercase">
            <span>Layers: Structure | Cutouts | Internal</span>
            <span className="text-blue-500">SolidWorks Ready</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mt-4">
        <button onClick={onPrev} className="px-8 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95">返回上一步</button>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> 结构合规性校验已通过</span>
          <button onClick={onNext} className="px-12 py-2.5 nari-bg text-white rounded-xl font-extrabold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95">生成钣金图纸并进入铜排设计</button>
        </div>
      </div>
    </div>
  );
};

export default ParametricDesign;