import React, { useState } from 'react';

interface MissionReceptionProps {
  onNext: () => void;
}

const MissionReception: React.FC<MissionReceptionProps> = ({ onNext }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewImagePath = 'images/project/yicixian_cad.png'; // Using an existing valid path from the project structure or matching the requirement

  return (
    <div className="h-full flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-12 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">PLM 任务同步中心</h3>
            <p className="text-slate-500 text-base mt-1">自动从南瑞 PLM 系统获取项目 WBS 号、电气一次图及物料清单</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <div className="p-8 bg-slate-50/50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              项目基础信息
            </h4>
            <div className="space-y-6 text-sm">
              <div className="flex justify-between border-b border-slate-200/50 pb-3">
                <span className="text-slate-500 font-medium">项目名称</span>
                <span className="font-bold text-slate-700">南京地铁10号线</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-3">
                <span className="text-slate-500 font-medium">产品型号</span>
                <span className="font-bold text-slate-700">KYN28A-12</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-3">
                <span className="text-slate-500 font-medium">电压等级</span>
                <span className="font-bold text-slate-700">10kV</span>
              </div>
            </div>
          </div>
          <div className="p-8 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              一次图源文件 (CAD/PDF)
            </h4>
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-white/50 group hover:border-blue-400 transition-colors cursor-pointer"
            >
              <span className="text-base text-blue-500 font-bold text-center mb-1 group-hover:scale-105 transition-transform">
                点击这里加载一次图源文件
              </span>
              <button className="text-xs text-blue-600 hover:underline font-medium">点击在线解析预览</button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/80 border border-blue-100 p-8 rounded-2xl mb-12">
          <h4 className="text-blue-800 font-bold text-sm mb-2 uppercase tracking-wide">解析引擎就绪 (Stage 2)</h4>
          <p className="text-blue-600/90 text-sm leading-relaxed">
            检测到该项目包含 14 面柜位，涉及进线柜、馈线柜、PT柜。系统已自动识别典型方案号并关联 3D 模板。
          </p>
        </div>

        <div className="flex justify-end gap-6">
          <button className="px-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition shadow-sm">
            重置连接
          </button>
          <button
            onClick={onNext}
            className="px-12 py-3.5 nari-bg text-white rounded-2xl font-black text-base shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95"
          >
            建立项目并进入下一环节
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={() => setIsPreviewOpen(false)}
          ></div>
          <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h4 className="text-xl font-bold text-slate-800">一次图在线解析预览 (Primary Diagram Preview)</h4>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-12 bg-slate-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-full">
                <img
                  src={previewImagePath}
                  alt="Primary Diagram"
                  className="max-w-full h-auto object-contain drop-shadow-xl"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/1200x800/f8fafc/64748b?text=Primary+Diagram+Preview';
                  }}
                />
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500 px-12">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded font-bold text-[10px]">AI 解析中</span>
                <span>识别到 8 面柜体拓扑结构</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest">Source: PLM_DOC_V2025_06.png</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionReception;