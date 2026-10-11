import { build } from 'vite';
import { prerenderSite } from './prerender.mjs';

await build({ build: { emptyOutDir: true } });
await prerenderSite();
