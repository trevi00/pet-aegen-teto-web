import React from 'react';
import AdBanner from './AdBanner';

interface AdLayoutProps {
  children: React.ReactNode;
}

const AdLayout: React.FC<AdLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Ad Banner - 모바일에서 숨김 */}
      <div className="hidden md:block w-full bg-gray-100 border-b border-gray-200">
        <div className="max-w-[728px] h-[90px] mx-auto flex items-center justify-center">
          <AdBanner 
            slot="2926214105" 
            format="auto"
            style={{ width: '100%', height: '90px' }}
          />
        </div>
      </div>

      {/* Main Content Area with Side Ads */}
      <div className="flex-1 flex">
        {/* Left Ad */}
        <div className="hidden lg:block w-[160px] bg-gray-100 border-r border-gray-200">
          <div className="sticky top-0 h-screen flex items-center justify-center p-2">
            <AdBanner 
              slot="9704209598"
              format="auto"
              style={{ width: '160px', height: '600px' }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Right Ad */}
        <div className="hidden lg:block w-[160px] bg-gray-100 border-l border-gray-200">
          <div className="sticky top-0 h-screen flex items-center justify-center p-2">
            <AdBanner 
              slot="4355803700"
              format="auto"
              style={{ width: '160px', height: '600px' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner - 모바일에서 숨김 */}
      <div className="hidden md:block w-full bg-gray-100 border-t border-gray-200">
        <div className="max-w-[728px] h-[90px] mx-auto flex items-center justify-center">
          <AdBanner 
            slot="7145602664"
            format="auto"
            style={{ width: '100%', height: '90px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdLayout;
