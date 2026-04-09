import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import api from "../services/api";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const { data } = await api.get("/donor/donations");
      setDonations(data.donations);
    };
    fetchDonations();
  }, []);

  const stats = useMemo(() => {
    const moneyTotal = donations
      .filter((d) => d.category === "money")
      .reduce((sum, item) => sum + (item.amount || 0), 0);
    const impacted = donations.filter((d) => d.impact).length;

    return {
      count: donations.length,
      moneyTotal,
      impacted,
    };
  }, [donations]);

  const chartData = useMemo(() => {
    const map = {};
    donations.forEach((d) => {
      map[d.category] = (map[d.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [donations]);

  return (
    <DashboardLayout
      title="Donor Dashboard"
      subtitle="Track your donation history and social impact"
    >
      <div className="stat-grid">
        <StatCard title="Total Donations" value={stats.count} />
        <StatCard title="Money Contributed" value={`INR ${stats.moneyTotal}`} />
        <StatCard title="Completed Impact Cases" value={stats.impacted} />
      </div>

      <div className="section-row">
        <div className="card">
          <div className="row-between">
            <h3>Donation Analytics</h3>
            <Link className="btn small" to="/donate">
              New Donation
            </Link>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#007BFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Donation History</h3>
        {donations.length === 0 ? (
          <EmptyState title="No donations yet" text="Create your first donation from the donation page." />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation.category}</td>
                    <td>{donation.description}</td>
                    <td>{donation.status}</td>
                    <td>{donation.impact ? donation.impact.title : "Not assigned yet"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;
