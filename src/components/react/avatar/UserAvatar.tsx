import { IMAGEKIT_URL_ENDPOINT } from "astro:env/client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const UserAvatar = ({
  name,
  avatar,
  className,
}: {
  name: string;
  avatar: string;
  className?: string;
}) => {
  return (
    <Avatar
      className={cn(
        "size-10 cursor-pointer justify-center items-center border-1 border-default",
        className,
      )}
    >
      <AvatarImage src={`${IMAGEKIT_URL_ENDPOINT}/${avatar}`} alt={name} />
      <AvatarFallback className="flex justify-center items-center font-semibold bg-muted text-md">
        {name
          ?.split(" ")
          .map((name) => name[0])
          .join("") ?? "US"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
