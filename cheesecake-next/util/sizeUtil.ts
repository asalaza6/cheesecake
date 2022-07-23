import { useEffect, useState } from "react";

export const useScreenSize = (): ["l" | "m" | "s", number] => {
    const [width, setWidth] = useState(0)
  
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    }

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
      }, []);
      
    let s: 'l' | 'm' | 's' = 'l';
    if (width) {
        if (width < 600) {
            s = 's';
        } else if (width < 1200) {
            s = 'm';
        }
    }
    return [s, width];
}