/**
 * Categories Page
 * Premium category management with table view
 * Features: Search, CRUD operations, responsive table with mobile cards
 */

import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  FolderTree,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  Loader2,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { PageHeader } from '../components/ui';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true,
    displayOrder: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories/admin');
      setCategories(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      isActive: true,
      displayOrder: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      description: category.description || '',
      image: category.image || '',
      isActive: category.isActive ?? true,
      displayOrder: category.displayOrder || 0,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      isActive: true,
      displayOrder: 0,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingCategory) {
        // Update existing category
        await api.put(`/categories/${editingCategory._id}`, formData);
        toast.success('Category updated successfully');
      } else {
        // Create new category
        await api.post('/categories', formData);
        toast.success('Category created successfully');
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted successfully');
      setCategories(categories.filter((cat) => cat._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting category');
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Categories"
        description={`Manage your product categories (${categories.length} total)`}
        actions={
          <button onClick={openCreateModal} className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        }
      />

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-search w-full"
          />
        </div>
      </div>

      {/* Categories Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="table-container"
      >
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-16 text-center">
            <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {categories.length === 0 ? 'No categories yet' : 'No results found'}
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              {categories.length === 0 
                ? 'Create your first category to organize products.' 
                : 'Try adjusting your search.'}
            </p>
            {categories.length === 0 && (
              <button onClick={openCreateModal} className="btn-primary">
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <table className="w-full hidden sm:table">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden md:table-cell">Description</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Order</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredCategories.map((category, index) => (
                    <motion.tr
                      key={category._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.03 }}
                      className="table-row group"
                    >
                      {/* Category Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-slate-200 transition-colors">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary-50">
                                <FolderTree className="w-5 h-5 text-primary-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                              {category.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {category.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-slate-600 truncate max-w-xs">
                          {category.description || '-'}
                        </p>
                      </td>

                      {/* Order */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-slate-700">
                          {category.displayOrder || 0}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={clsx(
                          category.isActive ? 'badge-success' : 'badge-neutral'
                        )}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                            title="Edit Category"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(category._id)}
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-slate-100">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-50">
                          <FolderTree className="w-6 h-6 text-primary-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 truncate">
                            {category.name}
                          </h3>
                          <p className="text-xs text-slate-500">{category.slug}</p>
                        </div>
                        <span className={clsx(
                          'flex-shrink-0',
                          category.isActive ? 'badge-success' : 'badge-neutral'
                        )}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-500">
                          Order: {category.displayOrder || 0}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(category._id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={submitHandler} className="p-6 space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    required
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Optional description..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="input-field"
                  />
                </div>

                {/* Display Order */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    min="0"
                    className="input-field"
                  />
                  <p className="text-xs text-slate-500">Lower numbers appear first</p>
                </div>

                {/* Active Toggle */}
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
                  <span className="text-sm font-medium text-slate-700">
                    Active Category
                  </span>
                </label>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-secondary flex-1 justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary flex-1 justify-center"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{editingCategory ? 'Update' : 'Create'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-center mb-2">
                Delete Category?
              </h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                This action cannot be undone. Products in this category may need to be reassigned.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteHandler(deleteConfirm)}
                  className="btn-danger flex-1"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
