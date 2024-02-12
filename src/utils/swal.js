import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "animate.css";

const MySwal = withReactContent(Swal);

/**
 * Displays a toast notification using SweetAlert2 with React integration.
 *
 * @param {"success" | "error" | "warning" | "info" | "question"} type - The type of the toast notification.
 * @param {string} message - The message to be displayed in the toast notification.
 */
export default function swal(type, message) {
  MySwal.fire({
    icon: type,
    text: message,
    toast: true,
    position: "top-end",
    timer: 3000,
    showCloseButton: true,
    showConfirmButton: false,
    animation: false,
    showClass: {
      popup: "animate__animated animate__slideInRight animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__slideOutRight animate__faster",
    },
  });
}
