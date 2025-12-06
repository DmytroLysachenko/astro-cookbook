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
  }, []);

  const menuButtonClass =
    "flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-all hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40";

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
          <li>
            <button
              type="button"
              onClick={() => window.location.assign("/my-profile")}
              className={menuButtonClass}
            >
              <UserIcon className="size-4" />
              My profile
            </button>
          </li>
          <li>
            <button type="button" onClick={() => signOut()} className={menuButtonClass}>
              <LogOut className="size-4" />
              Log out
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default LoggedAuth;
