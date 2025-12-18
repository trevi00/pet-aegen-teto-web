import { useEffect } from 'react';

interface AdSenseProps {
  client: string;  // 'ca-pub-XXXXXXXXXXXXXXXX'
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdSenseProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = {},
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

export default AdSense;
