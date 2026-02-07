
import React from 'react';

interface WarningDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarningDrawer: React.FC<WarningDrawerProps> = ({ isOpen, onClose }) => {
  const warnings = [
    { id: 1, level: 'critical', title: '库存严重不足告警', desc: '物料 VSI-12/1250 当前库存 (5) 低于安全阈值 (10)，可能会影响南京地铁项目交付。', time: '10分钟前', project: 'CN-NJDT-WBS2025' },
    { id: 2, level: 'warning', title: '设计规范冲突预警', desc: '项目 "苏州工业园区" 中第 3 面柜爬电距离 (18mm) 不满足 GB/T 11022 标准 (20mm)。', time: '1小时前', project: 'CN-SZGY-WBS2025' },
    { id: 3, level: 'warning', title: 'PLM 同步异常', desc: '物料编码 M-3302 数据同步失败，请检查网络连接或手动重试。', time: '3小时前', project: '系统任务' },
    { id: 4, level: 'info', title: '系统维护通知', desc: '平台将于今晚 24:00 进行例行维护，预计耗时 30 分钟。', time: '昨天', project: '全平台' },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            预警任务中心
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafc]">
          {warnings.map(warning => (
            <div key={warning.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${warning.level === 'critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                    warning.level === 'warning' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}>{warning.level}</span>
                <span className="text-[10px] text-slate-400 font-mono">{warning.time}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">{warning.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{warning.desc}</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  {warning.project}
                </span>
                <button className="text-[10px] text-blue-600 font-bold hover:underline">立即处理 →</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 bg-white">
          <button className="w-full py-2.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition">查看全部历史预警</button>
        </div>
      </div>
    </>
  );
};

export default WarningDrawer;
