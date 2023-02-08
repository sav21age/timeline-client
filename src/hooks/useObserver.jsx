import { useEffect, useRef } from "react";

export const useObserver = (ref, page, maxPage, action) => {
  const observer = useRef();

  // console.log("ref: ");
  // console.dir(ref);
  // console.log("page: " + page);
  // console.log("maxPage: " + maxPage);
  // console.log("action: " + action);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const callback = (entries, observer) => {
      // console.log("isIntersecting: " + entries[0].isIntersecting);
      // console.log("page: " + page);
      // console.log("maxPage: " + maxPage);

      if (entries[0].isIntersecting && page <= maxPage) {
        action();
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(ref.current);
  }, [page, maxPage]); // eslint-disable-line
};
