import ProductForm from "../product/ProductForm";

const VendorDashboard = ({ addProduct }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-2">Add New Product</h2>
    <ProductForm addProduct={addProduct} />
  </div>
);

export default VendorDashboard;
