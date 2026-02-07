
import React, { useState } from 'react';
import { ProjectStatus, Project, TabType } from '../types';
import BusbarMasterIntro from '../components/BusbarMasterIntro';
import BusbarConversionIntro from '../components/BusbarConversionIntro';
import SelectionPlatformIntro from '../components/SelectionPlatformIntro';
import ProjectManagement from '../components/ProjectManagement';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import WarningDrawer from '../components/WarningDrawer';
import MessageDrawer from '../components/MessageDrawer';
import DashboardOverview from '../components/DashboardOverview';
import StandardsManagement from '../components/StandardsManagement';
import MaterialsManagement from '../components/MaterialsManagement';
import TempProjectCreation from '../components/TempProjectCreation';
import DevelopingPlaceholder from '../components/DevelopingPlaceholder';

interface DashboardProps {
  onSelectProject: (id: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject, onLogout }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');

  // Drawer States
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: '南京地铁10号线配电改造', wbs: 'CN-NJDT-WBS202506001', status: ProjectStatus.DESIGNING, progress: 68, customer: '南京地铁集团', updatedAt: '2025-06-23 14:30' },
    { id: '2', name: '苏州工业园区智能配电项目', wbs: 'CN-SZGY-WBS202506002', status: ProjectStatus.REVIEWING, progress: 95, customer: '园区电力局', updatedAt: '2025-06-23 16:45' },
    { id: '3', name: '通州副中心综合变电站', wbs: 'CN-TZFZX-WBS202507001', status: ProjectStatus.PLANNING, progress: 12, customer: '北京市电力公司', updatedAt: '2025-07-01 09:15' },
    { id: '4', name: '常州西太湖数据中心', wbs: 'CN-CZWTH-WBS202507005', status: ProjectStatus.COMPLETED, progress: 100, customer: '中国电信', updatedAt: '2025-07-02 11:30' },
    { id: '5', name: '上海临港新片区110kV站', wbs: 'CN-SHLG-WBS202508001', status: ProjectStatus.DESIGNING, progress: 45, customer: '上海电力公司', updatedAt: '2025-07-10 10:20' },
  ]);

  const handleCreateTempProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setCurrentTab('projects');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <DashboardOverview projects={projects} onNavigate={setCurrentTab} onSelectProject={onSelectProject} />;
      case 'projects':
        return <ProjectManagement projects={projects} onUpdateProjects={setProjects} onSelectProject={onSelectProject} />;
      case 'materials':
        return <MaterialsManagement />;
      case 'standards':
        return <StandardsManagement />;
      case 'temp-projects':
        return <TempProjectCreation onCreate={handleCreateTempProject} />;
      case 'busbar-master':
        return <BusbarMasterIntro />;
      case 'busbar-conv':
        return <BusbarConversionIntro />;
      case 'selection-platform':
        return <SelectionPlatformIntro onNavigate={setCurrentTab} />;
      case 'ai-assistant':
        return <DevelopingPlaceholder moduleName="智能布线" icon="⚡" onBack={() => setCurrentTab('overview')} />;
      case 'bom-compare':
        return <DevelopingPlaceholder moduleName="BOM对比分析" icon="⚖️" onBack={() => setCurrentTab('overview')} />;
      case 'drc':
        return <DevelopingPlaceholder moduleName="设计合规校验" icon="🛡️" onBack={() => setCurrentTab('overview')} />;
      default:
        return <DevelopingPlaceholder moduleName="数字化交付生产看板" icon="📊" onBack={() => setCurrentTab('overview')} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <DashboardSidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col ml-64 min-h-screen">
        <DashboardHeader
          currentTab={currentTab}
          onWarningClick={() => setIsWarningOpen(true)}
          onMessageClick={() => setIsMessageOpen(true)}
          onStandardsClick={() => setCurrentTab('standards')}
        />

        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>

      <WarningDrawer isOpen={isWarningOpen} onClose={() => setIsWarningOpen(false)} />
      <MessageDrawer isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </div>
  );
};

export default Dashboard;
