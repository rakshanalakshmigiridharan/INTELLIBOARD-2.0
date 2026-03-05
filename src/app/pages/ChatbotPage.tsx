import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Dataset {
  filename: string;
  uploadedAt: string;
  columnNames: string[];
  totalRows: number;
  rows: any[];
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedDataset = localStorage.getItem('dataset');
    if (storedDataset) {
      setDataset(JSON.parse(storedDataset));
    }

    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m your AI analytics assistant. I can help you analyze your dataset. Try asking me questions like:\n\n• "Summarize this dataset"\n• "Show average values"\n• "Which column has the highest values?"\n• "Find anomalies in the data"\n• "What are the key insights?"',
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getNumericColumns = () => {
    if (!dataset || dataset.rows.length === 0) return [];
    const firstRow = dataset.rows[0];
    return dataset.columnNames.filter(col => !isNaN(parseFloat(firstRow[col])));
  };

  const calculateStats = (columnName: string) => {
    if (!dataset) return { avg: 0, min: 0, max: 0, sum: 0, count: 0 };
    const values = dataset.rows
      .map(row => parseFloat(row[columnName]))
      .filter(val => !isNaN(val));
    
    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      sum: values.reduce((a, b) => a + b, 0),
      count: values.length,
    };
  };

  const generateResponse = (question: string): string => {
    if (!dataset) {
      return 'Please upload a dataset first to start analyzing data.';
    }

    const lowerQuestion = question.toLowerCase();
    const numericCols = getNumericColumns();

    if (lowerQuestion.includes('summarize') || lowerQuestion.includes('summary')) {
      return `📊 **Dataset Summary**\n\n` +
        `• **Filename:** ${dataset.filename}\n` +
        `• **Total Rows:** ${dataset.totalRows.toLocaleString()}\n` +
        `• **Total Columns:** ${dataset.columnNames.length}\n` +
        `• **Numeric Columns:** ${numericCols.length}\n` +
        `• **Column Names:** ${dataset.columnNames.join(', ')}\n\n` +
        `The dataset contains ${dataset.totalRows} records with ${dataset.columnNames.length} different fields. ` +
        `${numericCols.length > 0 ? `There are ${numericCols.length} numeric columns that can be analyzed for statistical insights.` : ''}`;
    }

    if (lowerQuestion.includes('average') || lowerQuestion.includes('mean')) {
      if (numericCols.length === 0) {
        return 'No numeric columns found in the dataset to calculate averages.';
      }
      let response = '📈 **Average Values**\n\n';
      numericCols.forEach(col => {
        const stats = calculateStats(col);
        response += `• **${col}:** ${stats.avg.toFixed(2)}\n`;
      });
      return response;
    }

    if (lowerQuestion.includes('highest') || lowerQuestion.includes('maximum') || lowerQuestion.includes('max')) {
      if (numericCols.length === 0) {
        return 'No numeric columns found in the dataset.';
      }
      let maxCol = numericCols[0];
      let maxValue = calculateStats(maxCol).max;
      
      numericCols.forEach(col => {
        const stats = calculateStats(col);
        if (stats.max > maxValue) {
          maxValue = stats.max;
          maxCol = col;
        }
      });
      
      return `🎯 **Highest Values Analysis**\n\n` +
        `The column **"${maxCol}"** has the highest maximum value of **${maxValue.toFixed(2)}**.\n\n` +
        `**All Maximum Values:**\n` +
        numericCols.map(col => {
          const stats = calculateStats(col);
          return `• ${col}: ${stats.max.toFixed(2)}`;
        }).join('\n');
    }

    if (lowerQuestion.includes('lowest') || lowerQuestion.includes('minimum') || lowerQuestion.includes('min')) {
      if (numericCols.length === 0) {
        return 'No numeric columns found in the dataset.';
      }
      let response = '📉 **Minimum Values**\n\n';
      numericCols.forEach(col => {
        const stats = calculateStats(col);
        response += `• **${col}:** ${stats.min.toFixed(2)}\n`;
      });
      return response;
    }

    if (lowerQuestion.includes('anomal') || lowerQuestion.includes('outlier')) {
      if (numericCols.length === 0) {
        return 'No numeric columns found for anomaly detection.';
      }
      
      let response = '🔍 **Anomaly Detection**\n\n';
      numericCols.slice(0, 3).forEach(col => {
        const stats = calculateStats(col);
        const stdDev = Math.sqrt(
          dataset.rows
            .map(row => parseFloat(row[col]))
            .filter(val => !isNaN(val))
            .map(val => Math.pow(val - stats.avg, 2))
            .reduce((a, b) => a + b, 0) / stats.count
        );
        
        const anomalies = dataset.rows.filter(row => {
          const val = parseFloat(row[col]);
          return !isNaN(val) && Math.abs(val - stats.avg) > 2 * stdDev;
        });
        
        response += `• **${col}:** ${anomalies.length} potential anomalies detected (values beyond 2 standard deviations)\n`;
      });
      
      return response;
    }

    if (lowerQuestion.includes('insight') || lowerQuestion.includes('analysis')) {
      return `💡 **Key Insights**\n\n` +
        `Based on the analysis of **${dataset.filename}**:\n\n` +
        `1. **Dataset Size:** The dataset contains ${dataset.totalRows.toLocaleString()} records, ` +
        `which provides ${dataset.totalRows > 1000 ? 'a substantial' : 'a moderate'} sample size for analysis.\n\n` +
        `2. **Data Structure:** With ${dataset.columnNames.length} columns, ` +
        `${numericCols.length > 0 ? `including ${numericCols.length} numeric fields, there are multiple dimensions for analysis.` : 'the data is primarily categorical.'}\n\n` +
        `3. **Statistical Overview:** ${numericCols.length > 0 ? 
          `The numeric columns show varying ranges and distributions. ` +
          `Consider checking for correlations between ${numericCols.slice(0, 2).join(' and ')}.` : 
          'Focus on categorical analysis and frequency distributions.'}\n\n` +
        `Ask me specific questions about averages, trends, or specific columns for deeper insights!`;
    }

    if (lowerQuestion.includes('column') || lowerQuestion.includes('field')) {
      return `📋 **Column Information**\n\n` +
        `**All Columns (${dataset.columnNames.length}):**\n${dataset.columnNames.map((col, i) => `${i + 1}. ${col}`).join('\n')}\n\n` +
        `**Numeric Columns (${numericCols.length}):**\n${numericCols.length > 0 ? numericCols.join(', ') : 'None found'}\n\n` +
        `You can ask me for statistics about any specific column!`;
    }

    if (lowerQuestion.includes('trend') || lowerQuestion.includes('pattern')) {
      if (numericCols.length === 0) {
        return 'No numeric data available for trend analysis.';
      }
      
      return `📊 **Trend Analysis**\n\n` +
        `Analyzing trends in the dataset:\n\n` +
        numericCols.slice(0, 3).map(col => {
          const stats = calculateStats(col);
          const firstValues = dataset.rows.slice(0, 5).map(r => parseFloat(r[col])).filter(v => !isNaN(v));
          const lastValues = dataset.rows.slice(-5).map(r => parseFloat(r[col])).filter(v => !isNaN(v));
          const firstAvg = firstValues.reduce((a, b) => a + b, 0) / firstValues.length;
          const lastAvg = lastValues.reduce((a, b) => a + b, 0) / lastValues.length;
          const trend = lastAvg > firstAvg ? '📈 Increasing' : lastAvg < firstAvg ? '📉 Decreasing' : '➡️ Stable';
          
          return `• **${col}:** ${trend} (Avg: ${stats.avg.toFixed(2)}, Range: ${stats.min.toFixed(2)} - ${stats.max.toFixed(2)})`;
        }).join('\n');
    }

    return `I analyzed your question about the dataset. Here's what I can tell you:\n\n` +
      `The dataset "${dataset.filename}" contains ${dataset.totalRows} rows and ${dataset.columnNames.length} columns. ` +
      `Try asking me more specific questions like:\n\n` +
      `• "What are the average values?"\n` +
      `• "Show me a summary"\n` +
      `• "Which column has the highest values?"\n` +
      `• "Detect anomalies"`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateResponse(input),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);

    setInput('');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl">AI Chatbot</h1>
          </div>
          <p className="text-gray-600">Ask questions about your dataset and get intelligent insights</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Chat with AI Assistant</CardTitle>
            <CardDescription>
              {dataset ? `Analyzing: ${dataset.filename}` : 'Upload a dataset to start chatting'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-3 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="bg-indigo-200 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-indigo-700" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about your dataset..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => setInput('Summarize this dataset')}
            className="justify-start"
          >
            Summarize dataset
          </Button>
          <Button
            variant="outline"
            onClick={() => setInput('Show average values')}
            className="justify-start"
          >
            Show averages
          </Button>
          <Button
            variant="outline"
            onClick={() => setInput('Which column has highest values?')}
            className="justify-start"
          >
            Find highest values
          </Button>
          <Button
            variant="outline"
            onClick={() => setInput('Detect anomalies')}
            className="justify-start"
          >
            Detect anomalies
          </Button>
        </div>
      </div>
    </div>
  );
}
