import type { MetadataRoute } from "next";

export default function Icon(): MetadataRoute.Icon {
  return {
    type: "image/svg+xml",
    body: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        role="img"
        aria-label="Smart City"
      >
        <rect width="128" height="128" rx="24" fill="#0B1220" />
        <path
          d="M34 94V52l18-10v52H34Zm24 0V34l18-10v70H58Zm24 0V62l18-10v42H82Z"
          fill="#38BDF8"
        />
      </svg>
    ),
  };
}

