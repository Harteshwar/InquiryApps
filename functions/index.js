const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amandeep8788@gmail.com",
    pass: "pxxi tbql sjih fvzo",
  },
});

exports.sendEmailConfirmation = functions.firestore
    .document("inquiries/{docId}")
    .onCreate((snap, context) => {
      const data = snap.data();

      // Email to the user
      const userMailOptions = {
        from: "amandeep8788@gmail.com",
        to: data.email,
        subject: "Inquiry Confirmation",
        text: `Hi ${data.name}, thank you for your inquiry.
         We will get back to you soon!`,
      };

      // Email to yourself
      const adminMailOptions = {
        from: "amandeep8788@gmail.com",
        to: "amandeep8788@gmail.com",
        subject: "Inquiry Received",
        text: `A new inquiry has been 
        received:\n\nName: ${data.name}\nEmail: 
        ${data.email}\nMessage: ${data.message}`,
      };

      // Send email to the user
      const userEmailPromise = transporter.sendMail(
          userMailOptions,
          (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent to user: %s", info.messageId);
          },
      );

      // Send email to yourself
      const adminEmailPromise = transporter.sendMail(
          adminMailOptions,
          (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent to admin: %s", info.messageId);
          },
      );

      // Wait for both email promises to resolve
      return Promise.all([userEmailPromise, adminEmailPromise]);
    });
