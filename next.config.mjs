// BASE_PATH is the GitHub Pages sub-path for a project site, e.g. "/my-repo".
// The deploy workflow sets it from the repository name. Leave it unset for
// local development, or for a user site served from the root (name.github.io).
const basePath = process.env.BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  ...(basePath ? { basePath } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
