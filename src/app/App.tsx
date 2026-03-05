import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/upload"
            element={
              <Layout>
                <UploadPage />
              </Layout>
            }
          />
          <Route
            path="/chatbot"
            element={
              <Layout>
                <ChatbotPage />
              </Layout>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
