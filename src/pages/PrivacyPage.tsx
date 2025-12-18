import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  const lastUpdated = '2024년 12월 2일';

  const sections = [
    {
      title: '1. 수집하는 개인정보 항목',
      content: `에겐vs테토 테스트(이하 "서비스")는 다음과 같은 정보를 수집합니다:

• 이미지 정보: 사용자가 업로드한 반려동물 사진
• 입력 정보: 반려동물 이름 (선택적 입력)
• 자동 수집 정보: IP 주소, 브라우저 종류, 접속 시간, 쿠키

서비스는 회원가입을 요구하지 않으며, 이름, 이메일, 전화번호 등의 개인식별정보를 수집하지 않습니다.`,
    },
    {
      title: '2. 개인정보의 수집 및 이용 목적',
      content: `수집된 정보는 다음의 목적으로만 사용됩니다:

• AI 분석 서비스 제공: 반려동물 이미지 분석 및 결과 제공
• 서비스 개선: 분석 품질 향상 및 오류 수정
• 통계 분석: 익명화된 이용 통계 수집
• 광고 제공: Google AdSense를 통한 맞춤형 광고 제공`,
    },
    {
      title: '3. 개인정보의 보유 및 이용 기간',
      content: `• 업로드된 이미지: 분석 완료 즉시 서버에서 삭제
• 분석 결과: 서버에 저장되지 않음 (브라우저에서만 표시)
• 서버 로그: 최대 30일간 보관 후 자동 삭제
• 쿠키: 브라우저 설정에 따라 관리

사용자가 업로드한 반려동물 이미지는 분석 목적으로만 일시적으로 사용되며, 분석 완료 후 즉시 삭제됩니다.`,
    },
    {
      title: '4. 개인정보의 제3자 제공',
      content: `서비스는 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:

• 법령에 의해 요구되는 경우
• 사용자의 동의가 있는 경우

광고 서비스를 위해 Google AdSense가 쿠키를 사용할 수 있으며, 이는 Google의 개인정보처리방침에 따릅니다.`,
    },
    {
      title: '5. 쿠키(Cookie) 사용',
      content: `서비스는 다음과 같은 목적으로 쿠키를 사용합니다:

• 서비스 기능 제공: 사용자 설정 저장
• 분석: 서비스 이용 현황 파악
• 광고: Google AdSense 맞춤형 광고 제공

사용자는 브라우저 설정을 통해 쿠키를 거부할 수 있으나, 이 경우 서비스 이용에 일부 제한이 있을 수 있습니다.`,
    },
    {
      title: '6. Google AdSense 및 광고',
      content: `서비스는 Google AdSense를 통해 광고를 제공합니다:

• Google 및 제3자 광고 업체는 쿠키를 사용하여 사용자의 관심사에 기반한 광고를 게재할 수 있습니다.
• 사용자는 Google 광고 설정(https://adssettings.google.com)에서 맞춤 광고를 비활성화할 수 있습니다.
• 자세한 내용은 Google의 개인정보처리방침(https://policies.google.com/privacy)을 참조하세요.`,
    },
    {
      title: '7. 이용자의 권리',
      content: `사용자는 다음과 같은 권리를 가집니다:

• 개인정보 수집 거부: 서비스 이용을 중단하면 됩니다
• 쿠키 거부: 브라우저 설정에서 쿠키를 차단할 수 있습니다
• 광고 설정 변경: Google 광고 설정에서 맞춤 광고를 거부할 수 있습니다
• 문의: 개인정보 관련 문의는 dolgolgoldol00@gmail.com로 연락해주세요`,
    },
    {
      title: '8. 개인정보의 안전성 확보 조치',
      content: `서비스는 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다:

• SSL/TLS 암호화: 모든 데이터 전송 시 암호화
• 최소 수집: 필요한 최소한의 정보만 수집
• 즉시 삭제: 이미지는 분석 후 즉시 삭제
• 접근 제한: 서버에 대한 접근 권한 최소화`,
    },
    {
      title: '9. 개인정보 보호책임자',
      content: `개인정보 보호에 관한 문의는 아래로 연락해주세요:

• 이메일: dolgolgoldol00@gmail.com
• 운영시간: 평일 10:00 ~ 18:00`,
    },
    {
      title: '10. 개인정보처리방침의 변경',
      content: `본 개인정보처리방침은 법령 또는 서비스 정책의 변경에 따라 수정될 수 있습니다. 변경 시 웹사이트를 통해 공지하며, 변경된 방침은 공지 후 7일이 경과한 시점부터 효력이 발생합니다.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            개인정보처리방침
          </h1>
          <p className="text-[13px] text-[#666666]">
            최종 업데이트: {lastUpdated}
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <p className="text-[14px] text-[#333333] leading-relaxed">
            <strong>에겐vs테토 테스트</strong>(이하 "서비스")는 이용자의 개인정보를 소중히 여기며,
            관련 법령에 따라 개인정보를 보호하고 있습니다. 본 개인정보처리방침은 서비스가 어떤 정보를
            수집하고 어떻게 사용하는지 설명합니다.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-[15px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
            >
              <h2 className="font-ownglyph text-[16px] text-[#333333] mb-3 pb-2 border-b border-[#f0f0f0]">
                {section.title}
              </h2>
              <div className="text-[13px] text-[#555555] leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-[20px] p-6 mt-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[18px] mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text text-center">
            문의하기
          </h2>
          <p className="text-[13px] text-[#666666] text-center mb-4">
            개인정보 처리에 관한 문의는 아래 이메일로 연락해주세요.
          </p>
          <div className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-[10px] p-4 text-center">
            <p className="text-[14px] text-[#555555]">
              <strong>dolgolgoldol00@gmail.com</strong>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/">
          <button className="w-full rounded-[10px] py-3 mt-6 mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
            <span className="text-[14px] font-bold text-white">홈으로 돌아가기</span>
          </button>
        </Link>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 text-[12px] text-[#888888]">
          <Link to="/about" className="hover:text-[#FFB5EB]">서비스 소개</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-[#FFB5EB]">이용약관</Link>
          <span>|</span>
          <Link to="/faq" className="hover:text-[#FFB5EB]">자주 묻는 질문</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
