import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut } from "auth-astro/client";
import type { User } from "@auth/core/types";
import CustomButton from "./CustomButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";

const Auth = ({ user }: { user?: User }) => {
  return user ? (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage
              src={user.image ?? undefined}
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
          <p
            onClick={() => signOut()}
            className="flex items-center gap-2 cursor-pointer hover:text-secondary transition-all"
          >
            <LogOut className="size-4" />
            Log out
          </p>
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <div className="flex gap-3">
      <CustomButton
        title=""
        variant="outline"
        className="cursor-pointer p-1 size-8 flex justify-center items-center rounded-full hover:bg-muted/20 border-muted/40"
        handleClick={() => {
          signIn("google");
        }}
        icon={
          <img src={"/assets/icons/google.svg"} className="object-contain" />
        }
      />

      <CustomButton
        title=""
        variant="outline"
        className="cursor-pointer p-1 size-8 flex justify-center items-center rounded-full hover:bg-muted/20 border-muted/40"
        handleClick={() => {
          signIn("github");
        }}
        icon={
          <img src={"/assets/icons/github.svg"} className="object-contain" />
        }
      />
    </div>
  );
};

export default Auth;
