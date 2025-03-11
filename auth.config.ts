import { createUser, getUser, updateUser } from "@/services/auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Facebook from "@auth/core/providers/facebook";
import { defineConfig } from "auth-astro";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} from "astro:env/server";
import { imagekit } from "@/lib/image-kit";

export default defineConfig({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image } }) {
      if (!name || !email) return false;

      try {
        const existingUser = await getUser(email, "email");

        if (existingUser) {
          await updateUser(email, { lastActive: new Date() }, "email");
          return true;
        }

        if (!image) {
          await createUser({
            name,
            email,
          });

          return true;
        }

        const uploadedAvatar = await imagekit.upload({
          file: image,
          fileName: name,
          folder: "/cooking-spot/user-avatars",
        });

        await createUser({
          name,
          email,
          avatar: uploadedAvatar.filePath,
        });

        return true;
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
    },
  },
});
