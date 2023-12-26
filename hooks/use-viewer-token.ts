import { createViewerToken } from '@/actions/token';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useViewerToken(streamerId: string) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = await createViewerToken(streamerId);
        const decodedToken = jwtDecode(token) as JwtPayload & { name?: string };
        const name = decodedToken?.name || '';
        const identity = decodedToken.jti || '';

        setToken(token);
        setName(name);
        setIdentity(identity);
      } catch (error) {
        toast.error('오류가 발생했습니다.');
      }
    })();
  }, [streamerId]);

  return { token, name, identity };
}
