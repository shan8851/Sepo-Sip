import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { IBM_Plex_Mono } from 'next/font/google';
import Providers from './providers';
import { headers } from 'next/headers';
import { ConnectBtn } from './components/connectButton';
import { FaCoffee, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get('cookie');

  return (
    <html lang="en" className="h-full">
      <body
        className={`${ibmPlexMono.className} h-full m-0 p-0 bg-neutral-900 text-slate-100`}
      >
        <Providers cookie={cookie}>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
            <header className="p-6">
              <ConnectBtn />
            </header>
            <main className="flex items-center justify-center p-4">
              {children}
            </main>
            <footer className="flex justify-center items-center p-4">
              <div className="flex gap-2">
                <p>Built with</p>
                <FaHeart className="text-red-400" />
                <p>and</p>
                <FaCoffee className="text-red-400" />
                <p>by</p>
                <Link
                  className="text-red-400 hover:underline hover:text-red-600"
                  href="https:x.co/shan8851"
                >
                  @Shan8851
                </Link>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
