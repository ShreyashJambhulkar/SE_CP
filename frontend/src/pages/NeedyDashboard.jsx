import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import api from "../services/api";

const NeedyDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await api.get("/needy/requests");
      setRequests(data.requests);
    };
    fetchRequests();
  }, []);

  const active = requests.filter((r) => ["pending", "verified", "approved"].includes(r.status)).length;
  const fulfilled = requests.filter((r) => r.status === "fulfilled").length;

  return (
    <DashboardLayout title="Needy Dashboard" subtitle="Track your submitted support requests">
      <div className="stat-grid">
        <StatCard title="Total Requests" value={requests.length} />
        <StatCard title="Active Requests" value={active} />
        <StatCard title="Completed Support" value={fulfilled} />
      </div>

      <div className="card row-between">
        <div>
          <h3>Need more support?</h3>
          <p>Create a new request and upload verification details.</p>
        </div>
        <Link className="btn" to="/request-help">
          Request Help
        </Link>
      </div>

      <div className="card">
        <h3>Request Status Timeline</h3>
        {requests.length === 0 ? (
          <EmptyState title="No requests submitted" text="Submit your first help request." />
        ) : (
          <div className="list-grid">
            {requests.map((request) => (
              <article className="mini-card" key={request._id}>
                <div className="row-between">
                  <h4>{request.title}</h4>
                  <span className={`badge ${request.status}`}>{request.status}</span>
                </div>
                <p>{request.details}</p>
                <small>
                  Category: {request.category} | Urgency: {request.urgency}
                </small>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NeedyDashboard;
