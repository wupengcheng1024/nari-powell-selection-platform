
import React, { useState, useMemo } from 'react';
import { StandardTemplate, StandardCategory } from '../types';

const StandardsManagement: React.FC = () => {
  const initialStandards: StandardTemplate[] = [
    { id: 'S001', name: 'KYN28A-12 进线柜方案', code: 'STD-KYN28-IN', type: '中压柜', description: '额定 1250A/31.5kA，铠装移开式。', tags: ['中压', '1250A', '10kV'], imageUrl: 'images/zhongya/STD-KYN28-IN.png', status: 'approved' },
    { id: 'S002', name: 'KYN28A-12 馈线柜方案', code: 'STD-KYN28-OUT', type: '中压柜', description: '典型 630A 分支馈电，内置真空断路器。', tags: ['中压', '630A', '馈线'], imageUrl: 'images/zhongya/STD-KYN28-IN.png', status: 'approved' },
    { id: 'S003', name: 'KYN28A-12 PT柜方案', code: 'STD-KYN28-PT', type: '中压柜', description: '母线电压测量与监测，带三相PT。', tags: ['测量', 'PT'], imageUrl: 'images/zhongya/STD-KYN28-IN.png', status: 'approved' },
    { id: 'L001', name: 'GCS 低压进线柜', code: 'STD-GCS-IN', type: '低压柜', description: '额定 2500A，ACB 抽屉式安装，防护等级 IP40。', tags: ['低压', '2500A', 'AC400V'], imageUrl: 'images/diya/STD-GCS-IN.png', status: 'approved' },
    { id: 'L002', name: 'GCS 抽屉出线柜 (1/2单元)', code: 'STD-GCS-OUT', type: '低压柜', description: '模块化抽屉设计，支持 8-11 个回路。', tags: ['模块化', '多回路', '抽屉'], imageUrl: 'images/diya/STD-GCS-IN.png', status: 'pending' },
    { id: 'L003', name: 'MNS 马达控制中心', code: 'STD-MNS-MCC', type: '低压柜', description: '适用于大型工厂电机集中控制。', tags: ['MCC', '过程控制'], imageUrl: 'images/diya/STD-MNS-MCC.png', status: 'approved' },
    { id: 'L004', name: '电容补偿柜', code: 'STD-LV-CAP', type: '低压柜', description: '自动无功补偿，提升系统功率因数。', tags: ['补偿', '节能'], imageUrl: 'images/diya/STD-LV-CAP.png', status: 'approved' },
    { id: 'B001', name: 'YBM-12 欧式箱变', code: 'STD-BOX-EU', type: '箱变', description: '预装式变电站，三位一体结构，耐候性强。', tags: ['预装式', '10kV/0.4kV', '景观型'], imageUrl: 'images/xiangbian/STD-BOX-EU1.png', status: 'approved' },
    { id: 'B002', name: 'ZGS-12 美式箱变', code: 'STD-BOX-US', type: '箱变', description: '变压器身、高压负荷开关等置于同一油箱。', tags: ['组合式', '紧凑型'], imageUrl: 'images/xiangbian/STD-BOX-EU1.png', status: 'pending' },
    { id: 'B003', name: '光伏/风电专用箱变', code: 'STD-BOX-PV', type: '箱变', description: '新能源专用升压站，集成逆变与监控。', tags: ['新能源', '升压'], imageUrl: 'images/xiangbian/STD-BOX-EU1.png', status: 'approved' },
  ];

  const [standardsList, setStandardsList] = useState<StandardTemplate[]>(initialStandards);
  const [activeStandardCategory, setActiveStandardCategory] = useState<StandardCategory>('中压柜');
  const [isStdModalOpen, setIsStdModalOpen] = useState(false);
  const [editingStandard, setEditingStandard] = useState<StandardTemplate | null>(null);

  const filteredStandards = useMemo(() => {
    return standardsList.filter(s => s.type === activeStandardCategory);
  }, [activeStandardCategory, standardsList]);

  const handleAddStandard = () => {
    setEditingStandard(null);
    setIsStdModalOpen(true);
  };

  const handleEditStandard = (s: StandardTemplate) => {
    setEditingStandard(s);
    setIsStdModalOpen(true);
  };

  const handleDeleteStandard = (id: string) => {
    if (window.confirm('确定要删除该标准方案吗？此操作不可恢复。')) {
      setStandardsList(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleApproveStandard = (id: string) => {
    setStandardsList(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };

  const saveStandard = (formData: any) => {
    const tagsArray = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '')
      : [];

    if (editingStandard) {
      setStandardsList(prev => prev.map(s => s.id === editingStandard.id ? {
        ...s,
        ...formData,
        tags: tagsArray
      } : s));
    } else {
      const newStandard: StandardTemplate = {
        id: `S${Date.now().toString().slice(-4)}`,
        name: formData.name,
        code: formData.code,
        type: formData.type,
        description: formData.description,
        tags: tagsArray,
        imageUrl: formData.imageUrl || 'images/zhongya/STD-KYN28-IN.png',
        status: 'pending'
      };
      setStandardsList([newStandard, ...standardsList]);
    }
    setIsStdModalOpen(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">标准柜型库</h3>
          <p className="text-sm text-slate-500">数字化 3D 方案集 - 实时同步 NARI Powell 技术部标准</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {(['中压柜', '低压柜', '箱变'] as StandardCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveStandardCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeStandardCategory === cat ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddStandard}
            className="px-4 py-2 nari-bg text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            新增方案
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredStandards.map(s => (
          <div key={s.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all group flex flex-col relative">
            <div className="h-56 bg-slate-900 relative flex items-center justify-center p-8 border-b border-slate-800">
              <img src={s.imageUrl} alt={s.name} className="max-h-full max-w-full object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-110 transition duration-500" />
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg shadow-lg">3D ASSET</div>
              {s.status === 'pending' && (
                <div className="absolute top-4 left-4 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-lg shadow-lg animate-pulse">待审批</div>
              )}
              <div className="absolute bottom-4 left-4 flex gap-1">
                {s.tags && Array.isArray(s.tags) && s.tags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 bg-slate-800/80 backdrop-blur text-white/60 text-[8px] rounded uppercase font-mono">{t}</span>)}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{s.code}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.type}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-2 group-hover:text-blue-600 transition">{s.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{s.description}</p>

              <div className="flex gap-2 mt-auto border-t border-slate-100 pt-4">
                {s.status === 'pending' ? (
                  <button
                    onClick={() => handleApproveStandard(s.id)}
                    className="flex-1 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg hover:bg-amber-100 transition flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    审批通过
                  </button>
                ) : (
                  <span className="flex-1 py-1.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-default">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    已发布
                  </span>
                )}
                <button onClick={() => handleEditStandard(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="编辑">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button onClick={() => handleDeleteStandard(s.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="删除">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredStandards.length === 0 && (
          <div className="col-span-4 p-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">该分类下暂无已发布的数字化方案</div>
        )}
      </div>

      {/* Standard Modal */}
      {isStdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={() => setIsStdModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative z-10 animate-in zoom-in-95 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingStandard ? '编辑标准方案' : '新增标准方案'}</h3>
              <button onClick={() => setIsStdModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveStandard(Object.fromEntries(formData));
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">方案名称</label>
                <input name="name" defaultValue={editingStandard?.name} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">方案代码 (Code)</label>
                  <input name="code" defaultValue={editingStandard?.code} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">类型</label>
                  <select name="type" defaultValue={editingStandard?.type || activeStandardCategory} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500">
                    {(['中压柜', '低压柜', '箱变'] as StandardCategory[]).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">描述</label>
                <textarea name="description" defaultValue={editingStandard?.description} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">标签 (逗号分隔)</label>
                <input name="tags" defaultValue={editingStandard?.tags.join(', ')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="例如: 中压, 1250A" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsStdModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">取消</button>
                <button type="submit" className="px-4 py-2 nari-bg text-white rounded-lg text-sm font-bold hover:bg-blue-700">保存方案</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardsManagement;
