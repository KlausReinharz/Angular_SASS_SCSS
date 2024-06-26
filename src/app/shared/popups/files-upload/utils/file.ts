
export const dataURLtoFile = (dataurl:any, filename:any): File =>{
  console.log("Valor de dataurl:", dataurl);
  const arr = dataurl.split(',');
  const mine = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mine});

}
