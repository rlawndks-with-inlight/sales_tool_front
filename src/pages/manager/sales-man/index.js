import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/manager/sales-man') {
      router.push('/manager/sales-man/list');
    }
  });
  return null;
}
