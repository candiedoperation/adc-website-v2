import { RefObject, useEffect, useRef, useState } from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting));
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.observe(ref.current as HTMLElement);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [ref]);

  return isOnScreen;
}