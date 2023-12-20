import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/**
 * Displays a toast notification using SweetAlert2 with React integration.
 *
 * @param {"success" | "error" | "warning" | "info" | "question"} type - The type of the toast notification.
 * @param {string} message - The message to be displayed in the toast notification.
 */
export default function swal(type, message) {
  const title = type.charAt(0).toUpperCase() + type.substring(1);

  MySwal.fire({
    title,
    icon: type,
    text: message,
    toast: true,
    position: "top-end",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}
