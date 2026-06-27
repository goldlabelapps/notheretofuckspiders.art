// /Users/goldlabel/GitHub/example-app/gl-core/features/Shortcodes/components/LinkOut.tsx
'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

type HiddenMessageItem = {
  slug: string;
  name: string;
  message: string;
};

export default function HiddenMessage({
  slug,
}: {
  slug?: string;
}) {
  const [hiddenMessages, setHiddenMessages] = React.useState<HiddenMessageItem[]>([]);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    let isMounted = true;

    const loadHiddenMessages = async () => {
      try {
        const response = await fetch('/我不是来和蜘蛛交配的/json/hiddenMessages.json');
        if (!response.ok) return;
        const data = (await response.json()) as HiddenMessageItem[];
        if (isMounted) {
          setHiddenMessages(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setHiddenMessages([]);
        }
      }
    };

    loadHiddenMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  const querySlug = (searchParams.get('slug') || slug || '').replace(/^\/+|\/+$/g, '');
  const slugToken = querySlug.split('/').pop() || '';
  const matchedMessage = hiddenMessages.find((entry) => entry.slug === slugToken);

  if (!matchedMessage) return null;

  return (
    <pre>{JSON.stringify(matchedMessage, null, 2)}</pre>
  );
}
