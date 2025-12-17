import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/AppShell_BklFfeZH.mjs';
import { B as Blog } from '../../chunks/Blog_B5YRek9e.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog Post - X Minecraft Launcher", "description": "Read our blog post about X Minecraft Launcher." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Blog", Blog, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/Blog", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/blog/[...slug].astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
