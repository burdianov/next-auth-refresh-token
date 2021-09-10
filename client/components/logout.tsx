import { FC } from 'react';
import router from 'next/router';
import { useUser } from 'contexts/user-context';
import { poster } from 'lib/fetcher';

export const Logout: FC = () => {
  const { user } = useUser();

  const handleLogout = async () => {
    await poster(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
    router.replace('/');
  };

  const handleLogoutAll = async () => {
    await poster(`${process.env.NEXT_PUBLIC_API_URL}/logout-all`);
    router.replace('/');
  };

  return (
    <>
      {user && (
        <div className="flex justify-center space-x-2">
          <button
            className="text-sm font-medium text-blue-500"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="text-sm text-blue-500" onClick={handleLogoutAll}>
            Logout All
          </button>
        </div>
      )}
    </>
  );
};
