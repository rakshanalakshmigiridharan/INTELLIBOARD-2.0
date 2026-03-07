import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Brain, AlertCircle, Info } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAuthorizedEmails, setShowAuthorizedEmails] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const authorizedEmails = [
    'ramanilakshmipriya26@gmail.com',
    'rakshanalakshmi.g.cse.2022@snsct.org',
    'ramanesh.k.cse.2022@snsct.org',
    'ravichandran.v.cse.2022@snsct.org'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    login(email, password).then((result) => {
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Login to access your AI Analytics Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Authorized Emails Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <button
                type="button"
                onClick={() => setShowAuthorizedEmails(!showAuthorizedEmails)}
                className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 w-full"
              >
                <Info className="h-4 w-4" />
                <span>View authorized emails</span>
              </button>
              
              {showAuthorizedEmails && (
                <div className="mt-3 space-y-1">
                  {authorizedEmails.map((email, index) => (
                    <p key={index} className="text-xs text-blue-800 font-mono">
                      • {email}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign up here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}