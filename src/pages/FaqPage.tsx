import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FaqItem[] = [
  {
    category: '서비스 이용',
    question: '에겐vs테토 테스트는 무료인가요?',
    answer: '네, 완전히 무료입니다! 회원가입 없이 누구나 자유롭게 이용할 수 있습니다. 횟수 제한도 없으니 여러 장의 사진으로 테스트해보세요.',
  },
  {
    category: '서비스 이용',
    question: '어떤 동물 사진을 올릴 수 있나요?',
    answer: '강아지와 고양이 사진을 올릴 수 있습니다. 얼굴이 잘 보이는 정면 사진을 올리면 더 정확한 분석 결과를 얻을 수 있어요.',
  },
  {
    category: '서비스 이용',
    question: '사진 용량이나 크기 제한이 있나요?',
    answer: '최대 16MB까지의 이미지를 업로드할 수 있습니다. JPG, PNG, GIF 등 대부분의 이미지 형식을 지원합니다.',
  },
  {
    category: '분석 결과',
    question: '에겐과 테토의 차이점은 무엇인가요?',
    answer: '에겐(Aegen)은 순수하고 사랑스러운 매력의 타입이고, 테토(Teto)는 도도하고 시크한 매력의 타입입니다. AI가 반려동물의 표정, 눈매, 전체적인 분위기를 분석하여 어떤 타입에 가까운지 판별합니다.',
  },
  {
    category: '분석 결과',
    question: '분석 결과는 얼마나 정확한가요?',
    answer: 'AI 딥러닝 모델을 사용하여 분석하지만, 이 테스트는 재미를 위한 것입니다. 결과는 참고용으로 즐겨주세요! 같은 반려동물도 사진에 따라 다른 결과가 나올 수 있습니다.',
  },
  {
    category: '분석 결과',
    question: '50:50이 나오면 어떤 의미인가요?',
    answer: '에겐과 테토 특성이 균형 있게 섞여 있다는 뜻입니다! 상황에 따라 순수한 모습과 도도한 모습을 모두 보여주는 매력적인 반려동물이에요.',
  },
  {
    category: '기술 관련',
    question: '어떤 AI 기술을 사용하나요?',
    answer: '최신 딥러닝 기반의 이미지 분류 모델을 사용합니다. 앙상블 기법을 적용하여 여러 모델의 분석 결과를 종합해 더 안정적인 결과를 제공합니다.',
  },
  {
    category: '기술 관련',
    question: '분석에 얼마나 걸리나요?',
    answer: '보통 5-10초 정도 소요됩니다. 네트워크 상태나 서버 상황에 따라 조금 더 걸릴 수 있습니다.',
  },
  {
    category: '개인정보',
    question: '업로드한 사진은 어떻게 처리되나요?',
    answer: '업로드된 이미지는 분석에만 사용되며, 분석 완료 후 서버에서 자동으로 삭제됩니다. 개인정보 보호를 위해 이미지를 저장하거나 다른 목적으로 사용하지 않습니다.',
  },
  {
    category: '개인정보',
    question: '분석 결과가 저장되나요?',
    answer: '분석 결과는 사용자의 브라우저에서만 표시되며, 서버에 별도로 저장되지 않습니다. 페이지를 떠나면 결과도 사라집니다.',
  },
  {
    category: '문제 해결',
    question: '이미지 업로드가 안 돼요.',
    answer: '지원되는 형식(JPG, PNG, GIF)인지 확인해주세요. 파일 크기가 16MB를 초과하면 업로드되지 않습니다. 문제가 계속되면 다른 브라우저로 시도해보세요.',
  },
  {
    category: '문제 해결',
    question: '분석 결과가 안 나와요.',
    answer: '네트워크 연결을 확인하고 페이지를 새로고침해보세요. 얼굴이 잘 보이지 않는 사진은 분석이 어려울 수 있으니, 정면에서 찍은 선명한 사진으로 다시 시도해보세요.',
  },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFaq = selectedCategory === '전체'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            자주 묻는 질문
          </h1>
          <p className="text-[14px] text-[#666666]">
            궁금한 점을 찾아보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-white'
                  : 'bg-white text-[#666666] hover:bg-[#f5f5f5] shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaq.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <div className="flex-1 pr-4">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-[#FDF2FA] to-[#F2F5FE] text-[#888888] mb-2">
                    {faq.category}
                  </span>
                  <p className="text-[14px] font-medium text-[#333333]">
                    {faq.question}
                  </p>
                </div>
                <span
                  className={`text-[20px] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(to right, #FFB5EB, #AFC3FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ▼
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-4">
                  <div className="pt-3 border-t border-[#f0f0f0]">
                    <p className="text-[13px] text-[#555555] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More Questions Card */}
        <div className="bg-white rounded-[20px] p-6 mt-6 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="font-ownglyph text-[18px] mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text text-center">
            찾는 답변이 없으신가요?
          </h2>
          <p className="text-[13px] text-[#666666] text-center mb-4">
            아래 이메일로 문의해주시면 빠르게 답변드리겠습니다.
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
            <span className="text-[14px] font-bold text-white">테스트 하러가기 🐾</span>
          </button>
        </Link>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 text-[12px] text-[#888888]">
          <Link to="/about" className="hover:text-[#FFB5EB]">서비스 소개</Link>
          <span>|</span>
          <Link to="/how-to-use" className="hover:text-[#FFB5EB]">사용 방법</Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-[#FFB5EB]">개인정보처리방침</Link>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
