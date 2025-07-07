# Complaint Management System

A full-stack web application for managing customer complaints with email notifications. Built with Next.js, React, MongoDB, and Node.js.

## Features

### User Interface
- **Complaint Submission Form**: Users can submit complaints with title, description, category, and priority
- **Admin Dashboard**: Administrators can view, filter, and manage all complaints
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Backend & Database
- **MongoDB Integration**: Stores complaints with comprehensive schema
- **RESTful API**: Full CRUD operations for complaint management
- **Data Validation**: Server-side validation for all inputs

### Email Notifications
- **New Complaint Alerts**: Automatic email notifications when complaints are submitted
- **Status Update Notifications**: Email alerts when complaint status changes
- **Professional Email Templates**: HTML-formatted email notifications

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Email service account (Gmail recommended)

## Installation

1. **Clone the repository** (if not already done)
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/complaint-management
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint-management

   # Email configuration (Gmail example)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@company.com
   ```

4. **Configure Email Service**:
   - For Gmail: Enable 2-factor authentication and generate an app password
   - For other services: Update the transporter configuration in `lib/emailService.js`

## Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will automatically create the database and collections

### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string and update `MONGODB_URI` in `.env.local`

## Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

## API Endpoints

### Complaints
- `GET /api/complaints` - Retrieve all complaints (with optional filtering)
- `POST /api/complaints` - Create a new complaint
- `GET /api/complaints/[id]` - Get a specific complaint
- `PUT /api/complaints/[id]` - Update a complaint
- `DELETE /api/complaints/[id]` - Delete a complaint

### Query Parameters
- `status`: Filter by complaint status (Pending, In Progress, Resolved)
- `priority`: Filter by priority level (Low, Medium, High)

## Project Structure

```
complaint-management-app/
├── app/
│   ├── api/
│   │   └── complaints/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
│   ├── components/
│   │   ├── ComplaintForm.js
│   │   └── AdminDashboard.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib/
│   ├── mongodb.js
│   └── emailService.js
├── models/
│   └── Complaint.js
├── .env.local
├── package.json
└── README.md
```

## Usage

### Submitting a Complaint
1. Navigate to the "Submit Complaint" tab
2. Fill in all required fields:
   - Complaint Title
   - Description
   - Category (Product, Service, Support)
   - Priority (Low, Medium, High)
3. Click "Submit Complaint"
4. An email notification is automatically sent to the admin

### Managing Complaints (Admin)
1. Navigate to the "Admin Dashboard" tab
2. View all complaints in the table
3. Filter complaints by status or priority
4. Update complaint status using the dropdown
5. View detailed information by clicking "View"
6. Delete complaints using the "Delete" button

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in the `EMAIL_PASS` environment variable

### Other Email Services
Modify the transporter configuration in `lib/emailService.js` to use your preferred email service (SendGrid, Mailgun, etc.).

## Customization

### Adding New Categories
Update the category options in:
- `models/Complaint.js` (enum values)
- `app/components/ComplaintForm.js` (dropdown options)

### Modifying Email Templates
Edit the HTML templates in `lib/emailService.js` to customize email appearance and content.

### Styling
- Global styles: `app/globals.css`
- Component-specific styling: Material-UI `sx` prop in components

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running and connection string is correct
2. **Email Not Sending**: Verify email credentials and app password
3. **Build Errors**: Ensure all dependencies are installed with `npm install`

### Development Mode
- The application runs in development mode with hot reloading
- API endpoints are accessible at `http://localhost:3000/api/complaints`

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Environment Variables**: Ensure all environment variables are set in your production environment

## License

This project is licensed under the MIT License.
