import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  const lastUpdated = '2024년 12월 2일';
  const effectiveDate = '2024년 12월 2일';

  const sections = [
    {
      title: '제1조 (목적)',
      content: `본 약관은 에겐vs테토 테스트(이하 "서비스")의 이용에 관한 기본적인 사항을 규정합니다. 서비스를 이용함으로써 이용자는 본 약관에 동의한 것으로 간주됩니다.`,
    },
    {
      title: '제2조 (서비스의 정의)',
      content: `"서비스"란 에겐vs테토 테스트가 제공하는 반려동물 이미지 분석 서비스를 말합니다. 이용자는 반려동물 사진을 업로드하고, AI 분석을 통해 '에겐' 또는 '테토' 타입의 결과를 받아볼 수 있습니다.`,
    },
    {
      title: '제3조 (서비스 이용)',
      content: `1. 서비스는 무료로 제공됩니다.
2. 서비스 이용에 회원가입은 필요하지 않습니다.
3. 이용자는 만 14세 이상이어야 합니다.
4. 서비스는 24시간 연중무휴 제공을 목표로 하나, 시스템 점검 등의 사유로 일시 중단될 수 있습니다.`,
    },
    {
      title: '제4조 (이용자의 의무)',
      content: `이용자는 다음 행위를 하여서는 안 됩니다:

1. 타인의 개인정보 또는 저작권이 있는 이미지를 무단으로 업로드하는 행위
2. 반려동물 이미지가 아닌 부적절한 콘텐츠를 업로드하는 행위
3. 서비스의 정상적인 운영을 방해하는 행위
4. 서비스를 상업적 목적으로 무단 이용하는 행위
5. 서비스를 이용하여 법령 또는 공서양속에 반하는 행위
6. 자동화된 수단(봇 등)을 사용하여 대량의 요청을 보내는 행위`,
    },
    {
      title: '제5조 (지식재산권)',
      content: `1. 서비스의 디자인, 로고, 소프트웨어 등 지식재산권은 서비스 운영자에게 귀속됩니다.
2. 이용자가 업로드한 이미지의 저작권은 이용자에게 있습니다.
3. 이용자는 서비스 이용을 위해 필요한 범위 내에서 이미지의 이용을 허락한 것으로 간주됩니다.
4. 분석 결과 이미지는 개인적 용도로 자유롭게 사용할 수 있습니다.`,
    },
    {
      title: '제6조 (서비스의 변경 및 중단)',
      content: `1. 서비스 운영자는 서비스의 내용을 변경하거나 중단할 수 있습니다.
2. 서비스 변경 또는 중단 시 웹사이트를 통해 사전 공지합니다.
3. 천재지변, 시스템 장애 등 불가피한 사유로 서비스가 중단될 수 있으며, 이 경우 사전 공지가 어려울 수 있습니다.`,
    },
    {
      title: '제7조 (면책조항)',
      content: `1. 서비스는 AI 분석 결과를 제공하며, 결과의 정확성을 보장하지 않습니다.
2. 분석 결과는 오락 및 참고 목적으로만 사용되어야 합니다.
3. 서비스 이용으로 인해 발생한 손해에 대해 서비스 운영자는 책임을 지지 않습니다.
4. 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.`,
    },
    {
      title: '제8조 (개인정보 보호)',
      content: `1. 서비스는 이용자의 개인정보를 보호합니다.
2. 개인정보의 수집, 이용, 보관에 관한 자세한 내용은 개인정보처리방침에 따릅니다.
3. 업로드된 이미지는 분석 후 즉시 삭제됩니다.`,
    },
    {
      title: '제9조 (광고)',
      content: `1. 서비스는 Google AdSense를 통한 광고를 포함할 수 있습니다.
2. 광고 내용에 대한 책임은 해당 광고주에게 있습니다.
3. 이용자는 광고에 대한 참여를 자유롭게 선택할 수 있습니다.`,
    },
    {
      title: '제10조 (약관의 변경)',
      content: `1. 본 약관은 법령 또는 서비스 정책 변경에 따라 수정될 수 있습니다.
2. 약관 변경 시 웹사이트를 통해 공지합니다.
3. 변경된 약관은 공지 후 7일이 경과한 시점부터 효력이 발생합니다.
4. 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.`,
    },
    {
      title: '제11조 (분쟁 해결)',
      content: `1. 서비스 이용과 관련하여 분쟁이 발생한 경우, 당사자 간 원만한 해결을 위해 노력합니다.
2. 분쟁이 해결되지 않는 경우, 대한민국 법률에 따라 관할 법원에서 해결합니다.`,
    },
    {
      title: '부칙',
      content: `본 약관은 ${effectiveDate}부터 시행됩니다.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            이용약관
          </h1>
          <p className="text-[13px] text-[#666666]">
            최종 업데이트: {lastUpdated}
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <p className="text-[14px] text-[#333333] leading-relaxed">
            <strong>에겐vs테토 테스트</strong> 서비스를 이용해 주셔서 감사합니다.
            본 약관은 서비스 이용에 필요한 권리, 의무 및 책임사항을 규정하고 있습니다.
            서비스를 이용하시기 전에 본 약관을 주의 깊게 읽어주시기 바랍니다.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-[15px] p-5 mb-5">
          <h3 className="font-ownglyph text-[16px] text-[#333333] mb-3">📋 요약</h3>
          <ul className="space-y-2">
            <li className="text-[13px] text-[#555555] flex items-start gap-2">
              <span className="text-[#FFB5EB]">•</span>
              서비스는 무료이며, 회원가입이 필요 없습니다.
            </li>
            <li className="text-[13px] text-[#555555] flex items-start gap-2">
              <span className="text-[#FFB5EB]">•</span>
              업로드한 이미지는 분석 후 즉시 삭제됩니다.
            </li>
            <li className="text-[13px] text-[#555555] flex items-start gap-2">
              <span className="text-[#FFB5EB]">•</span>
              분석 결과는 재미를 위한 것으로, 정확성을 보장하지 않습니다.
            </li>
            <li className="text-[13px] text-[#555555] flex items-start gap-2">
              <span className="text-[#FFB5EB]">•</span>
              부적절한 콘텐츠 업로드는 금지됩니다.
            </li>
          </ul>
        </div>

        {/* Terms Sections */}
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

        {/* Agreement Card */}
        <div className="bg-white rounded-[20px] p-6 mt-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] rounded-full p-3 mb-4">
              <span className="text-[24px]">✓</span>
            </div>
            <p className="text-[14px] text-[#333333] leading-relaxed">
              서비스를 이용하시면 위 약관에 동의한 것으로 간주됩니다.
              <br />
              약관에 대한 문의는 <strong>dolgolgoldol00@gmail.com</strong>로 연락해주세요.
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
          <Link to="/privacy" className="hover:text-[#FFB5EB]">개인정보처리방침</Link>
          <span>|</span>
          <Link to="/faq" className="hover:text-[#FFB5EB]">자주 묻는 질문</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
