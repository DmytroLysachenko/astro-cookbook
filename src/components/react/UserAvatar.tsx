import type React from "react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import ImageKitProvider from "./ImageKitProvider";
import { IKImage, IKUpload } from "imagekitio-react";
import type { UploadResponse } from "imagekit/dist/libs/interfaces";
import { API_BASE_URL } from "astro:env/client";

interface UserAvatarProps {
  avatar: string;
  userId: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  avatar: initialAvatar,
  userId,
}) => {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [isMutated, setIsMutated] = useState(false);

  const onError = (err: Error) => {
    console.log("Error", err);
  };

  const onSuccess = async (res: UploadResponse) => {
    setAvatar(res.filePath);
    setIsMutated(true);
  };

  const handleSubmit = async (avatar: string) => {
    try {
      console.log(avatar);
      await fetch(`${API_BASE_URL}/image-kit/avatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, avatar }),
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onValidate = (file: File) => {
    if (!file.type.includes("image")) {
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      return false;
    }
    return true;
  };

  const ikUploadRef = useRef<HTMLInputElement | null>(null);

  return (
    <ImageKitProvider>
      <div className="flex flex-col">
        <IKImage
          path={avatar}
          transformation={[{ width: "300", height: "300" }]}
          className="rounded-full overflow-hidden"
          width={300}
          height={300}
        />
        <IKUpload
          folder="/cooking-spot/user-avatars"
          useUniqueFileName={true}
          onError={onError}
          onSuccess={onSuccess}
          ref={ikUploadRef}
          className="hidden"
          validateFile={onValidate}
        />
        <div className="flex items-center gap-4 py-3 px-1">
          <div className="flex flex-col gap-2 w-full">
            <p>Upload new avatar:</p>
            {ikUploadRef && (
              <Button
                variant="outline"
                size="sm"
                className="w-full cursor-pointer"
                onClick={() => ikUploadRef.current?.click()}
              >
                Upload
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full cursor-pointer"
              onClick={() => handleSubmit(avatar)}
              disabled={!isMutated}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </ImageKitProvider>
  );
};

export default UserAvatar;
