import { Activity, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

const SentimentDashboard = ({ analysis }) => {
  if (!analysis) return (
    <div className="text-gray-400 text-center py-10 text-sm font-medium bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
        Awaiting conversation data...
    </div>
  );

  const getIcon = (trend) => {
    if (trend === 'Improving') return <TrendingUp className="text-emerald-500" size={20} />;
    if (trend === 'Declining') return <TrendingDown className="text-rose-500" size={20} />;
    return <Minus className="text-blue-500" size={20} />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'Improving') return 'text-emerald-600';
    if (trend === 'Declining') return 'text-rose-600';
    return 'text-blue-600';
  };

  const getSentimentGradient = (sentiment) => {
     if (sentiment === 'Positive') return 'from-emerald-50 to-teal-50 border-emerald-100 text-emerald-800';
     if (sentiment === 'Negative') return 'from-rose-50 to-red-50 border-rose-100 text-rose-800';
     return 'from-blue-50 to-indigo-50 border-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-4">
      <div className={`p-5 rounded-2xl bg-gradient-to-br ${getSentimentGradient(analysis.overall_sentiment)} border shadow-sm`}>
        <div className="flex items-center gap-2 mb-2">
          <Activity size={16} className="opacity-60" />
          <span className="text-xs uppercase tracking-wider opacity-60 font-bold">Overall Vibe</span>
        </div>
        <div className="text-3xl font-bold tracking-tight">
           {analysis.overall_sentiment || 'Neutral'}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Flow Trend</span>
            {getIcon(analysis.trend)}
        </div>
        <div className={`text-xl font-bold ${getTrendColor(analysis.trend)}`}>
            {analysis.trend || 'Stable'}
        </div>
         <p className="text-[11px] text-gray-400 mt-3 font-medium leading-relaxed">
            AI analysis of sentiment flow from start to finish.
         </p>
      </div>
    </div>
  );
};

export default SentimentDashboard;
