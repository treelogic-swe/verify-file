const verify = require('keybase-verify');
const prompt = require('prompt');
const colors = require('colors/safe');
const fs = require('fs');

const getFileInputSchema = require('./file-input-schema');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

prompt.start();

prompt.get(getFileInputSchema(), function (inputError, fileInputResult) {
  if (inputError) {
    console.error('Error getting input. \n', inputError);

    return;
  }

  let publicKey = '';
  let signedMessage = '';

  try {
    publicKey = fs.readFileSync(fileInputResult.signatureFileName);
    signedMessage = fs.readFileSync(fileInputResult.targetFileName);
  } catch (fileReadErr) {
    console.error(colors.error('Error reading the input files. \n'), fileReadErr);

    return;
  }
  console.log(publicKey);
  console.log(signedMessage);

  try {
    verify(publicKey, signedMessage).then(() => {
      console.info(colors.error('The file is validated. \n'));
    }).error((verifyError) => {
      throw verifyError;
    });
  } catch (err) {
    console.error(colors.error('The file is not valid: It does not match the provided signature. \n'), err);
  }
});
