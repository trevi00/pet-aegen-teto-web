import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [petName, setPetName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = () => {
    if (selectedImage && petName.trim()) {
      navigate('/analysis', {
        state: {
          imageUri: selectedImage,
          petName: petName.trim(),
        },
      });
    }
  };

  const isStartEnabled = selectedImage !== null && petName.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[500px] mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="font-ownglyph text-[32px] font-normal leading-[36px] mb-2 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            반려동물 🐾
          </h1>
          <h2 className="font-ownglyph text-[32px] font-normal leading-[36px] mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            에겐vs테토 테스트
          </h2>
          <p className="text-[14px] text-[#555555] leading-relaxed px-4">
            AI 기술로 분석하는 우리 아이의 성격 유형!
            <br />
            사진 한 장으로 에겐인지 테토인지 알아보세요.
          </p>
        </div>

        {/* Main Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/Group8.png"
            alt="에겐과 테토 캐릭터 - 반려동물 성격 테스트"
            className="w-[200px] h-[150px] object-contain"
          />
        </div>

        {/* What is Aegen & Teto Section */}
        <div className="bg-white rounded-[20px] p-5 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h3 className="font-ownglyph text-[18px] text-center mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            🐕 에겐과 테토란? 🐈
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#FFF5FB] to-[#F8F9FF] rounded-[12px] p-4">
              <div className="flex items-start gap-3">
                <span className="text-[24px]">😇</span>
                <div>
                  <h4 className="font-bold text-[14px] text-[#FF9ED8] mb-1">에겐 (Aegen)</h4>
                  <p className="text-[12px] text-[#666666] leading-relaxed">
                    순수하고 착한 천사 같은 성격! 온순하고 사랑스러운 모습으로
                    주인의 마음을 녹이는 타입입니다. 얌전하고 예의 바른 모습이 특징이에요.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#F8F9FF] to-[#FFF5FB] rounded-[12px] p-4">
              <div className="flex items-start gap-3">
                <span className="text-[24px]">😈</span>
                <div>
                  <h4 className="font-bold text-[14px] text-[#9DB4FF] mb-1">테토 (Teto)</h4>
                  <p className="text-[12px] text-[#666666] leading-relaxed">
                    장난기 가득한 개구쟁이! 호기심 많고 활발한 성격으로
                    매일 새로운 모험을 찾아다니는 타입입니다. 똑똒하고 재치있는 모습이 매력이에요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Tool Card */}
        <div className="bg-white rounded-[20px] p-5 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h3 className="font-ownglyph text-[16px] text-center mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            📸 지금 바로 테스트해보세요!
          </h3>

          {/* Pet Name Input */}
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-[250px] bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] rounded-[10px] p-[1px]">
              <input
                type="text"
                className="w-full h-[40px] px-4 text-[13px] bg-white rounded-[9px] outline-none text-[#333333]"
                placeholder="반려동물 이름을 입력해주세요"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-4">
            <div className="bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] rounded-[10px] p-[1px]">
              <label className="block cursor-pointer">
                <div className="bg-white rounded-[9px] p-5 min-h-[140px] flex items-center justify-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="업로드된 반려동물 사진 미리보기"
                      className="w-[80px] h-[80px] rounded-[10px] object-cover"
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center gap-2">
                      <div className="text-[36px]">📷</div>
                      <p className="text-[13px] text-[#666666]">반려동물 사진을 업로드해주세요</p>
                      <p className="text-[11px] text-[#999999]">얼굴이 잘 보이는 사진이 좋아요!</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-4">
            <label className="cursor-pointer rounded-full overflow-hidden">
              <div className="px-[18px] h-[30px] flex items-center justify-center bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]">
                <span className="text-[12px] font-bold text-white">
                  {selectedImage ? '이미지 변경' : '이미지 선택'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!isStartEnabled}
            className={`w-full rounded-[10px] py-3 ${
              isStartEnabled
                ? 'bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF]'
                : 'bg-[#E6E6E6]'
            }`}
          >
            <span className="text-[14px] font-bold text-white">
              {isStartEnabled ? '분석 시작하기 🔍' : '이름과 사진을 입력해주세요'}
            </span>
          </button>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="flex justify-center mb-5">
            <div className="relative w-full bg-[#AFC3FF] rounded-[13px] p-4">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 w-[28px] h-[28px] flex items-center justify-center text-white text-xl font-bold"
              >
                ×
              </button>
              <p className="text-[12px] font-medium leading-relaxed text-white pr-8">
                🤖 AI가 업로드한 사진에서 반려동물의 표정, 자세, 눈빛 등 다양한 특징을
                분석하여 에겐/테토 성향을 판단합니다. 재미로 즐겨주세요!
              </p>
            </div>
          </div>
        )}

        {/* Help Link */}
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          className="w-full text-center text-[14px] underline bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text mb-6"
        >
          측정 방법이 궁금해요
        </button>

        {/* How It Works Section */}
        <div className="bg-white rounded-[20px] p-5 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h3 className="font-ownglyph text-[16px] text-center mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            🔬 어떻게 분석하나요?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[12px] font-bold">1</span>
              </div>
              <p className="text-[12px] text-[#555555]">
                <strong>사진 업로드</strong> - 반려동물 얼굴이 잘 보이는 사진을 선택해요
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[12px] font-bold">2</span>
              </div>
              <p className="text-[12px] text-[#555555]">
                <strong>AI 분석</strong> - 인공지능이 표정과 특징을 분석해요
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[12px] font-bold">3</span>
              </div>
              <p className="text-[12px] text-[#555555]">
                <strong>결과 확인</strong> - 에겐/테토 비율과 성격 설명을 확인해요
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-[20px] p-5 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h3 className="font-ownglyph text-[16px] text-center mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            ✨ 서비스 특징
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FFF8FC] rounded-[12px] p-3 text-center">
              <div className="text-[24px] mb-1">🆓</div>
              <p className="text-[11px] font-bold text-[#FF9ED8]">무료 이용</p>
              <p className="text-[10px] text-[#888888]">회원가입 없이 무료</p>
            </div>
            <div className="bg-[#F8F9FF] rounded-[12px] p-3 text-center">
              <div className="text-[24px] mb-1">⚡</div>
              <p className="text-[11px] font-bold text-[#9DB4FF]">빠른 분석</p>
              <p className="text-[10px] text-[#888888]">몇 초 안에 결과 확인</p>
            </div>
            <div className="bg-[#F8F9FF] rounded-[12px] p-3 text-center">
              <div className="text-[24px] mb-1">🤖</div>
              <p className="text-[11px] font-bold text-[#9DB4FF]">AI 기술</p>
              <p className="text-[10px] text-[#888888]">최신 AI 이미지 분석</p>
            </div>
            <div className="bg-[#FFF8FC] rounded-[12px] p-3 text-center">
              <div className="text-[24px] mb-1">🔒</div>
              <p className="text-[11px] font-bold text-[#FF9ED8]">개인정보 보호</p>
              <p className="text-[10px] text-[#888888]">사진은 저장되지 않음</p>
            </div>
          </div>
        </div>

        {/* Supported Animals */}
        <div className="bg-white rounded-[20px] p-5 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h3 className="font-ownglyph text-[16px] text-center mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            🐾 테스트 가능한 반려동물
          </h3>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="text-[36px] mb-1">🐕</div>
              <p className="text-[12px] text-[#666666]">강아지</p>
            </div>
            <div className="text-center">
              <div className="text-[36px] mb-1">🐈</div>
              <p className="text-[12px] text-[#666666]">고양이</p>
            </div>
          </div>
          <p className="text-[11px] text-[#999999] text-center mt-3">
            * 얼굴이 잘 보이는 정면 사진으로 테스트하면 더 정확해요!
          </p>
        </div>

        {/* FAQ Preview */}
        <div className="bg-white rounded-[20px] p-5 mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
          <h3 className="font-ownglyph text-[16px] text-center mb-4 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            ❓ 자주 묻는 질문
          </h3>
          <div className="space-y-3">
            <div className="bg-[#FAFAFA] rounded-[10px] p-3">
              <p className="text-[12px] font-bold text-[#555555] mb-1">Q. 결과는 정확한가요?</p>
              <p className="text-[11px] text-[#777777] leading-relaxed">
                AI가 사진의 특징을 분석하여 재미있는 결과를 제공합니다.
                과학적 성격 테스트가 아닌 엔터테인먼트 목적의 서비스예요!
              </p>
            </div>
            <div className="bg-[#FAFAFA] rounded-[10px] p-3">
              <p className="text-[12px] font-bold text-[#555555] mb-1">Q. 사진은 어디에 저장되나요?</p>
              <p className="text-[11px] text-[#777777] leading-relaxed">
                업로드한 사진은 분석 후 즉시 삭제됩니다.
                서버에 저장되지 않으니 안심하고 이용하세요.
              </p>
            </div>
            <div className="bg-[#FAFAFA] rounded-[10px] p-3">
              <p className="text-[12px] font-bold text-[#555555] mb-1">Q. 비용이 드나요?</p>
              <p className="text-[11px] text-[#777777] leading-relaxed">
                완전 무료입니다! 회원가입 없이 바로 이용할 수 있어요.
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/faq"
              className="text-[12px] underline bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text"
            >
              더 많은 FAQ 보기 →
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-3 flex-wrap mb-6">
          <Link
            to="/about"
            className="px-4 py-2 text-[12px] text-[#888888] bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            서비스 소개
          </Link>
          <Link
            to="/how-to-use"
            className="px-4 py-2 text-[12px] text-[#888888] bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            사용 방법
          </Link>
          <Link
            to="/faq"
            className="px-4 py-2 text-[12px] text-[#888888] bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            FAQ
          </Link>
        </div>

        {/* Bottom Content */}
        <div className="text-center px-4 mb-4">
          <p className="text-[11px] text-[#999999] leading-relaxed">
            반려동물 에겐vs테토 테스트는 AI 기술을 활용한 재미있는 성격 분석 서비스입니다.
            강아지와 고양이의 사진을 분석하여 천사 같은 '에겐' 성향인지,
            장난꾸러기 '테토' 성향인지 알려드립니다.
            결과는 엔터테인먼트 목적으로 제공되며,
            실제 반려동물의 성격을 과학적으로 판단하는 것은 아닙니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
