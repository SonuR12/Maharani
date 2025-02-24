// import nodemailer from 'nodemailer';

// export async function sendInvoice(email: string, invoice: { data: Buffer, contentType: string, fileName: string }) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use your email service
//     auth: {
//       user: process.env.EMAIL_USER, // Your email address
//       pass: process.env.EMAIL_PASS, // Your email password
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your Invoice',
//     text: 'Please find attached your invoice.',
//     attachments: [
//       {
//         filename: invoice.fileName,
//         content: invoice.data,
//         contentType: invoice.contentType,
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Invoice sent successfully');
//   } catch (error) {
//     console.error('Error sending invoice:', error);
//   }
// }
