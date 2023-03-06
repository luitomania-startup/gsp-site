import React, { useMemo, useState, useEffect, useCallback } from "react";
import { encode } from "blurhash";
import styled from "styled-components";

import FileInput from "./FileInput";
import Setting from "./Setting";
const RangeInput = styled.input.attrs({ type: "range" })`
  width: 300px;
`;

const Root = styled.div`
  border: 1px solid #e4e4e4;
  border-radius: 4px;
`;

const StyledFileInput = styled(FileInput)``;

const ImagePreviewContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1024px;
  height: 400px;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  background: #f4f4f4;
  object-fit: contain;
  object-position: 50% 50%;
`;

const ImageFileName = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.75em;
  color: white;
  padding: 1px 3px;
  border-radius: 2px;
  background-color: rgba(30, 30, 30, 0.6);
`;

const Settings = styled.div`
  border-top: 1px solid #e4e4e4;
  padding: 15px;
`;

const BlurhashResultContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #e4e4e4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Heading3 = styled.h3`
  font-weight: 600;
  font-size: 1em;
  color: 777;
  margin: 0 0 10px 0;
`;

const ResultBlurhash = styled.div`
  overflow-wrap: break-word;
  font-size: 1.05em;
  font-family: monospace;
  width: 100%;
  box-sizing: border-box;
`;

type Props = {
  onChange: (hash: string) => void;
  value?: string;
  url: string;
};

const getClampedSize = (
  width: number,
  height: number,
  max: number
): { width: number; height: number } => {
  if (width >= height && width > max) {
    return { width: max, height: Math.round((height / width) * max) };
  }

  if (height > width && height > max) {
    return { width: Math.round((width / height) * max), height: max };
  }

  return { width, height };
};

const loadImage = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (
  image: HTMLImageElement,
  resolutionX: number,
  resolutionY: number
) => {
  
  const canvas: HTMLCanvasElement = document.createElement("canvas"); //document.getElementById("canvasBH") ;
  canvas.width = resolutionX;
  canvas.height = resolutionY;
  const context = canvas.getContext("2d");
  context!.drawImage(image, 0, 0, resolutionX, resolutionY);
  console.log("T", context);
  return context!.getImageData(0, 0, resolutionX, resolutionY);
};

const BlurhashImageEncoder: React.FunctionComponent<Props> = ({
  onChange,
  url,
}) => {
  const [data, setData] = useState<
    { imageUrl: string; imageData: ImageData } | undefined
  >();
  const handleFileChange = async (url: string) => {
    const imageUrl = url;
    const img = await loadImage(imageUrl);
    const clampedSize = getClampedSize(img.width, img.height, 64);
    console.log("L");
    const imageData = getImageData(img, clampedSize.width, clampedSize.height);
    console.log("P", imageData);
    setData({ imageUrl, imageData: imageData });
  };
  const imageDataConvert = async (imageUrl: string) => {
    const img = await loadImage(imageUrl);
    const clampedSize = getClampedSize(img.width, img.height, 64);
    const imageData = getImageData(img, clampedSize.width, clampedSize.height);
    return imageData;
  };
  useEffect(() => {
    if (url) {
      // imageDataConvert(url).then((imageData) => {
      //   setData({ imageUrl: url || "", imageData });
      // });
      handleFileChange(url);
    }
  }, [url]);

  const [componentX, setComponentX] = useState(4);
  const [componentY, setComponentY] = useState(4);

  const blurhash = useMemo(
    () =>
      data
        ? encode(
            data.imageData.data,
            data.imageData.width,
            data.imageData.height,
            componentX,
            componentY
          )
        : undefined,
    [data, url, componentX, componentY]
  );

  useEffect(() => onChange(blurhash || ""), [blurhash]);
  console.log(data, url);
  return (
    <Root>
      
      {!!blurhash && (
        <BlurhashResultContainer>
          <Heading3>Blurhash result</Heading3>

          <ResultBlurhash>{blurhash}</ResultBlurhash>
        </BlurhashResultContainer>
      )}
    </Root>
  );
};

export default BlurhashImageEncoder;
