import { IMAGEKIT_PRIVATE_KEY } from "astro:env/server";
import { IMAGEKIT_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY } from "astro:env/client";
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
});
