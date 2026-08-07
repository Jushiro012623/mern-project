import {z} from 'zod'
import {SVGProps} from "react";

declare global {
  type Infer<T extends z.ZodTypeAny> = z.infer<T>;
  type SVG = SVGProps<SVGSVGElement>;
}
export {};
