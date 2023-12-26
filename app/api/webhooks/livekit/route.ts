import { WebhookReceiver } from 'livekit-server-sdk';
import { headers } from 'next/headers';

import { db } from '@/lib/db';

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);

enum STREAM_STATUS {
  방송시작 = 'ingress_started',
  방송끝 = 'ingress_ended'
}

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get('Authorization');

  if (!authorization) {
    return new Response('no auth', { status: 400 });
  }

  const event = receiver.receive(body, authorization);
  const ingressId = event.ingressInfo?.ingressId;

  if (event.event === STREAM_STATUS.방송시작) {
    await db.stream.update({
      where: {
        ingressId
      },
      data: {
        isLive: true
      }
    });
  }

  if (event.event === STREAM_STATUS.방송끝) {
    await db.stream.update({
      where: {
        ingressId
      },
      data: {
        isLive: false
      }
    });
  }

  return new Response('ok', { status: 200 });
}
