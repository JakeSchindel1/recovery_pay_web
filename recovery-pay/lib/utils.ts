export type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean }

export function clsx(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function twMerge(...inputs: ClassValue[]) {
  return clsx(...inputs)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(...inputs)
} 