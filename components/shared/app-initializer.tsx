import React, { useEffect, useState } from 'react';
import useSettingStore from '@/hooks/use-setting-store';
import { ClientSetting } from '@/types';

export default function AppInitializer({
  setting,
  children,
}: {
  setting: ClientSetting;
  children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Update the setting in the store when the component mounts or when the setting changes
    useSettingStore.setState({ setting });
    setIsInitialized(true);
  }, [setting]);

  // Render nothing or a loading state until the settings are initialized
  if (!isInitialized) {
    return null; // or a loading spinner, etc.
  }

  return <>{children}</>; // Render children only after initialization
}