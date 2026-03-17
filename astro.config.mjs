import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://graylee0128.github.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
