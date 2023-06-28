import emailjs from "emailjs-com";

const SendOrderCancellation = (
  name,
  orderDetails,
  total,
  userEmail,
  storeEmail,
  uniqueOrderNum,
  address,
  phoneNumber,
  orderType
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
    message: `please take note that your money will be refunded within 2 business days.`,
    phone: phoneNumber,
    uniqueOrderNum: uniqueOrderNum,
    Order_Details: orderDetailsString,
    subtotal: orderType === "Deliver" ? total - 25 : total,
    shipping: orderType === "Deliver" ? 25 : 0,
    Total: total,
    email: userEmail,
    Address: address.split(" ").join("\n"),
    to_email: [userEmail, storeEmail], // Replace with the recipient email address
  };
  emailjs
    .send(
      "service_uxvc1ba",
      "template_8v1ipwp",
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

export default SendOrderCancellation;
