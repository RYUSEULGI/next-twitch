import { getUser } from './auth-service';
import { db } from './db';

export async function getRecommended() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let userId;

  try {
    const user = await getUser();
    userId = user.id;
  } catch (error) {
    userId = null;
  }

  if (userId) {
    const data = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId
            }
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            NOT: {
              blockedBy: {
                some: {
                  blockerId: userId
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return data;
  } else {
    const data = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return data;
  }
}
