import { MiniAppPaymentSuccessEventPayload } from '@worldcoin/minikit-js';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequestPayload {
  payload: MiniAppPaymentSuccessEventPayload;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { payload } = req.body as IRequestPayload;
  const reference = req.cookies?.reference;
  // TOdo: Get from sesssion cooki
  // 1. Check that the transaction we received from the mini app is the same one we sent
  if (payload.reference === reference) {
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
        },
      },
    );
    const transaction = await response.json();

    // 2. Here we optimistically confirm the transaction.
    // Otherwise, you can poll until the status == mined
    if (transaction.reference == reference && transaction.status != 'failed') {
      res.status(200).send({ success: true });
    } else {
      res.status(200).send({ success: false });
    }
  }
}
