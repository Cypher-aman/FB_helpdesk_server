import initServer from './app';

const init = async () => {
  const app = await initServer();
  const port = 8000;

  app.listen(port, () => {
    console.log(`Server started at ${port}`);
  });
};

init();
