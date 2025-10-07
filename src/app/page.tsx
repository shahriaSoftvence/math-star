// app/page.tsx - This handles the / route
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/de');
}