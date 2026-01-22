import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';

// --- 辅助组件 ---

// 1. 路由守卫：检查登录状态
const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 2. 项目详情包装器：将 URL 参数 (:id) 转换为 Props (projectId)
const ProjectDetailWrapper = ({ onBack }: { onBack: () => void }) => {
  const { id } = useParams<{ id: string }>();

  // 如果 URL 没有 ID，重定向回首页
  if (!id) return <Navigate to="/" replace />;

  return <ProjectDetail projectId={id} onBack={onBack} />;
};

// --- 主应用组件 ---

const App: React.FC = () => {
  // 从 localStorage 读取初始登录状态，解决刷新丢失问题
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('nari_auth_token') === 'true';
  });

  const navigate = useNavigate();

  // 登录处理：写入本地存储并跳转
  const handleLogin = () => {
    localStorage.setItem('nari_auth_token', 'true');
    setIsLoggedIn(true);
    navigate('/'); // 登录后跳转到 Dashboard
  };

  // 登出处理：清除本地存储并跳转
  const handleLogout = () => {
    localStorage.removeItem('nari_auth_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <Routes>
      {/* 登录路由：如果已登录，自动跳到首页 */}
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        }
      />

      {/* 首页/仪表盘路由 */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isLoggedIn}>
            <Dashboard
              onSelectProject={(id) => navigate(`/project/${id}`)}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />

      {/* 项目详情路由：使用 :id 动态参数 */}
      <Route
        path="/project/:id"
        element={
          <ProtectedRoute isAuth={isLoggedIn}>
            <ProjectDetailWrapper onBack={() => navigate('/')} />
          </ProtectedRoute>
        }
      />

      {/* 404 捕获：所有未匹配路由重定向到首页 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;