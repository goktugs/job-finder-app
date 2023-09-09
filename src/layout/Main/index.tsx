import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export default function Main({ children }: MainProps) {
  return <main className="flex-1 container">{children}</main>;
}
