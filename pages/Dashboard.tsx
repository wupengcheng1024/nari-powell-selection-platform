
import React, { useState, useMemo } from 'react';
import { ProjectStatus, Project, Material, StandardTemplate } from '../types';
import BusbarMasterIntro from '../components/BusbarMasterIntro';
import BusbarConversionIntro from '../components/BusbarConversionIntro';
import SelectionPlatformIntro from '../components/SelectionPlatformIntro';
import ProjectManagement from '../components/ProjectManagement';

interface DashboardProps {
  onSelectProject: (id: string) => void;
  onLogout: () => void;
}

type TabType =
  | 'overview' | 'projects' | 'temp-projects'
  | 'selection-platform' | 'busbar-master' | 'busbar-conv'
  | 'standards' | 'materials'
  | 'ai-assistant' | 'bom-compare' | 'drc';

type StandardCategory = '中压柜' | '低压柜' | '箱变';

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject, onLogout }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('全部');
  const [categoryFilter, setCategoryFilter] = useState<string>('全部');
  const [activeStandardCategory, setActiveStandardCategory] = useState<StandardCategory>('中压柜');

  // Drawer States
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  // Temp Project Form State
  const [tempName, setTempName] = useState('');
  const [tempCustomer, setTempCustomer] = useState('');
  const [tempType, setTempType] = useState('配电改造');
  const [tempPriority, setTempPriority] = useState('普通');

  // --- Standards & Materials State Management ---
  const initialStandards: StandardTemplate[] = [
    { id: 'S001', name: 'KYN28A-12 进线柜方案', code: 'STD-KYN28-IN', type: '中压柜', description: '额定 1250A/31.5kA，铠装移开式。', tags: ['中压', '1250A', '10kV'], imageUrl: 'images/zhongya/STD-KYN28-IN.png', status: 'approved' },
    { id: 'S002', name: 'KYN28A-12 馈线柜方案', code: 'STD-KYN28-OUT', type: '中压柜', description: '典型 630A 分支馈电，内置真空断路器。', tags: ['中压', '630A', '馈线'], imageUrl: 'images/zhongya/STD-KYN28-IN.png', status: 'approved' },
    { id: 'S003', name: 'KYN28A-12 PT柜方案', code: 'STD-KYN28-PT', type: '中压柜', description: '母线电压测量与监测，带三相PT。', tags: ['测量', 'PT'], imageUrl: 'images/zhongya/STD-KYN28-IN.png', status: 'approved' },
    { id: 'L001', name: 'GCS 低压进线柜', code: 'STD-GCS-IN', type: '低压柜', description: '额定 2500A，ACB 抽屉式安装，防护等级 IP40。', tags: ['低压', '2500A', 'AC400V'], imageUrl: 'images/diya/STD-GCS-IN.png', status: 'approved' },
    { id: 'L002', name: 'GCS 抽屉出线柜 (1/2单元)', code: 'STD-GCS-OUT', type: '低压柜', description: '模块化抽屉设计，支持 8-11 个回路。', tags: ['模块化', '多回路', '抽屉'], imageUrl: 'images/diya/STD-GCS-IN.png', status: 'pending' },
    { id: 'L003', name: 'MNS 马达控制中心', code: 'STD-MNS-MCC', type: '低压柜', description: '适用于大型工厂电机集中控制。', tags: ['MCC', '过程控制'], imageUrl: 'images/diya/STD-MNS-MCC.png', status: 'approved' },
    { id: 'L004', name: '电容补偿柜', code: 'STD-LV-CAP', type: '低压柜', description: '自动无功补偿，提升系统功率因数。', tags: ['补偿', '节能'], imageUrl: 'images/diya/STD-LV-CAP.png', status: 'approved' },
    { id: 'B001', name: 'YBM-12 欧式箱变', code: 'STD-BOX-EU', type: '箱变', description: '预装式变电站，三位一体结构，耐候性强。', tags: ['预装式', '10kV/0.4kV', '景观型'], imageUrl: 'images/xiangbian/STD-BOX-EU1.png', status: 'approved' },
    { id: 'B002', name: 'ZGS-12 美式箱变', code: 'STD-BOX-US', type: '箱变', description: '变压器身、高压负荷开关等置于同一油箱。', tags: ['组合式', '紧凑型'], imageUrl: 'images/xiangbian/STD-BOX-EU1.png', status: 'pending' },
    { id: 'B003', name: '光伏/风电专用箱变', code: 'STD-BOX-PV', type: '箱变', description: '新能源专用升压站，集成逆变与监控。', tags: ['新能源', '升压'], imageUrl: 'images/xiangbian/STD-BOX-EU1.png', status: 'approved' },
  ];

  const initialMaterials: Material[] = [
    { id: 'M001', name: '真空断路器', model: 'VSI-12/1250-31.5', brand: '南瑞帕威尔', category: '断路器', stock: 124, price: '￥18,500', unit: '台', thumbnail: 'images/bom/ZKDLQ.png', status: 'approved' },
    { id: 'M002', name: '电流互感器', model: 'LZZBJ9-10/150b/2', brand: '特变电工', category: '互感器', stock: 450, price: '￥1,200', unit: '只', thumbnail: 'images/bom/DLHGQ.png', status: 'approved' },
    { id: 'M003', name: '低压塑壳断路器', model: 'NM1-125S', brand: '正泰', category: '断路器', stock: 500, price: '￥450', unit: '只', thumbnail: 'images/bom/SK.png', status: 'pending' },
    { id: 'M004', name: '智能型万能断路器', model: 'RDW5-2000', brand: '人民电器', category: '断路器', stock: 35, price: '￥12,800', unit: '台', thumbnail: 'images/bom/KJ.png', status: 'approved' },
  ];

  const [standardsList, setStandardsList] = useState<StandardTemplate[]>(initialStandards);
  const [materialsList, setMaterialsList] = useState<Material[]>(initialMaterials);

  // Modal State for Standards
  const [isStdModalOpen, setIsStdModalOpen] = useState(false);
  const [editingStandard, setEditingStandard] = useState<StandardTemplate | null>(null);

  // Modal State for Materials
  const [isMatModalOpen, setIsMatModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  // --- Handlers for Standards ---
  const handleAddStandard = () => {
    setEditingStandard(null);
    setIsStdModalOpen(true);
  };

  const handleEditStandard = (s: StandardTemplate) => {
    setEditingStandard(s);
    setIsStdModalOpen(true);
  };

  const handleDeleteStandard = (id: string) => {
    if (window.confirm('确定要删除该标准方案吗？此操作不可恢复。')) {
      setStandardsList(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleApproveStandard = (id: string) => {
    setStandardsList(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };

  const saveStandard = (formData: any) => {
    // Correctly process tags string into array
    const tagsArray = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '')
      : [];

    if (editingStandard) {
      // Update
      setStandardsList(prev => prev.map(s => s.id === editingStandard.id ? {
        ...s,
        ...formData,
        tags: tagsArray // Explicitly overwrite tags to ensure it's an array
      } : s));
    } else {
      // Create
      const newStandard: StandardTemplate = {
        id: `S${Date.now().toString().slice(-4)}`,
        name: formData.name,
        code: formData.code,
        type: formData.type,
        description: formData.description,
        tags: tagsArray,
        imageUrl: formData.imageUrl || 'images/zhongya/STD-KYN28-IN.png',
        status: 'pending' // Default new items to pending
      };
      setStandardsList([newStandard, ...standardsList]);
    }
    setIsStdModalOpen(false);
  };

  // --- Handlers for Materials ---
  const handleAddMaterial = () => {
    setEditingMaterial(null);
    setIsMatModalOpen(true);
  };

  const handleEditMaterial = (m: Material) => {
    setEditingMaterial(m);
    setIsMatModalOpen(true);
  };

  const handleDeleteMaterial = (id: string) => {
    if (window.confirm('确定要删除该元器件模型吗？')) {
      setMaterialsList(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleApproveMaterial = (id: string) => {
    setMaterialsList(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' } : m));
  };

  const saveMaterial = (formData: any) => {
    const stockVal = Number(formData.stock) || 0;

    if (editingMaterial) {
      // Update
      setMaterialsList(prev => prev.map(m => m.id === editingMaterial.id ? {
        ...m,
        ...formData,
        stock: stockVal // Ensure stock is a number
      } : m));
    } else {
      // Create
      const newMaterial: Material = {
        id: `M${Date.now().toString().slice(-4)}`,
        name: formData.name,
        model: formData.model,
        brand: formData.brand,
        category: formData.category,
        price: formData.price,
        stock: stockVal,
        unit: formData.unit,
        thumbnail: formData.thumbnail || 'images/bom/ZKDLQ.png',
        status: 'pending'
      };
      setMaterialsList([newMaterial, ...materialsList]);
    }
    setIsMatModalOpen(false);
  };

  // Mock Data: Warnings
  const warnings = [
    { id: 1, level: 'critical', title: '库存严重不足告警', desc: '物料 VSI-12/1250 当前库存 (5) 低于安全阈值 (10)，可能会影响南京地铁项目交付。', time: '10分钟前', project: 'CN-NJDT-WBS2025' },
    { id: 2, level: 'warning', title: '设计规范冲突预警', desc: '项目 "苏州工业园区" 中第 3 面柜爬电距离 (18mm) 不满足 GB/T 11022 标准 (20mm)。', time: '1小时前', project: 'CN-SZGY-WBS2025' },
    { id: 3, level: 'warning', title: 'PLM 同步异常', desc: '物料编码 M-3302 数据同步失败，请检查网络连接或手动重试。', time: '3小时前', project: '系统任务' },
    { id: 4, level: 'info', title: '系统维护通知', desc: '平台将于今晚 24:00 进行例行维护，预计耗时 30 分钟。', time: '昨天', project: '全平台' },
  ];

  // Mock Data: Messages
  const messages = [
    { id: 1, sender: '李总 (技术部)', avatar: '李', color: 'bg-blue-600', content: '关于南京地铁项目的最终审核意见已上传 PLM，请重点关注一次图变更部分，辛苦尽快修改。', time: '5分钟前', unread: true },
    { id: 2, sender: '供应链-王强', avatar: '王', color: 'bg-emerald-600', content: '刚确认了一下，你需要的那批断路器下周二能到货。', time: '30分钟前', unread: false },
    { id: 3, sender: '系统通知', avatar: '系', color: 'bg-slate-600', content: '您的工单 [TASK-2025001] 已被审批通过。', time: '2小时前', unread: false },
    { id: 4, sender: '刘工 (结构)', avatar: '刘', color: 'bg-amber-600', content: '钣金展开图我看了一下，右侧封板的开孔位置好像有点偏移，你再核对一下参数模型。', time: '昨天', unread: false },
  ];

  // Projects State
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: '南京地铁10号线配电改造', wbs: 'CN-NJDT-WBS202506001', status: ProjectStatus.DESIGNING, progress: 68, customer: '南京地铁集团', updatedAt: '2025-06-23 14:30' },
    { id: '2', name: '苏州工业园区智能配电项目', wbs: 'CN-SZGY-WBS202506002', status: ProjectStatus.REVIEWING, progress: 95, customer: '园区电力局', updatedAt: '2025-06-23 16:45' },
    { id: '3', name: '通州副中心综合变电站', wbs: 'CN-TZFZX-WBS202507001', status: ProjectStatus.PLANNING, progress: 12, customer: '北京市电力公司', updatedAt: '2025-07-01 09:15' },
    { id: '4', name: '常州西太湖数据中心', wbs: 'CN-CZWTH-WBS202507005', status: ProjectStatus.COMPLETED, progress: 100, customer: '中国电信', updatedAt: '2025-07-02 11:30' },
    { id: '5', name: '上海临港新片区110kV站', wbs: 'CN-SHLG-WBS202508001', status: ProjectStatus.DESIGNING, progress: 45, customer: '上海电力公司', updatedAt: '2025-07-10 10:20' },
  ]);

  const filteredMaterials = useMemo(() => {
    return materialsList.filter(m => {
      const matchesSearch = m.name.includes(searchTerm) || m.model.includes(searchTerm);
      const matchesCategory = categoryFilter === '全部' || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter, materialsList]);

  const filteredStandards = useMemo(() => {
    return standardsList.filter(s => s.type === activeStandardCategory);
  }, [activeStandardCategory, standardsList]);

  const handleCreateTempProject = () => {
    if (!tempName || !tempCustomer) {
      alert("请填写项目名称和客户方信息");
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: tempName,
      wbs: `TEMP-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: ProjectStatus.PLANNING,
      progress: 0,
      customer: tempCustomer,
      updatedAt: '刚刚'
    };

    setProjects([newProject, ...projects]);

    // Reset form
    setTempName('');
    setTempCustomer('');
    setTempType('配电改造');

    // Switch to projects tab
    setCurrentTab('projects');
  };

  // Drawer Render Helpers
  const renderWarningDrawer = () => (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isWarningOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsWarningOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isWarningOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            预警任务中心
          </h3>
          <button onClick={() => setIsWarningOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition text-slate-400">
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

  const renderMessageDrawer = () => (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMessageOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMessageOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isMessageOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            消息中心 (4)
          </h3>
          <button onClick={() => setIsMessageOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
          {messages.map(msg => (
            <div key={msg.id} className="p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer flex gap-3 group relative">
              {msg.unread && <div className="absolute right-3 top-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></div>}
              <div className={`w-10 h-10 rounded-full ${msg.color} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm`}>
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{msg.sender}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex gap-2">
            <input type="text" placeholder="回复消息..." className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20" />
            <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderTempProjectCreation = () => (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
        {/* Creation Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">快速新建临时设计任务</h3>
                <p className="text-xs text-slate-400">Temporary Design Project Setup</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">项目名称 (Project Name)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                  placeholder="请输入项目全称..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">客户名称 (Customer)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                  placeholder="请输入客户方名称..."
                  value={tempCustomer}
                  onChange={(e) => setTempCustomer(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">项目类型 (Type)</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                    value={tempType}
                    onChange={(e) => setTempType(e.target.value)}
                  >
                    <option>配电改造</option>
                    <option>新建配电站</option>
                    <option>临时保电</option>
                    <option>方案投标</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">优先级 (Priority)</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm font-bold text-slate-700"
                    value={tempPriority}
                    onChange={(e) => setTempPriority(e.target.value)}
                  >
                    <option>普通</option>
                    <option>紧急</option>
                    <option>特急</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleCreateTempProject}
                  className="w-full py-3.5 nari-bg text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  立即创建并进入管理
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-3">
                  点击创建后，该项目将自动同步至项目列表并生成临时 WBS 号。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Preview */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2 py-0.5 border border-white/20 rounded-lg text-[10px] uppercase font-mono tracking-widest text-blue-300">Preview</span>
                <span className="text-[10px] text-white/40">Generated by NARI AI</span>
              </div>

              <div className="space-y-1 mb-8">
                <h1 className="text-2xl font-bold">{tempName || '未命名项目...'}</h1>
                <p className="text-sm text-slate-400">{tempCustomer || '客户名称...'}</p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">WBS (Auto)</span>
                  <span className="text-blue-400">TEMP-{new Date().getFullYear()}...</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Status</span>
                  <span className="text-amber-400">PLANNING</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Created At</span>
                  <span className="text-slate-300">Just Now</span>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-blue-500"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500">0%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h5 className="font-bold text-blue-800 text-sm mb-1">设计助手提示</h5>
              <p className="text-xs text-blue-600 leading-relaxed">
                临时项目不强制要求关联 PLM 一次图文件，您可以直接进入选配平台进行手动配置。系统将在后续阶段提示您补全正式 WBS 信息。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStandards = () => (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">标准柜型库</h3>
          <p className="text-sm text-slate-500">数字化 3D 方案集 - 实时同步 NARI Powell 技术部标准</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {(['中压柜', '低压柜', '箱变'] as StandardCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveStandardCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeStandardCategory === cat ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddStandard}
            className="px-4 py-2 nari-bg text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            新增方案
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredStandards.map(s => (
          <div key={s.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all group flex flex-col relative">
            <div className="h-56 bg-slate-900 relative flex items-center justify-center p-8 border-b border-slate-800">
              <img src={s.imageUrl} alt={s.name} className="max-h-full max-w-full object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-110 transition duration-500" />
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg shadow-lg">3D ASSET</div>
              {s.status === 'pending' && (
                <div className="absolute top-4 left-4 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-lg shadow-lg animate-pulse">待审批</div>
              )}
              <div className="absolute bottom-4 left-4 flex gap-1">
                {s.tags && Array.isArray(s.tags) && s.tags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 bg-slate-800/80 backdrop-blur text-white/60 text-[8px] rounded uppercase font-mono">{t}</span>)}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{s.code}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.type}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-2 group-hover:text-blue-600 transition">{s.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{s.description}</p>

              <div className="flex gap-2 mt-auto border-t border-slate-100 pt-4">
                {s.status === 'pending' ? (
                  <button
                    onClick={() => handleApproveStandard(s.id)}
                    className="flex-1 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg hover:bg-amber-100 transition flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    审批通过
                  </button>
                ) : (
                  <span className="flex-1 py-1.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-default">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    已发布
                  </span>
                )}
                <button onClick={() => handleEditStandard(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="编辑">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button onClick={() => handleDeleteStandard(s.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="删除">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredStandards.length === 0 && (
          <div className="col-span-4 p-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">该分类下暂无已发布的数字化方案</div>
        )}
      </div>

      {/* Standard Modal */}
      {isStdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={() => setIsStdModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative z-10 animate-in zoom-in-95 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingStandard ? '编辑标准方案' : '新增标准方案'}</h3>
              <button onClick={() => setIsStdModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveStandard(Object.fromEntries(formData));
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">方案名称</label>
                <input name="name" defaultValue={editingStandard?.name} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">方案代码 (Code)</label>
                  <input name="code" defaultValue={editingStandard?.code} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">类型</label>
                  <select name="type" defaultValue={editingStandard?.type || activeStandardCategory} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500">
                    {(['中压柜', '低压柜', '箱变'] as StandardCategory[]).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">描述</label>
                <textarea name="description" defaultValue={editingStandard?.description} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">标签 (逗号分隔)</label>
                <input name="tags" defaultValue={editingStandard?.tags.join(', ')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="例如: 中压, 1250A" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsStdModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">取消</button>
                <button type="submit" className="px-4 py-2 nari-bg text-white rounded-lg text-sm font-bold hover:bg-blue-700">保存方案</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderMaterials = () => (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="搜索型号或物料名..."
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-80 outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>全部</option>
            <option>断路器</option>
            <option>互感器</option>
            <option>继保</option>
            <option>辅材</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            导入 ERP 资产
          </button>
          <button
            onClick={handleAddMaterial}
            className="px-6 py-2 nari-bg text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            新增元器件
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredMaterials.map(m => (
          <div key={m.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-5 hover:border-blue-300 transition group relative">
            {m.status === 'pending' && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-bold rounded">待审核</div>
            )}
            <div className="w-28 h-28 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
              <img src={m.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="flex-1 flex flex-col py-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.category}</span>
                <span className="text-base font-bold text-blue-600">{m.price}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-lg">{m.name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-1 mb-4">{m.model}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-medium">品牌: {m.brand}</span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg font-bold text-[10px]">库存: {m.stock} {m.unit}</span>
              </div>
            </div>

            {/* Actions Overlay on Hover */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur rounded-3xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {m.status === 'pending' && (
                <button
                  onClick={() => handleApproveMaterial(m.id)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl font-bold text-xs hover:bg-amber-600 transition shadow-lg"
                >
                  审批通过
                </button>
              )}
              <button onClick={() => handleEditMaterial(m)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition shadow-sm" title="编辑">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button onClick={() => handleDeleteMaterial(m.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition shadow-sm" title="删除">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Material Modal */}
      {isMatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMatModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative z-10 animate-in zoom-in-95 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingMaterial ? '编辑元器件' : '新增元器件'}</h3>
              <button onClick={() => setIsMatModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveMaterial(Object.fromEntries(formData));
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">名称</label>
                  <input name="name" defaultValue={editingMaterial?.name} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">型号</label>
                  <input name="model" defaultValue={editingMaterial?.model} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">品牌</label>
                  <input name="brand" defaultValue={editingMaterial?.brand} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">分类</label>
                  <select name="category" defaultValue={editingMaterial?.category || '断路器'} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500">
                    <option>断路器</option>
                    <option>互感器</option>
                    <option>继保</option>
                    <option>辅材</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">价格</label>
                  <input name="price" defaultValue={editingMaterial?.price} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">库存</label>
                  <input name="stock" type="number" defaultValue={editingMaterial?.stock} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">单位</label>
                  <input name="unit" defaultValue={editingMaterial?.unit} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsMatModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">取消</button>
                <button type="submit" className="px-4 py-2 nari-bg text-white rounded-lg text-sm font-bold hover:bg-blue-700">保存元器件</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderDeveloping = (moduleName: string, icon: string) => (
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
        onClick={() => setCurrentTab('overview')}
        className="mt-10 px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
      >
        返回设计中枢
      </button>
    </div>
  );

  const renderOverview = () => (
    <div className="p-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">平台指挥总览 (Overview)</h3>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">设计任务总数</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">156</div>
          <div className="text-green-500 text-[11px] font-bold mt-4 flex items-center gap-1">
            <span>↑ 12.5% 本月新增</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl group-hover:bg-amber-500 transition-colors">
              <svg className="w-6 h-6 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">待评审项目</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">24</div>
          <div className="text-slate-400 text-[11px] font-bold mt-4">昨日已完成 8 项</div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 rounded-2xl group-hover:bg-green-600 transition-colors">
              <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">本月发布 BOM 数</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">42</div>
          <div className="text-green-500 text-[11px] font-bold mt-4 flex items-center gap-1">
            <span>✔ 100% 同步 PLM</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">AI 设计替代率</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">45%</div>
          <div className="text-blue-500 text-[11px] font-bold mt-4">较上季度 ↑ 15%</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden py-4">
        <div className="px-8 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-700 flex items-center gap-3">
            <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
            当前执行中的数字化项目
          </h3>
          <button onClick={() => setCurrentTab('projects')} className="text-blue-600 text-xs font-bold hover:underline">进入管理中心</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
            <tr><th className="px-8 py-4 font-extrabold">WBS号</th><th className="px-8 py-4 font-extrabold">项目名称</th><th className="px-8 py-4 font-extrabold text-center">阶段</th><th className="px-8 py-4 text-right font-extrabold">管理</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {projects.slice(0, 3).map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition">
                <td className="px-8 py-5 font-mono text-xs text-slate-400 font-bold">{p.wbs}</td>
                <td className="px-8 py-5 font-bold text-slate-700">{p.name}</td>
                <td className="px-8 py-5 text-center">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${p.status === ProjectStatus.DESIGNING ? 'bg-blue-50 text-blue-600' :
                    p.status === ProjectStatus.REVIEWING ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>{p.status}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button onClick={() => onSelectProject(p.id)} className="px-5 py-1.5 rounded-lg border border-blue-200 text-blue-600 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">进入设计</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'overview': return renderOverview();
      case 'projects': return <ProjectManagement projects={projects} onUpdateProjects={setProjects} onSelectProject={onSelectProject} />;
      case 'materials': return renderMaterials();
      case 'standards': return renderStandards();
      case 'temp-projects': return renderTempProjectCreation();
      case 'busbar-master': return <BusbarMasterIntro />;
      case 'busbar-conv': return <BusbarConversionIntro />;
      case 'selection-platform': return <SelectionPlatformIntro onNavigate={setCurrentTab} />;
      case 'ai-assistant': return renderDeveloping('智能布线', '⚡');
      case 'bom-compare': return renderDeveloping('BOM对比分析', '⚖️');
      case 'drc': return renderDeveloping('设计合规校验', '🛡️');
      default: return renderDeveloping('数字化交付生产看板', '📊');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar: Updated Framework */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col fixed h-full z-20 shadow-2xl font-sans">

        {/* Scrollable Container for Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 pb-4">
            <img src="images/login/logo.png" alt="NARI Logo" className="mb-8 object-contain" />
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">核心设计中枢</h4>
            <nav className="space-y-2">
              <button onClick={() => setCurrentTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                平台总览
              </button>
              <button onClick={() => setCurrentTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                项目管理
              </button>
              <button onClick={() => setCurrentTab('temp-projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'temp-projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                临时设计项目
              </button>
            </nav>
          </div>

          <div className="px-8 py-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">数字化选型工具</h4>
            <nav className="space-y-2">
              <button onClick={() => setCurrentTab('selection-platform')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'selection-platform' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                选配平台
              </button>
              <button onClick={() => setCurrentTab('busbar-master')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'busbar-master' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                铜排大师软件
              </button>
              <button onClick={() => setCurrentTab('busbar-conv')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'busbar-conv' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                电工铜排转换
              </button>
            </nav>
          </div>

          <div className="px-8 py-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">数据管理平台</h4>
            <nav className="space-y-2">
              <button onClick={() => setCurrentTab('standards')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'standards' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                标准柜型方案库
              </button>
              <button onClick={() => setCurrentTab('materials')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'materials' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                元器件模型库
              </button>
            </nav>
          </div>

          <div className="px-8 py-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">智能平台能力 (Future)</h4>
            <nav className="space-y-2">
              <button onClick={() => setCurrentTab('ai-assistant')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'ai-assistant' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                智能布线
              </button>
              <button onClick={() => setCurrentTab('bom-compare')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'bom-compare' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                BOM对比分析
              </button>
              <button onClick={() => setCurrentTab('drc')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'drc' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                设计合规校验
              </button>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 shrink-0">
          <button onClick={onLogout} className="w-full px-4 py-3 border border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition">退出平台系统</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-64 min-h-screen">
        <header className="h-20 bg-white flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            {currentTab === 'overview' ? '平台总览 (Overview)' :
              currentTab === 'projects' ? '项目管理' :
                currentTab === 'temp-projects' ? '临时设计项目' :
                  currentTab === 'selection-platform' ? '选配平台' :
                    currentTab === 'busbar-master' ? '铜排大师软件' :
                      currentTab === 'busbar-conv' ? '电工铜排转换' :
                        currentTab === 'standards' ? '标准柜型方案库' :
                          currentTab === 'materials' ? '元器件模型库' :
                            currentTab === 'ai-assistant' ? '智能布线' :
                              currentTab === 'bom-compare' ? 'BOM对比分析' :
                                currentTab === 'drc' ? '设计合规校验' :
                                  '智能数字化模块'}
          </h2>

          <div className="flex items-center gap-6">
            {/* Global Search */}
            <div className="relative group hidden md:block">
              <input
                type="text"
                placeholder="全站搜索..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs w-48 focus:w-64 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3 border-r border-slate-200 pr-6 mr-2">
              <button onClick={() => setIsWarningOpen(true)} className="p-2 text-slate-400 hover:text-amber-500 transition-colors rounded-xl hover:bg-amber-50 relative group" title="预警中心">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setCurrentTab('standards')}
                className={`p-2 transition-colors rounded-xl relative group ${currentTab === 'standards' ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                title="标准方案库"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </button>
              <button onClick={() => setIsMessageOpen(true)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50 relative group" title="消息中心">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              </button>
            </div>

            <div className="text-right">
              <span className="text-slate-400 text-[10px] block font-extrabold uppercase tracking-widest">Authenticated Designer</span>
              <span className="text-slate-800 font-bold text-sm">张工 (Engine No. 8823)</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">张</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>

      {/* Drawers */}
      {renderWarningDrawer()}
      {renderMessageDrawer()}
    </div>
  );
};

export default Dashboard;
