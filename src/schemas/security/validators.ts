import { z } from "zod";

const androidPackageRegex = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/;
const appleStoreRegex =
  /^https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[^/]+\/id\d+$/;

export const packageValidator = z.string().refine(
  (val) => {
    if (androidPackageRegex.test(val)) return true;

    try {
      const url = new URL(val);
      return appleStoreRegex.test(url.href);
    } catch {
      return false;
    }
  },
  {
    message: "Enter a valid Android package name or Apple App Store URL",
  }
);
