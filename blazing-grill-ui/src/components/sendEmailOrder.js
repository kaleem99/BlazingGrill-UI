import emailjs from "emailjs-com";

const SendEmailOrder = (name, orderDetails, total) => {
  //   sgMail.setApiKey(
  //     "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"
  //   );
  //   const msg = {
  //     to: "kmohammad@2u.com", // recipient's email address
  //     from: "Kaleemnike1@gmail.com", // sender's email address
  //     subject: "Testing Email Subject", // email subject
  //     text: "Example plain text content", // plain text content of the email
  //     html: emailTemplate, // HTML content of the email
  //   };
  //   sgMail
  //     .send(msg)
  //     .then(() => {
  //       console.log("Email sent successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  let orderDetailsString = "";
  // foodStringData +=
  // "\n" +
  // foodOrder[i].productQuantity +
  // " x " +
  // foodOrder[i].productName +
  // "\n";
  for (let i = 0; i < orderDetails.length; i++) {
    orderDetailsString +=
      "\n" +
      orderDetails[i].productQuantity +
      " x " +
      orderDetails[i].productName +
      ": R" +
      orderDetails[i].productPrice;
  }
  const templateParams = {
    name: name,
    from_name: "The Blazing Grill",
    subject: "Hello from React App",
    message: "Your order will be ready in about 20 minutes.",
    Order_Details: orderDetailsString,
    Total: total,
    to_email: ["kmohammad@2u.com", "kaleemnike1@gmail.com"], // Replace with the recipient email address
  };
  emailjs
    .send(
      "service_uxvc1ba",
      "template_iozp1aa",
      templateParams,
      "v41Nb4FhAqVgO7UYx"
    )
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Failed to send email:", error.text);
    });
};

export default SendEmailOrder;
