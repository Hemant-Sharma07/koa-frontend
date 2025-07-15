// ProductContext.js - Updated with Cloudinary
import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";

// Create Context
const ProductContext = createContext();

// Custom hook to use the context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

// Product Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Collection reference
  const productsCollection = collection(db, "products");

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = "dbvujzfl2";
  const CLOUDINARY_UPLOAD_PRESET = "products_preset";

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check if user is authenticated
  const checkAuth = () => {
    if (!user) {
      setError("You must be logged in to perform this action");
      return false;
    }
    return true;
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // "products_preset"
      formData.append("folder", "products"); // optional

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to upload image to Cloudinary"
        );
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  };

  // Delete image from Cloudinary
  const deleteFromCloudinary = async (publicId) => {
    try {
      // This requires server-side implementation for security
      // For now, we'll just skip deletion
      console.log(
        "Image deletion from Cloudinary requires server-side implementation"
      );
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
    }
  };

  // Add Product with Cloudinary upload
  const addProduct = async (productData, imageFile = null) => {
    // if (!checkAuth()) return { success: false, error: 'Authentication required' };

    try {
      setLoading(true);
      setError(null);

      let imageUrl = "";
      let imagePublicId = "";

      // Upload image if provided
      if (imageFile) {
        try {
          // Validate file type
          if (!imageFile.type.startsWith("image/")) {
            throw new Error("Please select a valid image file");
          }

          // Validate file size (10MB limit)
          if (imageFile.size > 10 * 1024 * 1024) {
            throw new Error("Image size must be less than 10MB");
          }

          const uploadResult = await uploadToCloudinary(imageFile);
          imageUrl = uploadResult.url;
          imagePublicId = uploadResult.publicId;
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      // Prepare product data
      const productToAdd = {
        title: productData.title || "",
        description: productData.description || "",
        category: productData.category || "",
        oldPrice: parseFloat(productData.oldPrice) || 0,
        newPrice: parseFloat(productData.newPrice) || 0,
        stock: parseInt(productData.stock) || 0,
        inHotDeal: productData.inHotDeal || false,
        image: imageUrl,
        imagePublicId: imagePublicId, // Store for future deletion
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
      };

      // Add to Firestore
      const docRef = await addDoc(productsCollection, productToAdd);

      // Update local state
      const newProduct = { id: docRef.id, ...productToAdd };
      setProducts((prev) => [...prev, newProduct]);

      return { success: true, id: docRef.id, product: newProduct };
    } catch (err) {
      setError(err.message);
      console.error("Error adding product:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get All Products
  const getAllProducts = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let q = query(productsCollection);

      // Apply filters
      if (filters.category) {
        q = query(q, where("category", "==", filters.category));
      }
      if (filters.inHotDeal) {
        q = query(q, where("inHotDeal", "==", true));
      }
      if (filters.isActive !== undefined) {
        q = query(q, where("isActive", "==", filters.isActive));
      }
      if (filters.orderBy) {
        q = query(q, orderBy(filters.orderBy, filters.orderDirection || "asc"));
      }
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
      return { success: true, products: productsData };
    } catch (err) {
      setError(err.message);
      console.error("Error getting products:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get Single Product
  const getProduct = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const product = { id: docSnap.id, ...docSnap.data() };
        return { success: true, product };
      } else {
        return { success: false, error: "Product not found" };
      }
    } catch (err) {
      setError(err.message);
      console.error("Error getting product:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update Product with Cloudinary
  const updateProduct = async (productId, updates, newImageFile = null) => {
    if (!checkAuth())
      return { success: false, error: "Authentication required" };

    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, "products", productId);
      let imageUrl = updates.image;
      let imagePublicId = updates.imagePublicId;

      // Handle image upload if new image provided
      if (newImageFile) {
        try {
          // Delete old image if exists
          if (updates.imagePublicId) {
            await deleteFromCloudinary(updates.imagePublicId);
          }

          // Upload new image
          const uploadResult = await uploadToCloudinary(newImageFile);
          imageUrl = uploadResult.url;
          imagePublicId = uploadResult.publicId;
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      // Prepare update data
      const updateData = {
        ...updates,
        image: imageUrl,
        imagePublicId: imagePublicId,
        updatedAt: serverTimestamp(),
      };

      // Clean up undefined values
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      // Update in Firestore
      await updateDoc(docRef, updateData);

      // Update local state
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, ...updateData, id: productId }
            : product
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error("Error updating product:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    if (!checkAuth())
      return { success: false, error: "Authentication required" };

    try {
      setLoading(true);
      setError(null);

      // Get product first to delete image
      const productResult = await getProduct(productId);
      if (productResult.success && productResult.product.imagePublicId) {
        await deleteFromCloudinary(productResult.product.imagePublicId);
      }

      // Delete from Firestore
      const docRef = doc(db, "products", productId);
      await deleteDoc(docRef);

      // Update local state
      setProducts((prev) => prev.filter((product) => product.id !== productId));

      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error("Error deleting product:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update Stock
  const updateStock = async (productId, stockChange) => {
    if (!checkAuth())
      return { success: false, error: "Authentication required" };

    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, "products", productId);

      // Use increment to atomically update stock
      await updateDoc(docRef, {
        stock: increment(stockChange),
        updatedAt: serverTimestamp(),
      });

      // Update local state
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, stock: product.stock + stockChange }
            : product
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error("Error updating stock:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get Hot Deal Products
  const getHotDealProducts = async (limitCount = 10) => {
    try {
      setLoading(true);
      setError(null);

      const q = query(
        productsCollection,
        where("inHotDeal", "==", true),
        where("isActive", "==", true),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const hotDeals = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, products: hotDeals };
    } catch (err) {
      setError(err.message);
      console.error("Error getting hot deals:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Toggle Hot Deal Status
  const toggleHotDeal = async (productId, isHotDeal) => {
    if (!checkAuth())
      return { success: false, error: "Authentication required" };

    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, {
        inHotDeal: isHotDeal,
        updatedAt: serverTimestamp(),
      });

      // Update local state
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, inHotDeal: isHotDeal }
            : product
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error("Error toggling hot deal:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get Products by Category
  const getProductsByCategory = async (category, limitCount = 20) => {
    try {
      setLoading(true);
      setError(null);

      const q = query(
        productsCollection,
        where("category", "==", category),
        where("isActive", "==", true),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const categoryProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, products: categoryProducts };
    } catch (err) {
      setError(err.message);
      console.error("Error getting products by category:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Search Products
  const searchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);

      const q = query(
        productsCollection,
        where("isActive", "==", true),
        orderBy("title")
      );

      const querySnapshot = await getDocs(q);
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter products that contain the search term
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return { success: true, products: filteredProducts };
    } catch (err) {
      setError(err.message);
      console.error("Error searching products:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    products,
    loading,
    error,
    user,
    authLoading,
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    getHotDealProducts,
    toggleHotDeal,
    getProductsByCategory,
    searchProducts,
    setError,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
