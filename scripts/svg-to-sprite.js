const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const svgSpreact = require('svg-spreact');
const svgoConfig = require('./svgo.config');
const mkdirp = require('mkdirp');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const basePath = process.cwd();

function getFileContent(filePath) {
  return promisify(fs.readFile)(filePath, { encoding: 'utf-8' });
}

async function getFileNames() {
  const filePath = path.join(basePath, './clients/components/icon/svgs/**/*.svg');
  const files = await glob(filePath);
  return files.filter(f => f.endsWith('.svg'));
}

async function getAllSvgContent() {
  const files = await getFileNames();
  const conts = await Promise.all(files.map((f) => getFileContent(f)));
  return conts.map((cont, idx) => {
    return {
      file: files[idx],
      cont,
    };
  });
}

async function getSprite() {
  const svgArr = await getAllSvgContent();
  const iconNames = svgArr.map(({ file }) => path.basename(file).replace('.svg', ''));
  const iconID = (n_1) => iconNames[n_1];
  const input = svgArr.map((v) => v.cont);
  const { defs } = await svgSpreact(input, { tidy: true, processId: iconID, svgoConfig })
  // replace #475569 by currentColor in order to be styled by css
  // todo define #475569 as constant?
  return defs.replace(/currentColor/g, 'none').replace(/#475569/g, 'currentColor');
}

function generateHash(value) {
  const cryptoCreate = crypto.createHash('md5');
  cryptoCreate.update(value);
  const hash = cryptoCreate.digest('hex');
  return hash;
}

const generateSprite = async function () {
  try {
    const svgStr = await getSprite();
    const hash = generateHash(svgStr);
    const pathName = `/dist/images/sprite-${hash}.svg`;
    const spriteFileName = `// generated by build task, DO NOT modify this file\nexport default '${pathName}';\n`;
    const spriteFile = path.join(basePath, pathName);
    const variableFile = path.join(basePath, '/clients/components/icon/svg-hash.ts');
    mkdirp.sync(path.dirname(spriteFile));
    fs.writeFileSync(variableFile, spriteFileName);
    fs.writeFileSync(spriteFile, svgStr);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getSprite,
  generateSprite,
};
