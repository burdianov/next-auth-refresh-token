import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {getGitHubUser} from './github-adapter';
import {databaseClient} from './database';
import {createUser, getUserByGitHubUserId} from './user-service';
import {buildTokens, setTokens} from './token-utils';
import {UserDocument} from '@shared';

const app = express();

app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(cookieParser());

app.get('/', (req, res) => res.send('api is healthy'));

app.get('/github', async (req, res) => {
  const {code} = req.query;

  const gitHubUser = await getGitHubUser(code as string);
  let user = (await getUserByGitHubUserId(gitHubUser.id)) as UserDocument;
  if (!user) {
    await createUser(gitHubUser.name, gitHubUser.id);
  }

  const {accessToken, refreshToken} = buildTokens(user);
  setTokens(res, accessToken, refreshToken);

  res.redirect(`${process.env.CLIENT_URL}/me`);
});

app.get('/refresh', async (req, res) => {});
app.get('/logout', (req, res) => {});
app.get('/logout-all', async (req, res) => {});
app.get('/me', async (req, res) => {});

async function main() {
  await databaseClient.connect();

  app.listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
}

main();
