const verify = require('keybase-verify');
const prompt = require('prompt');
const colors = require('colors/safe');
const fs = require('fs');

const colorsTheme = require('./colorsTheme');
const getFileInputSchema = require('./file-input-schema');

const UTF8 = 'utf8';
const PGP_SIG = '-----BEGIN PGP SIGNATURE-----\n'

colors.setTheme(colorsTheme);

prompt.start();

prompt.get(getFileInputSchema(), function (inputError, fileInputResult) {
  if (inputError) {
    console.error('Error getting input. \n', inputError);

    return;
  }

  let sigFile = '';
  let targetFile = '';

  try {
    sigFile = fs.readFileSync(fileInputResult.signatureFileName, UTF8);
    targetFile = fs.readFileSync(fileInputResult.targetFileName, UTF8);
  } catch (fileReadErr) {
    console.error(colors.error('Error reading the input files. \n'), fileReadErr);

    return;
  }

  const splitResult = sigFile.split(PGP_SIG);
  const signedMessage = splitResult[0];
  const signature = PGP_SIG + splitResult[1];

  console.log(signedMessage);
  console.log('-----');
  console.log(signature);

  try {
    verify(signature, signedMessage).then(() => {
      console.info(colors.info('The file is validated. \n'));
    });
  } catch (err) {
    console.error(colors.error('The file is not valid: It does not match the provided signature. \n'), err);
  }
});
