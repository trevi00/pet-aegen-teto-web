import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { analyzeImage } from '../services/api';

interface LocationState {
  imageUri: string;
  petName: string;
}

const AnalysisPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUri, petName } = location.state as LocationState;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        const result = await analyzeImage({
          image: imageUri,
          petName,
        });

        if (result.success) {
          navigate('/result', {
            state: {
              classification: result.classification,
              aeGenPercentage: result.aegen_percentage,
              tetoPercentage: result.teto_percentage,
              comment: result.comment,
              breedMatch: result.breed_match ?? null,
              petName,
              imageUri,
            },
          });
        } else {
          setError(result.error || '분석 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('Analysis error:', error);
        setError('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    performAnalysis();
  }, [imageUri, petName, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-4">
            <img
              src={imageUri}
              alt={petName}
              className="w-full h-full rounded-full object-cover border-4 border-[#FFB5EB]"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
            {petName}의 특징을 분석 중...
          </h2>
        </div>

        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFB5EB] border-t-transparent"></div>
        </div>

        <p className="text-sm text-[#666666]">
          AI가 이미지를 분석하고 있습니다...
        </p>

        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
