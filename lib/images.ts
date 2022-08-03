import { buildUrl } from "cloudinary-build-url";
import { CLOUDINARY_CLOUD_NAME } from "@lib/constants";

export const cloudinaryUrl = (id: string, height: number, width: number) => {
  return buildUrl(id, {
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      resize: {
        type: "scale",
        width,
        height,
      },
    },
  });
};
