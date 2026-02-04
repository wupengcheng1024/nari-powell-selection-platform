
import React, { useState, useMemo } from 'react';
import { Project, ProjectStatus } from '../types';

interface ProjectManagementProps {
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onSelectProject: (id: string) => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ projects, onUpdateProjects, onSelectProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('全部');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Filters
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.includes(searchTerm) || p.wbs.includes(searchTerm);
      const matchesStatus = statusFilter === '全部' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, projects]);

  // Handlers
  const handleAddProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (p: Project) => {
    setEditingProject(p);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('确定要删除该项目吗？删除后关联的设计数据可能无法恢复。')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleApproveProject = (id: string) => {
     const p = projects.find(p => p.id === id);
     if (!p) return;

     let nextStatus = p.status;
     if (p.status === ProjectStatus.PLANNING) nextStatus = ProjectStatus.DESIGNING;
     else if (p.status === ProjectStatus.DESIGNING) nextStatus = ProjectStatus.REVIEWING;
     else if (p.status === ProjectStatus.REVIEWING) nextStatus = ProjectStatus.COMPLETED;

     if (nextStatus !== p.status) {
         if (window.confirm(`确定要将项目状态从 ${p.status} 推进到 ${nextStatus} 吗？`)) {
             onUpdateProjects(projects.map(proj => proj.id === id ? { ...proj, status: nextStatus } : proj));
         }
     } else {
         alert('该项目已处于最终完成状态。');
     }
  };

  const saveProject = (formData: any) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (editingProject) {
      // Update
      onUpdateProjects(projects.map(p => p.id === editingProject.id ? {
        ...p,
        ...formData,
        progress: Number(formData.progress),
        updatedAt: formattedDate
      } : p));
    } else {
      // Create
      const newProject: Project = {
        id: Date.now().toString(),
        name: formData.name,
        wbs: formData.wbs || `PRJ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        status: formData.status as ProjectStatus,
        progress: Number(formData.progress) || 0,
        customer: formData.customer,
        updatedAt: formattedDate
      };
      onUpdateProjects([newProject, ...projects]);
    }
    setIsProjectModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      {/* Search and Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索 WBS 或项目名称..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-80 outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <select
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>全部状态</option>
            {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={handleAddProject} className="px-6 py-2 nari-bg text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          新建设计任务
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
            <tr>
              <th className="px-8 py-4">WBS & 项目信息</th>
              <th className="px-8 py-4">客户方</th>
              <th className="px-8 py-4">设计进度</th>
              <th className="px-8 py-4">更新时间</th>
              <th className="px-8 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition group">
                <td className="px-8 py-5">
                  <div className="font-mono text-[10px] text-slate-400 mb-1">{p.wbs}</div>
                  <div className="font-bold text-slate-700">{p.name}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${p.status === ProjectStatus.DESIGNING ? 'bg-blue-50 text-blue-600' :
                      p.status === ProjectStatus.REVIEWING ? 'bg-amber-50 text-amber-600' :
                        p.status === ProjectStatus.COMPLETED ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                      }`}>{p.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-slate-600">{p.customer}</td>
                <td className="px-8 py-5">
                  <div className="w-40 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-xs text-slate-400 font-mono">{p.updatedAt}</td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onSelectProject(p.id)} className="px-4 py-1.5 nari-bg text-white rounded-lg text-xs font-bold hover:bg-blue-700">进入工作流</button>
                    {/* Approve Button */}
                    <button onClick={() => handleApproveProject(p.id)} className="p-1.5 text-slate-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition" title="审批推进">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    <button onClick={() => handleEditProject(p)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition" title="编辑">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition" title="删除">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={() => setIsProjectModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative z-10 animate-in zoom-in-95 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingProject ? '编辑项目信息' : '新建设计任务'}</h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveProject(Object.fromEntries(formData));
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">项目名称</label>
                <input name="name" defaultValue={editingProject?.name} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="例如：南京地铁10号线配电改造" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">WBS 编号 (选填，为空自动生成)</label>
                <input name="wbs" defaultValue={editingProject?.wbs} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="例如：CN-NJDT-WBS2025..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">客户名称</label>
                <input name="customer" defaultValue={editingProject?.customer} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">项目状态</label>
                  <select name="status" defaultValue={editingProject?.status || ProjectStatus.PLANNING} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500">
                    {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">当前进度 (%)</label>
                  <input name="progress" type="number" min="0" max="100" defaultValue={editingProject?.progress || 0} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">取消</button>
                <button type="submit" className="px-4 py-2 nari-bg text-white rounded-lg text-sm font-bold hover:bg-blue-700">保存项目</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
