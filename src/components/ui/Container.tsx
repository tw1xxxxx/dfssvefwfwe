import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">{children}</div>;
}

