
import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (selectedProjectId) {
    return (
      <ProjectDetail 
        projectId={selectedProjectId} 
        onBack={() => setSelectedProjectId(null)} 
      />
    );
  }

  return (
    <Dashboard 
      onSelectProject={(id) => setSelectedProjectId(id)} 
      onLogout={() => setIsLoggedIn(false)}
    />
  );
};

export default App;
