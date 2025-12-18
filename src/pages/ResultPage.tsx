import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { COLORS } from '../constants/colors';

interface LocationState {
  classification: 'aegen' | 'teto';
  aeGenPercentage: number;
  tetoPercentage: number;
  comment: string;
  petName: string;
  imageUri: string;
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultCardRef = useRef<HTMLDivElement>(null);
  const { classification, aeGenPercentage, tetoPercentage, comment, petName, imageUri } =
    location.state as LocationState;

  const isAeGen = classification === 'aegen';

  const handleRetry = () => {
    navigate('/');
  };

  const handleShare = async () => {
    if (!resultCardRef.current) return;

    try {
      // html2canvas로 결과 카드를 캡처
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: false,
        windowWidth: resultCardRef.current.scrollWidth,
        windowHeight: resultCardRef.current.scrollHeight,
        width: resultCardRef.current.scrollWidth,
        height: resultCardRef.current.scrollHeight,
      });

      // Canvas를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const message = `우리 반려동물은 ${isAeGen ? '에겐' : '테토'}이에요! 🐾`;
        const fileName = `${petName}_${isAeGen ? '에겐' : '테토'}_결과.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // Web Share API로 이미지 공유
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: '반려동물에겐테토 결과',
              text: message,
              files: [file],
            });
          } catch (error) {
            console.log('공유 취소 또는 실패:', error);
          }
        } else {
          // Web Share API를 지원하지 않으면 다운로드
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          alert('이 브라우저는 공유 기능을 지원하지 않아 이미지를 다운로드했습니다.');
        }
      });
    } catch (error) {
      console.error('공유 실패:', error);
      alert('공유에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSaveImage = async () => {
    if (!resultCardRef.current) return;

    try {
      // html2canvas로 결과 카드를 캡처
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: false,
        windowWidth: resultCardRef.current.scrollWidth,
        windowHeight: resultCardRef.current.scrollHeight,
        width: resultCardRef.current.scrollWidth,
        height: resultCardRef.current.scrollHeight,
      });

      // Canvas를 Blob으로 변환
      canvas.toBlob((blob) => {
        if (!blob) return;

        // 다운로드 링크 생성
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${petName}_${isAeGen ? '에겐' : '테토'}_결과.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Result Card */}
        <div ref={resultCardRef} className="bg-white rounded-[20px] p-5 mb-5 shadow-lg max-w-[340px] mx-auto">
          {/* Title */}
          <h2 className="text-base font-semibold text-center mb-5">
            {petName}의 결과는...
          </h2>

          {/* Result Container */}
          <div className="text-center mb-8">
            {/* Circle Image */}
            <div
              className={`w-[120px] h-[120px] mx-auto mb-4 rounded-full overflow-hidden border-4`}
              style={{
                borderColor: isAeGen ? COLORS.aegen.primary : COLORS.teto.primary,
              }}
            >
              <img
                src={imageUri}
                alt={petName}
                className="w-full h-full object-cover"
                
              />
            </div>

            {/* Result Title */}
            <h3
              className="text-xl font-bold"
              style={{
                color: isAeGen ? COLORS.aegen.primary : COLORS.teto.primary,
              }}
            >
              {isAeGen ? '에겐' : '테토'}
            </h3>
          </div>

          {/* Percentage Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-xs">
              <span className="font-semibold" style={{ color: COLORS.aegen.primary }}>
                에겐 {aeGenPercentage}%
              </span>
              <span className="font-semibold" style={{ color: COLORS.teto.primary }}>
                테토 {tetoPercentage}%
              </span>
            </div>
            <div className="h-3 flex rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r"
                style={{
                  width: `${aeGenPercentage}%`,
                  backgroundImage: `linear-gradient(to right, ${COLORS.aegen.gradient[0]}, ${COLORS.aegen.gradient[1]})`,
                }}
              />
              <div
                className="bg-gradient-to-r"
                style={{
                  width: `${tetoPercentage}%`,
                  backgroundImage: `linear-gradient(to right, ${COLORS.teto.gradient[0]}, ${COLORS.teto.gradient[1]})`,
                }}
              />
            </div>
          </div>

          {/* Comment */}
          <div className="bg-[#FFF4FC] p-5 rounded-2xl mb-8">
            <p className="text-[10px] text-center leading-6">{comment}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full py-3 rounded-[10px] bg-gradient-to-r from-[#FFB8E6] to-[#A5C8FF] text-xs font-bold text-white"
          >
            내 새꾸 결과 공유하기 🐾
          </button>

          {/* Secondary Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSaveImage}
              className="flex-1 py-3 rounded-[10px] border-2 bg-white text-xs font-bold"
              style={{
                borderImage: 'linear-gradient(to right, #E8D5F5, #F5E0FF) 1',
                color: COLORS.text.secondary,
              }}
            >
              이미지 저장
            </button>
            <button
              onClick={handleRetry}
              className="flex-1 py-3 rounded-[10px] border-2 bg-white text-xs font-bold"
              style={{
                borderImage: 'linear-gradient(to right, #E8D5F5, #F5E0FF) 1',
                color: COLORS.text.secondary,
              }}
            >
              다시 테스트
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
