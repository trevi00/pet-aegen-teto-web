// 빌드 후처리: 경로마다 제목·설명·canonical·요약 본문이 들어간 HTML 을 dist/<경로>/index.html 로 만든다.
// SPA 는 원본 HTML 이 하나라 검색·광고 크롤러가 모든 페이지를 홈의 중복으로 본다 — 그걸 막기 위한 것.
// React 는 createRoot 로 #root 를 통째로 다시 그리므로, 여기서 넣은 요약은 JS 가 뜨기 전·크롤러용으로만 보인다.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { render } from '../dist-ssr/entry-server.js';

const GUIDES = JSON.parse(readFileSync('src/content/guides.json', 'utf8'));
const TYPES = JSON.parse(readFileSync('src/content/types.json', 'utf8'));
const { summary: SUMMARY, breeds: BREEDS } = JSON.parse(readFileSync('src/content/breeds.json', 'utf8'));
const SP = (s) => (s === 'cat' ? '고양이' : '강아지');
const PCT = (a, b) => `${((100 * a) / b).toFixed(0)}%`;

const SITE = 'https://agttpet.com';
const NAME = '반려동물 에겐테토 테스트';
const DIST = 'dist';

const NAV = `<nav><a href="/">테스트 하기</a> · <a href="/about">서비스 소개</a> · <a href="/how-to-use">사용 방법</a> · <a href="/faq">자주 묻는 질문</a> · <a href="/guide">가이드</a> · <a href="/type">5가지 유형</a> · <a href="/breed">품종별 통계</a> · <a href="/privacy">개인정보처리방침</a> · <a href="/terms">이용약관</a></nav>`;

const ROUTES = [
  {
    path: '/',
    title: `${NAME} - 사진으로 알아보는 우리 아이 성향`,
    description: "강아지·고양이 사진 한 장으로 차분하고 신중한 '에겐'인지, 활발하고 적극적인 '테토'인지 AI가 알려드려요. 회원가입 없이 무료이고, 사진은 분석 후 바로 삭제돼요.",
    body: `<h1>${NAME}</h1>
<p>반려동물 사진 한 장을 올리면 AI가 우리 아이가 <strong>에겐</strong>에 가까운지 <strong>테토</strong>에 가까운지 비율로 알려드려요.</p>
<p>에겐은 차분하고 신중하며 은은한 매력이 있는 타입, 테토는 활발하고 적극적이며 야성적인 매력이 있는 타입이에요. 결과는 재미로 보는 엔터테인먼트이며, 실제 성격을 과학적으로 판단하지는 않아요.</p>`,
  },
  {
    path: '/about',
    title: `서비스 소개 | ${NAME}`,
    description: '에겐테토 테스트가 무엇인지, 에겐과 테토 타입이 어떻게 다른지, AI가 사진을 어떻게 분석하는지 소개해요.',
    body: `<h1>서비스 소개</h1>
<p>에겐테토 테스트는 강아지와 고양이의 사진을 AI가 분석해 에겐과 테토 중 어느 쪽에 가까운지 알려주는 무료 서비스예요.</p>
<p>공개 반려동물 사진 데이터(Oxford-IIIT Pet Dataset, CC BY-SA 4.0)로 학습한 이미지 모델이 품종 성향(60%)·사진 속 자세(30%)·나이 인상(10%) 기준으로 판단해요.</p>`,
  },
  {
    path: '/how-to-use',
    title: `사용 방법 | ${NAME}`,
    description: '이름 입력, 사진 올리기, AI 분석, 결과 확인까지 네 단계 사용법과 잘 나오는 사진 고르는 팁, 결과 비율 읽는 법을 알려드려요.',
    body: `<h1>사용 방법</h1>
<p>반려동물 이름을 적고, 얼굴이 잘 보이는 사진을 올린 뒤 분석을 누르면 몇 초 안에 에겐과 테토 비율이 나와요.</p>
<p>정면에서 밝게 찍은 선명한 사진일수록 결과가 안정적이에요. 옆모습·역광·흔들린 사진은 분석이 어려워요.</p>`,
  },
  {
    path: '/faq',
    title: `자주 묻는 질문 | ${NAME}`,
    description: '무료인지, 어떤 사진을 올릴 수 있는지, 결과가 얼마나 정확한지, 사진은 어떻게 처리되는지 등 자주 묻는 질문을 모았어요.',
    body: `<h1>자주 묻는 질문</h1>
<p>서비스 이용, 분석 결과, 기술, 개인정보, 문제 해결에 관한 질문과 답을 정리했어요.</p>
<p>업로드한 사진은 분석이 끝나면 서버에서 바로 삭제되며, 결과는 저장하지 않아요.</p>`,
  },
  {
    path: '/privacy',
    title: `개인정보처리방침 | ${NAME}`,
    description: '에겐테토 테스트가 처리하는 정보, 사진 삭제 방식, 쿠키와 Google AdSense 광고에 관한 개인정보처리방침이에요.',
    body: `<h1>개인정보처리방침</h1><p>에겐테토 테스트가 어떤 정보를 어떻게 처리하는지 안내해요.</p>`,
  },
  {
    path: '/terms',
    title: `이용약관 | ${NAME}`,
    description: '에겐테토 테스트 서비스 이용약관이에요.',
    body: `<h1>이용약관</h1><p>에겐테토 테스트 서비스 이용에 관한 약관이에요.</p>`,
  },
  {
    path: '/guide',
    title: `에겐테토 가이드 | ${NAME}`,
    description: '에겐과 테토의 기준, AI가 학습한 방식과 정확도, 반려동물 사진 찍는 법, 품종별 에너지 이야기를 모았어요.',
    body: `<h1>에겐테토 가이드</h1><ul>${GUIDES.map((g) => `<li><a href="/guide/${g.slug}">${g.title}</a> — ${g.description}</li>`).join('')}</ul>`,
  },
  ...GUIDES.map((g) => ({
    path: `/guide/${g.slug}`,
    title: `${g.title} | ${NAME}`,
    description: g.description,
    lastmod: g.date,
    body: `<article><h1>${g.title}</h1>${g.sections.map((s) =>
      (s.heading ? `<h2>${s.heading}</h2>` : '') +
      (s.paragraphs ?? []).map((p) => `<p>${p}</p>`).join('') +
      (s.list ? `<ul>${s.list.map((li) => `<li>${li}</li>`).join('')}</ul>` : '')).join('')}</article>`,
  })),
  {
    path: '/type',
    title: `에겐테토 5가지 유형 | ${NAME}`,
    description: '순수 에겐부터 순수 테토까지, 결과의 에겐 비율에 따른 다섯 유형과 각 유형의 특징을 소개해요.',
    body: `<h1>에겐테토 5가지 유형</h1><ul>${TYPES.map((t) => `<li><a href="/type/${t.slug}">${t.name}</a> (${t.range}) — ${t.headline}</li>`).join('')}</ul>`,
  },
  ...TYPES.map((t) => ({
    path: `/type/${t.slug}`,
    title: `${t.name} 유형 · ${t.range} | ${NAME}`,
    description: `${t.headline}. ${t.description.slice(0, 80)}…`,
    body: `<article><h1>${t.name}</h1><p>${t.range}</p><p><strong>${t.headline}</strong></p><p>${t.description}</p>`
      + `<h2>사진에서 보이는 신호</h2><ul>${t.signals.map((s) => `<li>${s}</li>`).join('')}</ul>`
      + `<h2>이 유형이 많이 나온 품종</h2><ol>${[...BREEDS].sort((a, b) => b.dist[t.slug] / b.n - a.dist[t.slug] / a.n).slice(0, 5)
          .map((b) => `<li><a href="/breed/${b.slug}">${b.ko}</a> ${PCT(b.dist[t.slug], b.n)}</li>`).join('')}</ol>`
      + `<h2>보호자님께</h2><ul>${t.tips.map((s) => `<li>${s}</li>`).join('')}</ul></article>`,
  })),
  {
    path: '/breed',
    title: `품종별 에겐·테토 통계 (37품종 ${SUMMARY.images.toLocaleString()}장) | ${NAME}`,
    description: `고양이 12품종과 강아지 25품종 사진 ${SUMMARY.images.toLocaleString()}장을 AI로 분석한 품종별 평균 에겐 비율과 유형 분포예요.`,
    body: `<h1>품종별 에겐·테토 통계</h1><p>고양이 평균 에겐 ${SUMMARY.meanCat}%, 강아지 평균 에겐 ${SUMMARY.meanDog}%.</p><ul>${[...BREEDS].sort((a, b) => b.mean - a.mean)
      .map((b) => `<li><a href="/breed/${b.slug}">${b.ko}</a> (${SP(b.species)}) 평균 에겐 ${b.mean}%</li>`).join('')}</ul>`,
  },
  ...BREEDS.map((b) => ({
    path: `/breed/${b.slug}`,
    title: `${b.ko}, 에겐일까 테토일까? 사진 ${b.n}장 AI 분석 | ${NAME}`,
    description: `${b.ko} 사진 ${b.n}장을 AI로 분석한 결과 평균 에겐 비율 ${b.mean}%, 에겐 쪽으로 나온 사진 ${b.aegenShare}%. 알려진 성향(${b.known})과 비교해 봤어요.`,
    body: `<article><h1>${b.ko}</h1><p>${SP(b.species)}</p><img src="${b.rep.image}" alt="${b.ko} 대표 사진" width="480"><p>${b.intro}</p>`
      + `<h2>AI 판정 결과</h2><p>사진 ${b.n}장, 평균 에겐 비율 ${b.mean}%, 에겐 쪽으로 나온 사진 ${b.aegenShare}%.</p>`
      + `<ul>${TYPES.map((t) => `<li><a href="/type/${t.slug}">${t.name}</a> ${PCT(b.dist[t.slug], b.n)}</li>`).join('')}</ul>`
      + `<h2>알려진 성향과 비교</h2><p>일반적으로 알려진 성향: ${b.known}</p></article>`,
  })),
  // 앱 내부 화면: 색인하지 않는다 (사진을 올린 뒤에만 의미가 있는 화면)
  { path: '/analysis', title: `분석 중 | ${NAME}`, noindex: true },
  { path: '/result', title: `분석 결과 | ${NAME}`, noindex: true },
  { path: '/admin/metrics', title: `지표 | ${NAME}`, noindex: true },
  { path: '/404', file: '404.html', title: `페이지를 찾을 수 없어요 | ${NAME}`, noindex: true,
    body: `<h1>페이지를 찾을 수 없어요</h1><p>주소가 바뀌었거나 없는 페이지예요.</p>` },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function must(html, re, label) {
  if (!re.test(html)) throw new Error(`index.html 에서 ${label} 를 찾지 못했어요`);
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
for (const [re, label] of [
  [/<title>[^<]*<\/title>/, 'title'],
  [/<meta name="description" content="[^"]*"/, 'description'],
  [/<link rel="canonical" href="[^"]*"\s*\/?>/, 'canonical'],
  [/<div id="root"><\/div>/, '#root'],
]) must(template, re, label);

for (const r of ROUTES) {
  const url = SITE + (r.path === '/' ? '/' : r.path);
  const desc = r.description ?? `${NAME}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(desc)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(r.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(desc)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(r.title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(desc)}"`);
  html = r.noindex
    ? html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex" />')
    : html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  // 색인 대상 페이지와 404 는 실제 React 화면을 미리 그린다 → 첫 화면부터 완성된 모습, 브라우저는 hydrate 만.
  // 앱 전용 화면(/analysis·/result·/admin/metrics)은 사진을 올린 뒤에만 의미가 있어 비워 두고 브라우저가 그린다.
  // (r.body 요약은 SSG 이전 방식의 흔적 — 지금은 쓰지 않는다)
  if (!r.noindex || r.file === '404.html') {
    const markup = render(r.path === '/404' ? '/__not-found__' : r.path);
    html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  }

  const out = r.file ? join(DIST, r.file) : r.path === '/' ? join(DIST, 'index.html') : join(DIST, r.path.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerender ${r.path.padEnd(15)} → ${out}`);
}

// sitemap: 색인 대상 경로만, 날짜는 빌드한 날
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => !r.noindex)
  .map((r) => `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${r.lastmod ?? today}</lastmod>\n  </url>`)
  .join('\n');
writeFileSync(join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`sitemap ${ROUTES.filter((r) => !r.noindex).length} urls, lastmod ${today}`);
