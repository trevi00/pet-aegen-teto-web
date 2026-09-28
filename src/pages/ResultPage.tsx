import React, { useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { COLORS } from '../constants/colors';
import { typeOf } from './TypeBreedPages';

interface LocationState {
  classification: 'aegen' | 'teto';
  aeGenPercentage: number;
  tetoPercentage: number;
  comment: string;
  petName: string;
  imageUri: string;
  breedMatch?: { key: string; ko: string; prob: number } | null;
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [linkMsg, setLinkMsg] = useState('');
  // 새로고침·직접 접속처럼 분석 결과(state) 없이 열리면 빈 화면 대신 홈으로
  const state = location.state as LocationState | null;
  if (!state) return <Navigate to="/" replace />;
  const { classification, aeGenPercentage, tetoPercentage, comment, petName, imageUri, breedMatch } = state;
  const petType = typeOf(aeGenPercentage);

  // 결과 링크: 유형 페이지 + 이름·비율 (사진은 링크에 담지 않는다)
  const handleShareLink = async () => {
    const url = `${window.location.origin}/type/${petType.slug}?n=${encodeURIComponent(petName)}&p=${aeGenPercentage}`;
    const text = `${petName}의 에겐테토 결과는 '${petType.name}' (에겐 ${aeGenPercentage}%) 🐾`;
    try {
      if (navigator.share) {
        await navigator.share({ title: '반려동물 에겐테토 결과', text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setLinkMsg('링크를 복사했어요. 붙여넣어 공유해 주세요!');
    } catch {
      // 공유 창을 닫은 경우 — 아무것도 하지 않는다
    }
  };

  // 인스타그램: 웹에서 링크를 넘겨받는 공유 주소가 없어, 스토리 크기(1080×1920) 이미지를 만들어 공유 창으로 넘긴다.
  // 결과 링크는 클립보드에 복사해 두어 스토리의 링크 스티커에 붙여넣을 수 있게 한다.
  const handleInstagram = async () => {
    if (!resultCardRef.current) return;
    const url = `${window.location.origin}/type/${petType.slug}?n=${encodeURIComponent(petName)}&p=${aeGenPercentage}`;
    try {
      const card = await (await import('html2canvas')).default(resultCardRef.current, { backgroundColor: '#FFFFFF', scale: 3, logging: false, allowTaint: true, useCORS: false });
      const story = document.createElement('canvas');
      story.width = 1080;
      story.height = 1920;
      const ctx = story.getContext('2d');
      if (!ctx) return;
      const bg = ctx.createLinearGradient(0, 0, 1080, 1920);
      bg.addColorStop(0, '#FDF2FA');
      bg.addColorStop(1, '#F2F5FE');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1080, 1920);
      const w = 880;
      const h = Math.min(1400, (card.height / card.width) * w);
      ctx.drawImage(card, (1080 - w) / 2, (1920 - h) / 2 - 60, w, h);
      ctx.fillStyle = '#888888';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('우리 아이도 테스트해 보기 🐾 agttpet.com', 540, 1920 - 170);

      const blob: Blob | null = await new Promise((resolve) => story.toBlob(resolve, 'image/png'));
      if (!blob) return;
      const file = new File([blob], `${petName}_에겐테토_스토리.png`, { type: 'image/png' });
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // 클립보드 권한이 없으면 링크 복사만 건너뛴다
      }
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: '반려동물 에겐테토 결과' });
        setLinkMsg('공유 창에서 인스타그램을 골라 주세요. 결과 링크는 복사돼 있어 링크 스티커에 붙여넣을 수 있어요.');
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(a.href);
        setLinkMsg('스토리용 이미지를 저장했어요. 휴대폰의 인스타그램 앱에서 스토리로 올려 주세요.');
      }
    } catch {
      // 공유 창을 닫은 경우 — 아무것도 하지 않는다
    }
  };

  const isAeGen = classification === 'aegen';

  const handleRetry = () => {
    navigate('/');
  };

  const handleShare = async () => {
    if (!resultCardRef.current) return;

    try {
      // html2canvas로 결과 카드를 캡처
      const canvas = await (await import('html2canvas')).default(resultCardRef.current, {
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
      const canvas = await (await import('html2canvas')).default(resultCardRef.current, {
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
            <p className="text-[13px] text-center leading-6 text-[#444444]">{comment}</p>
            {breedMatch && (
              <p className="text-[11px] text-center text-[#888888] mt-2">
                닮은 품종: <Link to={`/breed/${breedMatch.key.replace(/_/g, '-')}`} className="underline">{breedMatch.ko}</Link> ({breedMatch.prob}%)
              </p>
            )}
          </div>
        </div>

        {/* Result Type */}
        <Link
          to={`/type/${petType.slug}`}
          className="block bg-white rounded-[15px] p-4 mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)] max-w-[340px] mx-auto"
        >
          <p className="text-[11px] text-[#999999] mb-1">결과 유형</p>
          <p className="text-[14px] font-bold text-[#333333]">{petType.emoji} {petType.name}</p>
          <p className="text-[12px] text-[#666666] mt-1">{petType.headline}</p>
          <p className="text-[11px] text-[#FF9ED8] mt-2">유형 설명 보기 →</p>
        </Link>

        {/* Buttons */}
        <div className="space-y-3">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full py-3 rounded-[10px] bg-gradient-to-r from-[#FFB8E6] to-[#A5C8FF] text-xs font-bold text-white"
          >
            내 새꾸 결과 공유하기 🐾
          </button>
          <button
            onClick={handleShareLink}
            className="w-full py-3 rounded-[10px] bg-white text-xs font-bold shadow-sm"
            style={{ color: COLORS.text.secondary }}
          >
            결과 링크 공유하기 🔗
          </button>
          <button
            onClick={handleInstagram}
            className="w-full py-3 rounded-[10px] text-xs font-bold text-white"
            style={{ backgroundImage: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)' }}
          >
            인스타그램 스토리로 공유하기 📸
          </button>
          {linkMsg && <p className="text-center text-[11px] text-[#888888]">{linkMsg}</p>}

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
