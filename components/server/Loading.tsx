import { ReactNode } from "react";

export default function Loading({ content }: { content?: ReactNode }) {
  return <div className="italic">{content ? content : "Loading..."}</div>;
}
