import React, { useState } from 'react';
import { TabId } from './types';
import FileManagement from './components/FileManagement';
import { 
  ReceiptManagement, 
  LabourRecord, 
  PassportReminder, 
  VisaReminder, 
  ContractReminder, 
  InsuranceReminder 
} from './components/OtherTabs';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<TabId>('files');

  const navItems: { id: TabId; label: string; icon: string }[] = [
    { id: 'files', label: '檔案管理', icon: 'fa-folder-open' },
    { id: 'receipts', label: '收據管理', icon: 'fa-file-invoice-dollar' },
    { id: 'labour', label: '勞工處紀錄表', icon: 'fa-clipboard-list' },
    { id: 'passport', label: '短護照提醒', icon: 'fa-passport' },
    { id: 'visa', label: '短簽證提醒', icon: 'fa-id-card' },
    { id: 'contract', label: '續約提醒', icon: 'fa-handshake' },
    { id: 'insurance', label: '保險提醒', icon: 'fa-shield-heart' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'horizonmaid@gmail.com' && password === 'admin@ADA2018') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('帳號或密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setActiveTab('files');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'files': return <FileManagement />;
      case 'receipts': return <ReceiptManagement />;
      case 'labour': return <LabourRecord />;
      case 'passport': return <PassportReminder />;
      case 'visa': return <VisaReminder />;
      case 'contract': return <ContractReminder />;
      case 'insurance': return <InsuranceReminder />;
      default: return <FileManagement />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Employment Agency<br/>Management System
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">帳號</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="輸入您的電郵"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">密碼</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="輸入密碼"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition duration-200"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-row bg-gray-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex-shrink-0 flex flex-col shadow-xl z-50">
        <div className="p-6 border-b border-blue-700">
            <h1 className="text-xl font-bold leading-tight">Employment Agency Management System</h1>
        </div>
        
        <nav className="flex-grow py-6 overflow-y-auto">
          <div className="flex flex-col space-y-2 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-3 rounded-md transition-all duration-200 flex items-center space-x-3 w-full text-left ${
                  activeTab === item.id
                    ? 'bg-white text-blue-900 font-bold shadow-md transform translate-x-1'
                    : 'hover:bg-blue-700 hover:text-white text-blue-100'
                }`}
              >
                <i className={`fas ${item.icon} w-6 text-center`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-blue-700 bg-blue-900">
            <div className="text-center text-blue-300 text-sm mb-2 font-mono">V1.4</div>
            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition shadow"
            >
                <i className="fas fa-sign-out-alt"></i>
                <span>登出</span>
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 h-screen overflow-hidden flex flex-col">
        <div className="flex-grow bg-white rounded-xl shadow-xl p-4 border border-gray-100 overflow-hidden relative">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;