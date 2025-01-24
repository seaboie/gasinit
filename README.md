# Google Apps Script : initial files and folder  
> For : TypeScript project  

## Install  
> run command  
- on Mac must have `sudo`  
```bash
sudo npm install -g gasinit
```  

## Usage  
- Create new project 
- `cd` to my project  
> run command  
```bash
gasinit
```  

```bash
% gasinit
? Enter a description for your project: (A sample test-npm project)
```  
type description for your project  and `Enter`  

> ### 🛠️ 🛠️ 🛠️ Install : dependencies listed in the package.json file.  
```bash
npm install
```  

---   

## File Structure  

```plaintext
project/
├── ./src
│   ├── ./config
│   │   └── Config.ts
│   ├── ./helpers
│   │   └── DateHelper.ts
│   └── Code.ts
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```  

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


