import Swal from 'sweetalert2';

const Confirm = Swal.mixin({
    title: "Are you sure?",
    text: "Lorem ipsum",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    confirmButtonColor: 'red',
    heightAuto: false
});

export default Confirm;