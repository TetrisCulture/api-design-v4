import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import {protect} from './modules/auth'
import { createNewUser, signin } from './handlers/user'
const app = express();

app.use(cors())
app.use(morgan('dev')) // this just means, we're using morgan (middleware) for the entire app, instead of mounting it to a path
// every request that comes into the api goes through morgan first -> it just console logs and calls next()
// next is always different depending on what the request is.

app.use(express.json()) // middleware that allows the client to send us json back so we don't have to convert everthing
app.use(express.urlencoded({extended: true})) // puts a url into an object?

app.use((req, res, next) => { //custom middleware, any request that's registered after this will not have access to req.shh_secret
  req.shhh_secret = 'doggy'
  next()
})




app.get("/", (req, res, next) => { //handlers only use next when they have to pass an error, might need to with asynchronous errors
  res.json({message: 'hello'})
});


app.use('/api', protect, router) 
// the route now has /api then router after, router is kidna like a component for routes it's reusable and separate to app
// now protects the whole router using the protect function inside auth.ts, rejects anything that doesn't have a bearer token

app.post('/user', createNewUser)
app.post('/signin', signin)

// ERROR HANDLERS HAVE TO GO BELOW ALL THE ROUTES SO IT CAN CATCH IT
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(404);
    res.json({ message: "nope" });
  }
});

export default app

// can use ORM to interact with the database
