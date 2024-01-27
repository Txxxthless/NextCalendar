import type { Metadata } from 'next';
import '../../public/styles/globals.scss';
import { defaultFont } from '../lib/fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>
        {children}
        <div className="overlay"></div>
      </body>
    </html>
  );
}
