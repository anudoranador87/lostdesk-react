const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const folders = ['components', 'pages', 'context', 'hooks', 'lib', 'types'];
folders.forEach(f => {
  const p = path.join(srcDir, f);
  if (!fs.existsSync(p)) fs.mkdirSync(p);
});

const filesToMove = {
  'Filtros.jsx': 'components',
  'Filtros.css': 'components',
  'Header.jsx': 'components',
  'Header.css': 'components',
  'ItemCard.jsx': 'components',
  'itemCard.css': 'components',
  'ItemForm.jsx': 'components',
  'ItemForm.css': 'components',
  'Logo.jsx': 'components',
  'ModalReclamado.jsx': 'components',
  'modalReclamado.css': 'components',
  'Sidebar.jsx': 'components',
  'Sidebar.css': 'components',
  'Spinner.jsx': 'components',
  'StatBar.jsx': 'components',
  'StatBar.css': 'components',
  'Toast.jsx': 'components',
  'Toast.css': 'components',
  'ProtectedRoute.jsx': 'components',

  'Login.jsx': 'pages',
  'Login.css': 'pages',
  'Panel.jsx': 'pages',
  'Inventario.jsx': 'pages',

  'RoleContext.jsx': 'context',
  'ToastContext.jsx': 'context',

  'useIntersectionObserver.js': 'hooks',
  'useLostItems.js': 'hooks',

  'supabase.ts': 'lib',
  'types.ts': 'types'
};

const oldPaths = {};

// Rename files to TSX / TS at the same time? Let's just move them first to avoid too many moving parts.
Object.entries(filesToMove).forEach(([file, folder]) => {
  const oldPath = path.join(srcDir, file);
  const newPath = path.join(srcDir, folder, file);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    oldPaths[file] = folder;
  }
});

// Now update imports. This is a naive regex update but should work for this project.
const replaceImports = (content, currentFolder) => {
  let updatedContent = content;
  Object.entries(oldPaths).forEach(([file, folder]) => {
    // If the file is imported, it used to be './Filename' or '../Filename' etc.
    // In src root, it was imported as './Filename'
    const nameWithoutExt = file.replace(/\.(jsx|js|ts|css)$/, '');
    
    // Calculate new relative path
    // currentFolder is where the current file is now
    let relativePath;
    if (currentFolder === '') {
      relativePath = `./${folder}/${nameWithoutExt}`;
    } else if (currentFolder === folder) {
      relativePath = `./${nameWithoutExt}`;
    } else {
      relativePath = `../${folder}/${nameWithoutExt}`;
    }

    // Replace JS/JSX imports
    const importRegex = new RegExp(`(['"])\\.\\/${nameWithoutExt}(['"])`, 'g');
    updatedContent = updatedContent.replace(importRegex, `$1${relativePath}$2`);

    // We also need to fix css imports specifically: import './File.css'
    if (file.endsWith('.css')) {
        const importCssRegex = new RegExp(`(['"])\\.\\/${file}(['"])`, 'g');
        let cssRelPath = relativePath;
        if (currentFolder === '') {
          cssRelPath = `./${folder}/${file}`;
        } else if (currentFolder === folder) {
          cssRelPath = `./${file}`;
        } else {
          cssRelPath = `../${folder}/${file}`;
        }
        updatedContent = updatedContent.replace(importCssRegex, `$1${cssRelPath}$2`);
    }
  });
  return updatedContent;
};

const walk = (dir, relFolder = '') => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'assets') {
        walk(filePath, path.join(relFolder, file));
      }
    } else if (/\.(jsx|js|tsx|ts|css)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Fix imports for React files
      let newContent = replaceImports(content, relFolder.replace(/\\/g, '/'));
      
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated imports in ${path.join(relFolder, file)}`);
      }
    }
  });
};

walk(srcDir);
console.log('Refactoring complete.');
