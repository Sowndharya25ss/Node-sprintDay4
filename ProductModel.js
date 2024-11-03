const mongoose = require("mongoose");

const productSchemaRules = {
  name:{
    type:String,
    required:[true, "Please mention name of the product"]
  },
  price:{
    type:Number,
    required:[true, "Please mention price of the product"]
  },
  discountedPrice:{
    type:Number,
    validate:function() {
        this.price > this.discountedPrice
    }
  },
  category:{
    type:String,
    required:[true, "Please mention the category of the product"]
  }

};

const productSchema = new mongoose.Schema(productSchemaRules);

const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports = ProductModel;
