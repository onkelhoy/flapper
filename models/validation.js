
const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const safeTextValidation = (text) => /^[\w.!_ ]*$/.test(text);

module.exports = {
  validateEmail,
  safeTextValidation,
};