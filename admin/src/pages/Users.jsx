/**
 * Users Page
 * Premium user management with responsive table
 * Features: Search, role badges, avatar placeholders, mobile cards
 */

import { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { 
  Trash2, 
  Search, 
  Users as UsersIcon, 
  Shield, 
  User,
  MoreVertical,
  Mail,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { PageHeader, EmptyUsers } from '../components/ui';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted successfully');
      setUsers(users.filter((user) => user._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting user');
    }
  };

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Stats
  const stats = {
    total: users.length,
    admins: users.filter(u => u.isAdmin).length,
    regular: users.filter(u => !u.isAdmin).length
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    return parts.length > 1 
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  // Random avatar colors
  const avatarColors = [
    'from-primary-400 to-primary-600',
    'from-emerald-400 to-emerald-600',
    'from-amber-400 to-amber-600',
    'from-rose-400 to-rose-600',
    'from-violet-400 to-violet-600',
    'from-cyan-400 to-cyan-600',
  ];

  const getAvatarColor = (id) => {
    const index = id.charCodeAt(id.length - 1) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Users"
        description={`Manage user accounts and permissions (${stats.total} total)`}
      />

      {/* Stats Pills */}
      <div className="flex flex-wrap gap-3">
        <div className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white">
          <UsersIcon className="w-4 h-4 inline-block mr-2" />
          All Users ({stats.total})
        </div>
        <div className="px-4 py-2 rounded-xl text-sm font-medium bg-primary-50 text-primary-700">
          <Shield className="w-4 h-4 inline-block mr-2" />
          Admins ({stats.admins})
        </div>
        <div className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 text-slate-600">
          <User className="w-4 h-4 inline-block mr-2" />
          Regular ({stats.regular})
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-search w-full"
        />
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="table-container"
      >
        {loading ? (
          // Skeleton Loading
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden md:table-cell">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden sm:table-cell">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="skeleton w-10 h-10 rounded-full" />
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-32 rounded" />
                        <div className="skeleton h-3 w-20 rounded md:hidden" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="skeleton h-4 w-40 rounded" />
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="skeleton h-6 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <div className="skeleton w-9 h-9 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : filteredUsers.length === 0 ? (
          users.length === 0 ? (
            <EmptyUsers />
          ) : (
            <div className="py-16 text-center">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No users found</h3>
              <p className="text-sm text-slate-500">
                Try adjusting your search to find what you're looking for.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="btn-secondary mt-4"
              >
                Clear search
              </button>
            </div>
          )
        ) : (
          <>
            {/* Desktop Table */}
            <table className="w-full hidden sm:table">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden md:table-cell">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left hidden lg:table-cell">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.03 }}
                      className="table-row group"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className={clsx(
                            'w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-md',
                            getAvatarColor(user._id)
                          )}>
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 md:hidden">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <a 
                          href={`mailto:${user.email}`} 
                          className="text-sm text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </a>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {user.isAdmin ? (
                          <span className="badge-info">
                            <Shield className="w-3.5 h-3.5" />
                            Admin
                          </span>
                        ) : (
                          <span className="badge-neutral">
                            <User className="w-3.5 h-3.5" />
                            User
                          </span>
                        )}
                      </td>

                      {/* ID */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <code className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded font-mono">
                          ...{user._id.slice(-6)}
                        </code>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setDeleteConfirm(user._id)}
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                            title="Delete User"
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
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      'w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold shadow-md',
                      getAvatarColor(user._id)
                    )}>
                      {getInitials(user.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {user.name}
                        </h3>
                        {user.isAdmin ? (
                          <span className="badge-info flex-shrink-0">Admin</span>
                        ) : (
                          <span className="badge-neutral flex-shrink-0">User</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => setDeleteConfirm(user._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
                Delete User?
              </h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                This action cannot be undone. The user account will be permanently removed.
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

export default Users;
