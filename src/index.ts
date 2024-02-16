import initServer from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const init = async () => {
  const app = await initServer();
  const port = 8000;

  app.listen(port, () => {
    console.log(`Server started at ${port}`);
  });
};

init();
