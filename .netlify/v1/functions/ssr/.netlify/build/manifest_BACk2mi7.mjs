import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_oCWPzrGf.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/","cacheDir":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/node_modules/.astro/","outDir":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/dist/","srcDir":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/src/","publicDir":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/public/","buildClientDir":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/dist/","buildServerDir":"file:///C:/xampp/php/www/MonPortfolio/portfolio-astro/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DDPXsJ06.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DDPXsJ06.js"}],"styles":[],"routeData":{"route":"/api/get-token","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-token\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-token","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-token.ts","pathname":"/api/get-token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DDPXsJ06.js"}],"styles":[],"routeData":{"route":"/api/send-contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send-contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send-contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send-contact.ts","pathname":"/api/send-contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DDPXsJ06.js"}],"styles":[{"type":"external","src":"/_astro/index.B8IUjVRp.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://fabien-roy.fr","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/xampp/php/www/MonPortfolio/portfolio-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/get-token@_@ts":"pages/api/get-token.astro.mjs","\u0000@astro-page:src/pages/api/send-contact@_@ts":"pages/api/send-contact.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BACk2mi7.mjs","C:/xampp/php/www/MonPortfolio/portfolio-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CLCupWhR.mjs","C:/xampp/php/www/MonPortfolio/portfolio-astro/src/components/RollsPortrait":"_astro/RollsPortrait.DhoGLuKc.js","C:/xampp/php/www/MonPortfolio/portfolio-astro/src/components/ContactComponent.jsx":"_astro/ContactComponent.DRD8a6SF.js","C:/xampp/php/www/MonPortfolio/portfolio-astro/src/components/ResumeViewer.jsx":"_astro/ResumeViewer.Cldm2LJZ.js","C:/xampp/php/www/MonPortfolio/portfolio-astro/src/components/Projects.jsx":"_astro/Projects.OCipWBpm.js","@astrojs/react/client.js":"_astro/client.BO3Rm8ny.js","C:/xampp/php/www/MonPortfolio/portfolio-astro/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BCHJaFgJ.js","astro:scripts/page.js":"_astro/page.DDPXsJ06.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/xampp/php/www/MonPortfolio/portfolio-astro/src/components/Header.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"toggle-dark-mode\"),t=document.documentElement,o=localStorage.getItem(\"theme\")||\"light\";t.classList.toggle(\"dark\",o===\"dark\"),e.textContent=o===\"dark\"?\"☀️\":\"🌙\",e.addEventListener(\"click\",()=>{const n=t.classList.toggle(\"dark\");localStorage.setItem(\"theme\",n?\"dark\":\"light\"),e.textContent=n?\"☀️\":\"🌙\"})});document.addEventListener(\"scroll\",function(){let e=document.querySelector(\"header\");e&&e.classList.toggle(\"scrolled\",window.scrollY>100)});"]],"assets":["/_astro/source-code-pro-vietnamese-wght-normal.DavMBZpE.woff2","/_astro/source-code-pro-cyrillic-ext-wght-normal.DBsY_gco.woff2","/_astro/source-code-pro-greek-wght-normal.CVFU5kBX.woff2","/_astro/source-code-pro-latin-wght-normal.C54hYqvT.woff2","/_astro/source-code-pro-cyrillic-wght-normal.CDFoT8Zy.woff2","/_astro/source-code-pro-latin-ext-wght-normal.DyxEnqz4.woff2","/_astro/index.B8IUjVRp.css","/contact.png","/contact.webp","/developpeur.webp","/favicon.svg","/identity-67d4520136cf3358299333.webp","/_astro/client.BO3Rm8ny.js","/_astro/ContactComponent.DRD8a6SF.js","/_astro/index.Dy6lLLXr.js","/_astro/page.DDPXsJ06.js","/_astro/Projects.OCipWBpm.js","/_astro/proxy.CrzMwE0q.js","/_astro/ResumeViewer.Cldm2LJZ.js","/_astro/RollsPortrait.DhoGLuKc.js","/projects/portfolio-api1-67d0d2fa03641441968175.jpg","/projects/portfolio-astro1-67d0d5b357916785843358.jpg","/projects/portfolio-astro2-67d0d5be4b231609193910.jpg","/projects/proyecto1.webp","/projects/proyecto2.webp","/projects/sospro1-67d04ed97f3b9360902221.jpg","/projects/zooaracadia1-67d0367072ced161776008.jpg","/projects/zooaracadia2-67d03678808e9248702050.jpg","/projects/zooaracadia3-67d0367e98eab890383041.jpg","/uploads/users/identity-67d4520136cf3358299333.webp","/_astro/page.DDPXsJ06.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"rzJX8sgYMOm5fCmPu4KZ6GNr4WrDuwq4HpqbKE4b9No="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
