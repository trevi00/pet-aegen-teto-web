import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// 빌드 때 미리 그린 페이지면 그 위에 이어 붙이고(깜빡임 없음), 앱 전용 화면(/analysis·/result 등)은 새로 그린다
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
