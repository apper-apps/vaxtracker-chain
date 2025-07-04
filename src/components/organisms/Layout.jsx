import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <Header onSearch={handleSearch} onMenuToggle={handleMenuToggle} />
        
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet context={{ searchTerm }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;