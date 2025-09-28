const {model} = require('../Schema/schema');

exports.get = async (req, res) => {
  try {
    const tms = await model.find({});
    res.status(200).json(tms); 
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.insert = async (req, res) => {
  try {
    const newProduct = new model(req.body); 
    const savedProduct = await newProduct.save();
     

    console.log("Inserted Product:", savedProduct);
    res.status(201).json(savedProduct); 
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
      
exports.category = (req,res)=>{
   const arr = ["electronics","jewelery","men's clothing","women's clothing"];
    res.send(arr)
}

exports.categoryOne = async(req,res)=>{  
    try {
    const tms = await model.find(req.params);
    res.status(200).json(tms);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



exports.filters = async (req, res) => {
  const { price, categories, rating } = req.body;

  const query = {};

 if (price?.min || price?.max) {
  query.price = {};
  if (price.min !== "") query.price.$gte = Number(price.min);
  if (price.max !== "") query.price.$lte = Number(price.max);
}


  if (categories && categories.length > 0) {
    query.category = { $in: categories };
  }

  if (rating !== "") {
query["rating.rate"] = { $gte: Number(rating) };  }

  try {
    const filteredProducts = await model.find(query);
    res.json({ success: true, data: filteredProducts });
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




