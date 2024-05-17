import Toasts from 'react-native-simple-toast';

export default function Toast(message) {
  Toasts.show(message, Toasts.LONG);
}
