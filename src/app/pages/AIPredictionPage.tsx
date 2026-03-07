import { useState } from 'react';
import { Wand2, TrendingUp, Calendar, Brain, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function AIPredictionPage() {
  const [predictionRange, setPredictionRange] = useState<'3' | '6' | '12'>('6');
  const [isPredicting, setIsPredicting] = useState(false);
  const [showPrediction, setShowPrediction] = useState(true);

  // Historical data
  const historicalData = [
    { month: 'Jan', actual: 4000, type: 'historical' },
    { month: 'Feb', actual: 3000, type: 'historical' },
    { month: 'Mar', actual: 5000, type: 'historical' },
    { month: 'Apr', actual: 7800, type: 'historical' },
    { month: 'May', actual: 8900, type: 'historical' },
    { month: 'Jun', actual: 9390, type: 'historical' },
  ];

  // Prediction data based on selected range
  const getPredictionData = () => {
    const predictions = {
      '3': [
        { month: 'Jul', actual: null, predicted: 10200, lower: 9800, upper: 10600, type: 'prediction' },
        { month: 'Aug', actual: null, predicted: 11100, lower: 10500, upper: 11700, type: 'prediction' },
        { month: 'Sep', actual: null, predicted: 12000, lower: 11200, upper: 12800, type: 'prediction' },
      ],
      '6': [
        { month: 'Jul', actual: null, predicted: 10200, lower: 9800, upper: 10600, type: 'prediction' },
        { month: 'Aug', actual: null, predicted: 11100, lower: 10500, upper: 11700, type: 'prediction' },
        { month: 'Sep', actual: null, predicted: 12000, lower: 11200, upper: 12800, type: 'prediction' },
        { month: 'Oct', actual: null, predicted: 12800, lower: 11900, upper: 13700, type: 'prediction' },
        { month: 'Nov', actual: null, predicted: 13500, lower: 12500, upper: 14500, type: 'prediction' },
        { month: 'Dec', actual: null, predicted: 14200, lower: 13100, upper: 15300, type: 'prediction' },
      ],
      '12': [
        { month: 'Jul', actual: null, predicted: 10200, lower: 9800, upper: 10600, type: 'prediction' },
        { month: 'Aug', actual: null, predicted: 11100, lower: 10500, upper: 11700, type: 'prediction' },
        { month: 'Sep', actual: null, predicted: 12000, lower: 11200, upper: 12800, type: 'prediction' },
        { month: 'Oct', actual: null, predicted: 12800, lower: 11900, upper: 13700, type: 'prediction' },
        { month: 'Nov', actual: null, predicted: 13500, lower: 12500, upper: 14500, type: 'prediction' },
        { month: 'Dec', actual: null, predicted: 14200, lower: 13100, upper: 15300, type: 'prediction' },
        { month: 'Jan+1', actual: null, predicted: 15000, lower: 13800, upper: 16200, type: 'prediction' },
        { month: 'Feb+1', actual: null, predicted: 15800, lower: 14500, upper: 17100, type: 'prediction' },
        { month: 'Mar+1', actual: null, predicted: 16500, lower: 15100, upper: 17900, type: 'prediction' },
        { month: 'Apr+1', actual: null, predicted: 17200, lower: 15700, upper: 18700, type: 'prediction' },
        { month: 'May+1', actual: null, predicted: 18000, lower: 16400, upper: 19600, type: 'prediction' },
        { month: 'Jun+1', actual: null, predicted: 18800, lower: 17100, upper: 20500, type: 'prediction' },
      ],
    };
    return predictions[predictionRange];
  };

  const combinedData = [...historicalData, ...getPredictionData()];

  const handleGeneratePrediction = () => {
    setIsPredicting(true);
    setShowPrediction(false);
    setTimeout(() => {
      setShowPrediction(true);
      setIsPredicting(false);
    }, 2000);
  };

  const predictionSummary = {
    expectedGrowth: '+28%',
    confidence: '87%',
    trend: 'Upward',
    recommendation: 'Strong growth expected - consider scaling operations',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Wand2 className="h-8 w-8 text-purple-600" />
          AI Prediction Model
        </h1>
        <p className="text-gray-600 mt-2">
          AI-powered forecasting to predict future trends and patterns
        </p>
      </div>

      {/* Prediction Controls */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            Prediction Settings
          </CardTitle>
          <CardDescription>Select the time range for AI predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <Button
                onClick={() => setPredictionRange('3')}
                variant={predictionRange === '3' ? 'default' : 'outline'}
                className={predictionRange === '3' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
              >
                3 Months
              </Button>
              <Button
                onClick={() => setPredictionRange('6')}
                variant={predictionRange === '6' ? 'default' : 'outline'}
                className={predictionRange === '6' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
              >
                6 Months
              </Button>
              <Button
                onClick={() => setPredictionRange('12')}
                variant={predictionRange === '12' ? 'default' : 'outline'}
                className={predictionRange === '12' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
              >
                1 Year
              </Button>
            </div>
            <Button
              onClick={handleGeneratePrediction}
              disabled={isPredicting}
              className="ml-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isPredicting ? 'Generating...' : 'Generate Prediction'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Processing State */}
      {isPredicting && (
        <Card className="shadow-md border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="py-8">
            <div className="flex items-center justify-center gap-4">
              <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
              <div>
                <p className="text-lg font-semibold text-purple-900">AI Processing Data...</p>
                <p className="text-sm text-purple-700">Analyzing patterns and generating predictions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prediction Summary */}
      {showPrediction && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Expected Growth</p>
                  <p className="text-3xl font-bold text-green-900">{predictionSummary.expectedGrowth}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Confidence Level</p>
                  <p className="text-3xl font-bold text-blue-900">{predictionSummary.confidence}</p>
                </div>
                <Activity className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">Trend Direction</p>
                  <p className="text-2xl font-bold text-purple-900">{predictionSummary.trend}</p>
                </div>
                <Wand2 className="h-10 w-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 font-medium">Time Range</p>
                  <p className="text-2xl font-bold text-orange-900">{predictionRange} Months</p>
                </div>
                <Calendar className="h-10 w-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Historical + Prediction Chart */}
      {showPrediction && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Historical Data & AI Forecast
            </CardTitle>
            <CardDescription>
              Past performance (blue) and AI-predicted future trends (purple)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 5 }}
                  name="Historical Data"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: '#8b5cf6', r: 5 }}
                  name="AI Prediction"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Prediction Confidence Range */}
      {showPrediction && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Prediction Confidence Range
            </CardTitle>
            <CardDescription>
              Shaded area shows the confidence interval for predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={getPredictionData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stackId="1"
                  stroke="#c4b5fd"
                  fill="#e9d5ff"
                  name="Upper Bound"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stackId="2"
                  stroke="#8b5cf6"
                  fill="#a78bfa"
                  name="Predicted Value"
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stackId="1"
                  stroke="#c4b5fd"
                  fill="#f3e8ff"
                  name="Lower Bound"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* AI Recommendation */}
      {showPrediction && (
        <Card className="shadow-md border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              AI Prediction Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Expected Results</p>
                  <p className="text-gray-600 text-sm mt-1">{predictionSummary.recommendation}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <h4 className="font-semibold text-gray-900 mb-2">Key Insights:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                    The model predicts a {predictionSummary.expectedGrowth} growth over the next {predictionRange} months
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                    Confidence level is {predictionSummary.confidence}, indicating reliable predictions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                    Strong upward trend detected with consistent momentum
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
                    Historical patterns suggest seasonal peaks in Q4
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
