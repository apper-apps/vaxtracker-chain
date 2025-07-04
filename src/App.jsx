import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import InventoryPage from '@/components/pages/InventoryPage';
import ReceivingPage from '@/components/pages/ReceivingPage';
import ReconciliationPage from '@/components/pages/ReconciliationPage';
import ReportsPage from '@/components/pages/ReportsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<InventoryPage />} />
            <Route path="receiving" element={<ReceivingPage />} />
            <Route path="reconciliation" element={<ReconciliationPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;