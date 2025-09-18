import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-10-01",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  // ✅ Normalize (remove spaces + lowercase)
  email = email.trim().toLowerCase();

  try {
    console.log("🔍 Checking for existing subscriber:", email);

    // 1. Check if already subscribed
    const existing = await client.fetch(
      `*[_type == "subscribers" && email == $email][0]`,
      { email }
    );

    console.log("✅ Query result:", existing);

    if (existing) {
      return res
        .status(200)
        .json({ message: "You are already subscribed." });
    }

    // 2. Create new subscriber
    const created = await client.create({
      _type: "subscribers",
      email,
      createdAt: new Date().toISOString(),
    });

    console.log("🎉 Created subscriber:", created);

    return res.status(200).json({
      message:
        "Thanks for subscribing! Avail the offer by entering the same email at checkout.",
    });
  } catch (err) {
    console.error("❌ Sanity error:", err.message || err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
