import twilio from "twilio";

// const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const client = twilio(
  "ACb98a3ac5fc652a7f700c9974236113b5",
  "ae34950da785f18623dcbd4c74c941bc"
);

export const SendWhatsAppMessage = async (to, body) => {
  try {

    const formattedTo = to.startsWith("+91")
      ? to
      : `+91${to.replace(/^0+/, "")}`;

    const message = await client.messages.create({
      body,
      // from: "whatsapp:+14155238886",
      from: "whatsapp:+14155238886",
      to: `whatsapp:${formattedTo}`,
    });

    return message; // Return message object for further inspection if needed
  } catch (error) {
    console.error("Failed to send message:", error);
    throw new Error("Unable to send WhatsApp message.");
  }
};

// import WhatsApp from "whatsapp";

// // const wa = new WhatsApp("+919753315419");

// // const wa = new WhatsApp("9753315419");
// const wa = new WhatsApp({
//   phoneNumberId: "9753315419",  // Or any other required parameters
//   // Other configuration parameters
// });

// export const SendWhatsAppMessage = async (recipient_number, message_body) => {
//   try {
//     const sent_text_message = await wa.messages.text(
//       { body: message_body },
//       recipient_number
//     );
//     console.log(sent_text_message.rawResponse());
//     return sent_text_message.rawResponse();
//   } catch (e) {
//     console.error(JSON.stringify(e));
//     throw e;
//   }
// };
