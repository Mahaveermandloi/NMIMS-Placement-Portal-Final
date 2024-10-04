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
 