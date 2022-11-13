function generateEmail () {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for(let i = 0; i < 15; i++){
    string += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${string}@gmail.com`;
}

const Allowed = {
    Uppers: 'QWERTYUIOPASDFGHJKLZXCVBNM',
    Lowers: 'qwertyuiopasdfghjklzxcvbnm',
    Numbers: '1234567890',
    Symbols: '!@#$%^&*'
}

function generatePassword (length = 8) {
    const getRandomCharFromString = (str) => str.charAt(Math.floor(Math.random() * str.length))
    let pwd = '';
    pwd += getRandomCharFromString(Allowed.Uppers); //pwd will have at least one upper
    pwd += getRandomCharFromString(Allowed.Lowers); //pwd will have at least one lower
    pwd += getRandomCharFromString(Allowed.Numbers); //pwd will have at least one number
    pwd += getRandomCharFromString(Allowed.Symbols);//pwd will have at least one symbolo
    for (let i = pwd.length; i < length; i++) {
        pwd += getRandomCharFromString(Object.values(Allowed).join('')); //fill the rest of the pwd with random characters
    }
    return pwd
}
function generateName(length = 6) {
   let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
   let charLength = chars.length;
   let result = '';
   for ( let i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}
function generatePhoneNumber () {
    return Math.floor(Math.random()*10000000)
}
module.exports = { generateEmail, generatePassword, generateName, generatePhoneNumber}