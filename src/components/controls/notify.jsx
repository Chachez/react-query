import { useSnackbar } from "notistack";

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showNotification = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
    });
  };

  const successNotify = (message) => {
    showNotification(message, "success");
  };

  const errorNotify = (message) => {
    showNotification(message, "error");
  };

  const infoNotify = (message) => {
    showNotification(message, "info");
  };

  const warningNotify = (message) => {
    showNotification(message, "warning");
  };

  return { successNotify, errorNotify, infoNotify, warningNotify };
};

export default useNotification;
