import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";

interface UserAvatarProps {
  name: string;
  avatar?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  avatar: initialAvatar,
}) => {
  const [avatar, setAvatar] = useState(initialAvatar);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to ImageKit and get the URL
      // For this example, we'll just use a local URL
      const localUrl = URL.createObjectURL(file);
      setAvatar(localUrl);

      // TODO: Implement actual ImageKit upload
      // const imageKitUrl = await uploadToImageKit(file);
      // setAvatar(imageKitUrl);
    }
  };

  return (
    <div className="text-center">
      <img
        src={avatar || "https://placehold.co/128x128"}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="hidden"
        id="avatar-upload"
      />
      <label htmlFor="avatar-upload">
        <Button variant="outline" size="sm" className="cursor-pointer">
          Change Avatar
        </Button>
      </label>
    </div>
  );
};

export default UserAvatar;
