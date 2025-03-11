import { signIn } from "auth-astro/client";
import { Button } from "../ui/button";
import { OAUTH_PROVIDERS } from "@/constants";

const PublicAuth = () => {
  return (
    <div className="flex gap-1 md:gap-2 lg:gap-3 items-center justify-end">
      {OAUTH_PROVIDERS.map(({ provider, iconPath }) => (
        <Button
          key={provider}
          variant="outline"
          className="cursor-pointer p-1 size-7 md:size-8 lg:size-10 flex justify-center items-center rounded-full hover:scale-105 hover:bg-muted/20 border-muted/40 transition-all"
          onClick={() => signIn(provider)}
        >
          <img
            src={iconPath}
            className="object-contain"
            alt={`${provider} icon`}
          />
        </Button>
      ))}
    </div>
  );
};

export default PublicAuth;
