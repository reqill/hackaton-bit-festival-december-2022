import { useEffect, useState } from 'react';

export const usePageIsHigh = () => {
  const [pageIsHigh, setPageIsHigh] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setPageIsHigh(document.body.scrollHeight > window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return pageIsHigh;
};
