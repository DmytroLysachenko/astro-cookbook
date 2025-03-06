import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "auth-astro/client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, UserIcon } from "lucide-react";
import type { TUser } from "@/db/schema/users";
import { IMAGEKIT_URL_ENDPOINT } from "astro:env/client";

const LoggedAuth = ({ user }: { user: TUser }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage
              src={`${IMAGEKIT_URL_ENDPOINT}/${user.avatar}`}
              alt={user.name ?? "avatar"}
            />
            <AvatarFallback className="flex justify-center items-center font-semibold bg-muted text-md">
              {user.name
                ?.split(" ")
                .map((name) => name[0])
                .join("") ?? "US"}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          sideOffset={16}
          className="border-t-0 rounded-t-none max-w-36 z-10 bg-background border-muted/40"
        >
          <ul className="flex flex-col gap-2">
            <li
              onClick={() => window.location.assign("/my-profile")}
              className="flex items-center gap-2 cursor-pointer hover:text-secondary transition-all"
            >
              <UserIcon className="size-4" />
              My profile
            </li>
            <li
              onClick={() => signOut()}
              className="flex items-center gap-2 cursor-pointer hover:text-secondary transition-all"
            >
              <LogOut className="size-4" />
              Log out
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default LoggedAuth;
