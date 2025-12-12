import type { TUser } from "./services/auth";

declare global {
  namespace App {
    interface Locals {
      user?: TUser;
    }
  }

  interface ImportMetaEnv {
    readonly PLAYWRIGHT_TEST_USER_ID?: string;
    readonly PLAYWRIGHT_TEST_USER_NAME?: string;
    readonly PLAYWRIGHT_TEST_USER_EMAIL?: string;
    readonly PLAYWRIGHT_TEST_USER_BIO?: string;
    readonly PLAYWRIGHT_TEST_USER_AVATAR?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
