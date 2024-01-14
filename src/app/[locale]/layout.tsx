import { AuthProvider, ThemeProvider } from '@/components';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navbar } from './_components/navbar';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

const LocaleLayout = ({ children, params: { locale } }: Props) => {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <div className="h-[100vh] dark:bg-[#1F1F1F]">
                <Navbar />
                <main className="min-h-[calc(100vh-40px)] pt-40">{children}</main>
              </div>
            </NextIntlClientProvider>
          </AuthProvider>
        </ThemeProvider>
        <ToastContainer
          // className="mt-20"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
};

export default LocaleLayout;
