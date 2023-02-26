import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator";
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product';
import { getUpdates, getOneUpdate, updateUpdate, deleteUpdate, createUpdate  } from './handlers/update';
import {handleInputErrors} from './modules/middleware'
const router = Router()
/**
 * Product
 */

router.get("/product", getProducts);
  
  router.get("/product/:id", (req, res) => {
    res.json({data: {
      name: "eli"
    }})
  });
  // for the line below, check to see that they actually posted a body object with a name field on it that's a string, then check to make sure
  // that that's true, and then run the handler. also there's an authentication middleware that's running infront of all of that
  // in server.ts, the app.use protect, all that's happening before it gets to the handler, then when it gets to the handler we can 
  // focus on the business logic.
  router.post("/product", body('name').isString(), handleInputErrors, createProduct);
  
  router.put("/product/:id", body('name').isString(), handleInputErrors, (req, res) => { //this is saying, req.body should have a field on it called name...
    
  }); 
  
  router.delete("/product/:id", deleteProduct);
  
  /**
   * Update
   */
  
  router.get("/update", getUpdates);
  
  router.get("/update/:id", getOneUpdate);
  
  router.post("/update", 
   body('title').exists().isString(), 
   body('body').exists().isString(), 
   body('productId').isString(),
  createUpdate
  );
  
  router.put("/update/:id",
   body('title').optional(), 
   body('body').optional(),
   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
   body('version').optional(),
   updateUpdate
   );
  
  router.delete("/update/:id", deleteUpdate);
  
  /**
   * UpdatePoint
   */
  
  router.get("/updatepoint", (req, res) => {});
  
  router.get("/updatepoint/:id", (req, res) => {});
  
  router.post("/updatepoint", 
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  (req, res) => {});
  
  router.put("/updatepoint/:id",
   body('name').optional().isString(),
   body('description').optional().isString(),
   (req, res) => {});
  
  router.delete("/updatepoint/:id", (req, res) => {});

  router.use((err, req, res, next)  => {
    console.log(err)
    res.json({message: 'in router handler'})
  })
  
  export default router;