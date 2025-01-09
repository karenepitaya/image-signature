const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

/**
 * 更新 .env 文件中的值，如果键不存在则添加。
 * @param {string} rootPath - 项目根目录的路径。
 * @param {string} key - 要更新的环境变量的键名。
 * @param {string} value - 要更新的环境变量的值。
 */
function updateEnvFile(rootPath, key, value) {
  const envFilePath = path.join(rootPath, ".env");

  // 1. 读取现有的 .env 文件内容
  let envConfig = {};
  if (fs.existsSync(envFilePath)) {
    const fileContent = fs.readFileSync(envFilePath, { encoding: "utf8" });
    envConfig = dotenv.parse(fileContent); // 将现有内容解析为对象
  }

  // 2. 更新或新增键值对
  envConfig[key] = value;

  // 3. 将更新后的内容写回 .env 文件
  const newContent = Object.entries(envConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  fs.writeFileSync(envFilePath, newContent, { encoding: "utf8" });

  console.log(`.env file updated: ${key}=${value}`);
}

module.exports ={ updateEnvFile };