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

const LocaleLayout = ({ children, params: { locale } }: Props) => {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <div className="h-[100vh] dark:bg-[#1F1F1F]">
                <Navbar />
                <main className="h-full pt-40">{children}</main>
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
