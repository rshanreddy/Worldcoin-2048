import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const uuid = crypto.randomUUID().replace(/-/g, '');

  req.cookies.reference = uuid;
  res.status(200).send(uuid);
}
