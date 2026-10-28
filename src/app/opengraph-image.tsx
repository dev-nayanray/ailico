import { ImageResponse } from "next/og";

export const alt = "AIlico — Discover AI. Create smarter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "38px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: "48px", fontWeight: 700, color: "#101828" }}>
            AIlico
          </div>
        </div>
        <div
          style={{
            marginTop: "42px",
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#101828",
            maxWidth: "950px",
          }}
        >
          Discover AI. Create smarter.
        </div>
        <div
          style={{
            marginTop: "26px",
            fontSize: "30px",
            color: "#475467",
            lineHeight: 1.4,
            maxWidth: "900px",
          }}
        >
          Verified AI tools, free online utilities, and expert web &amp; AI services
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              height: "8px",
              width: "180px",
              borderRadius: "4px",
              backgroundColor: "#7c3aed",
            }}
          />
          <div style={{ fontSize: "26px", color: "#667085" }}>ailico.top</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
