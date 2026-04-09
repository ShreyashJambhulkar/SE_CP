# NGO Management REST API

Base URL: `http://localhost:5000/api`

## Public

### GET `/public/health`
- Returns API status.

## Auth

### POST `/auth/register`
Body:
```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor",
  "phone": "9000000000",
  "address": "Delhi",
  "verificationDetails": {
    "governmentId": "ID123",
    "incomeRange": "Below 10000",
    "familySize": 4,
    "notes": "optional"
  }
}
```

### POST `/auth/login`
Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### GET `/auth/me`
- Protected
- Header: `Authorization: Bearer <token>`

## Donor (role: donor)

### POST `/donor/donations`
Body:
```json
{
  "category": "money",
  "amount": 500,
  "quantity": 1,
  "description": "Emergency support"
}
```

### GET `/donor/donations`
- Returns donor history with impact mapping.

### POST `/donor/payments/order`
Body:
```json
{
  "donationId": "<donation_object_id>"
}
```
- Creates Razorpay order.

### POST `/donor/payments/verify`
Body:
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "donationId": "<donation_object_id>"
}
```
- Verifies payment and marks donation paid.

## Needy (role: needy)

### POST `/needy/requests`
- `multipart/form-data`
- Fields:
  - `category`
  - `title`
  - `details`
  - `urgency`
  - `verificationDocument` (optional file)

### GET `/needy/requests`
- Returns own requests and statuses.

## Volunteer (role: volunteer)

### GET `/volunteer/dashboard`
- Returns analytics stats and donation breakdown.

### GET `/volunteer/users?role=&search=`
- Returns users with optional filters.

### GET `/volunteer/requests?status=&category=`
- Returns help requests with needy profile.

### PATCH `/volunteer/requests/:requestId/review`
Body:
```json
{
  "status": "approved",
  "adminNote": "Verified documents"
}
```

### GET `/volunteer/donations?category=&status=&search=`
- Returns donation list.

### POST `/volunteer/assignments`
Body:
```json
{
  "donationId": "<donation_id>",
  "helpRequestId": "<request_id>",
  "note": "Assigned by volunteer"
}
```
- Assigns donation and marks request fulfilled.

## Auth Header

Use this header on protected routes:

```text
Authorization: Bearer <JWT_TOKEN>
```
