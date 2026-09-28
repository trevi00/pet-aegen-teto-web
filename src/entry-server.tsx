// 빌드 때 경로별 HTML 을 미리 그리는 진입점 (scripts/prerender-routes.mjs 가 사용).
// 브라우저에서는 main.tsx 가 이 결과 위에 hydrateRoot 로 이어 붙는다.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
}
