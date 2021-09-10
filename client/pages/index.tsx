import { NextPage } from 'next';

import { GitHubSignIn } from 'components/github-sign-in';

const Home: NextPage = () => {
  return (
    <main className="flex items-center justify-center h-full">
      <GitHubSignIn />
    </main>
  );
};

export default Home;
