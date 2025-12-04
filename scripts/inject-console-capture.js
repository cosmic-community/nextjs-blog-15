const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScriptIntoHtml(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      injectScriptIntoHtml(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace(
          '</head>',
          '<script src="/dashboard-console-capture.js"></script></head>'
        );
        fs.writeFileSync(filePath, content);
        console.log(`Injected console capture script into ${filePath}`);
      }
    }
  });
}

injectScriptIntoHtml(distDir);
console.log('Console capture script injection complete');