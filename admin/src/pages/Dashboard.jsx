/**
 * Dashboard Page
 * Premium admin dashboard with stats, charts, and recent activity
 * Features: Animated stat cards, revenue chart, recent orders panel
 */

import { useEffect, useState, useCallback } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  Calendar,
  Download,
  RefreshCw,
  ChevronRight,
  Clock
} from 'lucide-react';
import api from '../utils/api';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { StatCard, PageHeader, SkeletonStatCard, SkeletonChart } from '../components/ui';
import clsx from 'clsx';

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-slate-100">
        <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    activeProducts: 0,
    totalOrders: 156
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('7days');

  // Fetch stats from API
  const fetchStats = useCallback(async () => {
    try {
      const [usersRes, productsRes] = await Promise.all([
        api.get('/users'),
        api.get('/products')
      ]);
      
      setStats({
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.length,
        activeProducts: productsRes.data.filter(p => p.isActive).length,
        totalSales: 24580, // Mock - replace with real API when available
        totalOrders: 156  // Mock
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  // Chart Data - Weekly Revenue
  const revenueData = [
    { name: 'Mon', revenue: 4200, orders: 24 },
    { name: 'Tue', revenue: 3800, orders: 18 },
    { name: 'Wed', revenue: 5100, orders: 32 },
    { name: 'Thu', revenue: 4600, orders: 28 },
    { name: 'Fri', revenue: 6200, orders: 42 },
    { name: 'Sat', revenue: 5800, orders: 38 },
    { name: 'Sun', revenue: 4900, orders: 30 },
  ];

  // Mock recent orders data
  const recentOrders = [
    { id: '2584', customer: 'Sarah Wilson', product: 'Riding Boots Pro', amount: 189.99, time: '2 min ago', status: 'completed' },
    { id: '2583', customer: 'Mike Johnson', product: 'Leather Saddle', amount: 459.99, time: '15 min ago', status: 'processing' },
    { id: '2582', customer: 'Emily Chen', product: 'Horse Blanket', amount: 89.99, time: '1 hour ago', status: 'completed' },
    { id: '2581', customer: 'James Brown', product: 'Riding Helmet', amount: 129.99, time: '2 hours ago', status: 'completed' },
    { id: '2580', customer: 'Lisa Anderson', product: 'Grooming Kit', amount: 54.99, time: '3 hours ago', status: 'pending' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'badge-success',
      processing: 'badge-info',
      pending: 'badge-warning',
    };
    return styles[status] || 'badge-neutral';
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening with your store today."
        actions={
          <>
            {/* Date Range Selector */}
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="btn-secondary text-sm"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>

            {/* Refresh Button */}
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn-outline"
            >
              <RefreshCw className={clsx('w-4 h-4', refreshing && 'animate-spin')} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Download Report */}
            <button className="btn-primary">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <>
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
          </>
        ) : (
          <>
            <StatCard
              title="Total Revenue"
              value={`$${stats.totalSales.toLocaleString()}`}
              change={12.5}
              changeText="vs last month"
              icon={DollarSign}
              iconColor="emerald"
              delay={0}
            />
            <StatCard
              title="Total Orders"
              value={stats.totalOrders.toLocaleString()}
              change={-2.4}
              changeText="vs last month"
              icon={ShoppingBag}
              iconColor="blue"
              delay={1}
            />
            <StatCard
              title="Total Products"
              value={stats.totalProducts.toLocaleString()}
              change={5.8}
              changeText={`${stats.activeProducts} Active`}
              icon={Package}
              iconColor="sky"
              delay={2}
            />
            <StatCard
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              change={8.2}
              changeText="New this week"
              icon={Users}
              iconColor="purple"
              delay={3}
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart - Takes 2 columns */}
        {loading ? (
          <SkeletonChart className="lg:col-span-2" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 card overflow-hidden"
          >
            {/* Chart Header */}
            <div className="p-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50 to-slate-100/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Revenue Analytics</h2>
                  <p className="text-sm text-slate-500 mt-1">Daily revenue for the past week</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-sky-600" />
                    <span className="text-xs font-semibold text-slate-600">Revenue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="p-6 h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke="#e2e8f0" 
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue"
                    stroke="#0ea5e9" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Recent Orders Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50 to-slate-100/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
              <span className="badge-info text-[10px] font-bold">{stats.totalOrders} total</span>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="px-6 py-4 hover:bg-sky-50/50 transition-colors duration-150 cursor-pointer border-b border-slate-100 last:border-0 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center text-lg flex-shrink-0">
                      🛍️
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{order.customer}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-900 ml-2 flex-shrink-0">
                    ${order.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pl-13">
                  <p className="text-xs text-slate-400 truncate flex-1">
                    {order.product}
                  </p>
                  <div className="ml-2">
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 mt-auto bg-slate-50/50">
            <button className="btn-outline w-full justify-center text-sm group">
              <span>View All Orders</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6 overflow-hidden"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Top Products</h3>
            <p className="text-xs text-slate-500 font-medium">Your best sellers</p>
          </div>
          <div className="space-y-5">
            {[
              { name: 'Riding Boots Pro', sales: 124, percentage: 100 },
              { name: 'Leather Saddle', sales: 98, percentage: 79 },
              { name: 'Horse Blanket', sales: 76, percentage: 61 },
            ].map((product, index) => (
              <div key={index} className="space-y-2.5 group">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-sky-600 transition-colors">{product.name}</span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{product.sales}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.percentage}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full shadow-sm shadow-sky-500/50"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-6 overflow-hidden"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Sales by Category</h3>
            <p className="text-xs text-slate-500 font-medium">Distribution across categories</p>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Footwear', value: 4200 },
                { name: 'Saddles', value: 3100 },
                { name: 'Apparel', value: 2800 },
                { name: 'Care', value: 1900 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Sales" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-6 overflow-hidden"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Recent Activity</h3>
            <p className="text-xs text-slate-500 font-medium">Latest events and updates</p>
          </div>
          <div className="space-y-4">
            {[
              { icon: Users, text: 'New user registered', time: '2 min ago', color: 'from-blue-500 to-blue-600', bg: 'from-blue-100 to-blue-50' },
              { icon: ShoppingBag, text: 'Order #2584 placed', time: '15 min ago', color: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-100 to-emerald-50' },
              { icon: Package, text: 'Product updated', time: '1 hour ago', color: 'from-amber-500 to-amber-600', bg: 'from-amber-100 to-amber-50' },
              { icon: TrendingUp, text: 'Revenue milestone', time: '2 hours ago', color: 'from-sky-500 to-sky-600', bg: 'from-sky-100 to-sky-50' },
            ].map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 group p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className={clsx('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-sm', activity.bg)}>
                  <activity.icon className={clsx('w-5 h-5 bg-gradient-to-br bg-clip-text text-transparent', activity.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">{activity.text}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
