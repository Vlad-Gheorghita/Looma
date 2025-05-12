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
  success: (titleText: string, contentText?: string) =>
    showToast('success', titleText, contentText),
  error: (titleText: string, contentText?: string) => showToast('error', titleText, contentText),
  info: (titleText: string, contentText?: string) => showToast('info', titleText, contentText),
  other: (
    type: 'success' | 'error' | 'info',
    titleText: string,
    contentText?: string,
    options?: ToastOptionalParams
  ) => showToast(type, titleText, contentText, options),
};
