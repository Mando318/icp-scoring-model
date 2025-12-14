import React, { useState } from 'react';
import { Search, TrendingUp, Building2, DollarSign, Users, Target, Filter, ArrowUpDown, Download, ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('totalScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState(null);
  
  // ICP Scoring Model data will be added here
  const prospects = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ICP Scoring Model - Quantum Outreach
        </h1>
        <p className="text-center text-gray-600 mb-8">50 CRM Implementation Partner Prospects with Advanced Scoring System</p>
      </div>
    </div>
  );
}

export default App;
