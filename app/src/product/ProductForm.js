import { useState } from "react";

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ name: "", price: "", vendor: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ name: "", price: "", vendor: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="border w-full p-2" placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input className="border w-full p-2" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
      <input className="border w-full p-2" placeholder="Vendor Name" value={product.vendor} onChange={(e) => setProduct({ ...product, vendor: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2">Add Product</button>
    </form>
  );
};

export default ProductForm;
