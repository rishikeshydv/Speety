import SendEmail from "@/email/EmailLogic";


export default async function handler(req:any, res:any) {
    if (req.method === 'POST') {
      const { name, fromEmail, subject, category, message } = req.body;
      try {
        await SendEmail(name, fromEmail, subject, message);
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }