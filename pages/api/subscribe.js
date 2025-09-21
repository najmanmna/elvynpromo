import { createClient } from "@sanity/client";
import { sendEmail } from "@/lib/sendEmail";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-10-01",
});

const customerEmailTemplate = (email) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    <div style="text-align: center;">
      <img src="https://elvynstore.com/logo.png" alt="Elvyn" style="width: 120px; margin-bottom: 20px;">
    </div>
    <h2 style="color: #2c3e50; text-align: center;">Welcome to Elvyn!</h2>
    <p>Hi there,</p>
    <p>Thank you for subscribing to our newsletter! 🎉</p>
    <p>You'll now be the first to know about new products, offers, and exclusive discounts.</p>
    <p>Use the same email <strong>${email}</strong> at checkout to avail special offers!</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://elvynstore.com" style="background-color: #ff6f61; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold;">Visit Store</a>
    </div>
    <p style="color: #888; font-size: 12px; text-align: center;">Team ELVYN</p>
  </div>
`;


const adminEmailTemplate = (email) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h2 style="color: #2c3e50;">New Subscriber Alert</h2>
    <p>Hello Admin,</p>
    <p>A new subscriber has joined your newsletter:</p>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</li>
    </ul>
    <br>
    <p style="color: #888; font-size: 12px;">Elvyn Store Notification System</p>
  </div>
`;



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  email = email.trim().toLowerCase();

  try {
    // 1. Check if already subscribed
    const existing = await client.fetch(
      `*[_type == "subscribers" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return res.status(200).json({ message: "You are already subscribed." });
    }

    // 2. Create new subscriber
    const created = await client.create({
      _type: "subscribers",
      email,
      createdAt: new Date().toISOString(),
    });

    // 3. Send welcome email to subscriber
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Elvyn Store!",
        html: customerEmailTemplate(email),
      });
    } catch (err) {
      console.error("❌ Failed to send welcome email:", err);
    }

    // 4. Send notification email to admin
    try {
      await sendEmail({
        to: "info@elvynstore.com",
        subject: "New Subscriber Alert",
        html: adminEmailTemplate(email),
      });
    } catch (err) {
      console.error("❌ Failed to send admin notification:", err);
    }

    return res.status(200).json({
      message:
        "Thanks for subscribing! Avail the offer by entering the same email at checkout.",
    });
  } catch (err) {
    console.error("❌ Sanity error:", err.message || err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
