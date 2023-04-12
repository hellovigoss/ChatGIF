// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

async function createStream(req: NextApiRequest) {

  let apiKey = process.env.OPENAI_API_KEY;

  const res = await fetch("https://openai-proxy.yedai.fun/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify(req.body),
  });
  return await res.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resBody = await createStream(req);
  res.status(200).json(resBody);
}
