const verify = require('keybase-verify');
const prompt = require('prompt');
const colors = require('colors/safe');
const fs = require('fs');

const getFileInputSchema = require('./file-input-schema');

prompt.message = colors.yellow('');

prompt.start();

prompt.get(getFileInputSchema(), function (inputError, fileInputResult) {
  if (inputError) {
    console.error('Error getting input. Nothing to do.', inputError);

    return;
  }

  let publicKey = '';
  let signedMessage = '';

  try {
    publicKey = fs.readFileSync(fileInputResult.signatureFileName);
    signedMessage = fs.readFileSync(fileInputResult.targetFileName);
  } catch (fileReadErr) {
    console.error('Error reading the input files.', fileReadErr);
  }
  console.log(publicKey);
  console.log(signedMessage);

  try {
    verify(publicKey, signedMessage).then(() => {
      console.info('The user signed the message');
    });
  } catch (err) {
    console.error('The user didn‘t sign the message', err);
  }
});
