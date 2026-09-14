import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const products = [
  ["velvet-oud", "Velvet Oud"],
  ["citrus-bloom", "Citrus Bloom"],
  ["midnight-musk", "Midnight Musk"],
  ["golden-sahara", "Golden Sahara"],
  ["discovery-set", "Discovery Set"],
  ["duo-luxe", "Duo Luxe"],
  ["edp", "Eau de Parfum"],
  ["edt", "Eau de Toilette"],
  ["gift-set", "Gift Sets"],
]

const svg = (label) => `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
  <rect width="600" height="750" fill="#e7e5e4"/>
  <rect x="220" y="120" width="160" height="320" rx="12" fill="#d6d3d1"/>
  <rect x="260" y="80" width="80" height="60" rx="6" fill="#a8a29e"/>
  <rect x="270" y="60" width="60" height="30" rx="4" fill="#78716c"/>
  <text x="300" y="540" font-family="Georgia, serif" font-size="36" fill="#44403c" text-anchor="middle">${label}</text>
</svg>`

const dir = resolve("public", "products")
mkdirSync(dir, { recursive: true })
for (const [slug, name] of products) writeFileSync(resolve(dir, `${slug}.svg`), svg(name))
console.log(`Wrote ${products.length} SVGs to ${dir}`)
