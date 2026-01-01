/**
 * Product Edit Page
 * Premium product editing form with organized sections
 * Features: Image preview, organized form sections, validation, loading states
 */

import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X, 
  Package,
  DollarSign,
  Tag,
  FileText,
  Image,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { PageHeader } from '../components/ui';

// Form Section Component - Defined OUTSIDE to prevent recreation on each render
const FormSection = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card p-6"
  >
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
    </div>
    {children}
  </motion.div>
);

// Input Field Component - Defined OUTSIDE to prevent recreation on each render
const InputField = ({ label, name, type = 'text', required = false, placeholder, value, onChange, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-field"
      {...props}
    />
  </div>
);

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
    slug: '',
    tags: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback: allow manual entry if categories API fails
      }
    };
    fetchCategories();
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setFormData({
          name: data.name || '',
          price: data.price || 0,
          image: data.image || '',
          brand: data.brand || '',
          category: data.category || '',
          countInStock: data.countInStock || 0,
          description: data.description || '',
          slug: data.slug || '',
          tags: data.tags ? data.tags.join(', ') : '',
          isActive: data.isActive ?? true,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/products/${id}`, {
        ...formData,
        tags: formData.tags.split(',').map((x) => x.trim()).filter(Boolean),
      });
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="skeleton w-10 h-10 rounded-full" />
          <div className="skeleton h-8 w-48 rounded" />
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="card p-6 space-y-6">
            <div className="skeleton h-6 w-40 rounded" />
            <div className="grid grid-cols-2 gap-6">
              <div className="skeleton h-12 rounded-xl" />
              <div className="skeleton h-12 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Edit Product"
        description={`Editing: ${formData.name || 'Untitled Product'}`}
        breadcrumb={
          <Link to="/products" className="flex items-center gap-1 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        }
      />

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Basic Information */}
        <FormSection title="Basic Information" icon={Package}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
            <InputField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="product-url-slug"
              required
            />
            <InputField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand name"
              required
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field appearance-none pr-10 cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    // Fallback options if no categories from API
                    <>
                      <option value="Apparel">Apparel</option>
                      <option value="Stable Supplies">Stable Supplies</option>
                      <option value="Horse Care">Horse Care</option>
                      <option value="Riding Gear">Riding Gear</option>
                      <option value="Accessories">Accessories</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                required
                rows={4}
                className="input-field resize-none"
              />
            </div>
          </div>
        </FormSection>

        {/* Pricing & Inventory */}
        <FormSection title="Pricing & Inventory" icon={DollarSign}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Price ($) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Count In Stock <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                required
                min="0"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Tags
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Summer, New Arrival, Best Seller"
                  className="input-field pl-10"
                />
              </div>
              <p className="text-xs text-slate-500">Separate tags with commas</p>
            </div>

            <div className="flex items-center h-full pt-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={clsx(
                    'w-12 h-7 rounded-full transition-colors duration-200',
                    formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'
                  )}>
                    <div className={clsx(
                      'absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200',
                      formData.isActive ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700 block">
                    Active Product
                  </span>
                  <span className="text-xs text-slate-500">
                    {formData.isActive ? 'Visible to customers' : 'Hidden from store'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </FormSection>

        {/* Media */}
        <FormSection title="Product Image" icon={Image}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="input-field"
              />
            </div>

            {/* Image Preview */}
            {formData.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-40 h-40"
              >
                <img
                  src={formData.image}
                  alt="Product Preview"
                  className="w-full h-full object-cover rounded-2xl border border-slate-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {!formData.image && (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
                <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 mb-1">
                  Enter an image URL above
                </p>
                <p className="text-xs text-slate-400">
                  Recommended: 800x800px or larger
                </p>
              </div>
            )}
          </div>
        </FormSection>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4"
        >
          <Link
            to="/products"
            className="btn-secondary justify-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary justify-center"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default ProductEdit;
