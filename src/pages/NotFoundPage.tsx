import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2FA] to-[#F2F5FE] py-8 px-4">
      <div className="w-full max-w-[600px] mx-auto text-center">
        <h1 className="font-ownglyph text-[28px] font-normal leading-tight mb-3 bg-gradient-to-r from-[#FFB5EB] to-[#AFC3FF] text-transparent bg-clip-text">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-[14px] text-[#666666] mb-6">주소가 바뀌었거나 없는 페이지예요.</p>
        <Link
          to="/"
          className="inline-block bg-white rounded-[20px] px-6 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.15)] text-[14px] text-[#333333]"
        >
          테스트 하러 가기 🐾
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
