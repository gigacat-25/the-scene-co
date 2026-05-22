const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/app/api', function(filePath) {
  if (filePath.endsWith('route.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if the file has the hardcoded isAuthenticated
    const hardcodedAuthRegex = /function isAuthenticated\([^)]*\)\s*:\s*boolean\s*\{\s*return\s+request\.cookies\.get\([^)]*\)\?.value\s*===\s*"authenticated";\s*\}/g;
    
    if (hardcodedAuthRegex.test(content)) {
      content = content.replace(hardcodedAuthRegex, '');
      modified = true;
    }

    // Check if we need to add isAuthenticated to the cf-bindings import
    if (modified) {
      if (content.includes('import { getBindings } from "@/lib/cf-bindings"')) {
         content = content.replace('import { getBindings } from "@/lib/cf-bindings"', 'import { getBindings, isAuthenticated } from "@/lib/cf-bindings"');
      } else if (content.includes('import { getBindings, unauthorizedResponse } from "@/lib/cf-bindings"')) {
         content = content.replace('import { getBindings, unauthorizedResponse } from "@/lib/cf-bindings"', 'import { getBindings, unauthorizedResponse, isAuthenticated } from "@/lib/cf-bindings"');
      }
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed', filePath);
    }
  }
});
