export function exportPost(data, name,type) {
  var blob = null;
  if(type){
    blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,charset=UTF-8" });
  }else{
    blob = new Blob([data], { type: "text/csv,charset=UTF-8" });
  }
  
  let today = new Date();
  let tadayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const fileName = name + "-" + tadayDate + (type?".xlsx":".csv");
  const elink = document.createElement("a");
  elink.download = fileName;
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
}
