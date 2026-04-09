import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import api from "../services/api";

const colors = ["#007BFF", "#00A86B", "#FFB347", "#66B2FF", "#DFF3FF"];

const VolunteerDashboard = () => {
  const [dashboard, setDashboard] = useState({
    stats: {
      totalDonations: 0,
      activeRequests: 0,
      completedCases: 0,
      totalUsers: 0,
    },
    categoryBreakdown: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data } = await api.get("/volunteer/dashboard");
      setDashboard(data);
    };
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout
      title="Volunteer Dashboard"
      subtitle="Review operations, analytics, and pending actions"
    >
      <div className="stat-grid">
        <StatCard title="Total Donations" value={dashboard.stats.totalDonations} />
        <StatCard title="Active Requests" value={dashboard.stats.activeRequests} />
        <StatCard title="Completed Cases" value={dashboard.stats.completedCases} />
        <StatCard title="Registered Users" value={dashboard.stats.totalUsers} />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="row-between">
            <h3>Donation Category Mix</h3>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={dashboard.categoryBreakdown}
                  dataKey="count"
                  nameKey="_id"
                  innerRadius={65}
                  outerRadius={100}
                >
                  {dashboard.categoryBreakdown.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card stack">
          <h3>Admin Actions</h3>
          <p>Manage users, verify requests, and assign donations from the admin panel.</p>
          <Link to="/admin/panel" className="btn">
            Open Admin Panel
          </Link>
          <p className="muted">
            Tip: Use search and status filters to quickly process urgent cases.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VolunteerDashboard;
