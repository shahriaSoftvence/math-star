// app/[lang]/layout.tsx
import { languages } from '@/lib/languages';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang: lang.code }));
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  return children;
}