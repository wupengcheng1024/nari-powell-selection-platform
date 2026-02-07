
import React, { useState, useMemo } from 'react';
import { Material } from '../types';

const MaterialsManagement: React.FC = () => {
  const initialMaterials: Material[] = [
    { id: 'M001', name: '真空断路器', model: 'VSI-12/1250-31.5', brand: '南瑞帕威尔', category: '断路器', stock: 124, price: '￥18,500', unit: '台', thumbnail: 'images/bom/ZKDLQ.png', status: 'approved' },
    { id: 'M002', name: '电流互感器', model: 'LZZBJ9-10/150b/2', brand: '特变电工', category: '互感器', stock: 450, price: '￥1,200', unit: '只', thumbnail: 'images/bom/DLHGQ.png', status: 'approved' },
    { id: 'M003', name: '低压塑壳断路器', model: 'NM1-125S', brand: '正泰', category: '断路器', stock: 500, price: '￥450', unit: '只', thumbnail: 'images/bom/SK.png', status: 'pending' },
    { id: 'M004', name: '智能型万能断路器', model: 'RDW5-2000', brand: '人民电器', category: '断路器', stock: 35, price: '￥12,800', unit: '台', thumbnail: 'images/bom/KJ.png', status: 'approved' },
  ];

  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('全部');
  const [isMatModalOpen, setIsMatModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const filteredMaterials = useMemo(() => {
    return materialsList.filter(m => {
      const matchesSearch = m.name.includes(searchTerm) || m.model.includes(searchTerm);
      const matchesCategory = categoryFilter === '全部' || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter, materialsList]);

  const handleAddMaterial = () => {
    setEditingMaterial(null);
    setIsMatModalOpen(true);
  };

  const handleEditMaterial = (m: Material) => {
    setEditingMaterial(m);
    setIsMatModalOpen(true);
  };

  const handleDeleteMaterial = (id: string) => {
    if (window.confirm('确定要删除该元器件模型吗？')) {
      setMaterialsList(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleApproveMaterial = (id: string) => {
    setMaterialsList(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' } : m));
  };

  const saveMaterial = (formData: any) => {
    const stockVal = Number(formData.stock) || 0;

    if (editingMaterial) {
      setMaterialsList(prev => prev.map(m => m.id === editingMaterial.id ? {
        ...m,
        ...formData,
        stock: stockVal
      } : m));
    } else {
      const newMaterial: Material = {
        id: `M${Date.now().toString().slice(-4)}`,
        name: formData.name,
        model: formData.model,
        brand: formData.brand,
        category: formData.category,
        price: formData.price,
        stock: stockVal,
        unit: formData.unit,
        thumbnail: formData.thumbnail || 'images/bom/ZKDLQ.png',
        status: 'pending'
      };
      setMaterialsList([newMaterial, ...materialsList]);
    }
    setIsMatModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="搜索型号或物料名..."
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-80 outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>全部</option>
            <option>断路器</option>
            <option>互感器</option>
            <option>继保</option>
            <option>辅材</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            导入 ERP 资产
          </button>
          <button
            onClick={handleAddMaterial}
            className="px-6 py-2 nari-bg text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            新增元器件
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredMaterials.map(m => (
          <div key={m.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-5 hover:border-blue-300 transition group relative">
            {m.status === 'pending' && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-bold rounded">待审核</div>
            )}
            <div className="w-28 h-28 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
              <img src={m.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="flex-1 flex flex-col py-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.category}</span>
                <span className="text-base font-bold text-blue-600">{m.price}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-lg">{m.name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-1 mb-4">{m.model}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-medium">品牌: {m.brand}</span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg font-bold text-[10px]">库存: {m.stock} {m.unit}</span>
              </div>
            </div>

            {/* Actions Overlay on Hover */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur rounded-3xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {m.status === 'pending' && (
                <button
                  onClick={() => handleApproveMaterial(m.id)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl font-bold text-xs hover:bg-amber-600 transition shadow-lg"
                >
                  审批通过
                </button>
              )}
              <button onClick={() => handleEditMaterial(m)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition shadow-sm" title="编辑">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button onClick={() => handleDeleteMaterial(m.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition shadow-sm" title="删除">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Material Modal */}
      {isMatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMatModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative z-10 animate-in zoom-in-95 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingMaterial ? '编辑元器件' : '新增元器件'}</h3>
              <button onClick={() => setIsMatModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveMaterial(Object.fromEntries(formData));
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">名称</label>
                  <input name="name" defaultValue={editingMaterial?.name} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">型号</label>
                  <input name="model" defaultValue={editingMaterial?.model} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">品牌</label>
                  <input name="brand" defaultValue={editingMaterial?.brand} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">分类</label>
                  <select name="category" defaultValue={editingMaterial?.category || '断路器'} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500">
                    <option>断路器</option>
                    <option>互感器</option>
                    <option>继保</option>
                    <option>辅材</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">价格</label>
                  <input name="price" defaultValue={editingMaterial?.price} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">库存</label>
                  <input name="stock" type="number" defaultValue={editingMaterial?.stock} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">单位</label>
                  <input name="unit" defaultValue={editingMaterial?.unit} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsMatModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">取消</button>
                <button type="submit" className="px-4 py-2 nari-bg text-white rounded-lg text-sm font-bold hover:bg-blue-700">保存元器件</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsManagement;
