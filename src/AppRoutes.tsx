import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ResultPage from './pages/ResultPage';
import MetricsPage from './pages/MetricsPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import HowToUsePage from './pages/HowToUsePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import { GuideListPage, GuidePage } from './pages/GuidePages';
import { TypeListPage, TypePage, BreedListPage, BreedPage } from './pages/TypeBreedPages';
import AdLayout from './components/AdLayout';
import Footer from './components/Footer';

// 라우터(브라우저: BrowserRouter / 빌드 때 미리 그리기: StaticRouter)와 무관한 화면 트리.
// entry-server.tsx 와 App.tsx 가 같이 쓴다 — 미리 그린 HTML 과 브라우저의 첫 렌더가 같아야 hydrate 가 깜빡임 없이 붙는다.
export default function AppRoutes() {
  return (
    <AdLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/guide" element={<GuideListPage />} />
        <Route path="/guide/:slug" element={<GuidePage />} />
        <Route path="/type" element={<TypeListPage />} />
        <Route path="/type/:slug" element={<TypePage />} />
        <Route path="/breed" element={<BreedListPage />} />
        <Route path="/breed/:slug" element={<BreedPage />} />
        <Route path="/admin/metrics" element={<MetricsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AdLayout>
  );
}
