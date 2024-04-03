import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


  const SendEmail = async(name:string,fromEmail:string,subject:string,message:string) => {
    try{
      let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "",
          // pass: "",
          clientId:"",
          clientSecret: "",
          refreshToken: ""
          
        },
      });

      const mailOptions: Mail.Options = {
        from: fromEmail,
        to: "",
        cc: "",
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
