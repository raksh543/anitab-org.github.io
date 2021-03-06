import React, { useRef } from 'react';
import { Image } from 'react-native';

function ScaledImage({
  source,
  overSource,
  url,
  height,
  width,
  isOver = false,
}) {
  const ref = useRef(true);
  const [imageHeight, setImageHeight] = React.useState(height);
  const [imageWidth, setImageWidth] = React.useState(width);

  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current = false;
      Image.getSize(source, (w, h) => {
        if (width && !height) {
          setImageWidth(width);
          setImageHeight(h * (width / w));
        } else if (!width && height) {
          setImageWidth(w * (height / h));
          setImageHeight(height);
        } else {
          setImageWidth(w);
          setImageHeight(h);
        }
      });
    }
  });

  const imageStyle = {
    height: imageHeight,
    width: imageWidth,
  };

  return (
    <a href={url}>
      <Image
        source={isOver && overSource ? overSource : source}
        style={imageStyle}
      />
    </a>
  );
}

export default ScaledImage;
