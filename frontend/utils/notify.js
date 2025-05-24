import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const notify = (title = "", message = "", options = {}) => {
  const { toastr = true, duration = 3000, icon = "success", position = "top-end" } = options;

  MySwal.fire({
    title,
    text: message,
    icon,
    toast: toastr,
    position: toastr ? position : "center",
    timer: toastr ? duration : undefined,
    showConfirmButton: !toastr,
    timerProgressBar: toastr,
    customClass: {
      popup: "text-sm px-4 py-3",
    },
    didOpen: (toast) => {
      if (toastr && toast) {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    },
  });
};

// Kullanım Örneği:
// notify("Başarılı", "Yeni personel eklendi", {
//   toastr: true,
//   duration: 4000,
//   icon: "success"
// })
// notify("Dikkat", "Bu işlem geri alınamaz", {
//   toastr: false,
//   icon: "warning"
// })


export const notifyConfirm = async ({ title = "Emin misiniz?", text = "", confirmText = "Evet", cancelText = "İptal", icon = "question" }) => {
  const result = await MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });
  return result.isConfirmed;
};

// Kullanım Örneği:
// const onay = await notifyConfirm({
//   title: "Silmek istediğinize emin misiniz?",
//   text: "Bu işlem geri alınamaz."
// })
// if (onay) {
//  işlemler
// }
