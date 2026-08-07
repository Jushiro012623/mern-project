import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {z} from 'zod'
import type {$ZodError} from "zod/v4/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function flattenError<T>(result: $ZodError<T>) {
  return z.flattenError(result)
}
