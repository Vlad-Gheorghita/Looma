import Toast from 'react-native-toast-message';

type ToastOptionalParams = {
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  buttonOffset?: number;
  swipeable?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
};

const showToast = (
  type: 'success' | 'error' | 'info',
  titleText: string,
  contentText?: string,
  options?: ToastOptionalParams
) => {
  Toast.show({
    type,
    text1: titleText,
    text2: contentText,
    position: options?.position || 'top',
    visibilityTime: options?.visibilityTime || 3000,
    autoHide: options?.autoHide || true,
    swipeable: options?.swipeable || true,
    topOffset: options?.topOffset,
    onShow: options?.onShow,
    onHide: options?.onHide,
    onPress: options?.onPress,
  });
};

export const ToastService = {
  success: (text1: string, text2?: string) =>
    showToast('success', text1, text2),
  error: (text1: string, text2?: string) => showToast('error', text1, text2),
  info: (text1: string, text2?: string) => showToast('info', text1, text2),
  other: (
    type: 'success' | 'error' | 'info',
    text1: string,
    text2?: string,
    options?: ToastOptionalParams
  ) => showToast(type, text1, text2, options),
};
