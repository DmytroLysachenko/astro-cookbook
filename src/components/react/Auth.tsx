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
            <AvatarFallback className="flex justify-center items-center font-semibold bg-amber-50 text-md">
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
          className="border-t-0 rounded-t-none max-w-36"
        >
          <p
            onClick={() => signOut()}
            className="flex items-center gap-2 cursor-pointer hover:text-amber-500 transition-all"
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
        className="cursor-pointer p-1 size-8 flex justify-center items-center rounded-full"
        handleClick={() => {
          signIn("google");
        }}
        icon={
          <img
            src={"/icons/google.svg"}
            className="size-4 object-contain"
          ></img>
        }
      />

      <CustomButton
        title=""
        variant="outline"
        className="cursor-pointer p-1 size-8 flex justify-center items-center rounded-full"
        handleClick={() => {
          signIn("github");
        }}
        icon={
          <img
            src={"/icons/github.svg"}
            className="size-4 object-contain"
          ></img>
        }
      />
    </div>
  );
};

export default Auth;
