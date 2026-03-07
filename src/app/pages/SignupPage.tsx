import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Brain, AlertCircle, Mail, CheckCircle, Info } from 'lucide-react';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showEmailSimulation, setShowEmailSimulation] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [showAuthorizedEmails, setShowAuthorizedEmails] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const authorizedEmails = [
    'ramanilakshmipriya26@gmail.com',
    'rakshanalakshmi.g.cse.2022@snsct.org',
    'ramanesh.k.cse.2022@snsct.org',
    'ravichandran.v.cse.2022@snsct.org'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    // Call the async signup function
    signup(name, email, password).then((result) => {
      if (result.success) {
        setShowEmailSimulation(true);
      } else {
        setError(result.message);
      }
    });
  };

  const handleVerifyClick = () => {
    navigate(`/verify-email?token=${verificationToken}`);
  };

  if (showEmailSimulation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Check Your Email!</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification link to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center space-y-4">
              <Mail className="h-12 w-12 text-indigo-600 mx-auto" />
              
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  We've sent a verification email to:
                </p>
                <p className="font-medium text-indigo-600">{email}</p>
              </div>

              <div className="bg-white rounded-md p-4 text-left space-y-2">
                <p className="text-sm font-medium text-gray-800">Next steps:</p>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Check your email inbox</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here to log in</li>
                </ol>
              </div>

              <p className="text-xs text-gray-500">
                ⏰ The verification link will expire in 24 hours
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/login')}
                className="w-full"
                variant="outline"
              >
                Go to Login Page
              </Button>
              
              <div className="text-center text-xs text-gray-500">
                <p>Didn't receive the email?</p>
                <p className="mt-1">Check your spam folder or try signing up again</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Sign up for IntelliBoard - AI Analytics Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="Create a password"
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
                  <p className="text-xs text-blue-700 mb-2">Only these emails can sign up:</p>
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
              Sign Up
            </Button>

            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}