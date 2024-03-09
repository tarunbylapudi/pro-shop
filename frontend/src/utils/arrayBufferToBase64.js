const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return "data:image/jpeg;base64," + window.btoa(binary);
};

export default arrayBufferToBase64;
