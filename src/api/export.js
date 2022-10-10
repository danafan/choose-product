export function exportPost(data, name) {
  const blob = new Blob([data], { type: "text/csv,charset=UTF-8" });
  let today = new Date();
  let tadayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const fileName = name + "-" + tadayDate + ".csv";
  const elink = document.createElement("a");
  elink.download = fileName;
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
}
