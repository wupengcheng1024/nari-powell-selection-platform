
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-md p-8 glass-panel border border-slate-200 rounded-2xl shadow-xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 nari-bg rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
            <div className="text-2xl font-bold text-slate-800">南瑞帕威尔</div>
          </div>
          <h1 className="text-xl font-medium text-slate-600">智能电气设计一体化平台</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">工号/用户名</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入工号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded" />
              记住我
            </label>
            <button type="button" className="text-sm nari-blue hover:underline">忘记密码?</button>
          </div>
          <button
            type="submit"
            className="w-full py-3 nari-bg text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            登录平台
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center opacity-60">
          <img src="https://picsum.photos/80/30?grayscale" alt="Rongdi Logo" className="h-6" />
          <span className="text-xs text-slate-500">苏州榕迪软件科技 | 2026 v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
