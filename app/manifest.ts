import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHEF — DJ / No Set Menu",
    short_name: "SHEF",
    description: "Official site for Vietnamese–Australian DJ SHEF.",
    start_url: "/",
    display: "standalone",
    background_color: "#100d0c",
    theme_color: "#100d0c",
    icons: [
      {
        src: "/images/shef-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
