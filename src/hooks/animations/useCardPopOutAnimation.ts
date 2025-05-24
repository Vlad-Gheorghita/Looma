import { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export const useCardPopOutAnimation = (isVisible: boolean) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = isVisible
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 200 });
  }, [isVisible]);

  return { scale };
};
