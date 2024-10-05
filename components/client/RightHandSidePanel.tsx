"use client";

import "@radix-ui/themes/styles.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, Theme } from "@radix-ui/themes";
import { ReactNode } from "react";
import useSystemDarkMode from "@/shared/hooks/useSystemDarkMode";

type Props = {
  children: ReactNode;
  className?: string;
  title: string;
  description: string;
  disableLightClosing?: boolean;
  controlToOpenDialog: ReactNode;
};

export default function RightHandSidePanel({
  children,
  className,
  title,
  description,
  disableLightClosing,
  controlToOpenDialog,
}: Props) {
  const isDarkMode = useSystemDarkMode();

  const preventLightClosing = (e: Event) => {
    if (disableLightClosing) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Theme
        className="max-h-fit m-auto"
        appearance={isDarkMode ? "dark" : "inherit"}
      >
        <Dialog.Root>
          <Dialog.Trigger>{controlToOpenDialog}</Dialog.Trigger>
          <Dialog.Content
            className={className}
            onInteractOutside={preventLightClosing}
            onEscapeKeyDown={preventLightClosing}
          >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description className="pb-5 max-w-[70vw]">
              {description}
            </Dialog.Description>
            {children}
            <Dialog.Close>
              <button
                className="hover:bg-gray-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] items-center justify-center rounded-full focus:shadow-gray-600 focus:shadow-[0_0_0_1px]"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </Theme>
    </>
  );
}
