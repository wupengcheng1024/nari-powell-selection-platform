
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
    { id: '#1', type: '进线柜', code: '700-001', matched: 'STD-IN-01', score: 99, img: 'input_file_0.png' },
    { id: '#2', type: '馈线柜', code: '700-002', matched: 'STD-OUT-01', score: 98, img: 'input_file_1.png' },
    { id: '#3', type: '馈线柜', code: '700-003', matched: 'STD-OUT-01', score: 98, img: 'input_file_1.png' },
    { id: '#4', type: '联络柜', code: '700-004', matched: 'STD-TIE-01', score: 95, img: 'input_file_3.png' },
    { id: '#5', type: 'PT柜', code: '700-005', matched: 'STD-PT-01', score: 92, img: 'input_file_2.png' },
    { id: '#6', type: '馈线柜', code: '700-006', matched: 'STD-OUT-01', score: 98, img: 'input_file_1.png' },
    { id: '#7', type: '计量柜', code: '700-007', matched: 'STD-MET-01', score: 88, img: 'input_file_0.png' },
    { id: '#8', type: '进线柜', code: '700-008', matched: 'STD-IN-01', score: 99, img: 'input_file_0.png' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
        img: template.imageUrl
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
          <button className="px-4 py-2 border border-slate-200 text-sm rounded bg-white hover:bg-slate-50 transition">批量刷新匹配</button>
          <button className="px-4 py-2 border border-slate-200 text-sm rounded bg-white hover:bg-slate-50 transition">同步对齐网格</button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden flex flex-col">
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
          {cabinets.map((c, index) => (
            <div key={index} className="min-w-[180px] border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition cursor-pointer bg-slate-50/50 group/card">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 rounded text-slate-600">{c.id}</span>
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
                onClick={() => openSelectionModal(index)}
                className="w-full py-1 text-[10px] nari-blue border border-blue-200 rounded bg-blue-50/50 hover:bg-blue-100 transition"
              >
                修改
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

        <div className="mt-6 flex-1 border-t border-slate-100 pt-6 flex gap-6">
          <div className="w-1/3 bg-slate-50 rounded-xl p-6 border border-slate-100 overflow-y-auto max-h-[400px]">
            <h5 className="font-bold text-sm mb-4">
              详细属性 ({editingIndex !== null && editingIndex >= 0 ? cabinets[editingIndex].id : '全局配置'})
            </h5>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-slate-400 font-bold block mb-1">额定电流 (Ir)</label>
                <select className="w-full px-3 py-2 text-sm border rounded outline-none bg-white">
                  <option>630 A</option>
                  <option selected>1250 A</option>
                  <option>2500 A</option>
                  <option>3150 A</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase text-slate-400 font-bold block mb-1">短时耐受电流 (Ik)</label>
                <select className="w-full px-3 py-2 text-sm border rounded outline-none bg-white">
                  <option selected>31.5 kA/4s</option>
                  <option>40 kA/4s</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 font-bold block mb-1">外壳防护</label>
                  <select className="w-full px-3 py-2 text-sm border rounded outline-none bg-white">
                    <option selected>IP4X</option>
                    <option>IP54</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-400 font-bold block mb-1">柜内照明</label>
                  <select className="w-full px-3 py-2 text-sm border rounded outline-none bg-white">
                    <option selected>标配 LED</option>
                    <option>无</option>
                  </select>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-100">
                <p className="text-[10px] text-blue-700 leading-tight">
                  <span className="font-bold">AI 建议：</span> 柜位 #4 联络柜建议采用双柜宽方案以满足 2500A 散热要求。
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-slate-900 rounded-xl p-4 relative overflow-hidden flex items-center justify-center border border-slate-800">
             <div className="absolute top-4 left-4 text-[10px] text-white/40 font-mono uppercase tracking-wider">电气一次图 (DWG Parser)</div>
             <div className="w-full h-full flex items-center justify-center p-8">
                <div className="w-full h-1 bg-blue-500/30 relative">
                   {/* Busbars mockup */}
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-transparent"></div>
                   {Array.from({length: 8}).map((_, i) => (
                     <div key={i} className="absolute top-[-10px]" style={{left: `${(i/8)*100}%`}}>
                        <div className="w-4 h-1 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <div className="w-[1px] h-12 bg-blue-400/50 mt-1 mx-auto"></div>
                        <div className="w-4 h-4 rounded border border-blue-400 mt-1 mx-auto flex items-center justify-center text-[8px] text-blue-300">CB</div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute inset-0 bg-slate-900/40 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-600 bg-white hover:bg-slate-50 transition">上一步</button>
        <button onClick={onNext} className="px-10 py-2 nari-bg text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition">确认选型并进入参数设计</button>
      </div>

      {/* Standard Solution Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h4 className="text-xl font-bold text-slate-800">标准柜型库选择</h4>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-white grid grid-cols-3 gap-6">
              {standardTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all group flex flex-col cursor-pointer bg-white"
                  onClick={() => selectTemplate(template)}
                >
                  <div className="h-44 bg-slate-900 p-4 flex items-center justify-center border-b border-slate-800">
                    <img src={template.imageUrl} alt={template.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h5 className="font-bold text-slate-800 text-sm mb-1">{template.name}</h5>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mb-4">{template.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">{template.code}</span>
                      <button className="px-4 py-1.5 nari-bg text-white text-[10px] font-bold rounded-lg">选用</button>
                    </div>
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
