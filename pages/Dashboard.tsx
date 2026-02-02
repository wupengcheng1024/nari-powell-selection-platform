
import React, { useState, useMemo } from 'react';
import { ProjectStatus, Project, Material, StandardTemplate } from '../types';

interface DashboardProps {
  onSelectProject: (id: string) => void;
  onLogout: () => void;
}

type TabType = 'overview' | 'projects' | 'materials' | 'standards' | 'door-cutout' | 'bom-compare' | 'ai-assistant' | 'drc' | 'production';
type StandardCategory = '中压柜' | '低压柜' | '箱变';

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject, onLogout }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('全部');
  const [categoryFilter, setCategoryFilter] = useState<string>('全部');
  const [activeStandardCategory, setActiveStandardCategory] = useState<StandardCategory>('中压柜');

  const projects: Project[] = [
    { id: '1', name: '南京地铁10号线配电改造', wbs: 'CN-NJDT-WBS202506001', status: ProjectStatus.DESIGNING, progress: 68, customer: '南京地铁集团', updatedAt: '2025-06-23 14:30' },
    { id: '2', name: '苏州工业园区智能配电项目', wbs: 'CN-SZGY-WBS202506002', status: ProjectStatus.REVIEWING, progress: 95, customer: '园区电力局', updatedAt: '2025-06-23 16:45' },
    { id: '3', name: '通州副中心综合变电站', wbs: 'CN-TZFZX-WBS202507001', status: ProjectStatus.PLANNING, progress: 12, customer: '北京市电力公司', updatedAt: '2025-07-01 09:15' },
    { id: '4', name: '常州西太湖数据中心', wbs: 'CN-CZWTH-WBS202507005', status: ProjectStatus.COMPLETED, progress: 100, customer: '中国电信', updatedAt: '2025-07-02 11:30' },
    { id: '5', name: '上海临港新片区110kV站', wbs: 'CN-SHLG-WBS202508001', status: ProjectStatus.DESIGNING, progress: 45, customer: '上海电力公司', updatedAt: '2025-07-10 10:20' },
  ];

  const materials: Material[] = [
    { id: 'M001', name: '真空断路器', model: 'VSI-12/1250-31.5', brand: '南瑞帕威尔', category: '断路器', stock: 124, price: '￥18,500', unit: '台', thumbnail: '/images/bom/ZKDLQ.png' },
    { id: 'M002', name: '电流互感器', model: 'LZZBJ9-10/150b/2', brand: '特变电工', category: '互感器', stock: 450, price: '￥1,200', unit: '只', thumbnail: '/images/bom/DLHGQ.png' },
    { id: 'M003', name: '低压塑壳断路器', model: 'NM1-125S', brand: '正泰', category: '断路器', stock: 500, price: '￥450', unit: '只', thumbnail: '/images/bom/SK.png' },
    { id: 'M004', name: '智能型万能断路器', model: 'RDW5-2000', brand: '人民电器', category: '断路器', stock: 35, price: '￥12,800', unit: '台', thumbnail: '/images/bom/KJ.png' },
  ];

  const allStandards: StandardTemplate[] = [
    // 中压柜
    { id: 'S001', name: 'KYN28A-12 进线柜方案', code: 'STD-KYN28-IN', type: '中压柜', description: '额定 1250A/31.5kA，铠装移开式。', tags: ['中压', '1250A', '10kV'], imageUrl: '/images/zhongya/STD-KYN28-IN.png' },
    { id: 'S002', name: 'KYN28A-12 馈线柜方案', code: 'STD-KYN28-OUT', type: '中压柜', description: '典型 630A 分支馈电，内置真空断路器。', tags: ['中压', '630A', '馈线'], imageUrl: '/images/zhongya/STD-KYN28-IN.png' },
    { id: 'S003', name: 'KYN28A-12 PT柜方案', code: 'STD-KYN28-PT', type: '中压柜', description: '母线电压测量与监测，带三相PT。', tags: ['测量', 'PT'], imageUrl: '/images/zhongya/STD-KYN28-IN.png' },

    // 低压柜
    { id: 'L001', name: 'GCS 低压进线柜', code: 'STD-GCS-IN', type: '低压柜', description: '额定 2500A，ACB 抽屉式安装，防护等级 IP40。', tags: ['低压', '2500A', 'AC400V'], imageUrl: '/images/diya/STD-GCS-IN.png' },
    { id: 'L002', name: 'GCS 抽屉出线柜 (1/2单元)', code: 'STD-GCS-OUT', type: '低压柜', description: '模块化抽屉设计，支持 8-11 个回路。', tags: ['模块化', '多回路', '抽屉'], imageUrl: '/images/diya/STD-GCS-IN.png' },
    { id: 'L003', name: 'MNS 马达控制中心', code: 'STD-MNS-MCC', type: '低压柜', description: '适用于大型工厂电机集中控制。', tags: ['MCC', '过程控制'], imageUrl: '/images/diya/STD-MNS-MCC.png' },
    { id: 'L004', name: '电容补偿柜', code: 'STD-LV-CAP', type: '低压柜', description: '自动无功补偿，提升系统功率因数。', tags: ['补偿', '节能'], imageUrl: '/images/diya/STD-LV-CAP.png' },

    // 箱变
    { id: 'B001', name: 'YBM-12 欧式箱变', code: 'STD-BOX-EU', type: '箱变', description: '预装式变电站，三位一体结构，耐候性强。', tags: ['预装式', '10kV/0.4kV', '景观型'], imageUrl: '/images/xiangbian/STD-BOX-EU1.png' },
    { id: 'B002', name: 'ZGS-12 美式箱变', code: 'STD-BOX-US', type: '箱变', description: '变压器身、高压负荷开关等置于同一油箱。', tags: ['组合式', '紧凑型'], imageUrl: '/images/xiangbian/STD-BOX-EU1.png' },
    { id: 'B003', name: '光伏/风电专用箱变', code: 'STD-BOX-PV', type: '箱变', description: '新能源专用升压站，集成逆变与监控。', tags: ['新能源', '升压'], imageUrl: '/images/xiangbian/STD-BOX-EU1.png' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.includes(searchTerm) || p.wbs.includes(searchTerm);
      const matchesStatus = statusFilter === '全部' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchesSearch = m.name.includes(searchTerm) || m.model.includes(searchTerm);
      const matchesCategory = categoryFilter === '全部' || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const filteredStandards = useMemo(() => {
    return allStandards.filter(s => s.type === activeStandardCategory);
  }, [activeStandardCategory]);

  const renderProjects = () => (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
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
        <button className="px-6 py-2 nari-bg text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition">新建设计任务</button>
      </div>

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
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => onSelectProject(p.id)} className="px-4 py-1.5 nari-bg text-white rounded-lg text-xs font-bold hover:bg-blue-700">进入工作流</button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredStandards.map(s => (
          <div key={s.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all group flex flex-col">
            <div className="h-56 bg-slate-900 relative flex items-center justify-center p-8 border-b border-slate-800">
              <img src={s.imageUrl} alt={s.name} className="max-h-full max-w-full object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-110 transition duration-500" />
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg shadow-lg">3D ASSET</div>
              <div className="absolute bottom-4 left-4 flex gap-1">
                {s.tags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 bg-slate-800/80 backdrop-blur text-white/60 text-[8px] rounded uppercase font-mono">{t}</span>)}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{s.code}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.type}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-2 group-hover:text-blue-600 transition">{s.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{s.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 nari-bg text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition">选用至新项目</button>
                <button className="p-2.5 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
              </div>
            </div>
          </div>
        ))}
        {filteredStandards.length === 0 && (
          <div className="col-span-4 p-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">该分类下暂无已发布的数字化方案</div>
        )}
      </div>
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
        <button className="px-6 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          导入 ERP 资产
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredMaterials.map(m => (
          <div key={m.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-5 hover:border-blue-300 transition group">
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
          </div>
        ))}
      </div>
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
        该模块属于 2026 数字化转型二期规划。完成后将支持基于 AI 的全自动{moduleName}能力，并实现与南瑞 PLM 及 ERP 系统的全链路闭环对接。
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
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">设计任务总数</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">156</div>
          <div className="text-green-500 text-[11px] font-bold mt-3">↑ 12.5% 本月新增</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-500 transition-colors">
              <svg className="w-6 h-6 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">待评审项目</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">24</div>
          <div className="text-slate-400 text-[11px] font-bold mt-3">昨日已完成 8 项</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-green-50 rounded-xl group-hover:bg-green-600 transition-colors">
              <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">本月发布 BOM 数</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">42</div>
          <div className="text-green-500 text-[11px] font-bold mt-3">✔ 100% 同步 PLM</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-slate-500 text-sm font-bold">AI 设计替代率</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">45%</div>
          <div className="text-blue-500 text-[11px] font-bold mt-3">较上季度 ↑ 15%</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-700 flex items-center gap-3">
            <div className="w-1.5 h-5 nari-bg rounded-full"></div>
            当前执行中的数字化项目
          </h3>
          <button onClick={() => setCurrentTab('projects')} className="text-blue-600 text-sm font-bold hover:underline">进入管理中心</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
            <tr><th className="px-8 py-4">WBS号</th><th className="px-8 py-4">项目名称</th><th className="px-8 py-4">阶段</th><th className="px-8 py-4 text-right">管理</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {projects.slice(0, 3).map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="px-8 py-4 font-mono text-xs text-slate-400">{p.wbs}</td>
                <td className="px-8 py-4 font-bold text-slate-700">{p.name}</td>
                <td className="px-8 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.status === ProjectStatus.DESIGNING ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'}`}>{p.status}</span>
                </td>
                <td className="px-8 py-4 text-right">
                  <button onClick={() => onSelectProject(p.id)} className="px-4 py-1.5 rounded-lg border border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">进入设计</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <img src="/images/login/logo.png" alt="NARI POWELL Logo" className="h-8" />
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide">
          <div>
            <h4 className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">核心设计中枢</h4>
            <nav className="space-y-1">
              <button onClick={() => setCurrentTab('overview')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${currentTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                平台指挥总览
              </button>
              <button onClick={() => setCurrentTab('projects')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${currentTab === 'projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                项目管理中心
              </button>
              <button onClick={() => setCurrentTab('standards')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${currentTab === 'standards' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                标准柜型方案库
              </button>
            </nav>
          </div>

          <div>
            <h4 className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">数字化选型工具</h4>
            <nav className="space-y-1">
              <button onClick={() => setCurrentTab('door-cutout')} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition ${currentTab === 'door-cutout' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  仪表门开孔调整
                </div>
                <span className="text-[8px] px-1 bg-blue-500/20 text-blue-300 rounded font-bold uppercase">Beta</span>
              </button>
              <button onClick={() => setCurrentTab('materials')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${currentTab === 'materials' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                物料与BOM管理
              </button>
              <button onClick={() => setCurrentTab('bom-compare')} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition ${currentTab === 'bom-compare' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  BOM比对分析
                </div>
              </button>
            </nav>
          </div>

          <div>
            <h4 className="px-4 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">智能平台能力 (Future)</h4>
            <nav className="space-y-1">
              <button onClick={() => setCurrentTab('ai-assistant')} className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-800 transition">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  AI 辅助布线
                </div>
              </button>
              <button onClick={() => setCurrentTab('drc')} className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-800 transition">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  设计合规性校验
                </div>
              </button>
            </nav>
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button onClick={onLogout} className="w-full px-4 py-2 border border-slate-700 rounded-xl text-xs text-slate-400 hover:bg-slate-800 transition">退出平台系统</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-64 min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-2 h-6 nari-bg rounded-full"></div>
            {currentTab === 'overview' ? '设计指挥中枢 (Overview)' :
              currentTab === 'projects' ? '项目管理中心' :
                currentTab === 'materials' ? '物料资产库 (ERP/BOM)' :
                  currentTab === 'standards' ? '标准柜型方案库' :
                    currentTab === 'door-cutout' ? '仪表门开孔调整工具' :
                      currentTab === 'bom-compare' ? 'BOM 比对分析引擎' :
                        '智能数字化模块'}
          </h2>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-widest">Authenticated Designer</span>
              <span className="text-slate-700 font-bold">张工 (Engine No. 8823)</span>
            </div>
            <div className="w-10 h-10 rounded-2xl nari-bg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">张</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          {currentTab === 'overview' ? renderOverview() :
            currentTab === 'projects' ? renderProjects() :
              currentTab === 'materials' ? renderMaterials() :
                currentTab === 'standards' ? renderStandards() :
                  currentTab === 'door-cutout' ? renderDeveloping('仪表门参数化开孔', '📐') :
                    currentTab === 'bom-compare' ? renderDeveloping('BOM 差异化比对', '⚖️') :
                      currentTab === 'ai-assistant' ? renderDeveloping('AI 智能辅助路由', '⚡') :
                        currentTab === 'drc' ? renderDeveloping('设计规则自动静态检查', '🛡️') :
                          renderDeveloping('数字化交付生产看板', '📊')}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
