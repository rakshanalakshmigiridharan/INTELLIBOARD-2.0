import { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Award, Zap, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Insight {
  id: number;
  type: 'trend' | 'anomaly' | 'performance' | 'opportunity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  value: string;
  icon: any;
  color: string;
}

export function AIInsightsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);

  // Sample trend data
  const trendData = [
    { month: 'Jan', sales: 4000, revenue: 2400, growth: 1800 },
    { month: 'Feb', sales: 3000, revenue: 1398, growth: 2100 },
    { month: 'Mar', sales: 5000, revenue: 9800, growth: 2900 },
    { month: 'Apr', sales: 7800, revenue: 3908, growth: 3200 },
    { month: 'May', sales: 8900, revenue: 4800, growth: 3800 },
    { month: 'Jun', sales: 9390, revenue: 3800, growth: 4300 },
  ];

  const categoryData = [
    { category: 'Electronics', value: 4500 },
    { category: 'Clothing', value: 3200 },
    { category: 'Food', value: 2800 },
    { category: 'Books', value: 1900 },
    { category: 'Sports', value: 2400 },
  ];

  const generateInsights = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedInsights: Insight[] = [
        {
          id: 1,
          type: 'performance',
          title: 'Highest Performing Category',
          description: 'Electronics category shows exceptional performance with 45% market share',
          impact: 'high',
          value: '+45%',
          icon: Award,
          color: 'from-green-500 to-emerald-600',
        },
        {
          id: 2,
          type: 'trend',
          title: 'Positive Growth Trend',
          description: 'Revenue has increased by 38% over the last 6 months, showing strong upward momentum',
          impact: 'high',
          value: '+38%',
          icon: TrendingUp,
          color: 'from-blue-500 to-indigo-600',
        },
        {
          id: 3,
          type: 'anomaly',
          title: 'Anomaly Detected',
          description: 'Unusual spike in March sales data detected - investigate potential data quality issues',
          impact: 'medium',
          value: 'Alert',
          icon: AlertCircle,
          color: 'from-orange-500 to-red-600',
        },
        {
          id: 4,
          type: 'opportunity',
          title: 'Growth Opportunity',
          description: 'Books category is underperforming - consider marketing campaigns to boost sales',
          impact: 'medium',
          value: 'Action',
          icon: Target,
          color: 'from-purple-500 to-pink-600',
        },
        {
          id: 5,
          type: 'trend',
          title: 'Seasonal Pattern',
          description: 'Data shows strong seasonal patterns - peak performance in Q2',
          impact: 'low',
          value: 'Info',
          icon: Zap,
          color: 'from-yellow-500 to-orange-500',
        },
        {
          id: 6,
          type: 'performance',
          title: 'Customer Retention',
          description: 'Customer retention rate improved by 22% compared to previous quarter',
          impact: 'high',
          value: '+22%',
          icon: Award,
          color: 'from-teal-500 to-cyan-600',
        },
      ];
      setInsights(generatedInsights);
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    generateInsights();
  }, []);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="h-8 w-8 text-indigo-600" />
            AI Data Insights
          </h1>
          <p className="text-gray-600 mt-2">
            AI-powered insights automatically generated from your data
          </p>
        </div>
        <button
          onClick={generateInsights}
          disabled={isGenerating}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Regenerate Insights'}
        </button>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <Card className="shadow-md border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="py-8">
            <div className="flex items-center justify-center gap-4">
              <Brain className="h-8 w-8 text-indigo-600 animate-pulse" />
              <div>
                <p className="text-lg font-semibold text-indigo-900">AI Analyzing Your Data...</p>
                <p className="text-sm text-indigo-700">Generating intelligent insights and recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Insights</p>
                <p className="text-3xl font-bold text-blue-900">{insights.length}</p>
              </div>
              <Brain className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">High Impact</p>
                <p className="text-3xl font-bold text-green-900">
                  {insights.filter(i => i.impact === 'high').length}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Anomalies</p>
                <p className="text-3xl font-bold text-orange-900">
                  {insights.filter(i => i.type === 'anomaly').length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Opportunities</p>
                <p className="text-3xl font-bold text-purple-900">
                  {insights.filter(i => i.type === 'opportunity').length}
                </p>
              </div>
              <Target className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} className="shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-transparent hover:border-t-indigo-500">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${insight.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getImpactBadge(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </span>
                </div>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{insight.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-gray-500 uppercase font-semibold">
                    {insight.type}
                  </span>
                  <span className={`text-lg font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent`}>
                    {insight.value}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Revenue Growth Trend
            </CardTitle>
            <CardDescription>Monthly revenue and growth patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="growth" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Category Performance
            </CardTitle>
            <CardDescription>Performance breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
