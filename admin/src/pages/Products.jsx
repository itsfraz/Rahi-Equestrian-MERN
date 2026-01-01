/**
 * Products Page
 * Premium product management with table and card views
 * Features: Search, filters, responsive table with mobile cards, skeleton loading
 */

import { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Package,
  Eye,
  Power,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { PageHeader, EmptyProducts, SkeletonTableRow } from '../components/ui';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      setProducts(products.filter((product) => product._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting product');
    }
  };

  const createProductHandler = async () => {
    try {
      const { data } = await api.post('/products');
      toast.success('Product created successfully');
      navigate(`/products/${data._id}/edit`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating product');
    }
  };

  // Filter products based on search and status
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && product.isActive) ||
                           (statusFilter === 'draft' && !product.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  // Stats
  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    draft: products.filter(p => !p.isActive).length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Products"
        description={`Manage your product catalog (${stats.total} total)`}
        actions={
          <button onClick={createProductHandler} className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        }
      />

      {/* Stats Pills */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={clsx(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
            statusFilter === 'all'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
          )}
        >
          All Products ({stats.total})
        </button>
        <button
          onClick={() => setStatusFilter('active')}
          className={clsx(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
            statusFilter === 'active'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          )}
        >
          Active ({stats.active})
        </button>
        <button
          onClick={() => setStatusFilter('draft')}
          className={clsx(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
            statusFilter === 'draft'
              ? 'bg-slate-500 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          Draft ({stats.draft})
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-search w-full"
          />
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="table-container"
      >
        {loading ? (
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden md:table-cell">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden lg:table-cell">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden sm:table-cell">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="skeleton w-14 h-14 rounded-xl" />
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-32 rounded" />
                        <div className="skeleton h-3 w-20 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="skeleton h-4 w-16 rounded" />
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="skeleton h-6 w-20 rounded-full" />
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="skeleton h-6 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="skeleton w-9 h-9 rounded-lg" />
                      <div className="skeleton w-9 h-9 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : filteredProducts.length === 0 ? (
          products.length === 0 ? (
            <EmptyProducts action={createProductHandler} />
          ) : (
            <div className="py-16 text-center">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
              <p className="text-sm text-slate-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                className="btn-secondary mt-4"
              >
                Clear filters
              </button>
            </div>
          )
        ) : (
          <>
            {/* Desktop Table View */}
            <table className="w-full hidden sm:table">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Product</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden md:table-cell">Price</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden lg:table-cell">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.03 }}
                      className="table-row group"
                    >
                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-slate-200 transition-colors">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {product.brand || 'No brand'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm font-bold text-slate-900">
                          ${product.price?.toFixed(2)}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="badge-neutral">
                          {product.category || 'Uncategorized'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={clsx(
                          product.isActive ? 'badge-success' : 'badge-neutral'
                        )}>
                          {product.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <Link
                            to={`/products/${product._id}/edit`}
                            className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                            title="Delete Product"
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
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-500">{product.category}</p>
                        </div>
                        <span className={clsx(
                          'flex-shrink-0',
                          product.isActive ? 'badge-success' : 'badge-neutral'
                        )}>
                          {product.isActive ? 'Active' : 'Draft'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-slate-900">
                          ${product.price?.toFixed(2)}
                        </span>
                        <div className="flex gap-1">
                          <Link
                            to={`/products/${product._id}/edit`}
                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
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
                Delete Product?
              </h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                This action cannot be undone. The product will be permanently removed.
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

export default Products;
