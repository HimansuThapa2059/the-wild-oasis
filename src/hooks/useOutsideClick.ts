import { useEffect, useRef } from "react";

const useOutsideClick = (
  handlerFunction: () => void,
  listenCapturing: boolean = true
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handlerFunction();
      }
    };
    document.addEventListener("click", handleClick, listenCapturing); // using true to handle Click during capturing phase  (using mousedown event without true params works fine too)
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handlerFunction, listenCapturing]);

  return ref;
};

export default useOutsideClick;
