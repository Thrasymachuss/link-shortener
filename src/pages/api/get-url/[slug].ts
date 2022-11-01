import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.status(404);
    return res.json({ message: "Please enter a valid slug." });
  }

  const shortUrl = await prisma?.shortUrl.findFirst({
    where: {
      slug,
    },
  });

  if (!shortUrl?.url) {
    res.status(404);
    return res.json({ message: "Slug is not in use." });
  }

  res.status(200);
  return res.json(shortUrl);
};
