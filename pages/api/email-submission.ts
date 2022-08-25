import type { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

type Data = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();

  const email = req.body.event?.data?.new?.form_data?.email || undefined;
  console.error("req.body: ", req.body);

  if (!email || email.trim().length <= 5 || !email.includes("@"))
    return res.status(400).json({ error: "Invalid email" });

  try {
    await sendgrid.send({
      to: email, // the recipient's email
      from: "social@infinitykeys.io", // the SendGrid's sender email
      subject: "It worked!",
      html: `<div>You've got mail</div>`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error sending email" });
  }

  return res.status(200).json({ error: "" });
}

/*

@TODO
figure out response shape from hasura
push a draft and test hasura
*/
