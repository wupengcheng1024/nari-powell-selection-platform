
import React, { useState } from 'react';

interface MainBusbarAssemblyProps {
  onPrev: () => void;
  onNext: () => void;
}

const MainBusbarAssembly: React.FC<MainBusbarAssemblyProps> = ({ onPrev, onNext }) => {
  const [cabinets, setCabinets] = useState([
    { id: '1G1', name: '进线柜', img: 'images/pingui/assembly/1G1.png', spacing: 0 },
    { id: '1G2', name: '馈线柜', img: 'images/pingui/assembly/1G2.png', spacing: 0 },
    { id: '1G3', name: '馈线柜', img: 'images/pingui/assembly/1G3.png', spacing: 0 },
    { id: '1G4', name: '联络柜', img: 'images/pingui/assembly/1G4.png', spacing: 0 },
    { id: '1G5', name: 'PT柜', img: 'images/pingui/assembly/1G5.png', spacing: 0 },
    { id: '1G6', name: '计量柜', img: 'images/pingui/assembly/1G6.png', spacing: 0 },
  ]);

  const [globalSpacing, setGlobalSpacing] = useState(0);
  const [tolerance, setTolerance] = useState(60);
  const [direction, setDirection] = useState('从左往右排列');
  const [isAssembling, setIsAssembling] = useState(false);
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Function to move cabinet left
  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newCabinets = [...cabinets];
    const temp = newCabinets[index];
    newCabinets[index] = newCabinets[index - 1];
    newCabinets[index - 1] = temp;
    setCabinets(newCabinets);
  };

  // Function to move cabinet right
  const moveRight = (index: number) => {
    if (index === cabinets.length - 1) return;
    const newCabinets = [...cabinets];
    const temp = newCabinets[index];
    newCabinets[index] = newCabinets[index + 1];
    newCabinets[index + 1] = temp;
    setCabinets(newCabinets);
  };

  const handleAssemble = () => {
    if (showResult) {
      onNext();
      return;
    }

    setIsAssembling(true);
    setAssemblyProgress(0);

    // 目标 2 秒完成 (2000ms)
    // 优化：每次增加 2%，共需 50 次更新
    // 间隔 = 2000ms / 50 = 40ms
    const interval = setInterval(() => {
      setAssemblyProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAssembling(false);
          setShowResult(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500 relative">

      {/* Top Configuration Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 text-sm">
        <h3 className="font-bold text-slate-800 text-lg mr-2">拼柜配置</h3>

        <div className="flex items-center gap-2">
          <label className="text-slate-500 font-bold">排列方向:</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500/20"
            disabled={showResult}
          >
            <option>从左往右排列</option>
            <option>从右往左排列</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-500 font-bold">柜间距:</label>
          <input
            type="number"
            value={globalSpacing}
            onChange={(e) => setGlobalSpacing(Number(e.target.value))}
            className="w-16 border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500/20"
            disabled={showResult}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-500 font-bold">合并误差:</label>
          <input
            type="number"
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
            className="w-16 border border-slate-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500/20"
            disabled={showResult}
          />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-inner p-8 overflow-hidden relative flex flex-col">
        {/* Loading Overlay */}
        {isAssembling && (
          <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300 rounded-2xl">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-600/50" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * assemblyProgress) / 100} strokeLinecap="round" className="text-blue-500 transition-all duration-75 ease-linear" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="font-bold text-white text-5xl font-mono">{assemblyProgress}%</span>
              </div>
            </div>
            <div className="text-center text-white">
              <h4 className="font-bold text-2xl mb-2">正在执行整柜主母排总装拼接...</h4>
              <p className="text-slate-300 text-sm font-mono tracking-wider">Validating Inter-cabinet Busbar Connections</p>
            </div>
          </div>
        )}

        {/* Content: Result Image OR Cabinet List */}
        {showResult ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-700">
            <div className="relative max-w-full max-h-full p-4">
              <img
                src="images/pingui/result.png"
                alt="Assembly Result"
                className="max-h-[60vh] object-contain drop-shadow-2xl rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1200x600/f8fafc/94a3b8?text=Assembly+Result+Preview';
                }}
              />
              <div className="absolute top-8 right-8 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-bounce">
                拼接成功 ✔
              </div>
            </div>
            <p className="text-slate-500 font-bold mt-6 text-lg">主母排总装拼接完成 (Assembly Completed)</p>
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto flex items-center">
            <div className="flex gap-6 mx-auto p-4 min-w-max justify-start">
              {cabinets.map((cabinet, index) => (
                <div key={cabinet.id} className="w-64 flex flex-col gap-2 group shrink-0">
                  <div className="text-center font-bold text-slate-700">{cabinet.id}</div>
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 h-96 flex items-center justify-center relative group-hover:border-blue-400 transition-all bg-white shadow-sm overflow-hidden">
                    <img
                      src={cabinet.img}
                      alt={cabinet.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/200x400/f1f5f9/94a3b8?text=${cabinet.id}`;
                      }}
                    />
                    <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-500 rounded font-bold">{cabinet.name}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => moveLeft(index)}
                      disabled={index === 0}
                      className="flex-1 bg-blue-500 text-white text-xs font-bold py-1.5 rounded hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      左移
                    </button>
                    <button
                      onClick={() => moveRight(index)}
                      disabled={index === cabinets.length - 1}
                      className="flex-1 bg-blue-500 text-white text-xs font-bold py-1.5 rounded hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      右移
                    </button>
                  </div>

                  <div className="flex items-center gap-2 justify-center mt-1">
                    <span className="text-xs text-slate-400">柜间距</span>
                    <input
                      type="number"
                      value={cabinet.spacing}
                      onChange={(e) => {
                        const newCabs = [...cabinets];
                        newCabs[index].spacing = Number(e.target.value);
                        setCabinets(newCabs);
                      }}
                      className="w-14 border border-slate-300 rounded px-1 py-0.5 text-xs text-center outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="text-sm font-bold text-slate-700 mt-1">非轻量化的零件类型:</div>
          <div className="flex-1 flex flex-wrap gap-x-6 gap-y-3">
            {['铜排', '分支排', '联络排', '主母排', '垫块', '始端', '柜顶伸出排', '软连接', '转接块', '母线框', '柜内主母排'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <input type="checkbox" id={`chk-${item}`} className="rounded text-blue-600 focus:ring-blue-500" defaultChecked={['铜排', '主母排'].includes(item)} disabled={showResult} />
                <label htmlFor={`chk-${item}`} className={`text-sm ${showResult ? 'text-slate-400' : 'text-slate-600'}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 my-2"></div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="chk-connect-main" className="rounded text-blue-600" defaultChecked disabled={showResult} />
            <label htmlFor="chk-connect-main" className={`text-sm font-bold ${showResult ? 'text-slate-400' : 'text-slate-700'}`}>连接柜内主母排</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="chk-plating" className="rounded text-blue-600" defaultChecked disabled={showResult} />
            <label htmlFor="chk-plating" className={`text-sm font-bold ${showResult ? 'text-slate-400' : 'text-slate-700'}`}>连接后转镀金</label>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button onClick={onPrev} className="px-8 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95">返回上一步</button>
        <button
          onClick={handleAssemble}
          disabled={isAssembling}
          className={`px-10 py-3 rounded-xl font-bold shadow-lg transition active:scale-95 disabled:opacity-70 disabled:cursor-wait flex items-center gap-2 text-base ${showResult ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/20' : 'nari-bg hover:bg-blue-700 text-white shadow-blue-500/20'}`}
        >
          {isAssembling ? '正在拼柜...' : showResult ? '确认并下一步' : '开始拼柜总装'}
          {showResult && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
        </button>
      </div>

    </div>
  );
};

export default MainBusbarAssembly;
