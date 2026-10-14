import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  Search,
  Filter,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    farms,
    verifyFarm,
    users,
    toggleUserStatus,
    products,
    auditLogs,
    t,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'verifications' | 'users' | 'logs'>('verifications');
  const [logFilter, setLogFilter] = useState<'all' | 'warning' | 'success'>('all');

  const pendingFarms = farms.filter((f) => !f.isVerified);
  const verifiedFarms = farms.filter((f) => f.isVerified);
  const registeredFarmersCount = users.filter((u) => u.role === 'farmer').length;

  const filteredLogs = auditLogs.filter((log) => {
    if (logFilter === 'warning') return log.level === 'warning' || log.level === 'alert';
    if (logFilter === 'success') return log.level === 'success';
    return true;
  });

  return (
    <div className="py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xl shadow-xs">
            <ShieldCheck className="w-7 h-7 text-purple-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-emerald-950 font-display">
                {t.adminDashboard.title}
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                System Admin
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t.adminDashboard.subtitle} · Island Infrastructure Tier-1
            </p>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveAdminTab('verifications')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'verifications'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-neutral-600 hover:text-emerald-950'
            }`}
          >
            Farm Queue ({pendingFarms.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'users'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-neutral-600 hover:text-emerald-950'
            }`}
          >
            User Access ({users.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('logs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeAdminTab === 'logs'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-neutral-600 hover:text-emerald-950'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 font-medium">
            {t.adminDashboard.totalUsers}
          </div>
          <div className="text-2xl font-bold font-display text-emerald-950 tabular-nums">
            {users.length} Registered
          </div>
          <div className="text-[11px] text-emerald-700">All authenticated personas</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 font-medium">
            {t.adminDashboard.verifiedFarms}
          </div>
          <div className="text-2xl font-bold font-display text-emerald-950 tabular-nums">
            {verifiedFarms.length} / {farms.length}
          </div>
          <div className="text-[11px] text-emerald-700">SL-GAP & Bio verified</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 font-medium">
            {t.adminDashboard.pendingApprovals}
          </div>
          <div className="text-2xl font-bold font-display text-amber-600 tabular-nums">
            {pendingFarms.length} Pending
          </div>
          <div className="text-[11px] text-amber-700">Requires audit inspection</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 font-medium">Active Harvest Listings</div>
          <div className="text-2xl font-bold font-display text-emerald-950 tabular-nums">
            {products.length} Items
          </div>
          <div className="text-[11px] text-emerald-700">Across 8 districts</div>
        </div>
      </div>

      {/* Tab 1: Farm Verification Queue */}
      {activeAdminTab === 'verifications' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">
                {t.adminDashboard.farmVerificationQueue}
              </h3>
              <p className="text-xs text-neutral-500">
                Inspect documentation, SL-GAP agricultural certifications, and approve farms for public trading.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {farms.map((farm) => (
              <div
                key={farm.id}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={farm.imageUrl}
                    alt={farm.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-emerald-950 font-display">
                        {farm.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          farm.isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {farm.isVerified ? 'Verified Active' : 'Under Review'}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600">
                      Farmer: {farm.farmerName} · {farm.location} · {farm.phone}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Certifications: {farm.certifications.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  {farm.isVerified ? (
                    <button
                      onClick={() => verifyFarm(farm.id, false)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors cursor-pointer"
                    >
                      Revoke Verification
                    </button>
                  ) : (
                    <button
                      onClick={() => verifyFarm(farm.id, true)}
                      className="px-4 py-2 text-xs font-bold bg-[#14532D] hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>{t.adminDashboard.approve}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: User Status Management */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">
                {t.adminDashboard.userManagement}
              </h3>
              <p className="text-xs text-neutral-500">
                Grant or restrict marketplace access for customer, farmer, admin, and owner accounts.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 font-medium border-y border-neutral-200">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4 text-right">Access Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50/60">
                    <td className="py-3 px-4">
                      <div className="font-bold text-emerald-950">{user.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{user.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-semibold text-emerald-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">{user.district}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          user.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors cursor-pointer ${
                          user.status === 'active'
                            ? 'text-red-600 hover:bg-red-50 border border-red-200'
                            : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                        }`}
                      >
                        {user.status === 'active' ? t.adminDashboard.suspendUser : t.adminDashboard.activateUser}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: System Audit Logs */}
      {activeAdminTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-emerald-950 font-display">
                {t.adminDashboard.auditLogs}
              </h3>
              <p className="text-xs text-neutral-500">
                Immutable event stream for authentication, multi-farm order splits, and compliance updates.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setLogFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                  logFilter === 'all' ? 'bg-white text-emerald-950 shadow-xs' : 'text-neutral-500'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setLogFilter('warning')}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                  logFilter === 'warning' ? 'bg-white text-amber-800 shadow-xs' : 'text-neutral-500'
                }`}
              >
                Warnings & Flags
              </button>
              <button
                onClick={() => setLogFilter('success')}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                  logFilter === 'success' ? 'bg-white text-emerald-800 shadow-xs' : 'text-neutral-500'
                }`}
              >
                Success
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start justify-between gap-4 text-xs font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        log.level === 'success'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.level === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : log.level === 'alert'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className="text-[11px] text-neutral-400">{log.timestamp}</span>
                  </div>
                  <div className="text-neutral-700 font-sans text-xs">{log.details}</div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] text-neutral-500">{log.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
