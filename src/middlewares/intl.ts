import { locales } from '@/lib';
import createIntlMiddleware from 'next-intl/middleware';

export const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
});
