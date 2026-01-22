
import React, { useState } from 'react';
import { StandardTemplate } from '../types';

interface CabinetSelectionProps {
  onPrev: () => void;
  onNext: () => void;
}

const CabinetSelection: React.FC<CabinetSelectionProps> = ({ onPrev, onNext }) => {
  const standardTemplates: StandardTemplate[] = [
    { id: 'S001', name: 'KYN28A-12 进线柜方案', code: 'STD-IN-01', type: '进线柜', description: '标准 1250A 进线方案，集成 VSI 断路器', tags: ['1250A', '进线'], imageUrl: 'input_file_0.png' },
    { id: 'S002', name: 'KYN28A-12 馈线柜方案', code: 'STD-OUT-01', type: '馈线柜', description: '标准 630A 馈线方案，含 CT/接地开关', tags: ['630A', '馈线'], imageUrl: 'input_file_1.png' },
    { id: 'S003', name: 'KYN28A-12 PT柜方案', code: 'STD-PT-01', type: 'PT柜', description: '高精度电压互感器方案', tags: ['PT', '测量'], imageUrl: 'input_file_2.png' },
    { id: 'S004', name: 'KYN28A-12 联络柜方案', code: 'STD-TIE-01', type: '联络柜', description: '2500A 母线联络方案', tags: ['2500A', '联络'], imageUrl: 'input_file_3.png' },
    { id: 'S005', name: 'KYN28A-12 计量柜方案', code: 'STD-MET-01', type: '计量柜', description: '关口表计量专用柜', tags: ['计量', '高精'], imageUrl: 'input_file_0.png' },
  ];

  const [cabinets, setCabinets] = useState([
    { id: '#1', type: '进线柜', code: '700-001', matched: 'STD-IN-01', score: 99, img: 'input_file_0.png', function: '主进线', incoming: '电缆底进', outgoing: '母线排', components: 'VSI-12/1250, CT-10kV' },
    { id: '#2', type: '馈线柜', code: '700-002', matched: 'STD-OUT-01', score: 98, img: 'input_file_1.png', function: '馈电1回路', incoming: '母线排', outgoing: '电缆底出', components: 'VSI-12/630, JDZ-10' },
    { id: '#3', type: '馈线柜', code: '700-003', matched: 'STD-OUT-01', score: 98, img: 'input_file_1.png', function: '馈电2回路', incoming: '母线排', outgoing: '电缆底出', components: 'VSI-12/630' },
    { id: '#4', type: '联络柜', code: '700-004', matched: 'STD-TIE-01', score: 95, img: 'input_file_3.png', function: '母线分段', incoming: '左段母线', outgoing: '右段母线', components: 'GN19-12' },
    { id: '#5', type: 'PT柜', code: '700-005', matched: 'STD-PT-01', score: 92, img: 'input_file_2.png', function: '母线测量', incoming: '母线插接', outgoing: '无', components: 'REL670, JDZ-10' },
    { id: '#6', type: '馈线柜', code: '700-006', matched: 'STD-OUT-01', score: 98, img: 'input_file_1.png', function: '馈电3回路', incoming: '母线排', outgoing: '电缆底出', components: 'VSI-12/630' },
    { id: '#7', type: '计量柜', code: '700-007', matched: 'STD-MET-01', score: 88, img: 'input_file_0.png', function: '电能计量', incoming: '母线排', outgoing: '母线排', components: '高精CT' },
    { id: '#8', type: '进线柜', code: '700-008', matched: 'STD-IN-01', score: 99, img: 'input_file_0.png', function: '二路进线', incoming: '电缆顶进', outgoing: '母线排', components: 'VSI-12/1250' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(0);

  const openSelectionModal = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingIndex(-1);
    setIsModalOpen(true);
  };

  const selectTemplate = (template: StandardTemplate) => {
    if (editingIndex === -1) {
      const nextId = `#${cabinets.length + 1}`;
      const newCabinet = {
        id: nextId,
        type: template.type,
        code: `GEN-${Date.now().toString().slice(-4)}`,
        matched: template.code,
        score: 100,
        img: template.imageUrl,
        function: template.type,
        incoming: '电缆底进',
        outgoing: '电缆底出',
        components: '标准元器件清单'
      };
      setCabinets([...cabinets, newCabinet]);
    } else if (editingIndex !== null) {
      const newCabinets = [...cabinets];
      newCabinets[editingIndex] = {
        ...newCabinets[editingIndex],
        type: template.type,
        matched: template.code,
        img: template.imageUrl,
        score: 100
      };
      setCabinets(newCabinets);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 relative">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800">柜型自动匹配与布局预置</h3>
          <p className="text-slate-500 text-sm">已检测到 8 面柜位，基于解析的一次图自动识别柜位并推荐最优标准模板</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 text-sm rounded bg-white hover:bg-slate-50 transition font-bold text-slate-600">批量刷新匹配</button>
          <button className="px-4 py-2 border border-slate-200 text-sm rounded bg-white hover:bg-slate-50 transition font-bold text-slate-600">导出工程快照</button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden flex flex-col">
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
          {cabinets.map((c, index) => (
            <div 
              key={index} 
              onClick={() => setEditingIndex(index)}
              className={`min-w-[180px] border rounded-xl p-4 transition cursor-pointer relative group/card ${editingIndex === index ? 'border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-400 bg-slate-50/50'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${editingIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{c.id}</span>
                <span className={`text-[9px] font-bold px-1.5 rounded ${c.score >= 95 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
                  {c.score}%
                </span>
              </div>
              <div className="aspect-[3/4] bg-slate-900 rounded-lg border border-slate-100 mb-3 flex items-center justify-center overflow-hidden">
                <img src={c.img} alt="Cabinet Preview" className="w-full h-full object-contain p-2 group-hover/card:scale-110 transition duration-500" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 truncate">{c.type}</h4>
              <p className="text-[9px] text-slate-400 font-mono mb-2 truncate">{c.matched}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); openSelectionModal(index); }}
                className="w-full py-1 text-[10px] nari-blue border border-blue-200 rounded bg-white hover:bg-blue-100 transition"
              >
                重选模板
              </button>
            </div>
          ))}
          <button 
            onClick={openAddModal}
            className="min-w-[180px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group"
          >
            <span className="text-xl font-light">+</span>
            <span className="text-[10px] font-medium">添加柜位</span>
          </button>
        </div>

        <div className="mt-6 flex-1 border-t border-slate-100 pt-6 flex gap-6 overflow-hidden">
          <div className="w-[450px] bg-slate-50 rounded-2xl p-6 border border-slate-200 overflow-y-auto shadow-inner">
            <div className="flex items-center justify-between mb-6">
               <h5 className="font-bold text-base text-slate-800">
                详细工程属性 <span className="text-blue-600 ml-1">{editingIndex !== null && editingIndex >= 0 ? cabinets[editingIndex].id : '全局'}</span>
              </h5>
              <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-bold">PLM 实时同步</span>
            </div>

            <div className="space-y-5">
              {/* 新增字段：柜体功能 */}
              <div>
                <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">柜体功能 (Function)</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500/20">
                  <option>进线柜</option>
                  <option>馈线柜 (分支)</option>
                  <option>计量/PT柜</option>
                  <option>母线联络柜</option>
                  <option>厂用变柜</option>
                  <option>电容器补偿柜</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* 新增字段：进线方式 */}
                <div>
                  <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">进线方式 (In-way)</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500/20">
                    <option>电缆底进</option>
                    <option>电缆顶进</option>
                    <option>侧向母线桥进线</option>
                    <option>后部母线排进线</option>
                  </select>
                </div>
                {/* 新增字段：出线方式 */}
                <div>
                  <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">出线方式 (Out-way)</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500/20">
                    <option>电缆底出</option>
                    <option>电缆顶出</option>
                    <option>母线排贯通</option>
                    <option>侧向母线桥出线</option>
                  </select>
                </div>
              </div>

              {/* 新增字段：一次主元器件 */}
              <div>
                <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">一次主元器件 (Main Components)</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-mono text-slate-300">VSI-12/1250-31.5 (真空断路器)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                    <span className="text-[10px] font-mono text-slate-400 italic">待选型: 互感器/传感器组件...</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 my-2"></div>

              <div>
                <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">额定电流 (Ir)</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white">
                  <option>630 A</option>
                  <option selected>1250 A</option>
                  <option>2500 A</option>
                  <option>3150 A</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">外壳防护等级</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white">
                    <option selected>IP4X</option>
                    <option>IP54</option>
                    <option>IP65</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-400 font-extrabold block mb-1.5 tracking-wider">内部分隔等级</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white">
                    <option selected>Form 4b</option>
                    <option>Form 3</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <p className="text-[10px] text-blue-700 leading-tight">
                  <span className="font-extrabold uppercase">Expert Suggestion:</span> 该进线柜建议增加温升在线监测模块以适配南瑞数字化底座。
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col border border-slate-800 shadow-2xl">
             <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
                <div className="px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest font-mono">CAD Layer: SLD_PARSER_V1</span>
                </div>
             </div>

             <div className="flex-1 flex items-center justify-center p-12 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
                <div className="w-full h-1 bg-blue-500/20 relative">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/40 via-blue-400/20 to-transparent"></div>
                   {Array.from({length: 8}).map((_, i) => (
                     <div key={i} className={`absolute top-[-10px] transition-all duration-700 ${editingIndex === i ? 'scale-125' : 'opacity-40'}`} style={{left: `${(i/8)*100}%`}}>
                        <div className={`w-6 h-1 rounded-full ${editingIndex === i ? 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)]' : 'bg-slate-600'}`}></div>
                        <div className={`w-[1px] h-20 mt-1 mx-auto transition-colors ${editingIndex === i ? 'bg-blue-400/60' : 'bg-slate-700'}`}></div>
                        <div className={`w-6 h-6 rounded-lg border mt-1 mx-auto flex items-center justify-center text-[8px] font-bold ${editingIndex === i ? 'border-blue-400 bg-blue-900/40 text-blue-300' : 'border-slate-800 bg-slate-900 text-slate-700'}`}>
                          {i === 0 || i === 7 ? 'IN' : 'FEED'}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center backdrop-blur-md">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-500 uppercase font-bold">相位配置</span>
                    <span className="text-[10px] text-slate-300 font-mono">A-B-C / L1-L2-L3</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-500 uppercase font-bold">母线架构</span>
                    <span className="text-[10px] text-slate-300 font-mono">TMY-3(100x10)</span>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition active:scale-95">全景预览模型</button>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onPrev} className="px-6 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 bg-white hover:bg-slate-50 transition shadow-sm">返回上一步</button>
        <div className="flex items-center gap-4">
           <span className="text-[10px] text-slate-400 font-bold italic">系统已自动通过 102 项设计规范检查 ✔</span>
           <button onClick={onNext} className="px-12 py-2.5 nari-bg text-white rounded-xl font-extrabold shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition active:scale-[0.98]">确认并生成 3D 钣金模型</button>
        </div>
      </div>

      {/* Standard Solution Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
              <div>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight">标准方案库选型 <span className="text-blue-600">Standard Pool</span></h4>
                <p className="text-sm text-slate-500 mt-1">请从以下通过认证的标准模板中选择适合该柜位的方案</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl transition shadow-sm">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50 grid grid-cols-3 gap-8 scrollbar-hide">
              {standardTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  onClick={() => selectTemplate(template)}
                >
                  <div className="h-52 bg-slate-900 p-6 flex items-center justify-center border-b border-slate-800 relative">
                    <img src={template.imageUrl} alt={template.name} className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition duration-500" />
                    <div className="absolute top-4 right-4 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-bold rounded uppercase tracking-widest">Digital Twin</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold border border-blue-100">{template.code}</span>
                       <span className="text-[9px] text-slate-400 font-bold uppercase">{template.type}</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-base mb-2 group-hover:text-blue-600 transition">{template.name}</h5>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-6 leading-relaxed">{template.description}</p>
                    <button className="mt-auto w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl group-hover:bg-blue-600 transition shadow-lg">选用并匹配</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabinetSelection;
