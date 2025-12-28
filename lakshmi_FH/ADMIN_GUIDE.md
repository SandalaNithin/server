# Admin Panel - Quick Start Guide

## 🎯 How to Access Admin Panel

**URL**: `http://localhost:3000/admin`

Simply navigate to this URL in your browser to access the admin dashboard.

---

## 🖥️ Admin Panel Features

### 1. **Filter Tabs**
- **Pending**: View all booking requests waiting for approval
- **Confirmed**: View all confirmed bookings
- **Rejected**: View all rejected bookings
- **All**: View all bookings regardless of status

### 2. **Booking Cards**
Each booking shows:
- Customer name and contact info (email, phone)
- Event details (type, guests, dates, times)
- Current status badge (Pending/Confirmed/Rejected)
- Submission timestamp
- Customer message (if provided)

### 3. **Actions** (for Pending Bookings)
- **Confirm Booking** button (Green)
  - Updates status to "confirmed"
  - Sends email to owner
  - Blocks the dates on calendar
  
- **Reject Booking** button (Red)
  - Updates status to "rejected"
  - Dates remain available
  - No email sent

---

## 📱 How to Use

### **Step 1: View Pending Bookings**
1. Go to `http://localhost:3000/admin`
2. Click on "Pending" tab (default view)
3. See all booking requests waiting for approval

### **Step 2: Confirm a Booking**
1. Review booking details
2. Click **"Confirm Booking"** button
3. Confirm the action in popup dialog
4. ✅ Success! Email sent & dates blocked

### **Step 3: Reject a Booking**
1. Review booking details
2. Click **"Reject Booking"** button
3. Confirm the action in popup dialog
4. ✅ Booking rejected

### **Step 4: View History**
- Click "Confirmed" tab to see all confirmed bookings
- Click "Rejected" tab to see all rejected bookings
- Click "All" tab to see everything

---

## 🎨 UI Features

- ✅ Real-time loading states
- ✅ Success/error notifications
- ✅ Confirmation dialogs for safety
- ✅ Responsive design (mobile-friendly)
- ✅ Color-coded status badges
- ✅ Auto-refresh after actions
- ✅ Professional, clean interface

---

## 🔐 Security Note

Currently, the admin panel is accessible to anyone who knows the URL. 

**For production**, you should add:
- Login authentication
- Password protection
- Admin role verification

---

## 🧪 Testing the Complete Flow

1. **User Side**: Go to `/booking` and submit a booking
   - Status: Pending
   - Dates: Still available

2. **Admin Side**: Go to `/admin`
   - See the pending booking
   - Click "Confirm Booking"

3. **Result**:
   - Status changes to "Confirmed"
   - Email sent to owner
   - Dates now blocked on calendar

4. **Verify**: Go back to `/booking`
   - Try to book the same dates
   - Should be blocked (red/disabled)

---

## 📊 Status Flow Diagram

```
User Submits → PENDING → Admin Reviews
                  ↓
        Admin Confirms/Rejects
                  ↓
         CONFIRMED or REJECTED
```

**PENDING**: Waiting for admin approval
**CONFIRMED**: Approved, dates blocked, email sent
**REJECTED**: Declined, dates available

---

## 🎯 Quick Access

- **User Booking**: `http://localhost:3000/booking`
- **Admin Panel**: `http://localhost:3000/admin`
- **Home Page**: `http://localhost:3000/`

---

That's it! Your admin panel is ready to use! 🎉
