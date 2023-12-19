'use server';

import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { getUser } from '@/lib/auth-service';
import { db } from '@/lib/db';

export async function updateStream(values: Partial<Stream>) {
  try {
    const user = await getUser();

    const currentStream = await db.stream.findUnique({
      where: {
        userId: user.id
      }
    });

    if (!currentStream) {
      throw new Error('스트리밍이 없습니다.');
    }

    const { thumbnailUrl, name, isChatEnabled, isChatFollowersOnly, isChatDelayed } = values;

    const validData = {
      thumbnailUrl,
      name,
      isChatEnabled,
      isChatFollowersOnly,
      isChatDelayed
    };

    const stream = await db.stream.update({
      where: {
        id: currentStream.id
      },
      data: {
        ...validData
      }
    });

    revalidatePath(`/user/${user.username}/chats`);
    revalidatePath(`/user/${user.username}`);
    revalidatePath(`/${user.username}`);

    return stream;
  } catch {
    throw new Error('서버에 오류가 발생했습니다.');
  }
}
