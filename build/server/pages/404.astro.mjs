import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { A as AppShell, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
export { renderers } from '../renderers.mjs';

const NotFoundContent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        window.location.pathname
      );
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 dark:text-gray-400 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
function NotFound() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(NotFoundContent, {}) });
}

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - Page Not Found" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NotFound", NotFound, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/NotFound", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/404.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
