import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  X,
  Upload,
  Tag,
  DollarSign,
  Package,
  ImageIcon,
  Star,
  Eye,
} from "lucide-react";
import { useProduct } from "../context/productContext";
import { FaRupeeSign } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
//   const [formData, setFormData] = useState({
//     title: product?.title || "",
//     description: product?.description || "",
//     category: product?.category || "",
//     oldPrice: product?.oldPrice || "",
//     newPrice: product?.newPrice || "",
//     stock: product?.stock || "",
//     inHotDeal: product?.inHotDeal || false,
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(product?.image || "");

//   const categories = [
//     "Nuts",
//     "Dry Fruits",
//     "Seeds",
//     "Saffron",
//     "Indian Spices",
//   ];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewUrl(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await onSubmit(formData, imageFile);
//     if (result.success) {
//       onCancel();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <form>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               <Package className="w-4 h-4 inline mr-2" />
//               Product Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="Enter product title"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               <Tag className="w-4 h-4 inline mr-2" />
//               Category
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             required
//             rows={4}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             placeholder="Enter product description"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               <DollarSign className="w-4 h-4 inline mr-2" />
//               Old Price
//             </label>
//             <input
//               type="number"
//               name="oldPrice"
//               value={formData.oldPrice}
//               onChange={handleInputChange}
//               step="0.01"
//               min="0"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="0.00"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               <DollarSign className="w-4 h-4 inline mr-2" />
//               New Price
//             </label>
//             <input
//               type="number"
//               name="newPrice"
//               value={formData.newPrice}
//               onChange={handleInputChange}
//               step="0.01"
//               min="0"
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="0.00"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Stock Quantity
//             </label>
//             <input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleInputChange}
//               min="0"
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="0"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             <ImageIcon className="w-4 h-4 inline mr-2" />
//             Product Image
//           </label>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//               id="image-upload"
//               multiple='trues'
//             />
//             <label htmlFor="image-upload" className="cursor-pointer">
//               {previewUrl ? (
//                 <div className="space-y-2">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="mx-auto w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
//                   />
//                   <p className="text-sm text-gray-600">Click to change image</p>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   <Upload className="mx-auto w-12 h-12 text-gray-400" />
//                   <p className="text-gray-600">Click to upload image</p>
//                 </div>
//               )}
//             </label>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             name="inHotDeal"
//             checked={formData.inHotDeal}
//             onChange={handleInputChange}
//             className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
//           />
//           <label className="ml-3 text-sm font-semibold text-gray-700">
//             <Star className="w-4 h-4 inline mr-1 text-red-500" />
//             Mark as Hot Deal
//           </label>
//         </div>

//         <div className="flex gap-4 pt-4">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             {loading
//               ? "Processing..."
//               : product
//               ? "Update Product"
//               : "Add Product"}
//           </button>
//           <button
//             onClick={onCancel}
//             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//         {/* </div>lg font-semibold hover:bg-gray-50 transition-colors"
//         >
//           Cancel
//         </button>
//       </div> */}
//       </form>
//     </div>
//   );
// };

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    category: product?.category || "",
    oldPrice: product?.oldPrice || "",
    newPrice: product?.newPrice || "",
    stock: product?.stock || "",
    inHotDeal: product?.inHotDeal || false,
  });

  // 🔹 Multiple images state
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(product?.images || []); // in case product already has images

  const categories = [
    "Nuts",
    "Dry Fruits",
    "Seeds",
    "Saffron",
    "Indian Spices",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(files);

      // Generate preview for all selected images
      const previews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setPreviewUrls(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(formData, imageFiles); // send array
    if (result.success) {
      onCancel();
    }
  };

  return (
    <div className="space-y-6">
      <form>
        {/* --- title & category --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-2" />
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- description --- */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter product description"
          />
        </div>

        {/* --- pricing & stock --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Old Price
            </label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              New Price
            </label>
            <input
              type="number"
              name="newPrice"
              value={formData.newPrice}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0"
            />
          </div>
        </div>

        {/* --- multiple image upload --- */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Product Images
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {previewUrls.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 mx-auto"
                    />
                  ))}
                  <p className="col-span-full text-sm text-gray-600">
                    Click to change images
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto w-12 h-12 text-gray-400" />
                  <p className="text-gray-600">Click to upload images</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* --- hot deal --- */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="inHotDeal"
            checked={formData.inHotDeal}
            onChange={handleInputChange}
            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
          />
          <label className="ml-3 text-sm font-semibold text-gray-700">
            <Star className="w-4 h-4 inline mr-1 text-red-500" />
            Mark as Hot Deal
          </label>
        </div>

        {/* --- buttons --- */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading
              ? "Processing..."
              : product
              ? "Update Product"
              : "Add Product"}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // console.log("product", product);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(true);
      await onDelete(product.id);
      setIsDeleting(false);
    }
  };

  const discount =
    product.oldPrice && product.newPrice
      ? Math.round(
          ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
        )
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img
          src={
            product?.images?.length > 0
              ? product.images[0].url // first image from array
              : "/placeholder.png" // fallback if no image
          }
          alt={product?.title || "Product image"}
          className="w-full h-48 object-cover"
        />

        {product.inHotDeal && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            <Star className="w-3 h-3 inline mr-1" />
            Hot Deal
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          Stock: {product.stock}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.oldPrice}
              </span>
            )}
            <span className="text-xl font-bold text-green-600">
              ₹{product.newPrice}
            </span>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ₹{
            product.stock > 50 ? 'bg-green-100 text-green-800' :
            product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}
          >
            {product.stock > 50
              ? "In Stock"
              : product.stock > 0
              ? "Low Stock"
              : "Out of Stock"}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductManagementSystem = () => {
  const { error, addProduct, updateProduct, deleteProduct, getAllProducts } =
    useProduct();
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Nuts",
    "Dry Fruits",
    "Seeds",
    "Saffron",
    "Indian Spices",
  ];

  console.log("productsssss", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (res.success) {
          setProducts(res.products);
        } else {
          setError(res.error || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (formData, imageFile) => {
    return await updateProduct(editingProduct.id, formData, imageFile);
  };

  const totalProducts = products.length;
  const hotDeals = products.filter((p) => p.inHotDeal).length;
  const lowStock = products.filter((p) => p.stock < 10).length;
  const totalValue = products.reduce((sum, p) => sum + p.newPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your product inventory
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hot Deals</p>
                <p className="text-3xl font-bold text-red-600">{hotDeals}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600">{lowStock}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalValue.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaRupeeSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={addProduct}
          onCancel={() => setShowAddModal(false)}
          loading={loading}
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProduct(null);
        }}
        title="Edit Product"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={() => {
            setShowEditModal(false);
            setEditingProduct(null);
          }}
          loading={loading}
        />
      </Modal>

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProductManagementSystem;
