const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

async function deleteFilesInFolder(folderPath) {
  try {
    // Read the contents of the folder
    // const files = await readdir(folderPath);

  
          await unlink(folderPath);
          console.log(`Deleted: ${folderPath}`);
   

    console.log('All files deleted successfully.');
  } catch (error) {
    console.error('Error deleting files:', error.message);
  }
}

module.exports = { deleteFilesInFolder };
