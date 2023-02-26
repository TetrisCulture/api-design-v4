import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5); //the 5 makes the hash harder to guess it's a "salt" makes the hash better
};
export const createJWT = (user) => {
  // use something unique to identify something about a user -- ID 
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  //just the word bearer infront of the token --- HEADER is just another place in a request where you can add another option
  // headers are key values, the key is the name of the header, the value is the value  (meta data of a request) the information about the page 
  
  if (!bearer) {
         res.status(401);
         res.send("Not authorized");
         return;
        }
        
        const [, token] = bearer.split(" ");
        // split on a space because it will catch people that don't have "Bearer xyz" 
        if (!token) {
          console.log("here");
          res.status(401);
          res.send("Not authorized");
          return;
        }
        
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          //is it a real JWT (token) signed by JSW_SECRET ??
        req.user = payload;
        console.log(payload);
        next();
        return;
      } catch (e) { // catching so our server doesn't crash if someone doesn't put in a password
        console.error(e);
        res.status(401);
        res.send("Not authorized");
        return;
      }
    };