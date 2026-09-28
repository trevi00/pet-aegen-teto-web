import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import typesData from '../content/types.json';
import breedsData from '../content/breeds.json';
import NotFoundPage from './NotFoundPage';

// 유형 정의는 src/content/types.json, 품종 통계는 src/content/breeds.json
// (breeds.json 은 데이터셋 7,349장을 실제 서비스 분석 경로로 점수 매겨 만든 것 — 백엔드 training/ 참고).
// 빌드 후처리(scripts/prerender-routes.mjs)도 같은 두 파일로 정적 HTML 을 만든다.

export interface PetType {
  slug: string;
  name: string;
  range: string;
  min: number;
  emoji: string;
  headline: string;
  description: string;
  signals: string[];
  tips: string[];
}

export interface Breed {
  key: string;
  slug: string;
  ko: string;
  species: 'cat' | 'dog';
  intro: string;
  known: string;
  knownScore: number;
  n: number;
  mean: number;
  median: number;
  aegenShare: number;
  dist: Record<string, number>;
  rep: { file: string; score: number; image: string };
}

export const TYPES = typesData as PetType[];
const BREEDS = breedsData.breeds as Breed[];
const SUMMARY = breedsData.summary;

/** 에겐 비율(0~100) → 유형. 경계는 types.json 의 min (80/60/40/20). */
export const typeOf = (aegenPct: number): PetType => TYPES.find((t) => aegenPct >= t.min) ?? TYPES[TYPES.length - 1];

const speciesKo = (s: string) => (s === 'cat' ? '고양이' : '강아지');

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
    <div className="w-full max-w-[600px] mx-auto">{children}</div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)] ${className}`}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="font-ownglyph text-[26px] leading-snug mb-2 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
    {children}
  </h1>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-[16px] font-bold text-[#333333] mb-3">{children}</h2>
);

const Cta: React.FC = () => (
  <Link to="/">
    <button className="w-full rounded-[10px] py-3 mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
      <span className="text-[14px] font-bold text-white">우리 아이도 테스트해 보기 🐾</span>
    </button>
  </Link>
);

/** 5유형 분포 막대 (에겐 → 테토 순) */
const DistBar: React.FC<{ dist: Record<string, number>; total: number }> = ({ dist, total }) => (
  <div className="space-y-1.5">
    {TYPES.map((t) => {
      const pct = total ? (100 * (dist[t.slug] ?? 0)) / total : 0;
      return (
        <Link key={t.slug} to={`/type/${t.slug}`} className="flex items-center gap-2 text-[12px] text-[#555555] hover:text-[#FF9ED8]">
          <span className="w-[70px] shrink-0">{t.emoji} {t.name}</span>
          <span className="flex-1 h-3 bg-[#f3f3f3] rounded-full overflow-hidden">
            <span className="block h-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]" style={{ width: `${pct}%` }} />
          </span>
          <span className="w-[44px] text-right">{pct.toFixed(0)}%</span>
        </Link>
      );
    })}
  </div>
);

// ───────────────────────── 유형 ─────────────────────────

export const TypeListPage: React.FC = () => {
  const total = SUMMARY.images;
  return (
    <Shell>
      <div className="text-center mb-6">
        <Title>에겐테토 5가지 유형</Title>
        <p className="text-[14px] text-[#666666]">결과의 에겐 비율에 따라 다섯 유형으로 나눠요</p>
      </div>
      <div className="space-y-3 mb-6">
        {TYPES.map((t) => (
          <Link key={t.slug} to={`/type/${t.slug}`} className="block bg-white rounded-[15px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-shadow">
            <p className="text-[15px] font-bold text-[#333333] mb-1">{t.emoji} {t.name} <span className="text-[12px] font-normal text-[#999999]">· {t.range}</span></p>
            <p className="text-[12px] text-[#666666] leading-relaxed">{t.headline}</p>
            <p className="text-[11px] text-[#999999] mt-1">데이터셋 사진 중 {((100 * SUMMARY.overallDist[t.slug as keyof typeof SUMMARY.overallDist]) / total).toFixed(0)}%가 이 유형</p>
          </Link>
        ))}
      </div>
      <Cta />
    </Shell>
  );
};

export const TypePage: React.FC = () => {
  const { slug } = useParams();
  const [params] = useSearchParams();
  // 공유 링크(?n=이름&p=비율) 배너는 브라우저에서만 그린다 — 미리 그린 HTML(쿼리 없음)과 첫 렌더를 같게 해 hydrate 가 어긋나지 않게.
  // 이름은 20자까지, 비율은 이 유형 범위일 때만 보여 준다.
  const [shared, setShared] = useState<{ name: string; pct: number | null }>({ name: '', pct: null });
  useEffect(() => {
    const p = Number(params.get('p'));
    const ok = params.has('p') && Number.isFinite(p) && p >= 0 && p <= 100 && typeOf(p).slug === slug;
    setShared({ name: (params.get('n') ?? '').slice(0, 20), pct: ok ? p : null });
  }, [params, slug]);
  const index = TYPES.findIndex((t) => t.slug === slug);
  if (index < 0) return <NotFoundPage />;
  const t = TYPES[index];
  const sharedName = shared.name;
  const sharedPct = shared.pct;

  const top = [...BREEDS]
    .map((b) => ({ b, share: (100 * (b.dist[t.slug] ?? 0)) / b.n }))
    .sort((a, c) => c.share - a.share)
    .slice(0, 5);
  const overall = (100 * SUMMARY.overallDist[t.slug as keyof typeof SUMMARY.overallDist]) / SUMMARY.images;

  return (
    <Shell>
      <Link to="/type" className="text-[12px] text-[#888888] hover:text-[#FFB5EB]">← 5가지 유형</Link>

      {sharedName && sharedPct !== null && (
        <div className="bg-white rounded-[15px] p-4 mt-3 text-center shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
          <p className="text-[13px] text-[#555555]"><strong>{sharedName}</strong>의 결과: 에겐 {sharedPct}% · 테토 {(100 - sharedPct).toFixed(1)}%</p>
        </div>
      )}

      <Card className="mt-3">
        <p className="text-[40px] text-center mb-1">{t.emoji}</p>
        <div className="text-center">
          <Title>{t.name}</Title>
          <p className="text-[12px] text-[#999999] mb-3">{t.range}</p>
          <p className="text-[15px] font-bold text-[#444444] mb-4">{t.headline}</p>
        </div>
        <p className="text-[14px] text-[#444444] leading-relaxed">{t.description}</p>
      </Card>

      <Card>
        <H2>사진에서 보이는 신호</H2>
        <ul className="list-disc pl-5 space-y-1.5">
          {t.signals.map((s) => <li key={s} className="text-[13px] text-[#555555] leading-relaxed">{s}</li>)}
        </ul>
      </Card>

      <Card>
        <H2>이 유형이 많이 나온 품종</H2>
        <p className="text-[12px] text-[#888888] mb-3">
          학습 데이터셋 {SUMMARY.images.toLocaleString()}장을 서비스와 같은 AI로 분석했을 때, 사진의 {overall.toFixed(0)}%가 이 유형이었어요.
          품종별로 이 유형이 나온 비율이 높은 순서예요.
        </p>
        <ol className="space-y-1.5">
          {top.map(({ b, share }) => (
            <li key={b.slug}>
              <Link to={`/breed/${b.slug}`} className="flex justify-between text-[13px] text-[#555555] hover:text-[#FF9ED8]">
                <span>{b.ko} <span className="text-[11px] text-[#aaaaaa]">({speciesKo(b.species)})</span></span>
                <span>{share.toFixed(0)}%</span>
              </Link>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <H2>보호자님께</H2>
        <ul className="list-disc pl-5 space-y-1.5">
          {t.tips.map((s) => <li key={s} className="text-[13px] text-[#555555] leading-relaxed">{s}</li>)}
        </ul>
        <p className="text-[11px] text-[#999999] mt-3">결과는 사진 한 장의 순간을 본 것이며, 반려동물의 실제 성격을 판단하지 않아요.</p>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {TYPES.filter((o) => o.slug !== t.slug).map((o) => (
          <Link key={o.slug} to={`/type/${o.slug}`} className="px-3 py-1.5 text-[12px] text-[#888888] bg-white rounded-full shadow-sm">{o.emoji} {o.name}</Link>
        ))}
      </div>
      <Cta />
    </Shell>
  );
};

// ───────────────────────── 품종 ─────────────────────────

/** 알려진 성향과 AI 판정의 관계를 한 문장으로 (잰 숫자만 근거로) */
function compareSentence(b: Breed): string {
  const aiAegen = b.mean >= 55;
  const aiTeto = b.mean <= 45;
  if (b.knownScore <= -0.3 && aiAegen) return '일반적으로 알려진 차분한 성향과 AI 판정이 같은 방향이에요.';
  if (b.knownScore >= 0.3 && aiTeto) return '일반적으로 알려진 활발한 성향과 AI 판정이 같은 방향이에요.';
  if (b.knownScore >= 0.3 && aiAegen)
    return '일반적으로 활발한 품종으로 알려져 있지만, AI는 에겐 쪽으로 더 많이 봤어요. 데이터셋 사진 대부분이 앉아 있거나 카메라를 바라보는 순간이라서일 수 있어요.';
  if (b.knownScore <= -0.3 && aiTeto)
    return '일반적으로 차분한 품종으로 알려져 있지만, AI는 테토 쪽으로 더 많이 봤어요. 사진 속 표정이나 자세가 또렷하고 힘 있게 담긴 경우가 많았다는 뜻일 수 있어요.';
  return '에겐과 테토가 비교적 고르게 나온 품종이에요. 같은 품종 안에서도 사진 속 순간에 따라 결과가 크게 달라져요.';
}

export const BreedListPage: React.FC = () => {
  const sorted = [...BREEDS].sort((a, b) => b.mean - a.mean);
  const r = SUMMARY.knownVsAiPearson;
  return (
    <Shell>
      <div className="text-center mb-6">
        <Title>품종별 에겐·테토 통계</Title>
        <p className="text-[14px] text-[#666666]">37품종 {SUMMARY.images.toLocaleString()}장을 AI로 분석한 결과</p>
      </div>

      <Card>
        <H2>한눈에 보기</H2>
        <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-[#555555] leading-relaxed">
          <li>고양이 {SUMMARY.cats.toLocaleString()}장의 평균 에겐 비율은 {SUMMARY.meanCat}%, 강아지 {SUMMARY.dogs.toLocaleString()}장은 {SUMMARY.meanDog}%였어요.</li>
          <li>품종에 일반적으로 알려진 에너지 수준과 AI의 평균 에겐 비율 사이의 상관계수는 {r}예요 (−1에 가까울수록 "활발하다고 알려진 품종일수록 테토로 판정").</li>
          <li>AI는 품종의 알려진 에너지 수준을 가장 크게 보고(60%), 같은 품종 안에서는 사진 속 자세(30%)와 나이 인상(10%)에 따라 결과가 달라져요.</li>
        </ul>
        <p className="text-[11px] text-[#999999] mt-3">
          데이터: Oxford-IIIT Pet Dataset (Parkhi et al., 2012, CC BY-SA 4.0). 이 AI는 같은 데이터셋으로 학습했기 때문에, 이 통계는 "AI가 이 사진들을 어떻게 보는가"를 보여 줄 뿐 품종의 실제 성격을 잰 것이 아니에요.
        </p>
      </Card>

      {(['cat', 'dog'] as const).map((sp) => (
        <Card key={sp}>
          <H2>{speciesKo(sp)} ({sorted.filter((b) => b.species === sp).length}품종, 에겐 비율 높은 순)</H2>
          <div className="space-y-2">
            {sorted.filter((b) => b.species === sp).map((b) => (
              <Link key={b.slug} to={`/breed/${b.slug}`} className="flex items-center gap-2 text-[13px] text-[#555555] hover:text-[#FF9ED8]">
                <span className="w-[150px] shrink-0 truncate">{b.ko}</span>
                <span className="flex-1 h-3 bg-[#f3f3f3] rounded-full overflow-hidden">
                  <span className="block h-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]" style={{ width: `${b.mean}%` }} />
                </span>
                <span className="w-[48px] text-right">{b.mean}%</span>
              </Link>
            ))}
          </div>
        </Card>
      ))}
      <Cta />
    </Shell>
  );
};

export const BreedPage: React.FC = () => {
  const { slug } = useParams();
  const b = BREEDS.find((x) => x.slug === slug);
  if (!b) return <NotFoundPage />;
  const same = BREEDS.filter((x) => x.species === b.species);
  const i = same.findIndex((x) => x.slug === b.slug);
  const next = same[(i + 1) % same.length];
  const knownLabel = b.knownScore <= -0.3 ? '차분한 편' : b.knownScore >= 0.3 ? '활발한 편' : '중간';

  return (
    <Shell>
      <Link to="/breed" className="text-[12px] text-[#888888] hover:text-[#FFB5EB]">← 품종별 통계</Link>

      <Card className="mt-3">
        <Title>{b.ko}</Title>
        <p className="text-[12px] text-[#999999] mb-4">{speciesKo(b.species)} · AI가 본 에겐·테토</p>
        <figure className="mb-4">
          <img src={b.rep.image} alt={`${b.ko} 대표 사진`} loading="lazy" className="w-full max-h-[360px] object-cover rounded-[12px]" />
          <figcaption className="text-[10px] text-[#aaaaaa] mt-1">
            대표 사진(점수가 품종 중앙값에 가장 가까운 사진, 에겐 {b.rep.score}%) · Oxford-IIIT Pet Dataset, CC BY-SA 4.0
          </figcaption>
        </figure>
        <p className="text-[14px] text-[#444444] leading-relaxed">{b.intro}</p>
      </Card>

      <Card>
        <H2>AI 판정 결과</H2>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="bg-[#FFF8FC] rounded-[12px] p-3"><p className="text-[18px] font-bold text-[#FF9ED8]">{b.mean}%</p><p className="text-[10px] text-[#888888]">평균 에겐 비율</p></div>
          <div className="bg-[#F8F9FF] rounded-[12px] p-3"><p className="text-[18px] font-bold text-[#9DB4FF]">{b.aegenShare}%</p><p className="text-[10px] text-[#888888]">에겐 쪽으로 나온 사진</p></div>
          <div className="bg-[#FFF8FC] rounded-[12px] p-3"><p className="text-[18px] font-bold text-[#FF9ED8]">{b.n}장</p><p className="text-[10px] text-[#888888]">분석한 사진</p></div>
        </div>
        <DistBar dist={b.dist} total={b.n} />
      </Card>

      <Card>
        <H2>알려진 성향과 비교</H2>
        <p className="text-[13px] text-[#555555] leading-relaxed mb-2">일반적으로 알려진 성향: <strong>{b.known}</strong> ({knownLabel})</p>
        <p className="text-[13px] text-[#555555] leading-relaxed">{compareSentence(b)}</p>
        <p className="text-[11px] text-[#999999] mt-3">
          AI는 이 데이터셋으로 학습했기 때문에 이 숫자는 "AI가 이 사진들을 어떻게 보는가"예요. 품종의 실제 성격이나 우리 아이의 성격을 뜻하지 않아요.
        </p>
      </Card>

      <Link to={`/breed/${next.slug}`} className="block bg-white rounded-[15px] p-4 mb-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <p className="text-[11px] text-[#999999] mb-1">다음 {speciesKo(b.species)} 품종</p>
        <p className="text-[14px] font-bold text-[#333333]">{next.ko}</p>
      </Link>
      <Cta />
    </Shell>
  );
};
