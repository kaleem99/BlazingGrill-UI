import emailjs from "emailjs-com";

const SendEmailOrder = (
  name,
  orderDetails,
  total,
  userEmail,
  storeEmail,
  uniqueOrderNum,
  address,
  time
) => {
  let orderDetailsString = "";

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
    message: `Your order will be ready in about ${time} minutes.`,
    uniqueOrderNum: uniqueOrderNum,
    Order_Details: orderDetailsString,
    Total: total,
    Address: address.split(" ").join("\n"),
    to_email: [userEmail, storeEmail], // Replace with the recipient email address
  };
  console.log(storeEmail);
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
