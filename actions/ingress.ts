"use server";

import {
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { getUser } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function createIngress (ingressType: IngressInput){
  const user = await getUser();
  const {username, id} = user
  
  await resetIngresses(id);

  const options: CreateIngressOptions = {
    name: username,
    roomName: id,
    participantName: username,
    participantIdentity: id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
  };

  const ingress = await ingressClient.createIngress(
    ingressType,
    options,
  );

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: { userId: id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/user/${username}/keys`);

  return ingress;
};

export async function resetIngresses (roomName: string) {
    const ingresses = await ingressClient.listIngress({roomName});
    const rooms = await roomService.listRooms([roomName]);
    
    rooms.forEach(async(room) => {
      await roomService.deleteRoom(room.name)
    })

    ingresses.forEach(async(ingress) => {
      if(!ingress.ingressId){
        return 
      }
      await ingressClient.deleteIngress(ingress.ingressId)
    })

};
