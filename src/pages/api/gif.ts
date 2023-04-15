// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

async function createStream(req: NextApiRequest) {

  let apiKey = process.env.OPENAI_API_KEY;
  const apiProxy = process.env.OPENAI_PROXY && (process.env.OPENAI_PROXY as String).length > 0 ?
    process.env.OPENAI_PROXY :
    "https://api.openai.com";

  const res = await fetch(`${apiProxy}/v1/chat/completions`, {
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
