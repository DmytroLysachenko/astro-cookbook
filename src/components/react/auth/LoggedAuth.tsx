import { signOut } from "auth-astro/client";
import { LogOut, UserIcon } from "lucide-react";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { TUser } from "@/services/auth";
import UserAvatar from "../avatar/UserAvatar";

const LoggedAuth = ({ user }: { user: TUser }) => {
  useEffect(() => {
    const loader = document.getElementById("user-data-loader");
    if (loader) loader.style.display = "none";
  });

  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar
          name={user.name}
          avatar={user.avatar ?? ""}
          className="md:size-14"
        />
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        sideOffset={26}
        className="border-t-0 rounded-t-none max-w-36 z-10 backdrop-blur-md bg-background/80 border-muted/40"
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
  );
};

export default LoggedAuth;
