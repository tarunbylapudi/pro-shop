const generateOTP = (digit) => {
  let otp = "";
  for (let i = 0; i < digit; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  console.log(otp);
  return otp;
};

export default generateOTP;
