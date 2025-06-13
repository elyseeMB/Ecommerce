import React, { type JSX } from "react";

const type = ["line", "circle", "card", "text"] as const;
type TypeSkeleton = (typeof type)[number];

export function Skeleton({
  type = "line",
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  style = {},
  className = "",
  lines = 3,
  avatar = false,
}: {
  type?: TypeSkeleton;
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.HTMLAttributes<JSX.IntrinsicElements>["style"];
  className?: string;
  lines?: number;
  avatar?: boolean;
}) {
  const baseStyle = {
    background: "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-loading 1.5s ease-in-out infinite",
    borderRadius,
    ...style,
  };

  const styles = `
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  if (type === "circle") {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          width: "20%",
          aspectRatio: 1 / 1,
          borderRadius: "50%",
        }}
      />
    );
  }

  if (type === "text") {
    return (
      <div className={className} style={{ width: "100%" }}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            style={{
              ...baseStyle,
              width: index === lines - 1 ? "70%" : "100%",
              height: height,
              marginBottom: index === lines - 1 ? 0 : "8px",
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div
        className={className}
        style={{
          padding: "16px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          ...style,
        }}
      >
        {avatar && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                ...baseStyle,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "12px",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  ...baseStyle,
                  width: "40%",
                  height: "14px",
                  marginBottom: "6px",
                }}
              />
              <div
                style={{
                  ...baseStyle,
                  width: "60%",
                  height: "12px",
                }}
              />
            </div>
          </div>
        )}

        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            style={{
              ...baseStyle,
              width: index === lines - 1 ? "75%" : "100%",
              height: "14px",
              marginBottom: index === lines - 1 ? 0 : "8px",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        width,
        height,
      }}
    />
  );
}
