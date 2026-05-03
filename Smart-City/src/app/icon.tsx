import { ImageResponse } from "next/og";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: "#0B1220",
          color: "#38BDF8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
        }}
      >
        SC
      </div>
    ),
    {
      width: 128,
      height: 128,
    }
  );
}

