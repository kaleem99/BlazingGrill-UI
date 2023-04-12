import emailjs from "emailjs-com";

const SendEmailOrder = () => {
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
  const form = () => {
    return (
      <form id="form">
        <div class="field">
          <label for="from_name">from_name</label>
          <input
            type="text"
            value={"Kaleem"}
            name="from_name"
            id="from_name"
            style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg=="); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
          />
        </div>
        <div class="field">
          <label for="to_name">to_name</label>
          <input type="text" name="to_name" value={"Mo"} id="to_name" />
        </div>
        <div class="field">
          <label for="message">message</label>
          <input type="text" name="message" value={"Hello"} id="message" />
        </div>
        <div class="field">
          <label for="reply_to">reply_to</label>
          <input type="text" name="reply_to" value={""} id="reply_to" />
        </div>
        <div class="field">
          <label for="to_email">to_email</label>
          <input
            type="text"
            name="to_email"
            value={"kmohammad@2u.com"}
            id="to_email"
          />
        </div>

        <input type="submit" id="button" value="Send Email" />
      </form>
    );
  };
  const templateParams = {
    name: "John",
    from_name: "Jane",
    subject: "Hello from React App",
    message:
      "Thank you, your order will be ready in about 20 minutes.",
    to_email: "kmohammad@2u.com", // Replace with the recipient email address
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
