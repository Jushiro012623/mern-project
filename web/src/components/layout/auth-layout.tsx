import {GridBackground} from "#/components/layout/grid-background.tsx";
import type {PropsWithChildren} from "react";

export const AuthLayout = ({children}: PropsWithChildren) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <GridBackground/>
      {children}
    </main>
  )
}
