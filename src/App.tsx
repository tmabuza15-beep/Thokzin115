import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Academy } from './components/Academy';
import { IndexAnalyzer } from './components/IndexAnalyzer';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'academy' && <Academy />}
          {activeTab === 'analyzer' && <IndexAnalyzer />}
        </main>
      </div>
    </div>
  );
}
