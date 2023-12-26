'use server';

import { AccessToken } from 'livekit-server-sdk';

import { getUser } from '@/lib/auth-service';
import { isBlockedByUser } from '@/lib/block-service';
import { getUserById } from '@/lib/user-service';
import { randomUUID } from 'crypto';

export const createViewerToken = async (streamerId: string) => {
  let user;

  try {
    user = await getUser();
  } catch {
    const id = randomUUID();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    user = { id, username };
  }

  const streamer = await getUserById(streamerId);

  if (!streamer) {
    throw new Error('Streamer not found');
  }

  const isBlocked = await isBlockedByUser(streamer.id);

  if (isBlocked) {
    throw new Error('User is blocked');
  }

  const isHost = user.id === streamer.id;

  const token = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
    identity: isHost ? `host-${user.id}` : user.id,
    name: user.username
  });

  token.addGrant({
    room: streamer.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true
  });

  return await Promise.resolve(token.toJwt());
};
