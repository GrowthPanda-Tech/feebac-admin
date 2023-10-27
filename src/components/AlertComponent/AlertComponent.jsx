import Swal from "sweetalert2";

const AlertComponent = (type, data, Text) => {
    switch (type) {
        case "success":
            Swal.fire({
                toast: true,
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: "Success",
                text: data.message,
                showConfirmButton: false,
            });
            break;

        case "failed":
            Swal.fire({
                toast: true,
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                icon: "warning",
                title: "Failed",
                text: data.message,
                showConfirmButton: false,
            });
            break;

        case "error":
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed",
                text: Text,
                showConfirmButton: false,
                toast: true,
                timer: 2000,
                timerProgressBar: true,
            });
            break;

        case "warning":
            Swal.fire({
                className: "pop-top",
                position: "top",
                icon: "error",
                title: "Oops...",
                text: Text,
                showConfirmButton: false,
                width: "40vh",
                timer: 1500,
                timerProgressBar: true,
            });
            break;

        default:
            break;
    }
};

export default AlertComponent;
