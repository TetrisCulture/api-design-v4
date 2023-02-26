import app from  './server'
import * as dotenv from 'dotenv'
import config from './config'
dotenv.config() // looks into .env file, gets every environment variable and loads into your environment
// the entry file to the server is this file

app.listen(config.port, () => { 
  //has to be from the environment variable not a raw number to be able to deploy
  console.log(`hello on http://localhost:${config.port}`);
});

