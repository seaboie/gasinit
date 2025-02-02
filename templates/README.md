# {{projectName}}  

## Description  
This is a {{projectName}} project.  


## Create `.gitignore`  
```gitignore
# Node.js and npm
node_modules/
npm-debug.log
package-lock.json
yarn.lock

# TypeScript
dist/
build/
*.tsbuildinfo

# Google Apps Script
.gas/
**/appsscript.json
.clasp.json
.clasprc.json
creds.json

# JavaScript
*.log
*.min.js
*.min.js.map

# IDE and Editor files
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment files
.env
.env.local
.env.development
.env.test
.env.production

# macOS files
.DS_Store

# Windows files
Thumbs.db

# Logs and databases
*.log
*.sqlite

# Build and cache directories
.cache/
.temp/
.out/

```  




---  

## 🛠️ 🛠️ 🛠️ Run logs  
- use `npm run logs` for result output of `Logger.log()` and `console.log()`  
this command set in `package.json` `"scripts"`
```bash
npm run logs
```  

`DEBUG - Hello World`  
`INFO - Do Somethings`  

> filtered only `message` key  
---   

## Function  

> [Utils.generateHtmlFromFile()](https://gist.github.com/seaboie/4f267cf616fbc3ef3d6ae4e625edcb93#file-utils-ts)  


