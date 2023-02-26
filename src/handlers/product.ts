import { nextTick } from "process"
import prisma from "../db"
// Get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {  //have to use "where" for queries in prisma
            id: req.user.id
        },
            include: {
                products: true
            }
    })
    res.json({data: user.products})
}

// Get one product --- we know what product to get because the route that was triggered had to have an ID when it requested in the request object
export const getOneProduct = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findFirst({ //findFirst/unique are querying the database in different ways 
        where: {
            id,
            belongsToId: req.user.id
        }
    })
    res.json({data: product})
}

export const createProduct = async (req, res, next) => {
    try {  
        const product = await prisma.product.create({ //since we're creating we don't use where we use data to create it
            data: {
                name: req.body.name,
                belongsToId: req.user.id
    
            }
        })
        res.json({data: product})
        
    } catch (e){
        next(e)
    }
}

export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({ // for updating stuff, we need to tell it where to find it, and what data to update it to hence where, data
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name // the name is the only thing we can update, and it's from the validator in router.ts
        }
    })
    res.json({data: updated})
}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({data: deleted})
}

