export const usernameRegex = {
  length: /^.{3,20}$/,
  validChars: /^[A-Za-z0-9_]+$/,
};

export function validateUsername(username) {
  return {
    length: usernameRegex.length.test(username),
    validChars: usernameRegex.validChars.test(username),
  };
}

export const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  symbol: /[!@#$%^&*()_\-+=[\]{};:"\\|,.<>/?]/,
  length: /.{8,}/,
};

export function validatePassword(password, confirmPassword = "") {
  return {
    length: passwordRegex.length.test(password),
    lowercase: passwordRegex.lowercase.test(password),
    uppercase: passwordRegex.uppercase.test(password),
    number: passwordRegex.number.test(password),
    symbol: passwordRegex.symbol.test(password),
    passwordsMatch: password && password === confirmPassword,
  };
}
