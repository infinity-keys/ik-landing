import Image from "next/image";
import { cloudinaryUrl } from "@lib/images";

interface CloudImageProps {
  id: string;
  height: number;
  width: number;
  alt?: string;
  circle?: boolean;
}

const CloudImage = ({
  id,
  height,
  width,
  alt = "",
  circle = false,
}: CloudImageProps) => {
  return (
    <Image
      src={cloudinaryUrl(id, height, width, circle)}
      quality={100}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default CloudImage;
