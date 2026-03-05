import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Papa from 'papaparse';

interface Dataset {
  filename: string;
  uploadedAt: string;
  columnNames: string[];
  totalRows: number;
  rows: any[];
}

export function UploadPage() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const columnNames = results.meta.fields || [];
        const rows = results.data;

        const newDataset: Dataset = {
          filename: file.name,
          uploadedAt: new Date().toISOString(),
          columnNames,
          totalRows: rows.length,
          rows,
        };

        setDataset(newDataset);
        localStorage.setItem('dataset', JSON.stringify(newDataset));
        setUploading(false);
      },
      error: () => {
        setUploading(false);
        alert('Error parsing CSV file');
      },
    });
  };

  const handleClear = () => {
    setDataset(null);
    localStorage.removeItem('dataset');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Upload Dataset</h1>
          <p className="text-gray-600">Upload a CSV file to analyze your data</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>CSV File Upload</CardTitle>
            <CardDescription>
              Choose a CSV file from your computer to upload and analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg mb-2">Drop your CSV file here or click to browse</p>
              <p className="text-sm text-gray-500 mb-4">Supports .csv files</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button asChild>
                  <span>Select File</span>
                </Button>
              </label>
            </div>

            {uploading && (
              <div className="mt-4 text-center text-gray-600">
                Processing CSV file...
              </div>
            )}
          </CardContent>
        </Card>

        {dataset && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Dataset Uploaded Successfully</CardTitle>
                    <CardDescription>Your dataset is ready for analysis</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClear}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Filename</p>
                    <p className="font-semibold">{dataset.filename}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <BarChart className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Rows</p>
                    <p className="font-semibold">{dataset.totalRows.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Column Names ({dataset.columnNames.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {dataset.columnNames.map((col, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Preview (First 5 rows)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {dataset.columnNames.map((col, index) => (
                          <th key={index} className="px-4 py-2 text-left font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataset.rows.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-t">
                          {dataset.columnNames.map((col, colIndex) => (
                            <td key={colIndex} className="px-4 py-2">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function BarChart({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}
