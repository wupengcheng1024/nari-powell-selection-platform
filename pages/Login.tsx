import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 模拟登录延迟
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* 1. 背景层：独立出来，方便做虚化处理而不影响前景 */}
      <div
        className="absolute inset-0 z-0"
      >
        {/* 背景图片 */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/login/backgroud.jpg')", // 使用指定的图片路径
          }}
        />
        {/* 2. 背景虚化与遮罩：叠加一层模糊和半透明黑底，提升文字可读性 */}
        {/* <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[4px]"></div> */}
      </div>

      {/* 3. 前景内容层：使用 pl-32 (padding-left) 让登录框整体向左靠 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start pl-16 md:pl-32">

        {/* 登录卡片 */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-in slide-in-from-left-10 duration-700">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              南瑞帕威尔 <span className="text-blue-600">设计云平台</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">NARI Powell Intelligent Design System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">工号 / 账号</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm font-bold text-slate-700"
                  placeholder="请输入您的工号"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition sm:text-sm font-bold text-slate-700"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember_me" className="ml-2 block text-xs text-slate-500 font-bold cursor-pointer">
                  记住登录状态
                </label>
              </div>
              <div className="text-xs font-bold text-blue-600 hover:text-blue-500 cursor-pointer">
                忘记密码?
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isLoading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02]'}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  安全认证中...
                </span>
              ) : (
                '立即登录'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-mono">
              System Version v2.5.0 (Build 20251230)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;