import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, TrendingUp, FileText, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

interface Dataset {
  filename: string;
  uploadedAt: string;
  columnNames: string[];
  totalRows: number;
  rows: any[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export function DashboardPage() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDataset = localStorage.getItem('dataset');
    if (storedDataset) {
      setDataset(JSON.parse(storedDataset));
    }
  }, []);

  const getNumericColumns = () => {
    if (!dataset || dataset.rows.length === 0) return [];
    const firstRow = dataset.rows[0];
    return dataset.columnNames.filter(col => !isNaN(parseFloat(firstRow[col])));
  };

  const calculateStats = (columnName: string) => {
    if (!dataset) return { avg: 0, min: 0, max: 0, sum: 0 };
    const values = dataset.rows
      .map(row => parseFloat(row[columnName]))
      .filter(val => !isNaN(val));
    
    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      sum: values.reduce((a, b) => a + b, 0),
    };
  };

  const prepareBarChartData = () => {
    if (!dataset) return [];
    const numericCols = getNumericColumns();
    if (numericCols.length === 0) return [];
    
    return dataset.rows.slice(0, 10).map((row, index) => {
      const dataPoint: any = { name: `Row ${index + 1}` };
      numericCols.slice(0, 3).forEach(col => {
        dataPoint[col] = parseFloat(row[col]) || 0;
      });
      return dataPoint;
    });
  };

  const preparePieChartData = () => {
    if (!dataset) return [];
    const numericCols = getNumericColumns();
    if (numericCols.length === 0) return [];
    
    return numericCols.slice(0, 5).map(col => {
      const stats = calculateStats(col);
      return { name: col, value: Math.abs(stats.avg) };
    });
  };

  if (!dataset) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <Database className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl mb-2">No Dataset Uploaded</h2>
          <p className="text-gray-600 mb-6">
            Upload a CSV file to start visualizing your data
          </p>
          <Button onClick={() => navigate('/upload')}>
            Upload Dataset
          </Button>
        </div>
      </div>
    );
  }

  const numericColumns = getNumericColumns();
  const barChartData = prepareBarChartData();
  const pieChartData = preparePieChartData();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Visualize and analyze your data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rows</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{dataset.totalRows.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">records in dataset</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Columns</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{dataset.columnNames.length}</div>
            <p className="text-xs text-muted-foreground">data fields</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Numeric Columns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{numericColumns.length}</div>
            <p className="text-xs text-muted-foreground">numerical fields</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dataset</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl truncate text-sm">{dataset.filename}</div>
            <p className="text-xs text-muted-foreground">active dataset</p>
          </CardContent>
        </Card>
      </div>

      {numericColumns.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                <CardDescription>First 10 rows comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {numericColumns.slice(0, 3).map((col, index) => (
                      <Bar key={col} dataKey={col} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Line Chart</CardTitle>
                <CardDescription>Trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {numericColumns.slice(0, 3).map((col, index) => (
                      <Line
                        key={col}
                        type="monotone"
                        dataKey={col}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Pie Chart</CardTitle>
                <CardDescription>Average values distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics Summary</CardTitle>
                <CardDescription>Key metrics for numeric columns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {numericColumns.slice(0, 4).map((col) => {
                    const stats = calculateStats(col);
                    return (
                      <div key={col} className="border-b pb-3">
                        <p className="font-medium mb-2">{col}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Avg:</span>{' '}
                            <span className="font-semibold">{stats.avg.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Max:</span>{' '}
                            <span className="font-semibold">{stats.max.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Min:</span>{' '}
                            <span className="font-semibold">{stats.min.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Sum:</span>{' '}
                            <span className="font-semibold">{stats.sum.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
          <CardDescription>Preview of your dataset (first 20 rows)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {dataset.columnNames.map((col, index) => (
                    <th key={index} className="px-4 py-2 text-left font-semibold border">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.rows.slice(0, 20).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {dataset.columnNames.map((col, colIndex) => (
                      <td key={colIndex} className="px-4 py-2 border">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
