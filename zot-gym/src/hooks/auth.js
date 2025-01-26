import Swal from 'sweetalert2'


// TODO: proper authorization frontend
export function checkAuth() {
  const res = localStorage.getItem("auth")
  if (!res) {
    Swal.fire({
      icon: "error",
      title: "Not logged in...",
      text: "Redirecting to login page.",
    });
    setTimeout(() => { window.location.href = "/login"} , 2000)
    return res
  } else {
    return JSON.parse(res)
  }
};
