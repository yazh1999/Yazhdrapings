import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 changed the default for `images.qualities` from "allow anything"
     * to `[75]` only. Any <Image quality={70}> without this list throws at
     * request time, which is easy to miss because it builds clean.
     *
     * 68 is for the hero, which is a full-bleed photograph where the bytes
     * actually matter on 4G. 75 is the default everywhere else.
     */
    qualities: [68, 75, 90],
  },
};

export default nextConfig;
