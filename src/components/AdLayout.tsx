import React from 'react';

interface AdLayoutProps {
  children: React.ReactNode;
}

// 수동 광고 자리는 AdSense 승인 전까지 두지 않는다.
// 정책 페이지·분석 중·결과 화면처럼 게시자 콘텐츠가 없는 화면에 광고가 붙으면 심사 거절 사유가 된다.
// 승인 뒤에는 글이 있는 페이지에만 AdBanner 를 다시 넣는다. (심사용 스크립트는 index.html 에 있다)
const AdLayout: React.FC<AdLayoutProps> = ({ children }) => {
  return <div className="min-h-screen flex flex-col">{children}</div>;
};

export default AdLayout;
