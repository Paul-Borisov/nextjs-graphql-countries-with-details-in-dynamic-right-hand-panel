import * as css from "./shimmer.module.css";
import React, { ReactNode } from "react";

type ShimmerProps = {
  children: ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
};

const styles = css.default;

export default function Shimmer({
  children,
  width = "80vw",
  height = "50vh",
  borderRadius = "1em",
}: ShimmerProps) {
  return (
    <div
      className={styles.shimmer}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      {children}
    </div>
  );
}
