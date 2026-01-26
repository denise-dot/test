import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  companyName: string;
  name: string;
  phoneNumber: string;
  email: string;
}

// Email sending function (simulated for now - in production, you would integrate with a service like SendGrid, Resend, etc.)
async function sendEmail(to: string, subject: string, html: string) {
  // In a real implementation, you would use an email service here
  // For example, using Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: 'noreply@prodigy9.co', to, subject, html });
  
  console.log(`Email would be sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${html}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.companyName || !body.name || !body.phoneNumber || !body.email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send thank you email to the visitor
    const visitorEmailSubject = 'Thank you for reaching out - PRODIGY9';
    const visitorEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background-color: #f9fafb; }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PRODIGY9</h1>
            </div>
            <div class="content">
              <p>Dear ${body.name},</p>
              <p>Thank you for reaching out to PRODIGY9. We will be in touch with you within 3 working days.</p>
              <p>Best,<br>PRODIGY9</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} PRODIGY9. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail(body.email, visitorEmailSubject, visitorEmailHtml);

    // Send notification email to PRODIGY9
    const notificationEmailSubject = 'New Contact Form Submission';
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a8a; color: white; padding: 20px; }
            .content { padding: 30px; background-color: #ffffff; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #1e3a8a; }
            .field-value { margin-top: 5px; padding: 10px; background-color: #f3f4f6; border-left: 3px solid #ea580c; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p>A new contact form has been submitted:</p>
              
              <div class="field">
                <div class="field-label">Company Name:</div>
                <div class="field-value">${body.companyName}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${body.name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Phone Number:</div>
                <div class="field-value">${body.phoneNumber}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${body.email}</div>
              </div>
              
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Submitted on: ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail('denise@onifytech.com', notificationEmailSubject, notificationEmailHtml);

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
