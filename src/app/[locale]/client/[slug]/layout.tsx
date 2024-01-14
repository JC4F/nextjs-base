interface LayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Dynamic ${params.slug} `,
    description: 'Dynamic Client Components Description',
  };
}
export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
