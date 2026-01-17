
import React, { useState, useMemo } from 'react';
import { ProjectStatus, Project, Material, StandardTemplate } from '../types';

interface DashboardProps {
  onSelectProject: (id: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject, onLogout }) => {
  const [currentTab, setCurrentTab] = useState<'overview' | 'projects' | 'materials' | 'standards'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('全部');
  const [customerFilter, setCustomerFilter] = useState<string>('全部');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [materialCategory, setMaterialCategory] = useState('全部');

  const projects: Project[] = [
    { id: '1', name: '南京地铁10号线配电改造', wbs: 'CN-NJDT-WBS202506001', status: ProjectStatus.DESIGNING, progress: 68, customer: '南京地铁集团', updatedAt: '2025-06-23 14:30' },
    { id: '2', name: '苏州工业园区智能配电项目', wbs: 'CN-SZGY-WBS202506002', status: ProjectStatus.REVIEWING, progress: 95, customer: '园区电力局', updatedAt: '2025-06-23 16:45' },
    { id: '3', name: '通州副中心综合变电站', wbs: 'CN-TZFZX-WBS202507001', status: ProjectStatus.PLANNING, progress: 12, customer: '北京市电力公司', updatedAt: '2025-07-01 09:15' },
    { id: '4', name: '常州西太湖数据中心', wbs: 'CN-CZWTH-WBS202507005', status: ProjectStatus.COMPLETED, progress: 100, customer: '中国电信', updatedAt: '2025-07-02 11:30' },
  ];

  const materials: Material[] = [
    { 
      id: 'M001', 
      name: '高压真空断路器', 
      model: 'VSI-12/1250-31.5', 
      brand: '南瑞帕威尔', 
      category: '断路器', 
      stock: 124, 
      price: '￥18,500', 
      unit: '台', 
      thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=300&h=300&q=80' 
    },
    { 
      id: 'M002', 
      name: '电流互感器', 
      model: 'LZZBJ9-10/150b/2', 
      brand: '特变电工', 
      category: '互感器', 
      stock: 450, 
      price: '￥1,200', 
      unit: '只', 
      thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&h=300&q=80' 
    },
    { 
      id: 'M003', 
      name: '智能型继电保护器', 
      model: 'NARI-REL-670', 
      brand: '南瑞集团', 
      category: '二次设备', 
      stock: 85, 
      price: '￥4,600', 
      unit: '套', 
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&w=300&h=300&q=80' 
    },
    { 
      id: 'M004', 
      name: '环氧树脂绝缘子', 
      model: 'ZJ-10/210', 
      brand: '苏州九利', 
      category: '绝缘件', 
      stock: 1200, 
      price: '￥45', 
      unit: '个', 
      thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=300&h=300&q=80' 
    },
    { 
      id: 'M005', 
      name: '接地开关', 
      model: 'JN15-12/31.5', 
      brand: '南瑞帕威尔', 
      category: '开关设备', 
      stock: 64, 
      price: '￥3,200', 
      unit: '台', 
      thumbnail: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=300&h=300&q=80' 
    },
    { 
      id: 'M006', 
      name: 'T2紫铜排', 
      model: 'TMY-80*10', 
      brand: '宁江铜业', 
      category: '主材', 
      stock: 2400, 
      price: '￥68', 
      unit: 'kg', 
      thumbnail: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=300&h=300&q=80' 
    },
  ];

  const standards: StandardTemplate[] = [
    { id: 'S001', name: 'KYN28A-12 标准进线柜', code: 'STD-KYN28-IN', type: '进线柜方案', description: '南瑞帕威尔 KYN28A-12 铠装式金属封闭开关设备，适用于中置式 12kV 配电系统，包含标准一次方案图及全套数字化 3D 钣金模型。', tags: ['中压', '进线', '1250A'], imageUrl: 'input_file_0.png' },
    { id: 'S002', name: 'KYN28A-12 标准馈线柜', code: 'STD-KYN28-FEED', type: '馈线柜方案', description: '典型馈线柜模板，预置断路器安装位及分支铜排路由路径，支持一键参数化修改与 BOM 自动核对。', tags: ['中压', '馈线', '630A'], imageUrl: 'input_file_1.png' },
    { id: 'S003', name: 'KYN28A-12 PT/计量柜', code: 'STD-KYN28-PT', type: '测量柜方案', description: '集成电压互感器及电能计量功能，优化内部隔室空间利用，符合国网数字化配电房标准。', tags: ['中压', 'PT', '计量'], imageUrl: 'input_file_2.png' },
    { id: 'S004', name: 'XGN-12 智能环网柜', code: 'STD-XGN-RING', type: '环网柜方案', description: '箱型固定式智能环网柜，适用于城市电网环网供电，具备体积小、免维护、数字化接口完善等特点。', tags: ['环网柜', '智能', '紧凑型'], imageUrl: 'input_file_3.png' },
  ];

  const uniqueCustomers = useMemo(() => {
    return ['全部', ...Array.from(new Set(projects.map(p => p.customer)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.includes(searchTerm) || p.wbs.includes(searchTerm);
      const matchesStatus = statusFilter === '全部' || p.status === statusFilter;
      const matchesCustomer = customerFilter === '全部' || p.customer === customerFilter;
      
      const pDate = p.updatedAt.split(' ')[0];
      const matchesStartDate = !startDate || pDate >= startDate;
      const matchesEndDate = !endDate || pDate <= endDate;

      return matchesSearch && matchesStatus && matchesCustomer && matchesStartDate && matchesEndDate;
    });
  }, [projects, searchTerm, statusFilter, customerFilter, startDate, endDate]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchesSearch = m.name.includes(searchTerm) || m.model.includes(searchTerm);
      const matchesCategory = materialCategory === '全部' || m.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchTerm, materialCategory]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('全部');
    setCustomerFilter('全部');
    setStartDate('');
    setEndDate('');
  };

  const renderOverview = () => (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs mb-1">设计任务总数</div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-green-500 text-xs mt-2">↑ 12.5% 本月</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs mb-1">平均一次正确率</div>
          <div className="text-2xl font-bold">95.6%</div>
          <div className="text-blue-500 text-xs mt-2">稳定持平</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs mb-1">进行中项目</div>
          <div className="text-2xl font-bold text-orange-600">42</div>
          <div className="text-slate-400 text-xs mt-2">需尽快处理</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs mb-1">数字化程度</div>
          <div className="text-2xl font-bold">89%</div>
          <div className="text-green-500 text-xs mt-2">↑ 5.7% 较上季度</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700">最近活跃项目</h3>
          <button onClick={() => setCurrentTab('projects')} className="text-blue-600 text-sm hover:underline">查看全部</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">任务ID</th>
              <th className="px-6 py-4 font-medium">项目名称</th>
              <th className="px-6 py-4 font-medium">状态</th>
              <th className="px-6 py-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {projects.slice(0, 3).map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">T250600{p.id}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded-full text-[10px] ${p.status === ProjectStatus.DESIGNING ? 'bg-blue-50 text-blue-600' : p.status === ProjectStatus.REVIEWING ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onSelectProject(p.id)} className="text-blue-600 font-medium">进入</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProjectManagement = () => (
    <div className="p-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">项目管理中心</h2>
          <p className="text-slate-500 text-sm">管理、检索及维护所有数字化电气设计项目</p>
        </div>
        <button className="px-6 py-2 nari-bg text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2">
          <span>+</span>
          <span>新建项目任务</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">关键词搜索</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="搜索项目名称、WBS号..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-40">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">状态</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm text-slate-600"
            >
              <option value="全部">全部状态</option>
              {Object.values(ProjectStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="w-48">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">客户单位</label>
            <select 
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm text-slate-600"
            >
              {uniqueCustomers.map(customer => (
                <option key={customer} value={customer}>{customer}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">日期范围</label>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm text-slate-600" 
                />
                <span className="text-slate-300">至</span>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm text-slate-600" 
                />
              </div>
            </div>
          </div>

          <button 
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            重置筛选
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">WBS号</th>
              <th className="px-6 py-4 font-medium">项目名称</th>
              <th className="px-6 py-4 font-medium">客户单位</th>
              <th className="px-6 py-4 font-medium">进度</th>
              <th className="px-6 py-4 font-medium">状态</th>
              <th className="px-6 py-4 font-medium">最后更新</th>
              <th className="px-6 py-4 font-medium text-right">管理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredProjects.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition group">
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.wbs}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{p.name}</div>
                  <div className="text-[10px] text-slate-400">ID: P-2025-0{p.id}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{p.customer}</td>
                <td className="px-6 py-4">
                  <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full nari-bg" style={{ width: `${p.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">{p.progress}%</span>
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded-full text-[10px] ${
                     p.status === ProjectStatus.DESIGNING ? 'bg-blue-50 text-blue-600' : 
                     p.status === ProjectStatus.REVIEWING ? 'bg-orange-50 text-orange-600' : 
                     p.status === ProjectStatus.COMPLETED ? 'bg-green-50 text-green-600' :
                     'bg-slate-50 text-slate-600'
                   }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">{p.updatedAt}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => onSelectProject(p.id)} className="text-blue-600 hover:text-blue-800 font-medium">进入设计</button>
                  <button className="text-slate-300 hover:text-slate-600">
                    <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <div className="text-4xl mb-3">📂</div>
            <p>未找到符合筛选条件的项目</p>
            <button onClick={resetFilters} className="mt-4 text-blue-600 text-sm font-medium">清除所有筛选条件</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderMaterialLibrary = () => (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">标准数字化物料库</h2>
          <p className="text-slate-500 text-sm">已标准化建模的电气元器件，包含电气参数与 3D 尺寸</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 transition">导出物料清单</button>
          <button className="px-6 py-2 nari-bg text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">+ 录入新物料</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 space-y-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 text-sm px-2">物料分类</h4>
            {['全部', '断路器', '互感器', '开关设备', '绝缘件', '二次设备', '主材'].map(cat => (
              <button 
                key={cat}
                onClick={() => setMaterialCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${materialCategory === cat ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
             <div className="relative z-10">
               <h5 className="font-bold mb-2">3D 模型同步</h5>
               <p className="text-[10px] opacity-80 leading-relaxed">当前物料库已与 Solidworks 渲染库实时同步，支持 100% 自动化参数映射。</p>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
             </div>
          </div>
        </div>

        <div className="col-span-9 space-y-4">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="按名称、规格或厂家搜索物料..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-xs text-slate-400 pr-4">共 {filteredMaterials.length} 项</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredMaterials.map(m => (
              <div key={m.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition group overflow-hidden flex flex-col">
                <div className="h-40 bg-slate-50 flex items-center justify-center p-4 border-b relative">
                  <img src={m.thumbnail} alt={m.name} className="max-h-full max-w-full rounded shadow-sm group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur border rounded text-[9px] font-bold text-slate-500 shadow-sm">
                    {m.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h5 className="font-bold text-slate-800 text-sm mb-1 truncate">{m.name}</h5>
                  <p className="text-[10px] text-slate-400 font-mono mb-3 uppercase truncate">{m.model}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">厂家</span>
                      <span className="text-slate-600 font-medium">{m.brand}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">库存</span>
                      <span className={`font-bold ${m.stock < 100 ? 'text-orange-500' : 'text-slate-600'}`}>{m.stock} {m.unit}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t">
                      <span className="text-slate-400">指导价</span>
                      <span className="text-blue-600 font-bold">{m.price}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button className="py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-slate-200 transition">查看参数</button>
                    <button className="py-2 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700 transition">加入项目</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="bg-white p-20 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-slate-400 text-sm">库中暂无此规格物料，请尝试其他关键词</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStandardLibrary = () => (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">标准数字化柜体库 (Standard Solutions)</h2>
          <p className="text-slate-500 text-sm">南瑞帕威尔官方认证的标准开关柜方案，包含一次方案图、BOM 结构及 3D 参数化钣金模型</p>
        </div>
        <button className="px-6 py-2 nari-bg text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          导出库文档包 (v2.5)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {standards.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex h-80">
            <div className="w-2/5 bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-slate-950 transition-colors">
               <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded uppercase z-10 shadow-lg">Verified</div>
               <img src={s.imageUrl} alt={s.name} className="max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
            </div>
            <div className="flex-1 p-8 flex flex-col bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-800 text-xl leading-tight group-hover:text-blue-600 transition">{s.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{s.code}</span>
                    <span className="text-[10px] text-blue-500 font-bold">{s.type}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {s.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-md text-[10px] font-bold border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex gap-4">
                <button className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition border border-slate-200">方案详情</button>
                <button className="flex-1 py-2.5 nari-bg text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/10">引用此模板</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-900 rounded-[2.5rem] p-12 relative overflow-hidden border border-slate-800">
         <div className="relative z-10 max-w-2xl">
           <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded-full mb-4 border border-blue-500/30">NARI POWELL 2025 NEW SPEC</div>
           <h3 className="text-4xl font-bold text-white mb-6">数字化选型与设计引擎</h3>
           <p className="text-slate-400 text-base mb-10 leading-relaxed font-light">
             基于南瑞帕威尔全生命周期管理系统 (PLM)，本标准库集成了 12kV 及 35kV 主流柜型的全量数字化定义。支持一次图 AI 识别匹配、分支母排智能路由、以及 Solidworks 参数化钣金实时渲染。
           </p>
           <div className="flex gap-4">
             <button className="px-8 py-4 bg-blue-600 text-white text-sm font-bold rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-105 transition-all">
               进入设计中心
             </button>
             <button className="px-8 py-4 bg-slate-800 text-white text-sm font-bold rounded-2xl hover:bg-slate-700 transition-all border border-slate-700">
               下载技术规格书
             </button>
           </div>
         </div>
         
         <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-20 pointer-events-none">
            <svg className="w-96 h-96 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
         </div>
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 nari-bg rounded flex items-center justify-center font-bold">N</div>
          <span className="font-semibold tracking-tight">NARI Integrated</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setCurrentTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${currentTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            仪表盘 (枢纽)
          </button>
          <button 
            onClick={() => setCurrentTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${currentTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            项目管理中心
          </button>
          <button 
            onClick={() => setCurrentTab('materials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${currentTab === 'materials' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            物料库 (BOM)
          </button>
          <button 
            onClick={() => setCurrentTab('standards')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${currentTab === 'standards' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            标准库 (KYN28)
          </button>
        </nav>
        <div className="p-4 mt-auto">
          <button onClick={onLogout} className="w-full px-4 py-2 border border-slate-700 rounded text-xs text-slate-400 hover:bg-slate-800 transition">退出登录</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-64">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <div className="w-2 h-6 nari-bg rounded-full"></div>
            {currentTab === 'overview' ? '南瑞帕威尔设计中枢 (Dashboard)' : currentTab === 'projects' ? '项目管理中心' : currentTab === 'materials' ? '数字化物料清单 (BOM)' : '标准柜体方案库'}
          </h2>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-wider">Authenticated User</span>
                <span className="text-slate-700 font-bold">张工 (资深设计工程师)</span>
              </div>
              <div className="w-10 h-10 rounded-xl nari-bg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">张</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {currentTab === 'overview' ? renderOverview() : 
           currentTab === 'projects' ? renderProjectManagement() : 
           currentTab === 'materials' ? renderMaterialLibrary() : 
           renderStandardLibrary()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
