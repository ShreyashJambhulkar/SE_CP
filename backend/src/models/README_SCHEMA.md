# MongoDB Schema Notes

## Users Collection
- name, email (unique), password (hashed), role, phone, address, verificationDetails

## Donations Collection
- donor ref User, category, amount, quantity, description, status, impactMessage

## HelpRequests Collection
- needy ref User, category, title, details, urgency, status, verificationDocument, adminNote

## Transactions Collection
- donation ref Donation, donor ref User, razorpay IDs, amount, status

## Assignments Collection
- donation ref Donation, helpRequest ref HelpRequest, assignedBy ref User, note, completed
