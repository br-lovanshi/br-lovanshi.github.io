const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../.next/server/app');
const staticDir = path.join(__dirname, '../.next/static');
const publicDir = path.join(__dirname, '../public');
const outDir = path.join(__dirname, '../out');

function copyRecursiveSync(src, dest) {
    if (fs.existsSync(src)) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const stats = fs.statSync(src);
        if (stats.isDirectory()) {
            const items = fs.readdirSync(src);
            items.forEach((item) => {
                copyRecursiveSync(path.join(src, item), path.join(dest, item));
            });
        } else {
            try {
                fs.copyFileSync(src, dest);
            } catch (err) {
                console.error(`Failed to copy ${src}: ${err.message}`);
            }
        }
    }
}

function copyHtmlAndRsc(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const items = fs.readdirSync(src);
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        const stats = fs.statSync(srcPath);

        if (stats.isDirectory()) {
            copyHtmlAndRsc(srcPath, destPath);
        } else {
            if (item.endsWith('.html') || item.endsWith('.rsc') || item.endsWith('.xml') || item.endsWith('.ico')) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    });
}

// 1. Clean out dir
if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

// 2. Copy public
console.log('Copying public...');
copyRecursiveSync(publicDir, outDir);

// 3. Copy static assets
console.log('Copying static assets...');
copyRecursiveSync(staticDir, path.join(outDir, '_next/static'));

// 4. Copy HTML/RSC
console.log('Copying HTML/RSC...');
copyHtmlAndRsc(srcDir, outDir);

console.log('Deployment build prepared in /out');
