import { ROLE, RouteWithRoles } from '@/constants';
import { i18n } from '@/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { clsx, type ClassValue } from 'clsx';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findRolesForPath = (inputPath: string): ROLE[] | null => {
  const route = RouteWithRoles.find((route) => {
    const regex = new RegExp(`^${route.path}$`);
    return regex.test(inputPath);
  });

  return route ? route.roles : null;
};

export const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-locale matcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
};
