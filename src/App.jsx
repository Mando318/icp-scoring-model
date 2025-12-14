import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Filter } from 'lucide-react';

const ICPScoringModel = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'totalScore', direction: 'desc' });
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [minScore, setMinScore] = useState(0);

  const criteria = {
    size: { weight: 20, name: 'Company Size' },
    positioning: { weight: 25, name: 'Market Positioning' },
    technical: { weight: 15, name: 'Technical Focus' },
    growth: { weight: 20, name: 'Growth Indicators' },
    geography: { weight: 10, name: 'Geographic Fit' },
    specialization: { weight: 10, name: 'Vertical Specialization' }
  };

  const salesforceOriginal = [
    { name: 'Digital Socius', platform: 'Salesforce', size: 8, positioning: 9, technical: 8, growth: 7, geography: 10, specialization: 7 },
    { name: 'Bluewave Technology Group', platform: 'Salesforce', size: 7, positioning: 8, technical: 8, growth: 8, geography: 10, specialization: 6 },
    { name: 'Solution Junkies', platform: 'Salesforce', size: 7, positioning: 8, technical: 7, growth: 7, geography: 10, specialization: 9 },
    { name: 'ThirdEye Consulting', platform: 'Salesforce', size: 7, positioning: 7, technical: 7, growth: 7, geography: 10, specialization: 6 },
    { name: 'Silver Softworks', platform: 'Salesforce', size: 7, positioning: 7, technical: 8, growth: 7, geography: 10, specialization: 6 },
    { name: 'MagicFuse', platform: 'Salesforce', size: 7, positioning: 8, technical: 9, growth: 7, geography: 10, specialization: 6 },
    { name: 'CloudMasonry', platform: 'Salesforce', size: 6, positioning: 7, technical: 8, growth: 8, geography: 7, specialization: 7 },
    { name: 'Methods', platform: 'Salesforce', size: 7, positioning: 7, technical: 7, growth: 6, geography: 10, specialization: 8 },
    { name: 'Pexlify', platform: 'Salesforce', size: 7, positioning: 8, technical: 8, growth: 7, geography: 8, specialization: 6 },
    { name: 'StarrData', platform: 'Salesforce', size: 8, positioning: 8, technical: 8, growth: 7, geography: 9, specialization: 7 },
    { name: 'Cloud Giants', platform: 'Salesforce', size: 7, positioning: 8, technical: 8, growth: 7, geography: 9, specialization: 9 },
    { name: 'EBA', platform: 'Salesforce', size: 8, positioning: 9, technical: 7, growth: 8, geography: 10, specialization: 7 },
    { name: 'Codleo', platform: 'Salesforce', size: 8, positioning: 9, technical: 8, growth: 7, geography: 10, specialization: 7 },
    { name: 'Routine Automation', platform: 'Salesforce', size: 7, positioning: 7, technical: 7, growth: 7, geography: 10, specialization: 6 },
    { name: 'Roycon', platform: 'Salesforce', size: 7, positioning: 7, technical: 8, growth: 6, geography: 9, specialization: 8 },
    { name: 'DemandBlue', platform: 'Salesforce', size: 7, positioning: 7, technical: 7, growth: 7, geography: 9, specialization: 7 },
    { name: 'Hitteps', platform: 'Salesforce', size: 7, positioning: 8, technical: 8, growth: 7, geography: 10, specialization: 6 },
    { name: 'ignyto', platform: 'Salesforce', size: 7, positioning: 7, technical: 8, growth: 7, geography: 10, specialization: 7 },
    { name: 'DK Innovation', platform: 'Salesforce', size: 7, positioning: 7, technical: 9, growth: 6, geography: 9, specialization: 8 },
    { name: 'Asteri', platform: 'Salesforce', size: 8, positioning: 8, technical: 7, growth: 7, geography: 10, specialization: 9 }
  ];

  const newProspects = [
    { name: 'Silvr Lining', platform: 'Salesforce', size: 9, positioning: 9, technical: 7, growth: 8, geography: 10, specialization: 8 },
    { name: 'makepositive', platform: 'Salesforce', size: 6, positioning: 7, technical: 8, growth: 8, geography: 10, specialization: 6 },
    { name: 'CloudShift', platform: 'Salesforce', size: 7, positioning: 8, technical: 8, growth: 10, geography: 10, specialization: 7 },
    { name: 'Westbrook International', platform: 'Salesforce', size: 6, positioning: 7, technical: 7, growth: 6, geography: 10, specialization: 8 },
    { name: 'Simpala', platform: 'Salesforce', size: 8, positioning: 9, technical: 7, growth: 7, geography: 10, specialization: 9 },
    { name: 'Economic Change', platform: 'Salesforce', size: 8, positioning: 8, technical: 6, growth: 7, geography: 10, specialization: 10 },
    { name: 'TNP (The NAV People)', platform: 'Dynamics', size: 6, positioning: 7, technical: 8, growth: 7, geography: 10, specialization: 8 },
    { name: 'Azzure IT', platform: 'Dynamics', size: 8, positioning: 8, technical: 8, growth: 8, geography: 10, specialization: 7 },
    { name: 'Tecman', platform: 'Dynamics', size: 7, positioning: 7, technical: 8, growth: 7, geography: 10, specialization: 10 },
    { name: 'TVision', platform: 'Dynamics', size: 9, positioning: 9, technical: 7, growth: 7, geography: 10, specialization: 6 },
    { name: 'Xperience', platform: 'Dynamics', size: 7, positioning: 8, technical: 8, growth: 7, geography: 10, specialization: 8 },
    { name: 'Tecvia', platform: 'Dynamics', size: 8, positioning: 9, technical: 8, growth: 8, geography: 10, specialization: 9 },
    { name: 'Advantage Business Systems', platform: 'Dynamics', size: 6, positioning: 7, technical: 7, growth: 6, geography: 10, specialization: 7 },
    { name: 'Valto', platform: 'Dynamics', size: 6, positioning: 7, technical: 8, growth: 7, geography: 10, specialization: 6 },
    { name: 'City Dynamics', platform: 'Dynamics', size: 7, positioning: 8, technical: 8, growth: 7, geography: 10, specialization: 10 },
    { name: 'Infinity Group', platform: 'Dynamics', size: 7, positioning: 8, technical: 8, growth: 10, geography: 10, specialization: 7 },
    { name: '3EN Group', platform: 'NetSuite', size: 7, positioning: 7, technical: 8, growth: 8, geography: 9, specialization: 6 },
    { name: 'Cloud Business Solutions', platform: 'NetSuite', size: 8, positioning: 8, technical: 7, growth: 7, geography: 9, specialization: 7 },
    { name: 'Cloud Doing Good', platform: 'NetSuite', size: 9, positioning: 9, technical: 8, growth: 9, geography: 10, specialization: 7 },
    { name: 'GoLive Experts', platform: 'NetSuite', size: 8, positioning: 8, technical: 9, growth: 7, geography: 9, specialization: 9 },
    { name: 'Threadgold Consulting', platform: 'NetSuite', size: 7, positioning: 8, technical: 8, growth: 7, geography: 10, specialization: 7 },
    { name: 'Web Control (UK)', platform: 'NetSuite', size: 8, positioning: 8, technical: 8, growth: 7, geography: 10, specialization: 9 },
    { name: 'A2Z Cloud', platform: 'Zoho', size: 7, positioning: 7, technical: 7, growth: 7, geography: 10, specialization: 6 },
    { name: 'Xponential Digital', platform: 'Zoho', size: 7, positioning: 7, technical: 7, growth: 8, geography: 8, specialization: 7 },
    { name: 'Ascent Business Solutions', platform: 'Zoho', size: 7, positioning: 8, technical: 7, growth: 8, geography: 10, specialization: 7 },
    { name: 'FWRD CRM', platform: 'Zoho', size: 7, positioning: 7, technical: 7, growth: 7, geography: 8, specialization: 7 }
  ];

  const allProspects = [...salesforceOriginal, ...newProspects];

  const calculateScore = (prospect) => {
    return (
      (prospect.size * criteria.size.weight) +
      (prospect.positioning * criteria.positioning.weight) +
      (prospect.technical * criteria.technical.weight) +
      (prospect.growth * criteria.growth.weight) +
      (prospect.geography * criteria.geography.weight) +
      (prospect.specialization * criteria.specialization.weight)
    ) / 10;
  };

  const prospectsWithScores = useMemo(() => {
    return allProspects.map(p => ({
      ...p,
      totalScore: calculateScore(p),
      tier: calculateScore(p) >= 80 ? 'A' : calculateScore(p) >= 70 ? 'B' : 'C'
    }));
  }, []);

  const filteredAndSorted = useMemo(() => {
    let filtered = prospectsWithScores.filter(p => {
      const platformMatch = filterPlatform === 'all' || p.platform === filterPlatform;
      const scoreMatch = p.totalScore >= minScore;
      return platformMatch && scoreMatch;
    });

    filtered.sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    });

    return filtered;
  }, [prospectsWithScores, sortConfig, filterPlatform, minScore]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
    });
  };

  const tierCounts = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0 };
    prospectsWithScores.forEach(p => counts[p.tier]++);
    return counts;
  }, [prospectsWithScores]);

  const platformCounts = useMemo(() => {
    const counts = {};
    prospectsWithScores.forEach(p => {
      counts[p.platform] = (counts[p.platform] || 0) + 1;
    });
    return counts;
  }, [prospectsWithScores]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">ICP Scoring Model</h1>
          <p className="text-slate-600">50 CRM Implementation Partner Prospects - Prioritized for Outreach</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-green-600 text-sm font-semibold mb-1">Tier A (80+)</div>
            <div className="text-3xl font-bold text-green-700">{tierCounts.A}</div>
            <div className="text-xs text-green-600 mt-1">High Priority</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-blue-600 text-sm font-semibold mb-1">Tier B (70-79)</div>
            <div className="text-3xl font-bold text-blue-700">{tierCounts.B}</div>
            <div className="text-xs text-blue-600 mt-1">Medium Priority</div>
          </div>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="text-amber-600 text-sm font-semibold mb-1">Tier C (&lt;70)</div>
            <div className="text-3xl font-bold text-amber-700">{tierCounts.C}</div>
            <div className="text-xs text-amber-600 mt-1">Lower Priority</div>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="text-purple-600 text-sm font-semibold mb-1">Total Prospects</div>
            <div className="text-3xl font-bold text-purple-700">{prospectsWithScores.length}</div>
            <div className="text-xs text-purple-600 mt-1">Across 4 Platforms</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Platform Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(platformCounts).map(([platform, count]) => (
              <div key={platform} className="bg-slate-50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-slate-700">{count}</div>
                <div className="text-sm text-slate-600">{platform}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="text-xl font-bold text-slate-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
              <select 
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Platforms</option>
                <option value="Salesforce">Salesforce</option>
                <option value="Dynamics">Microsoft Dynamics</option>
                <option value="NetSuite">NetSuite</option>
                <option value="Zoho">Zoho</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Score: {minScore}</label>
              <input 
                type="range"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Scoring Criteria Weights</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(criteria).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between bg-slate-50 rounded p-3">
                <span className="text-sm text-slate-700">{value.name}</span>
                <span className="font-bold text-slate-800">{value.weight}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-slate-700" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-2">
                      Company Name <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-slate-700" onClick={() => handleSort('platform')}>
                    <div className="flex items-center gap-2">
                      Platform <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center cursor-pointer hover:bg-slate-700" onClick={() => handleSort('totalScore')}>
                    <div className="flex items-center justify-center gap-2">
                      Total Score <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center cursor-pointer hover:bg-slate-700" onClick={() => handleSort('tier')}>
                    <div className="flex items-center justify-center gap-2">
                      Tier <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center">Size</th>
                  <th className="px-4 py-3 text-center">Positioning</th>
                  <th className="px-4 py-3 text-center">Growth</th>
                  <th className="px-4 py-3 text-center">Specialization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAndSorted.map((prospect, index) => (
                  <tr key={prospect.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-600 font-medium">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{prospect.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        prospect.platform === 'Salesforce' ? 'bg-blue-100 text-blue-700' :
                        prospect.platform === 'Dynamics' ? 'bg-green-100 text-green-700' :
                        prospect.platform === 'NetSuite' ? 'bg-orange-100 text-orange-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {prospect.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-lg text-slate-800">{prospect.totalScore.toFixed(1)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full font-bold ${
                        prospect.tier === 'A' ? 'bg-green-500 text-white' :
                        prospect.tier === 'B' ? 'bg-blue-500 text-white' :
                        'bg-amber-500 text-white'
                      }`}>
                        {prospect.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">{prospect.size}/10</td>
                    <td className="px-4 py-3 text-center text-slate-600">{prospect.positioning}/10</td>
                    <td className="px-4 py-3 text-center text-slate-600">{prospect.growth}/10</td>
                    <td className="px-4 py-3 text-center text-slate-600">{prospect.specialization}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Recommended Outreach Order</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="font-bold text-green-700">Week 1-2:</div>
              <div className="text-slate-700">Start with Tier A prospects (80+ score). Focus on top 10-15 companies.</div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="font-bold text-blue-700">Week 3-4:</div>
              <div className="text-slate-700">Move to Tier B prospects (70-79 score). Target next 15-20 companies.</div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <div className="font-bold text-amber-700">Week 5+:</div>
              <div className="text-slate-700">Consider Tier C prospects if capacity allows or if they have specific strategic value.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPScoringModel;
