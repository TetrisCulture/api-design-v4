import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res, next) => { // all databse queries are async
  try {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({        // create is a post request 
    data: {
      username: req.body.username, //where did we get this username from? the property on prisma.user.create , we got it from request.body
      password: hash,
    },
  });
  const token = createJWT(user);
  res.json({ token });
} catch (e) {
  
e.type = 'input' 
next(e)
}

 
};

export const signin = async (req, res) => {
 
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};