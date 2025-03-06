import {
  IMAGEKIT_URL_ENDPOINT,
  IMAGEKIT_PUBLIC_KEY,
  API_BASE_URL,
} from "astro:env/client";
import { IKContext } from "imagekitio-react";

const ImageKitProvider = ({ children }: { children: React.ReactNode }) => {
  const authenticator = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-kit/auth`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Authentication request failed: ${error.message}`);
      }
      console.error(error);
    }
  };
  return (
    <IKContext
      publicKey={IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      {children}
    </IKContext>
  );
};

export default ImageKitProvider;
