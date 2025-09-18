import { client } from "@/lib/sanityClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    await client.create({
      _type: "subscribers",
      email,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Sanity error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
