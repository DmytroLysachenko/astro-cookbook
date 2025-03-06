import { signIn } from "auth-astro/client";
import { Button } from "../ui/button";

const PublicAuth = () => {
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        className="cursor-pointer p-1 size-8 flex justify-center items-center rounded-full hover:bg-muted/20 border-muted/40"
        onClick={() => {
          signIn("google");
        }}
      >
        <img src={"/assets/icons/google.svg"} className="object-contain" />
      </Button>

      <Button
        variant="outline"
        className="cursor-pointer p-1 size-8 flex justify-center items-center rounded-full hover:bg-muted/20 border-muted/40"
        onClick={() => {
          signIn("github");
        }}
      >
        <img src={"/assets/icons/github.svg"} className="object-contain" />
      </Button>
    </div>
  );
};

export default PublicAuth;
