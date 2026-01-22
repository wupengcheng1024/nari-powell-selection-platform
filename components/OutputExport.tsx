import React, { useState } from 'react';
import { BOMItem } from '../types';

interface OutputExportProps {
  onPrev: () => void;
}

const OutputExport: React.FC<OutputExportProps> = ({ onPrev }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const reports = [
    { type: '柜体物料清单 (eBOM)', format: 'EXCEL', status: '就绪', icon: '📄' },
    { type: '铜排下料清单 (Busbar)', format: 'PDF/EXCEL', status: '就绪', icon: '📏' },
    { type: '钣金展开图 (DXF)', format: 'ZIP', status: '就绪', icon: '📐' },
    { type: '三维装配模型 (STEP)', format: 'STEP', status: '就绪', icon: '📦' },
    { type: 'CNC 加工代码 (G-Code)', format: 'NC', status: '就绪', icon: '⚙️' }
  ];

  const mockBOMItems: BOMItem[] = [
    { id: '1', partNumber: 'NW-CB-1250-VSI', name: '真空断路器', spec: '12kV/1250A/31.5kA', quantity: 2, unit: '台', category: '元器件' },
    { id: '2', partNumber: 'TMY-100-10', name: 'T2紫铜排', spec: '100mm x 10mm', quantity: 245.5, unit: 'kg', category: '铜排' },
    { id: '3', partNumber: 'INS-EPX-12', name: '环氧树脂绝缘子', spec: '12kV', quantity: 48, unit: '个', category: '辅材' },
    { id: '4', partNumber: 'NW-ES-JN15', name: '接地开关', spec: 'JN15-12/31.5', quantity: 4, unit: '台', category: '元器件' }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('数字化成果已成功同步至南瑞 PLM 系统！');
    }, 2000);
  };

  return (
    <div className="h-full flex flex-row gap-0 -m-8 overflow-hidden bg-white">
      {/* LEFT HALF: 3D Assembly Visualizer */}
      <section className="w-1/2 h-full bg-slate-950 relative flex flex-col p-12 overflow-hidden border-r border-slate-800">
        {/* Subtle CAD Grid Overlay (背景保持不变) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-black/60 pointer-events-none"></div>

        {/* Top Right Buttons (保持绝对定位在右上角) */}
        <div className="absolute top-10 right-10 flex gap-2 z-20">
          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white/60 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg></button>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white/60 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
        </div>

        {/* [修改点 1] 主内容容器改为 flex-col，垂直排列图片和文字 */}
        <div className="flex-1 w-full flex flex-col min-h-0 relative z-10">

          {/* [修改点 2] 图片区域：使用 flex-1 占据上方剩余空间 */}
          <div className="flex-1 relative w-full flex items-center justify-center min-h-0">
            <img
              src="../public/images/diya/STD-GCS-IN.png"
              alt="KYN28 3D Assembly"
              className="max-h-full max-w-full object-contain drop-shadow-[0_0_100px_rgba(59,130,246,0.3)] animate-in zoom-in-95 duration-1000"
            />

            {/* [保持不变] 悬浮标注：依然相对于图片容器定位 */}
            <div className="absolute top-[20%] left-[60%] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg">
                  <p className="text-[10px] text-blue-400 font-bold">主母排室 - 校验合格</p>
                </div>
              </div>
            </div>
            <div className="absolute top-[50%] left-[30%] animate-pulse delay-700">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg">
                  <p className="text-[10px] text-green-400 font-bold">断路器室 - 轨道吻合</p>
                </div>
              </div>
            </div>
          </div>

          {/* [修改点 3] 文字区域：放在图片下方，不再绝对定位 */}
          <div className="mt-8 flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Real-time Digital Twin Ready</span>
            </div>
            <h1 className="text-white font-bold text-2xl tracking-tight">KYN28A-12 <span className="text-blue-500">Master View</span></h1>
          </div>

        </div>
      </section>

      {/* RIGHT HALF: Info & Exports (保持不变) */}
      <section className="w-1/2 h-full flex flex-col bg-slate-50 overflow-y-auto">
        <div className="p-10 space-y-10">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">PROJECT RELEASE</span>
              <span className="text-slate-400 text-[10px] font-mono uppercase">ID: PRJ-2025-0623</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">数字化选型成果确认</h2>
            <p className="text-slate-500 text-sm mt-1">请核对技术参数并执行最终的 PLM 同步流程</p>
          </div>

          {/* Scheme Summary Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">柜型标准</span>
                <span className="text-sm font-bold text-slate-700">KYN28A-12 (Z)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">额定电流</span>
                <span className="text-sm font-bold text-blue-600">1250 A</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">方案代码</span>
                <span className="text-sm font-mono text-slate-700">STD-IN-01A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">校验结果</span>
                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  结构无干涉
                </span>
              </div>
            </div>
          </div>

          {/* Export Files Grid */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">导出成果包 (Release Assets)</h4>
            <div className="grid grid-cols-2 gap-3">
              {reports.map((r, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-blue-400 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition text-lg">{r.icon}</div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-700">{r.type}</span>
                      <span className="text-[9px] text-slate-400 uppercase">{r.format}</span>
                    </div>
                  </div>
                  <button className="text-slate-300 group-hover:text-blue-500 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOM Mini Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-slate-50 flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-700">关键物料核对 (eBOM Preview)</h4>
              <span className="text-[10px] text-slate-400">共 5 项核心件</span>
            </div>
            <table className="w-full text-[11px] text-left">
              <thead className="bg-white text-slate-400 font-bold uppercase">
                <tr>
                  <th className="px-6 py-3">名称</th>
                  <th className="px-6 py-3">数量</th>
                  <th className="px-6 py-3">分类</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockBOMItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3">
                      <div className="font-bold text-slate-700">{item.name}</div>
                      <div className="text-[9px] text-slate-400">{item.spec}</div>
                    </td>
                    <td className="px-6 py-3 font-mono font-bold">{item.quantity} {item.unit}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${item.category === '元器件' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Final Sync Action */}
          <div className="bg-slate-900 rounded-[2rem] p-8 flex flex-col gap-6 relative overflow-hidden group shadow-2xl border border-slate-800">
            <div className="relative z-10">
              <h4 className="text-white font-bold text-lg">完成并闭环同步</h4>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">数字化成果将回传至 PLM 任务 WBS 节点，并自动触发钣金与铜排的生产下料指令。</p>
            </div>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 relative z-10 ${isSyncing ? 'bg-slate-700 text-slate-400 cursor-wait' : 'nari-bg text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-[0.98]'}`}
            >
              {isSyncing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  正在回传 PLM...
                </>
              ) : (
                '一键提交成果与发布生产'
              )}
            </button>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px]"></div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 pb-10">
            <button onClick={onPrev} className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-white transition-all flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              返回修改设计
            </button>
            <button className="text-[10px] text-slate-400 font-bold hover:text-slate-600 underline">技术规范审核确认 (QA-2025)</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutputExport;