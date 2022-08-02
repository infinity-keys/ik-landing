import Image from "next/image";
import { cloudinaryUrl, cloudinaryUrlBlurred } from "@lib/images";

interface CloudImageProps {
  id: string;
  height: number;
  width: number;
  alt?: string;
}

const CloudImage = ({ id, height, width, alt = "" }: CloudImageProps) => {
  return (
    <div style={{ height, width }}>
      <div
        style={{
          position: "relative",
          height: 0,
          paddingTop: `${(height / width) * 100}%`,
          backgroundImage: `url(${cloudinaryUrlBlurred(id)})`,
          backgroundPosition: "center center",
          backgroundSize: `100%`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Image
            src={cloudinaryUrl(id, height, width)}
            alt={alt}
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  );
};

export default CloudImage;
