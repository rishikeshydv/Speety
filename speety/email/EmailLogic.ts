import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


  const SendEmail = async(name:string,fromEmail:string,subject:string,message:string) => {
    try{
      let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "rishikeshadh4@gmail.com",
          // pass: "Rishikesh@123",
          clientId:"179667876609-11k4p22f9impcqqhllpit9nobeoina36.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "1//04yS9PX7rxNd5CgYIARAAGAQSNwF-L9IrUAVngalfqPSf6fj8c60Bd1Jin3yVE8tc6zTVPknDdRWEc4QFinFc4XuEtYPXHXkQ1zE"
          
        },
      });

      const mailOptions: Mail.Options = {
        from: fromEmail,
        to: "rishikeshadh4@gmail.com",
        cc: "rishikeshadh4@gmail.com",
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: ` from ${name} :  ${subject}`,
        text: message,
      };

      await transport.sendMail(mailOptions);
      console.log('Email sent');
    }
    catch(err){
      console.log("Error sending email",err);
    }

  }


export default SendEmail;
