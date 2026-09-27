import React from 'react';
import { Link, useParams } from 'react-router-dom';
import guides from '../content/guides.json';
import NotFoundPage from './NotFoundPage';

// 가이드 글 원문은 src/content/guides.json 하나 — 빌드 후처리(scripts/prerender-routes.mjs)도 같은 파일로 정적 HTML 을 만든다.
export interface GuideSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  date: string;
  sections: GuideSection[];
}

const GUIDES = guides as Guide[];

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
    <div className="w-full max-w-[600px] mx-auto">{children}</div>
  </div>
);

export const GuideListPage: React.FC = () => (
  <Shell>
    <div className="text-center mb-6">
      <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
        에겐테토 가이드
      </h1>
      <p className="text-[14px] text-[#666666]">에겐과 테토의 기준, AI가 판단하는 방식, 반려동물 사진 이야기</p>
    </div>

    <div className="space-y-3 mb-6">
      {GUIDES.map((g) => (
        <Link
          key={g.slug}
          to={`/guide/${g.slug}`}
          className="block bg-white rounded-[15px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-shadow"
        >
          <h2 className="text-[15px] font-bold text-[#333333] mb-1">{g.title}</h2>
          <p className="text-[12px] text-[#666666] leading-relaxed">{g.description}</p>
        </Link>
      ))}
    </div>

    <Link to="/">
      <button className="w-full rounded-[10px] py-3 mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
        <span className="text-[14px] font-bold text-white">테스트 하러가기 🐾</span>
      </button>
    </Link>
  </Shell>
);

export const GuidePage: React.FC = () => {
  const { slug } = useParams();
  const index = GUIDES.findIndex((g) => g.slug === slug);
  if (index < 0) return <NotFoundPage />;
  const guide = GUIDES[index];
  const next = GUIDES[(index + 1) % GUIDES.length];

  return (
    <Shell>
      <Link to="/guide" className="text-[12px] text-[#888888] hover:text-[#FFB5EB]">← 가이드 목록</Link>

      <article className="bg-white rounded-[20px] p-6 mt-3 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
        <h1 className="font-ownglyph text-[24px] leading-snug mb-2 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
          {guide.title}
        </h1>
        <p className="text-[11px] text-[#999999] mb-5">{guide.date}</p>

        {guide.sections.map((s, i) => (
          <section key={i} className="mb-5">
            {s.heading && <h2 className="text-[16px] font-bold text-[#333333] mb-2">{s.heading}</h2>}
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="text-[14px] text-[#444444] leading-relaxed mb-3">{p}</p>
            ))}
            {s.list && (
              <ul className="list-disc pl-5 space-y-1.5">
                {s.list.map((li, j) => (
                  <li key={j} className="text-[13px] text-[#555555] leading-relaxed">{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <Link
        to={`/guide/${next.slug}`}
        className="block bg-white rounded-[15px] p-4 mb-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
      >
        <p className="text-[11px] text-[#999999] mb-1">다음 글</p>
        <p className="text-[14px] font-bold text-[#333333]">{next.title}</p>
      </Link>

      <Link to="/">
        <button className="w-full rounded-[10px] py-3 mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
          <span className="text-[14px] font-bold text-white">우리 아이도 테스트해 보기 🐾</span>
        </button>
      </Link>
    </Shell>
  );
};
