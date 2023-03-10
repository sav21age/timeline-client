import React from "react";
import { appConfig } from '../appConfig';

type Props = {
  path: string,
  pathFallback?: string,
  alt: string,
  className?: string,
  width?: string,
  height?: string,
};

const replaceSlashes = (path: string) => {
  let t = 0
  return path.replace(/\/\//g, match => ++t >= 2 ? '/' : match)
}

const Picture = (props: Props) => {
  // const fallBackSrc = `${process.env.PUBLIC_URL}/media/svg/none.svg`;
  return (
    <img
      // src={`${props.path}`.replace(
      //   "//",
      //   "/"
      // )}
      src={replaceSlashes(props.path)}
      onError={e => (e.currentTarget.src = (props.pathFallback === undefined ? appConfig.FALLBACK_SRC : props.pathFallback))}
      alt={props.alt}
      className={props.className}
      width={props.width}
      height={props.height}
    />
  );
};

export default Picture;