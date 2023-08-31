export const generateUniqueOrderNumber = (storeName, username) => {
  const storeN = storeName.split(" ");
  const userN = username.split(" ");
  let storeCode = "";
  let userCode = "";
  for (let i = 0; i < storeN.length; i++) {
    storeCode += storeN[i][0];
  }
  for (let i = 0; i < userN.length; i++) {
    userCode += userN[i][0];
  }
  const uniqueNumber = Date.now().toString();
  const fourDigitCode = uniqueNumber.slice(
    uniqueNumber.length - 5,
    uniqueNumber.length - 1
  );
  return (
    storeCode.toUpperCase() + "-" + userCode.toUpperCase() + "-" + fourDigitCode
  );
};

