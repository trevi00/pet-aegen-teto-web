import React from 'react';
import { Link } from 'react-router-dom';

const HowToUsePage: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: '반려동물 이름 입력',
      description: '테스트할 반려동물의 이름을 입력해주세요. 결과 화면에서 이름과 함께 표시됩니다.',
      icon: '✏️',
      tip: '별명이나 애칭도 좋아요!',
    },
    {
      number: 2,
      title: '사진 업로드',
      description: '반려동물의 얼굴이 잘 보이는 사진을 선택해주세요. 정면에서 찍은 선명한 사진일수록 더 정확한 분석이 가능합니다.',
      icon: '📷',
      tip: '얼굴이 화면의 중앙에 오도록 해주세요',
    },
    {
      number: 3,
      title: 'AI 분석 시작',
      description: '"다음" 버튼을 누르면 AI가 반려동물의 얼굴 특징을 분석합니다. 보통 5-10초 정도 소요됩니다.',
      icon: '🤖',
      tip: '분석 중에는 페이지를 닫지 마세요',
    },
    {
      number: 4,
      title: '결과 확인',
      description: '에겐과 테토 비율이 표시됩니다! 귀여운 결과 이미지를 SNS에 공유해보세요.',
      icon: '🎉',
      tip: '다른 사진으로 다시 테스트해볼 수 있어요',
    },
  ];

  const photoTips = [
    {
      good: true,
      title: '좋은 사진',
      items: [
        '얼굴이 정면을 바라보는 사진',
        '밝은 조명에서 찍은 사진',
        '선명하고 흔들림이 없는 사진',
        '얼굴 전체가 잘 보이는 사진',
      ],
    },
    {
      good: false,
      title: '분석이 어려운 사진',
      items: [
        '옆모습이나 뒷모습',
        '너무 어둡거나 역광인 사진',
        '흔들려서 흐릿한 사진',
        '얼굴이 잘려있거나 가려진 사진',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            사용 방법
          </h1>
          <p className="text-[14px] text-[#666666]">
            간단한 4단계로 테스트하세요!
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-white rounded-[20px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)] relative overflow-hidden"
            >
              {/* Step Number Badge */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-[#FFB5EB] to-[#AFC3FF] rounded-br-[20px] flex items-center justify-center">
                <span className="text-white font-bold text-[18px]">{step.number}</span>
              </div>

              <div className="ml-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[28px]">{step.icon}</span>
                  <h3 className="font-ownglyph text-[18px] text-[#333333]">
                    {step.title}
                  </h3>
                </div>

                <p className="text-[13px] text-[#555555] leading-relaxed mb-3">
                  {step.description}
                </p>

                <div className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-[10px] px-4 py-2">
                  <p className="text-[12px] text-[#888888]">
                    💡 <span className="text-[#666666]">{step.tip}</span>
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-4 left-6 w-[2px] h-8 bg-gradient-to-b from-[#FFB5EB] to-[#AFC3FF] z-10"></div>
              )}
            </div>
          ))}
        </div>

        {/* Photo Tips Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[20px] mb-5 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text text-center">
            📸 좋은 사진 고르는 팁
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {photoTips.map((tip) => (
              <div
                key={tip.title}
                className={`rounded-[15px] p-4 ${
                  tip.good
                    ? 'bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9]'
                    : 'bg-gradient-to-br from-[#ffebee] to-[#fce4ec]'
                }`}
              >
                <h3 className={`text-[14px] font-bold mb-3 ${tip.good ? 'text-[#4caf50]' : 'text-[#e57373]'}`}>
                  {tip.good ? '✅' : '❌'} {tip.title}
                </h3>
                <ul className="space-y-2">
                  {tip.items.map((item, idx) => (
                    <li key={idx} className="text-[12px] text-[#555555] flex items-start gap-2">
                      <span className={tip.good ? 'text-[#4caf50]' : 'text-[#e57373]'}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Animals Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[20px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text text-center">
            🐾 테스트 가능한 반려동물
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { emoji: '🐕', name: '강아지' },
              { emoji: '🐈', name: '고양이' },
            ].map((animal) => (
              <div
                key={animal.name}
                className="bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span className="text-[20px]">{animal.emoji}</span>
                <span className="text-[13px] text-[#555555]">{animal.name}</span>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-[#888888] text-center mt-4">
            * 강아지와 고양이의 얼굴이 잘 보이는 사진으로 테스트해보세요!
          </p>
        </div>

        {/* Result Explanation Card */}
        <div className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[20px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text text-center">
            📊 결과 해석하기
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#ffe4f3] to-[#fff0f5] rounded-[12px] p-4">
              <h4 className="text-[14px] font-bold text-[#e91e63] mb-2">에겐 80% 이상</h4>
              <p className="text-[12px] text-[#555555]">
                순수하고 사랑스러운 매력이 넘치는 타입! 보는 사람을 행복하게 만드는 천사같은 아이에요.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#e8eaf6] to-[#f3e5f5] rounded-[12px] p-4">
              <h4 className="text-[14px] font-bold text-[#673ab7] mb-2">테토 80% 이상</h4>
              <p className="text-[12px] text-[#555555]">
                시크하고 도도한 매력의 소유자! 카리스마 넘치는 눈빛으로 시선을 사로잡는 아이에요.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#fff3e0] to-[#fffde7] rounded-[12px] p-4">
              <h4 className="text-[14px] font-bold text-[#ff9800] mb-2">균형 (40-60%)</h4>
              <p className="text-[12px] text-[#555555]">
                에겐과 테토의 매력을 모두 가진 타입! 상황에 따라 다양한 모습을 보여주는 아이에요.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/">
          <button className="w-full rounded-[10px] py-3 mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
            <span className="text-[14px] font-bold text-white">지금 바로 테스트하기 🐾</span>
          </button>
        </Link>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 text-[12px] text-[#888888]">
          <Link to="/about" className="hover:text-[#FFB5EB]">서비스 소개</Link>
          <span>|</span>
          <Link to="/faq" className="hover:text-[#FFB5EB]">자주 묻는 질문</Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-[#FFB5EB]">개인정보처리방침</Link>
        </div>
      </div>
    </div>
  );
};

export default HowToUsePage;
