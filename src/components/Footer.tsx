import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
  ResponseEvent,
  MiniAppPaymentPayload,
} from '@worldcoin/minikit-js';
import { useEffect } from 'react';
import Control from './Control';

const Footer: React.FC = () => {
  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppPayment,
      async (payload: MiniAppPaymentPayload) => {
        if (payload.status == 'success') {
          const payment = await fetch(`/api/confirmpayment`, {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          const json = await payment.json();
          if (json.success) {
            console.log('worked!');
          }
        }
      },
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
    };
  }, []);

  const startPayment = async () => {
    const res = await fetch(`/api/startpayment`);

    const payload: PayCommandInput = {
      reference: await res.text(),
      to: '0x23253559632Ed2C8DfB6b6e10e85D03C871c7d68',
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(3, Tokens.USDCE).toString(),
        },
      ],
      description: 'Donate to me',
    };

    if (MiniKit.isInstalled()) {
      MiniKit.commands.pay(payload);
    }
  };

  return (
    <div className="leading-lg flex flex-col gap-y-8 text-center font-medium text-[#776e65]">
      <div className="mt-2 w-full">
        <Control />
        <button
          onClick={startPayment}
          className="font-lg mt-2 w-full px-16 py-4"
        >
          Donate to Me
        </button>
      </div>
      <p>
        Built by RSR for{' '}
        <a
          href="https://ethglobal.com/events/brussels"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          ETH Global Brussels 2024
        </a>
        .
      </p>
    </div>
  );
};

export default Footer;
