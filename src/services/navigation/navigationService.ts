import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from '@navigationTypes';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate<
  T extends keyof AppStackParamList,
  // Screen extends keyof AppStackParamList[T]['screen'] | undefined = undefined
>(
  screen: T,
  params?: AppStackParamList[T]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen as any, params as any);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
