import Swal from "sweetalert2";

// function SweetAlert({ data, icon, title }) {
//     return Swal.fire({
//         icon: icon,
//         title: title,
//         text: data.message,
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//     });
// }

const AlertComponent = (type, data, Text) => {
    console.log(type, data, Text);
    try {
        if (type === "success") {
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
        } else if (type === "failed") {
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
        } else if (type === "error") {
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
        } else if (type === "warning") {
            Swal.fire({
                className: "pop-top",
                position: "top",
                icon: "error",
                title: "Oops...",
                text: warningText,
                showConfirmButton: false,
                width: "40vh",
                // toast: true,
                timer: 1500,
                timerProgressBar: true,
            });
        }
    } catch (error) {}
};

export default AlertComponent;
