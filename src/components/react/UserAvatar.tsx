import type React from "react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import ImageKitProvider from "./ImageKitProvider";
import { IKImage, IKUpload } from "imagekitio-react";
import { X } from "lucide-react";
interface UserAvatarProps {
  name: string;
  avatar?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  avatar: initialAvatar,
}) => {
  const [avatar, setAvatar] = useState(initialAvatar);

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  return (
    <ImageKitProvider>
      <div className="flex flex-col">
        <IKImage
          path={avatar as string}
          transformation={[{ width: "300", height: "300" }]}
          className="rounded-full overflow-hidden"
          width={300}
          height={300}
        />
        <IKUpload
          folder="/cookbook/user-avatars"
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          ref={ikUploadRef}
          style={{ display: "none" }}
          validateFile={(file: { size: number }) => file.size < 2000000}
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
          </div>

          {ikUploadRef && (
            <Button
              variant="outline"
              className="w-fit mt-auto cursor-pointer"
              size="sm"
              onClick={() => ikUploadRef.current?.abort()}
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </ImageKitProvider>
  );
};

export default UserAvatar;
