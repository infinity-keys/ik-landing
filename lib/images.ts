import { buildUrl } from "cloudinary-build-url";

export const cloudinaryUrl = (id: string, height: number, width: number) => {
  return buildUrl(id, {
    cloud: {
      cloudName: "infinity-keys",
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

export const cloudinaryUrlBlurred = (id: string) => {
  return buildUrl(id, {
    cloud: {
      cloudName: "infinity-keys",
    },
    transformations: {
      effect: {
        name: "blur",
        value: 1000,
      },
      quality: 1,
    },
  });
};
