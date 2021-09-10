import type { AppProps } from 'next/app';

import 'tailwindcss/tailwind.css';

import { Navigation } from 'components/navigation';
import { UserProvider } from 'contexts/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initialUser={pageProps?.user}>
      <div className="h-screen">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
export default MyApp;
