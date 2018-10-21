function reverseString1(str) {
  return str.split("").reverse().join("");
}

function reverseString2(str) {
  let newStr = "";
  for(let i = str.length-1; i >= 0; newStr += str[i--]) {
  }
  return newStr;
}

function reverseString3(str) {
  if(!str)
    return "";
  else
    return reverseString2(str.substring(1)) + str.charAt(0);
}

function reverseString4(str) {
  let n = str.length, arr = str.split("");
  for(let i = 0; i < Math.floor(n/2); i++) {
    let tmp = arr[i];
    arr[i] = arr[n-1-i];
    arr[n-1-i] = tmp;
  }
  return arr.join("");
}
