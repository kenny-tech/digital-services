import Swal from 'sweetalert2'

export const successAlert = (message) => {
    Swal.fire({
        title: 'Good job!',
        text: message,
        icon: 'success',
        // confirmButtonColor: '#3949AB',
        confirmButtonText: 'OK'
    })
}

export const errorAlert = (message) => {
    Swal.fire({
        title: 'Oops...',
        text: message,
        icon: 'error',
        // confirmButtonColor: '#3949AB',
        confirmButtonText: 'OK'
    })
}