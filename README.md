# NGO Management System (Full-Stack MERN)

Production-ready academic project with three role-based user flows:
- Donor
- Needy Person
- Volunteer (Admin)

## 1. Tech Stack

- Frontend: React + Vite + React Router + Recharts + React Icons
- Backend: Node.js + Express + JWT + bcrypt
- Database: MongoDB + Mongoose
- Payments: Razorpay
- File Upload: Multer (verification documents)

## 2. Project Structure

```text
Project/
  backend/
    src/
      config/
      constants/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    uploads/
    .env.example
    package.json
  frontend/
    src/
      components/
      context/
      pages/
      services/
      styles/
      utils/
      App.jsx
      main.jsx
    .env.example
    index.html
    package.json
    vite.config.js
  .gitignore
  README.md
```

## 3. Features Implemented

### Donor
- Secure register/login
- Donation categories: money, food, education, clothes, essentials
- Prompt flow: "What would you like to contribute?"
- Razorpay order creation and payment verification for money donations
- Donation history + impact mapping

### Needy Person
- Secure register/login
- Request help in categories: food, financial, education, essentials
- Upload verification documents (image/pdf)
- Track request statuses (pending, approved, rejected, fulfilled)

### Volunteer (Admin)
- Dashboard analytics: total donations, active requests, completed cases, total users
- Manage users
- Review requests (approve/reject)
- Assign donations to requests
- Search and filter admin data

### Security
- JWT authentication
- bcrypt password hashing
- Role-based authorization middleware
- Protected REST endpoints

## 4. Database Models

- `User`
- `Donation`
- `HelpRequest`
- `Transaction`
- `Assignment`

## 5. Setup Instructions (Local)

### Prerequisites
- Node.js 18+
- MongoDB local or cloud URI
- Razorpay test account keys

### Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ngo_management
JWT_SECRET=replace_with_long_random_secret
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

### Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

Start frontend:

```bash
npm run dev
```

App URLs:
- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/public/health

## 6. Seed Sample Data

From backend folder:

```bash
npm run seed
```

Sample users:
- Donor: donor@example.com / password123
- Needy: needy@example.com / password123
- Volunteer: volunteer@example.com / password123

## 7. API Documentation

Complete endpoint reference available in:
- `backend/API_DOCUMENTATION.md`

## 8. Notes for Project Submission

- This system is modular and ready for extension (email notifications, real-time sockets, OTP verification).
- Use Razorpay test mode keys for demo.
- If payment popup fails in localhost, ensure internet access and valid Razorpay key.
