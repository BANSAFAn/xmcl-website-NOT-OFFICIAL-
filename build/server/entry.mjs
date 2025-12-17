import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BWDoWgOP.mjs';
import { manifest } from './manifest_V7k74Jj1.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page4 = () => import('./pages/changelog.astro.mjs');
const _page5 = () => import('./pages/download.astro.mjs');
const _page6 = () => import('./pages/guide.astro.mjs');
const _page7 = () => import('./pages/guide/_---slug_.astro.mjs');
const _page8 = () => import('./pages/information.astro.mjs');
const _page9 = () => import('./pages/issues.astro.mjs');
const _page10 = () => import('./pages/testing.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/blog.astro", _page2],
    ["src/pages/blog/[...slug].astro", _page3],
    ["src/pages/changelog.astro", _page4],
    ["src/pages/download.astro", _page5],
    ["src/pages/guide.astro", _page6],
    ["src/pages/guide/[...slug].astro", _page7],
    ["src/pages/information.astro", _page8],
    ["src/pages/issues.astro", _page9],
    ["src/pages/testing.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2294526e-f1d5-44d1-ae65-10b2e7d5560e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
