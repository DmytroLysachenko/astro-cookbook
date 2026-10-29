import { signIn } from "auth-astro/client";
import { useEffect } from "react";

import { OAUTH_PROVIDERS } from "@/constants";
import { Button } from "@/components/ui/button";

const PublicAuth = () => {
  useEffect(() => {
    const loader = document.getElementById("user-data-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <div className="flex gap-1 md:gap-2 lg:gap-3 items-center justify-end">
      {OAUTH_PROVIDERS.map(({ provider, iconPath }) => (
        <Button
          key={provider}
          variant="outline"
          className="cursor-pointer p-1 size-11 flex justify-center items-center rounded-full hover:scale-105 hover:bg-muted/20 border-muted/40 transition-transform"
          aria-label={`Sign in with ${provider}`}
          onClick={() => signIn(provider)}
        >
          <img
            src={iconPath}
            className="object-contain"
            alt=""
            width={24}
            height={24}
            loading="lazy"
          />
        </Button>
      ))}
    </div>
  );
};

export default PublicAuth;
