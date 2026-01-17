
import React from 'react';
import { BOMItem } from '../types';

interface OutputExportProps {
  onPrev: () => void;
}

const OutputExport: React.FC<OutputExportProps> = ({ onPrev }) => {
  const reports = [
    { type: '柜体物料清单 (eBOM)', format: 'EXCEL', status: '就绪', icon: '📄' },
    { type: '铜排下料清单', format: 'PDF/EXCEL', status: '就绪', icon: '📄' },
    { type: '钣金展开图 (DXF)', format: 'ZIP (批量)', status: '就绪', icon: '📐' },
    { type: 'CNC 加工代码 (G-Code)', format: 'NC', status: '就绪', icon: '⚙️' },
    { type: '三维装配模型 (STEP)', format: 'STEP', status: '就绪', icon: '📦' },
    { type: 'PLM 回传包', format: 'JSON/PKG', status: '待回传', icon: '☁️' }
  ];

  const mockBOMItems: BOMItem[] = [
    { id: '1', partNumber: 'NW-CB-1250-VSI', name: '真空断路器', spec: '12kV/1250A/31.5kA', quantity: 2, unit: '台', category: '元器件' },
    { id: '2', partNumber: 'TMY-100-10', name: 'T2紫铜排', spec: '100mm x 10mm', quantity: 245.5, unit: 'kg', category: '铜排' },
    { id: '3', partNumber: 'INS-EPX-12', name: '环氧树脂绝缘子', spec: '12kV', quantity: 48, unit: '个', category: '辅材' },
    { id: '4', partNumber: 'NW-ES-JN15', name: '接地开关', spec: 'JN15-12/31.5', quantity: 4, unit: '台', category: '元器件' },
    { id: '5', partNumber: 'FIX-M12-80', name: '不锈钢紧固件', spec: 'M12x80 8.8级', quantity: 120, unit: '套', category: '标准件' },
    { id: '6', partNumber: 'BM-P-2025-01', name: '钣金侧板', spec: '2.5mm 敷铝锌', quantity: 16, unit: '件', category: '辅材' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 overflow-y-auto">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800">数字化设计成果导出 (Release Stage)</h3>
          <p className="text-slate-500 text-sm">已生成满足采购、生产及 PLM 归档所需的所有数字化成果</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {reports.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
            <div className="text-3xl mb-4">{r.icon}</div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{r.type}</h4>
            <div className="text-[10px] text-slate-400 mb-4">格式: {r.format}</div>
            <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full mb-6 ${r.status === '就绪' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
              {r.status}
            </div>
            <button className="mt-auto w-full py-2 nari-bg text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 transition">下载成果包</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b bg-slate-50 flex justify-between items-center">
          <h4 className="font-bold text-sm text-slate-700 flex items-center gap-2">
            <span className="w-1 h-4 nari-bg rounded-full"></span>
            项目物料清单 (BOM) 实时预览
          </h4>
          <span className="text-[10px] text-slate-400">共计 {mockBOMItems.length} 项主材</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-white text-slate-400 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">物料编码</th>
              <th className="px-6 py-3">名称</th>
              <th className="px-6 py-3">规格型号</th>
              <th className="px-6 py-3 text-center">数量</th>
              <th className="px-6 py-3">类别</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockBOMItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-3 font-mono text-blue-600">{item.partNumber}</td>
                <td className="px-6 py-3 font-bold text-slate-700">{item.name}</td>
                <td className="px-6 py-3 text-slate-500">{item.spec}</td>
                <td className="px-6 py-3 text-center font-bold text-slate-800">{item.quantity} {item.unit}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-[9px] ${
                    item.category === '元器件' ? 'bg-purple-50 text-purple-600' :
                    item.category === '铜排' ? 'bg-orange-50 text-orange-600' :
                    item.category === '辅材' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                  }`}>
                    {item.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">一键同步至 NARI-PLM</h4>
            <p className="text-sm text-slate-400 max-w-md mt-1">系统已通过合规性校验，可将 8 面柜体对应的 eBOM、图纸包及 3D 模型自动回传至任务单 WBS 节点。</p>
          </div>
        </div>
        <button className="px-10 py-4 nari-bg text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-105 transition-all active:scale-95 relative z-10">同步并完成闭环</button>
      </div>

      <div className="flex justify-start pb-8">
        <button onClick={onPrev} className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-600 bg-white hover:bg-slate-50 transition">返回上一步</button>
      </div>
    </div>
  );
};

export default OutputExport;
