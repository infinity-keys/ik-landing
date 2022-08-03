import Image from "next/image";
import { cloudinaryUrl } from "@lib/images";

interface CloudImageProps {
  id: string;
  height: number;
  width: number;
  alt?: string;
}

const CloudImage = ({ id, height, width, alt = "" }: CloudImageProps) => {
  return (
    <Image
      src={cloudinaryUrl(id, height, width)}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default CloudImage;
