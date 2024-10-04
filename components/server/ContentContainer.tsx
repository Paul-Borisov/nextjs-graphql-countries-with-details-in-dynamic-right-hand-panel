import { ReactNode } from "react";

export default async function ContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col gap-5 justify-center items-center h-screen">
      {children}
    </article>
  );
}
