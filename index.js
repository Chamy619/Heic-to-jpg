import fs from 'fs';
import convert from 'heic-convert';
import { promisify } from 'util';

const INPUT_DIR = 'input';
const OUTPUT_DIR = 'output';
const OUTPUT_FILE_PREFIX = 'picture-';

const files = fs.readdirSync(INPUT_DIR);
files.forEach((file, index) => {
  if (file.endsWith('.HEIC') || file.endsWith('.heic')) {
    const fileName = file.substring(0, file.lastIndexOf('.'));
    (async () => {
      console.log(`convert ${file} to ${fileName}.jpg`);
      const inputBuffer = await promisify(fs.readFile)(`${INPUT_DIR}/${file}`);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 1,
      });

      await promisify(fs.writeFile)(
        `${OUTPUT_DIR}/${OUTPUT_FILE_PREFIX}${202 + index}.jpg`,
        outputBuffer,
      );
    })();
  }
});
