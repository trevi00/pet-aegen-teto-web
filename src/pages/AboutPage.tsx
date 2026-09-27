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
            <strong>"에겐vs테토 테스트"</strong>는 반려동물 사진 한 장을 AI가 보고,
            사진 속 모습이 '에겐'과 '테토' 중 어느 쪽에 더 가까운지 비율로 알려주는 재미있는 서비스입니다.
            사람 사이에서 쓰이는 에겐·테토라는 말을 강아지와 고양이에게 옮겨 와, 우리 아이의 분위기를 한 번 더 들여다보는 계기가 되었으면 해서 만들었어요.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-[15px] p-4">
              <h3 className="font-ownglyph text-[16px] text-[#333333] mb-2">💖 에겐 타입이란?</h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                에겐(Aegen)은 차분하고 신중하며 은은한 매력을 가진 타입입니다.
                편안하게 엎드린 자세, 부드럽게 내려앉은 눈빛, 서두르지 않는 분위기가 특징이에요.
                낯선 것 앞에서 먼저 지켜보고 천천히 다가가는 아이들이 여기에 가까워요.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#F2F5FE] to-[#FDF2FA] rounded-[15px] p-4">
              <h3 className="font-ownglyph text-[16px] text-[#333333] mb-2">💜 테토 타입이란?</h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                테토(Teto)는 활발하고 적극적이며 야성적인 매력을 가진 타입입니다.
                곧 뛰어오를 듯한 자세, 또렷하게 무언가를 쫓는 눈빛, 힘 있는 표정이 특징이에요.
                새로운 것을 보면 먼저 달려가 확인하는 아이들이 여기에 가까워요.
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
                  공개 반려동물 사진 데이터(37품종 약 7,300장)로 학습한 이미지 모델이 닮은 품종과 사진 속 자세를 함께 봅니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[20px]">📊</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#333333] mb-1">품종·자세·나이 기준</h4>
                <p className="text-[12px] text-[#666666] leading-relaxed">
                  품종의 알려진 에너지 수준(60%), 사진 속 자세(30%), 나이 인상(10%)으로 만든 기준을 따르도록 학습했어요. 학습에 쓰지 않은 사진 735장에서 기준과 약 92% 일치했어요.
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
