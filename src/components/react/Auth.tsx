import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { signIn, signOut } from "auth-astro/client";
import type { User } from "@auth/core/types";

const Auth = ({ user }: { user?: User }) => {
  return user ? (
    <>
      <Button
        variant={"outline"}
        className="h-8 text-xs"
        onClick={() => signOut()}
      >
        Log out
      </Button>

      <Avatar className="size-10 ">
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
    </>
  ) : (
    <div className="flex gap-3">
      <Button
        variant={"outline"}
        className="p-1 size-8 flex justify-center items-center rounded-full"
        onClick={() => {
          signIn("google");
        }}
      >
        <img src={"/icons/google.svg"} className="size-4 object-contain"></img>
      </Button>

      <Button
        variant={"outline"}
        className="p-1 size-8 flex justify-center items-center rounded-full"
        onClick={() => {
          signIn("github");
        }}
      >
        <img src={"/icons/github.svg"} className="size-4 object-contain"></img>
      </Button>
    </div>
  );
};

export default Auth;
