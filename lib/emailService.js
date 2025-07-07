import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export const sendNewComplaintNotification = async (complaint) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: process.env.EMAIL_USER,

    to: process.env.ADMIN_EMAIL,

    subject: `New Complaint Submitted: ${complaint.title}`,
    html: `
      <h2>New Complaint Received</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Category:</strong> ${complaint.category}</p>
      <p><strong>Priority:</strong> ${complaint.priority}</p>
      <p><strong>Description:</strong> ${complaint.description}</p>
      <p><strong>Date Submitted:</strong> ${new Date(complaint.dateSubmitted).toLocaleString()}</p>
      <p><strong>Status:</strong> ${complaint.status}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('New complaint notification sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error;
  }
}

export const sendStatusUpdateNotification = async (complaint) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Complaint Status Updated: ${complaint.title}`,
    html: `
      <h2>Complaint Status Updated</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>New Status:</strong> ${complaint.status}</p>
      <p><strong>Category:</strong> ${complaint.category}</p>
      <p><strong>Priority:</strong> ${complaint.priority}</p>
      <p><strong>Date Updated:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Description:</strong> ${complaint.description}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions)
    console.log('Status update notification sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error;
  }
};
