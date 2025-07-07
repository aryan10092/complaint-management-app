import dbConnect from '../../../lib/mongodb';
import Complaint from '../../../models/Complaint';
import { sendNewComplaintNotification } from '../../../lib/emailService';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const complaints = await Complaint.find(filter).sort({ dateSubmitted: -1 });
    
    return Response.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const complaint = await Complaint.create(body);
    
    
    try {
      await sendNewComplaintNotification(complaint);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      
    }
    
    return Response.json({
      success: true,
      data: complaint,
    }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
