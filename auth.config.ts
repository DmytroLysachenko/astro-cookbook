import { createUser, getUser, updateUser } from "@/services/auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email } }) {
      if (!name || !email) return false;

      try {
        const existantUser = await getUser(email);

        if (existantUser) {
          await updateUser(email, { lastActive: new Date() });
          return true;
        }

        await createUser({
          name,
          email,
        });

        return true;
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
    },
  },
});
