import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Supabase handles email verification automatically
    // We just need to exchange the token
    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (type === 'signup' || token) {
        // Let Supabase handle the verification
        try {
          // Check if user is now authenticated
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            setStatus('error');
            setMessage('Verification failed. The link may have expired.');
            return;
          }

          if (session) {
            setStatus('success');
            setMessage('Email verified successfully! You can now login.');
          } else {
            setStatus('success');
            setMessage('Email verified! Please login to continue.');
          }
        } catch (error) {
          setStatus('error');
          setMessage('An error occurred during verification.');
        }
      } else {
        setStatus('error');
        setMessage('Invalid verification link.');
      }
    };

    handleEmailVerification();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            {status === 'loading' && (
              <div className="bg-blue-100 p-3 rounded-lg">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl text-center">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-green-800 mb-4">
                Your email has been verified successfully. You can now login to access the AI Analytics Platform.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Continue to Login
              </Button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  {message || 'The verification link is invalid or has expired.'}
                </p>
              </div>
              <div className="space-y-2">
                <Button onClick={() => navigate('/signup')} className="w-full">
                  Sign Up Again
                </Button>
                <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
                  Try Logging In
                </Button>
              </div>
            </div>
          )}

          {status === 'loading' && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600">
                Please wait while we verify your email...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
