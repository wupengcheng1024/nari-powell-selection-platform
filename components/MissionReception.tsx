
import React, { useState } from 'react';

interface MissionReceptionProps {
  onNext: () => void;
}

const MissionReception: React.FC<MissionReceptionProps> = ({ onNext }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-xl p-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">PLM 任务同步中心</h3>
            <p className="text-slate-500">自动从南瑞 PLM 系统获取项目 WBS 号、电气一次图及物料清单</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              项目基础信息
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">项目名称</span>
                <span className="font-medium">南京地铁10号线</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">产品型号</span>
                <span className="font-medium">KYN28A-12</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">电压等级</span>
                <span className="font-medium">10kV</span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              一次图源文件 (CAD/PDF)
            </h4>
            <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-lg">
              <span className="text-xs text-slate-400">PRJ-CAB-101_SCHEMA.pdf</span>
              <button className="mt-2 text-xs nari-blue hover:underline">点击在线解析预览</button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-10">
          <h4 className="text-blue-800 font-semibold text-sm mb-2">解析引擎就绪 (Stage 2)</h4>
          <p className="text-blue-600 text-xs">检测到该项目包含 14 面柜位，涉及进线柜、馈线柜、PT柜。系统已自动识别典型方案号并关联 3D 模板。</p>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-8 py-3 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50">重置连接</button>
          <button onClick={onNext} className="px-8 py-3 nari-bg text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition">建立项目并进入下一环节</button>
        </div>
      </div>
    </div>
  );
};

export default MissionReception;
