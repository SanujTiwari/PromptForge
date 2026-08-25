import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import ExplorePage from '@/pages/ExplorePage';
import PromptDetailPage from '@/pages/PromptDetailPage';
import CollectionsPage from '@/pages/CollectionsPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import CreatorDashboardPage from '@/pages/CreatorDashboardPage';
import ShelfPage from '@/pages/ShelfPage';
import ToastContainer from '@/components/Toast';
import { useAppStore } from '@/store/useAppStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AuthRestorer() {
  const restoreSession = useAppStore((s) => s.restoreSession);
  useEffect(() => { restoreSession(); }, [restoreSession]);
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthRestorer />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/categories" element={<CollectionsPage />} />
            <Route path="/prompts/:slug" element={<PromptDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/seller/dashboard" element={<CreatorDashboardPage />} />
            <Route path="/seller/prompts" element={<CreatorDashboardPage />} />
            <Route path="/seller/prompts/create" element={<CreatorDashboardPage />} />
            <Route path="/wishlist" element={<ShelfPage />} />
            <Route path="/cart" element={<ShelfPage />} />
            <Route path="/ai/generator" element={<CreatorDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
