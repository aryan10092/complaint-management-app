import dbConnect from '../../../../lib/mongodb';
import Complaint from '../../../../models/Complaint';
import { sendStatusUpdateNotification } from '../../../../lib/emailService';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const complaint = await Complaint.findById(id);
    
    if (!complaint) {
      return Response.json(
        { success: false, error: 'Complaint not found' },
        { status: 404 }
      )
    }
    
    return Response.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!complaint) {
      return Response.json(
        { success: false, error: 'Complaint not found' },
        { status: 404 }
      );
    }
    
    
    if (body.status) {
      try {
        await sendStatusUpdateNotification(complaint);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
       
      }
    }
    
    return Response.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const deletedComplaint = await Complaint.deleteOne({ _id: id });
    
    if (!deletedComplaint.deletedCount) {
      return Response.json(
        { success: false, error: 'Complaint not found' },
        { status: 404 }
      );
    }
    
    return Response.json({
      success: true,
      data: {},
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
