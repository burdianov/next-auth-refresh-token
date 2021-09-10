import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { fetcherSSR } from 'lib/fetcher-ssr';
import { environment } from './../lib/environment';
import { useUser } from 'contexts/user-context';
import { Logout } from 'components/logout';

const MeSSR: FC = () => {
  const { user } = useUser();

  return (
    <main className="flex items-center justify-center h-full">
      <div className="space-y-4 text-center">
        <h1 className="px-4 py-2 text-lg font-medium bg-gray-200 rounded">
          Server side authentication
        </h1>
        <p>Hi, {user!.name}!</p>
        <Logout />
      </div>
    </main>
  );
};

export default MeSSR;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const [error, user] = await fetcherSSR(req, res, `${environment.apiUrl}/me`);

  if (!user) {
    return { redirect: { statusCode: 307, destination: '/' } };
  }

  return { props: { user } };
};
