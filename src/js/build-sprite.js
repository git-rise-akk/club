import fs from 'fs'
import path from 'path'
import svgstore from 'svgstore'
import { fileURLToPath } from 'url'
import { globSync } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const iconsDir = path.resolve(__dirname, '../icons')
const files = globSync('*.svg', { cwd: iconsDir })

console.log('Иконки для спрайта:', files)

const sprites = svgstore()

for (const file of files) {
  const id = path.basename(file, '.svg')
  const filepath = path.join(iconsDir, file)
  const svg = fs.readFileSync(filepath, 'utf8')
  sprites.add(id, svg)
}

const outputPath = path.resolve(__dirname, '../../public/sprite.svg')
fs.writeFileSync(outputPath, sprites.toString())
console.log('✅ sprite.svg generated at', outputPath)