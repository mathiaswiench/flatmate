import '@/styles/globals.css';
import { Poppins, Lato } from '@next/font/google';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import type { AppProps } from 'next/app';

// https://nextjs.org/docs/basic-features/font-optimization
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '600',
});
const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main className={`${poppins.variable} ${lato.variable}`}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}
