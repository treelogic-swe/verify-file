const defaults = require('./defaults.js');

function getFileNameSchema() {
  const { signatureFileName, targetFileName } = defaults;

  const schema = {
    properties: {
      signatureFileName: {
        type: 'string',
        description: 'The local filesystem location of the pgp signature file.w',
        default: signatureFileName,
        required: true
      },
      targetFileName: {
        type: 'string',
        description: 'The local filesystem location of the pgp signature file.w',
        default: targetFileName,
        required: true
      }
    }
  };

  return schema;
}

module.exports = getFileNameSchema;
