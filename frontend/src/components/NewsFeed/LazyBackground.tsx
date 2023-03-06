import React, { useState, useLayoutEffect, useCallback } from "react";
import { useBlurhash } from "./useBlurHash";

const LazyBackground = (allprops: any) => {
  const {
    src,
    blurHash = "",
    loading = "lazy",
    style,
    punch = 1,
    ...props
  } = allprops;
  const [imgLoaded, setImgLoaded] = useState(false);
  useLayoutEffect(() => {
    setImgLoaded(false);
  }, [src, blurHash]);
  const blurUrl = useBlurhash(!imgLoaded ? blurHash : null);
  const newStyle = blurUrl
    ? {
        backgroundImage: `url("${blurUrl}")`,
        ...style,
      }
    : {
        backgroundImage: `url(${src}`,
        ...style,
      };
  const handleOnLoad = useCallback(() => {
    setTimeout(() => {
      setImgLoaded(true);
    }, 500);
  }, []);

  return (
    <div
      {...props}
      src={src}
      className="feed feed-bg-image-transition h-[50rem] md:h-[50rem]"
      loading={loading}
      style={newStyle}
      //   style={{
      //     backgroundImage: `url(${srcVal || props.placeholder})`,
      //   }}
    >
      <img src={src} className="hidden" onLoad={handleOnLoad} alt="hidden" />
      {allprops.children}
    </div>
  );
};

export default LazyBackground;
