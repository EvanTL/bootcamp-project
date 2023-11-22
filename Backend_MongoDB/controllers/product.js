//Controllers
const Product = require('../models/products')
const { validationResult } = require('express-validator')

//REST API: We are modifying addProduct to save the image for uploading
exports.postAddProduct = (req,res,next) => {
    const {
        title,
        price,
        description,
        colors,
        featured
    } = req.body
    //const imageUrl = req.body.imageUrl {This imageURL is no longer used}
    // const price = req.body.price
    // const desc = req.body.description
    // const colors = req.body.colors

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('validasi gagal, data tidak sesuai')
        error.statusCode = 422
        throw error
    }

    if(!req.file){
        const error = new Error('Image cannot be empty')
        error.statusCode = 523
        throw error
    }

    //We are using path.replace for the new imageUrl
    const imageUrl = req.file.path.replace('\\', '/')

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        colors: colors,
        featured: featured
        // userId: req.userId
    })

    product.save()
    .then(result => {
        console.log("Product created")
        res.json({
            status: 200,
            message: "Product Created",
            data: result
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.updateProduct = (req, res, next) => {
    const productId = req.params.productId
    const newTitle = req.body.newTitle
    const newDesc = req.body.newDesc
    const newPrice = req.body.newPrice
    //const newColors = req.body.newColors
    const image = req.file ? req.file.path.replace('\\', '/') : null
    const newFeatured = req.body.newFeatured


    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('validasi gagal, data tidak sesuai')
        error.statusCode = 422
        throw error
    }

    Product.findById(productId)
    .then(product => {
        // if(userId !== product.userId.toString()){
        //     const error = new Error('Access Forbidden')
        //     error.statusCode = 403
        //     throw error
        // }

        product.title = newTitle,
        product.price = newPrice,
        product.description = newDesc,
        //product.colors = newColors,
        product.featured = newFeatured

        if(image){
            product.imageUrl = image
        }

        return product.save()

    }).then(result => {
            console.log(result)
            res.status(200).json({
                status: "Success",
                message: "Product updated",
            })
        }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })

}

exports.getProducts = (req, res, next) => {
    Product.find()
    .select('title price colors featured imageUrl _id')
    .populate('userId', 'name')
    .then(products => {
        res.json(products)
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId

    Product.findById(productId)
    .then(product => {
        if(!product){
            const error = new Error('Product not found')
                error.statusCode = 404
            throw error
        }

        Product.findByIdAndDelete(productId)
        .then(() => {
            res.status(200).json({
                status: 200,
                message: "Product Successfully Deleted"
            })
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getProductsbyUser = (req, res, next) => {
    const userId = req.params.userId

    Product.find({userId: userId})
    .populate('userId', 'name')
    .then(products => {
        if(!products){
            res.status(404).json({message: 'No items from the following user' + userId})
        }

        res.json(products)
    })
    .catch(err => console.log(err))
}

exports.getProductsbyId = (req, res, next) => {
    Product.findById(req.params.productId)
    .select('-_id')
    .populate('userId', 'name')
    .then(products => {
        res.json(products)
    })
    .catch(err => console.log(err))
}

exports.getProductsbyFilter = (req, res, next) => {
    const {search, price, colors} = req.query

    let myquery = Product.find().select('title price colors -_id')
    
    if(search){
        myquery.where('title').equals({$regex: search})
    }

    if(price){
        myquery.where('price').lte(price)
    }

    if(colors){
        myquery.where('colors').equals({$regex: colors})
    }
    myquery
    .then(products => {
        res.json(products)
    })
    .catch(err => console.log(err))
}