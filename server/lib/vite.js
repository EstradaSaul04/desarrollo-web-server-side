import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function viteAssets() {
  const isDev = process.env.NODE_ENV !== 'production'
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'

  if (isDev) {
    return `
<script type="module" src="${viteDevServer}/@vite/client"></script>
<script type="module" src="${viteDevServer}/main.js"></script>
`
  }

  const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json')
  if (!fs.existsSync(manifestPath)) {
    console.warn("Vite manifest not found. Run 'npm run build'")
    return ''
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const mainEntry = manifest['main.js']

  if (!mainEntry) {
    console.warn('Archivo main.js no esta disponible en el manifiesto de Vite')
    return ''
  }

  let tags = '';
  if (mainEntry.css) {
    mainEntry.css.forEach(cssFile => {
      tags += `<link rel="stylesheet" href="/${cssFile}">\n`
    });
  }

  tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;
  return tags;
}

export function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', () => {
    return new hbs.SafeString(viteAssets())
  })
}