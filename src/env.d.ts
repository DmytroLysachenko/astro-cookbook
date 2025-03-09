import type { TUser } from "./services/auth";

declare global {
  namespace App {
    interface Locals {
      user: TUser;
    }
  }
}

export {}; // Ensure this file is treated as a module
