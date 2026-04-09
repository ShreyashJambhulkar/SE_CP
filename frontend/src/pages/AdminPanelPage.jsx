import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

const AdminPanelPage = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "", category: "" });

  const loadData = async () => {
    const [usersRes, requestsRes, donationsRes] = await Promise.all([
      api.get("/volunteer/users", { params: { search } }),
      api.get("/volunteer/requests", { params: filters }),
      api.get("/volunteer/donations"),
    ]);

    setUsers(usersRes.data.users);
    setRequests(requestsRes.data.requests);
    setDonations(donationsRes.data.donations);
  };

  useEffect(() => {
    loadData();
  }, []);

  const eligibleDonations = useMemo(
    () => donations.filter((donation) => ["paid", "pledged"].includes(donation.status)),
    [donations]
  );

  const updateRequestStatus = async (requestId, status) => {
    await api.patch(`/volunteer/requests/${requestId}/review`, {
      status,
      adminNote: `Updated to ${status}`,
    });
    toast.success("Request updated");
    loadData();
  };

  const assignDonation = async (helpRequestId) => {
    const matched = eligibleDonations.find((d) => d.category !== "money") || eligibleDonations[0];
    if (!matched) {
      toast.error("No eligible donations available to assign");
      return;
    }

    await api.post("/volunteer/assignments", {
      donationId: matched._id,
      helpRequestId,
      note: "Auto-assigned from admin panel",
    });

    toast.success("Donation assigned and case completed");
    loadData();
  };

  return (
    <DashboardLayout title="Admin Management Panel" subtitle="Verify users, review requests, assign help">
      <div className="card form-inline">
        <input
          placeholder="Search users by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
        >
          <option value="">All categories</option>
          <option value="food">Food</option>
          <option value="financial">Financial</option>
          <option value="education">Education</option>
          <option value="essentials">Essentials</option>
        </select>
        <button className="btn" type="button" onClick={loadData}>
          Apply
        </button>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Users</h3>
          <div className="table-wrap compact">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>Available Donations</h3>
          <div className="table-wrap compact">
            <table>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eligibleDonations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation.donor?.name}</td>
                    <td>{donation.category}</td>
                    <td>{donation.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Help Requests Workflow</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Needy Person</th>
                <th>Request</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.needy?.name}</td>
                  <td>{request.title}</td>
                  <td>{request.category}</td>
                  <td>{request.status}</td>
                  <td className="action-cell">
                    <button className="btn tiny" onClick={() => updateRequestStatus(request._id, "approved")}>
                      Approve
                    </button>
                    <button
                      className="btn tiny ghost"
                      onClick={() => updateRequestStatus(request._id, "rejected")}
                    >
                      Reject
                    </button>
                    <button className="btn tiny success" onClick={() => assignDonation(request._id)}>
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanelPage;
