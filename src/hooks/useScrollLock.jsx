import { useEffect } from "react";

const useScrollLock = (lock = false) => {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lock]);
};

export default useScrollLock;
