import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            서비스 소개
          </h1>
          <p className="text-[14px] text-[#666666]">
            반려동물 에겐vs테토 테스트란?
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <div className="flex justify-center mb-6">
            <img
              src="/images/Group8.png"
              alt="반려동물"
              className="w-[180px] h-[135px] object-contain"
            />
          </div>

          <h2 className="font-ownglyph text-[20px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            🐾 에겐vs테토 테스트
          </h2>

          <p className="text-[14px] text-[#333333] leading-relaxed mb-6">
            <strong>"에겐vs테토 테스트"</strong>는 AI 기술을 활용하여 반려동물의 얼굴 특징을 분석하고,
            귀여운 캐릭터 유형인 '에겐' 또는 '테토' 중 어느 쪽에 더 가까운지 판별해주는 재미있는 서비스입니다.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-[15px] p-4">
              <h3 className="font-ownglyph text-[16px] text-[#333333] mb-2">💖 에겐 타입이란?</h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                에겐(Aegen)은 순수하고 천진난만한 매력을 가진 타입입니다.
                동글동글한 눈, 부드러운 표정, 사랑스러운 분위기가 특징이에요.
                보는 사람의 마음을 따뜻하게 만드는 힐링 캐릭터입니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#F2F5FE] to-[#FDF2FA] rounded-[15px] p-4">
              <h3 className="font-ownglyph text-[16px] text-[#333333] mb-2">💜 테토 타입이란?</h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                테토(Teto)는 도도하고 시크한 매력을 가진 타입입니다.
                날카로운 눈매, 세련된 표정, 카리스마 있는 분위기가 특징이에요.
                신비롭고 독특한 매력으로 시선을 사로잡는 캐릭터입니다.
              </p>
            </div>
          </div>
        </div>

        {/* AI Technology Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[20px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            🤖 AI 분석 기술
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-[20px]">🔍</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#333333] mb-1">딥러닝 이미지 분석</h4>
                <p className="text-[12px] text-[#666666] leading-relaxed">
                  최신 딥러닝 모델을 활용하여 반려동물의 얼굴 특징을 정밀하게 분석합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[20px]">📊</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#333333] mb-1">앙상블 분류 모델</h4>
                <p className="text-[12px] text-[#666666] leading-relaxed">
                  여러 AI 모델의 결과를 종합하여 더욱 정확한 분석 결과를 제공합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[20px]">⚡</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#333333] mb-1">빠른 분석 속도</h4>
                <p className="text-[12px] text-[#666666] leading-relaxed">
                  최적화된 서버 환경에서 몇 초 만에 분석 결과를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[20px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            ✨ 서비스 특징
          </h2>

          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-[14px] text-[#333333]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]"></span>
              100% 무료로 이용 가능
            </li>
            <li className="flex items-center gap-2 text-[14px] text-[#333333]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]"></span>
              회원가입 없이 바로 테스트
            </li>
            <li className="flex items-center gap-2 text-[14px] text-[#333333]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]"></span>
              강아지, 고양이 테스트 지원
            </li>
            <li className="flex items-center gap-2 text-[14px] text-[#333333]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]"></span>
              귀여운 결과 이미지로 SNS 공유 가능
            </li>
            <li className="flex items-center gap-2 text-[14px] text-[#333333]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]"></span>
              PC와 모바일 모두 최적화
            </li>
          </ul>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[20px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            📬 문의하기
          </h2>

          <p className="text-[14px] text-[#333333] leading-relaxed mb-4">
            서비스 이용 중 궁금한 점이나 건의사항이 있으시면 언제든 연락해주세요.
          </p>

          <div className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-[10px] p-4">
            <p className="text-[13px] text-[#555555]">
              <strong>이메일:</strong> dolgolgoldol00@gmail.com
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/">
          <button className="w-full rounded-[10px] py-3 mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
            <span className="text-[14px] font-bold text-white">테스트 시작하기 🐾</span>
          </button>
        </Link>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 text-[12px] text-[#888888]">
          <Link to="/faq" className="hover:text-[#FFB5EB]">자주 묻는 질문</Link>
          <span>|</span>
          <Link to="/how-to-use" className="hover:text-[#FFB5EB]">사용 방법</Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-[#FFB5EB]">개인정보처리방침</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
