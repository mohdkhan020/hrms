import React from "react";
import { Bell, User } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Example stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <span>Total Users</span>
          <User size={24} />
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <span>Notifications</span>
          <Bell size={24} />
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <span>Revenue</span>
          <span>$12,345</span>
        </div>
      </div>
    </div>
  );
}
