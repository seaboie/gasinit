#!/usr/bin/env node

import fs, { read } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

// Define the templates directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, 'templates');

// Validate the templates directory
if (!fs.existsSync(templatesDir)) {
  console.error(`Error: Templates directory not found at ${templatesDir}`);
  process.exit(1);
}

// Get project details
const projectFolder = path.basename(process.cwd());
const projectName = projectFolder.toLowerCase().replace(/\s+/g, "-");

// Prompt user for project description
const promptProjectDescription = async () => {
  const { projectDescription } = await inquirer.prompt([
    {
      type: "input",
      name: "projectDescription",
      message: "Enter a description for your project:",
      default: `A sample ${projectName} project`,
    },
  ]);
  return projectDescription;
};

const projectDescription = await promptProjectDescription();

// Function to read and replace placeholders in template files
const readTemplate = (fileName) => {
  const templatePath = path.join(templatesDir, fileName);
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template file ${fileName} does not exist.`);
    process.exit(1);
  }

  let content = fs.readFileSync(templatePath, 'utf8');
  return content
    .replace(/{{projectName}}/g, projectName)
    .replace(/{{projectDescription}}/g, projectDescription);
};

// Define the files to be generated
const files = {
  "README.md": readTemplate('README.md'),
  "src/Code.ts": readTemplate('Code.ts'), // Move index.js to src/
  "src/type.ts": readTemplate('type.ts'),
  "src/config/Config.ts": readTemplate('config/Config.ts'),
  "src/helpers/DateHelper.ts": readTemplate('helpers/DateHelper.ts'),
  "src/html/index.html": readTemplate('html/index.html'),
  "src/js/script.js.html": readTemplate('js/script.js.html'),
  "src/css/style.css.html": readTemplate('css/style.css.html'),
  "src/utils/Utils.ts": readTemplate('utils/Utils.ts'),
  "src/services/spreadsheet/SheetServices.ts": readTemplate('services/spreadsheet/SheetServices.ts'),
  "src/services/menu/CustomMenuUi.ts": readTemplate('services/menu/CustomMenuUi.ts'),
  "src/services/menu/menuData.ts": readTemplate('services/menu/menuData.ts'),
  "src/error/html/errorLoadHtml.html": readTemplate('error/html/errorLoadHtml.html'),
  "package.json": readTemplate('package.json'),
  "LICENSE": readTemplate('LICENSE'),
  "tsconfig.json": readTemplate('tsconfig.json'),
  ".claspignore": readTemplate('.claspignore'),
  
};

// Function to create directories and files
const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Success: Created ${filePath}`);
  } else {
    console.log(`${filePath} already exists`);
  }
};

// Generate files and folders
Object.keys(files).forEach((fileName) => {
  const filePath = path.join(process.cwd(), fileName);
  createFile(filePath, files[fileName]);
});