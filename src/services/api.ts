import axios from 'axios';

// 백엔드 API URL - 환경 변수로 설정 가능
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface AnalysisRequest {
  image: string;  // Base64 encoded image (data URL)
  petName: string;
}

export interface AnalysisResponse {
  success: boolean;
  classification?: 'aegen' | 'teto';
  aegen_percentage?: number;
  teto_percentage?: number;
  comment?: string;
  breed_match?: { key: string; ko: string; prob: number } | null;
  error?: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for AI processing
});

/**
 * Base64 data URL을 Blob으로 변환
 */
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * 이미지를 분석하여 에겐/테토 분류 결과를 받아옵니다
 */
export const analyzeImage = async (
  request: AnalysisRequest
): Promise<AnalysisResponse> => {
  try {
    // FormData 생성
    const formData = new FormData();

    // Base64를 Blob으로 변환 후 File 객체로 추가
    const blob = dataURLtoBlob(request.image);
    const file = new File([blob], 'pet-image.jpg', { type: blob.type });
    formData.append('image', file);

    const response = await apiClient.post<AnalysisResponse>('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * 헬스 체크
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export default {
  analyzeImage,
  healthCheck,
};
