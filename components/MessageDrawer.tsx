
import React from 'react';

interface MessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessageDrawer: React.FC<MessageDrawerProps> = ({ isOpen, onClose }) => {
  const messages = [
    { id: 1, sender: '李总 (技术部)', avatar: '李', color: 'bg-blue-600', content: '关于南京地铁项目的最终审核意见已上传 PLM，请重点关注一次图变更部分，辛苦尽快修改。', time: '5分钟前', unread: true },
    { id: 2, sender: '供应链-王强', avatar: '王', color: 'bg-emerald-600', content: '刚确认了一下，你需要的那批断路器下周二能到货。', time: '30分钟前', unread: false },
    { id: 3, sender: '系统通知', avatar: '系', color: 'bg-slate-600', content: '您的工单 [TASK-2025001] 已被审批通过。', time: '2小时前', unread: false },
    { id: 4, sender: '刘工 (结构)', avatar: '刘', color: 'bg-amber-600', content: '钣金展开图我看了一下，右侧封板的开孔位置好像有点偏移，你再核对一下参数模型。', time: '昨天', unread: false },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            消息中心 (4)
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition text-slate-400">
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
};

export default MessageDrawer;
