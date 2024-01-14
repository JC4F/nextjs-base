import { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Client Components',
  description: 'Client Components Description',
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
