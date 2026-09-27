import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  // 관리자 페이지나 분석/결과 페이지에서는 푸터를 숨김
  const hiddenPaths = ['/analysis', '/result', '/admin/metrics'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-white py-8 px-4 mt-auto border-t border-gray-100">
      <div className="max-w-[600px] mx-auto">
        {/* Logo and Description */}
        <div className="text-center mb-6">
          <h3 className="font-ownglyph text-[18px] bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text mb-2">
            에겐vs테토 테스트
          </h3>
          <p className="text-[12px] text-[#888888]">
            사진으로 알아보는 반려동물 에겐·테토 성향
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          <Link
            to="/about"
            className={`text-[13px] ${location.pathname === '/about' ? 'text-[#FFB5EB] font-medium' : 'text-[#666666]'} hover:text-[#FFB5EB] transition-colors`}
          >
            서비스 소개
          </Link>
          <Link
            to="/how-to-use"
            className={`text-[13px] ${location.pathname === '/how-to-use' ? 'text-[#FFB5EB] font-medium' : 'text-[#666666]'} hover:text-[#FFB5EB] transition-colors`}
          >
            사용 방법
          </Link>
          <Link
            to="/faq"
            className={`text-[13px] ${location.pathname === '/faq' ? 'text-[#FFB5EB] font-medium' : 'text-[#666666]'} hover:text-[#FFB5EB] transition-colors`}
          >
            자주 묻는 질문
          </Link>
          <Link
            to="/guide"
            className={`text-[13px] ${location.pathname.startsWith('/guide') ? 'text-[#FFB5EB] font-medium' : 'text-[#666666]'} hover:text-[#FFB5EB] transition-colors`}
          >
            가이드
          </Link>
        </div>

        {/* Legal Links */}
        <div className="flex justify-center gap-4 mb-6">
          <Link
            to="/privacy"
            className={`text-[12px] ${location.pathname === '/privacy' ? 'text-[#AFC3FF] font-medium' : 'text-[#999999]'} hover:text-[#AFC3FF] transition-colors`}
          >
            개인정보처리방침
          </Link>
          <span className="text-[#ddd]">|</span>
          <Link
            to="/terms"
            className={`text-[12px] ${location.pathname === '/terms' ? 'text-[#AFC3FF] font-medium' : 'text-[#999999]'} hover:text-[#AFC3FF] transition-colors`}
          >
            이용약관
          </Link>
        </div>

        {/* Contact */}
        <div className="text-center mb-4">
          <p className="text-[11px] text-[#aaaaaa]">
            문의: dolgolgoldol00@gmail.com
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[11px] text-[#cccccc]">
            © 2024 에겐vs테토 테스트. All rights reserved.
          </p>
          <p className="text-[10px] text-[#cccccc] mt-1">
            AI 모델 학습 데이터:{' '}
            <a href="https://www.robots.ox.ac.uk/~vgg/data/pets/" target="_blank" rel="noopener noreferrer" className="underline">Oxford-IIIT Pet Dataset</a>
            {' '}(Parkhi et al., 2012) ·{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
