
import React from 'react';

interface DevelopingPlaceholderProps {
  moduleName: string;
  icon: string;
  onBack: () => void;
}

const DevelopingPlaceholder: React.FC<DevelopingPlaceholderProps> = ({ moduleName, icon, onBack }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-20 animate-in fade-in duration-700">
      <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-5xl mb-8 grayscale opacity-50 border-2 border-dashed border-slate-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-400 mb-2">{moduleName}</h3>
      <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-6">正在进行数字化重构 (In Development)</div>
      <p className="max-w-md text-center text-slate-400 text-sm leading-relaxed">
        该模块属于数字化转型二期规划。完成后将支持基于 AI 的全自动能力，并实现与南瑞 PLM 及 ERP 系统的全链路闭环对接。
      </p>
      <button
        onClick={onBack}
        className="mt-10 px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
      >
        返回设计中枢
      </button>
    </div>
  );
};

export default DevelopingPlaceholder;
