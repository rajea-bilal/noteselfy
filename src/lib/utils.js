import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import OpenAI from 'openai';
import Tesseract from 'tesseract.js';


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

