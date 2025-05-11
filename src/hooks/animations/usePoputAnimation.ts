import { useEffect } from "react";
import { useSharedValue, withTiming, withSequence } from "react-native-reanimated";

export const usePopOutAnimation = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 500 }),
      withTiming(1, { duration: 200 })
    );
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return { scale, opacity };
};
