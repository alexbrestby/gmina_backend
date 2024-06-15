import 'dotenv/config';
import app from './src/app';

const PORT = process.env.PORT || 3000;

/**
 * Start the Koa server on the specified port.
 * @param {number} PORT - The port number on which the server will listen.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
