const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/app/(auth)/login/page.tsx',
  'src/app/(auth)/signup/page.tsx',
  'src/app/(auth)/user/login/page.tsx',
  'src/app/(auth)/user/signup/page.tsx',
  'src/app/(auth)/vendor/login/page.tsx',
  'src/app/(auth)/vendor/signup/page.tsx',
  'src/app/(auth)/admin/login/page.tsx',
  'src/app/(auth)/admin/signup/page.tsx',
];

const replacements = [
  { search: /"#f97316"/g, replace: '"var(--color-primary)"' },
  { search: /"#ea6c0a"/g, replace: '"var(--color-primary-hover)"' },
  { search: /"#fff7ed"/g, replace: '"var(--color-primary-light)"' },
  { search: /"#fed7aa"/g, replace: '"var(--color-primary-border)"' },
  { search: /"#111827"/g, replace: '"var(--color-900)"' },
  { search: /"#374151"/g, replace: '"var(--color-700)"' },
  { search: /"#6b7280"/g, replace: '"var(--color-500)"' },
  { search: /"#9ca3af"/g, replace: '"var(--color-400)"' },
  { search: /"#f3f4f6"/g, replace: '"var(--color-100)"' },
  { search: /"#f9fafb"/g, replace: '"var(--color-50)"' },
  { search: /"#ffffff"/g, replace: '"var(--color-0)"' },
  { search: /"#1e293b"/g, replace: '"var(--color-navy)"' },
  { search: /"#22c55e"/g, replace: '"var(--color-success)"' },
  { search: /"#ef4444"/g, replace: '"var(--color-error)"' },
];

filesToProcess.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');
    replacements.forEach(({ search, replace }) => {
      content = content.replace(search, replace);
    });
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Skipped ${filePath} (not found)`);
  }
});
