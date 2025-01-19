import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from '@navigationTypes'; // Import your type definitions

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate<
  T extends keyof AppStackParamList,
  Screen extends keyof AppStackParamList[T]['screen'] | undefined = undefined
>(
  screen: T,
  params?: T extends 'Auth' | 'Tab'
    ? { screen: Screen; params?: AppStackParamList[T]['params'] }
    : undefined
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen as any, params as any); // Cast as `any` to avoid runtime error
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
