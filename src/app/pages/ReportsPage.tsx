import { FileText, Download, Filter, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Monthly Analytics Report',
      description: 'Comprehensive monthly performance metrics and insights',
      date: 'March 7, 2026',
      type: 'Analytics',
      status: 'Ready',
    },
    {
      id: 2,
      name: 'Data Quality Report',
      description: 'Summary of data cleaning operations and quality metrics',
      date: 'March 5, 2026',
      type: 'Quality',
      status: 'Ready',
    },
    {
      id: 3,
      name: 'AI Insights Summary',
      description: 'AI-generated insights and recommendations from last month',
      date: 'March 1, 2026',
      type: 'Insights',
      status: 'Ready',
    },
    {
      id: 4,
      name: 'Prediction Accuracy Report',
      description: 'Evaluation of AI prediction model performance',
      date: 'February 28, 2026',
      type: 'Prediction',
      status: 'Ready',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-8 w-8 text-indigo-600" />
            Reports
          </h1>
          <p className="text-gray-600 mt-2">
            Generate and download comprehensive analytics reports
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600">
            <FileText className="h-4 w-4" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <FileText className="h-10 w-10 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <Calendar className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Downloaded</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <Download className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Size</p>
                <p className="text-3xl font-bold text-gray-900">2.4MB</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download and view your generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {report.type}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
