/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as renderHead, d as renderComponent, e as renderSlot, f as createAstro, s as spreadAttributes } from '../chunks/astro/server_BkMGbEIY.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="flex justify-center items-center mx-auto py-5 sticky top-0 w-full xl:w-[1120px] z-10"> <nav class="flex flex-wrap justify-center items-center px-3 text-sm font-medium rounded-full"> <a class="hover:bg-white/10 rounded-full px-3 py-1 transition text-base md:text-sm" href="#top">Acceuil</a> <a class="hover:bg-white/10 rounded-full px-3 py-1 transition text-base md:text-sm" href="#technology">Technologies</a> <a class="hover:bg-white/10 rounded-full px-3 py-1 transition text-base md:text-sm" href="#project">Projets</a> <!-- <a class="hover:bg-white/10 rounded-full px-3 py-1 transition text-base md:text-sm" href="#certificados">Certificados</a> --> <a class="hover:bg-white/10 rounded-full px-3 py-1 transition text-base md:text-sm" href="#about">A propos</a> </nav>  </header>`;
}, "/app/src/components/Header.astro", undefined);

const $$Astro$A = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$A, $$props, $$slots);
  Astro2.self = $$Layout;
  const { description, title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <div class="background"></div> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])}  </body></html>`;
}, "/app/src/layouts/Layout.astro", undefined);

const $$Badge = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 mt-4 py-0.5 rounded dark:bg-green-900 dark:text-green-300"> ${renderSlot($$result, $$slots["default"])}</span>`;
}, "/app/src/components/Badge.astro", undefined);

const $$Astro$z = createAstro();
const $$Linkedin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$z, $$props, $$slots);
  Astro2.self = $$Linkedin;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"> <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="white"></path></svg>`;
}, "/app/src/icons/Social/Linkedin.astro", undefined);

const $$Astro$y = createAstro();
const $$Github = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$y, $$props, $$slots);
  Astro2.self = $$Github;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 250" width="256" height="250" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"> <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"></path> </svg>`;
}, "/app/src/icons/Social/Github.astro", undefined);

const $$Astro$x = createAstro();
const $$SocialIcons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$SocialIcons;
  return renderTemplate`${maybeRenderHead()}<a class="rounded-full border border-white/10 flex justify-center items-center gap-x-2 py-1 px-2 md:py-2 md:px-4 
text-xs md:text-base
 bg-white/5 hover:scale-110 hover:bg-white/20 transition"${spreadAttributes(Astro2.props)} target="_blank" rel="noopener noreferrer"> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/app/src/components/Social_icons.astro", undefined);

const $$Astro$w = createAstro();
const $$Gmail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Gmail;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" viewBox="0 49.4 512 399.42"> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero"> <path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"></path> <path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"></path> <path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"></path> </g> <path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"></path> <path fill="#c5221f" fill-rule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"></path> </g> </svg>`;
}, "/app/src/icons/Social/Gmail.astro", undefined);

const $$Astro$v = createAstro();
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$Section;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="w-full mx-auto lg:w-[800px] py-36"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/app/src/components/Section.astro", undefined);

const $$Astro$u = createAstro();
const $$SectionTechno = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$SectionTechno;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="w-full mx-auto lg:w-[1220px] pt-32 pb-28"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/app/src/components/Section_techno.astro", undefined);

const $$Astro$t = createAstro();
const $$TecnosIcons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$TecnosIcons;
  return renderTemplate`${maybeRenderHead()}<span class="rounded-full border border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 bg-white/5 hover:scale-110 hover:bg-white/10 transition"${spreadAttributes(Astro2.props)}> ${renderSlot($$result, $$slots["default"])} </span>`;
}, "/app/src/components/Tecnos_icons.astro", undefined);

const $$Astro$s = createAstro();
const $$TecnoIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$TecnoIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-category"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 4h6v6h-6z"></path><path d="M14 4h6v6h-6z"></path><path d="M4 14h6v6h-6z"></path><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path></svg>`;
}, "/app/src/icons/Titulos/Tecno_icon.astro", undefined);

const $$Astro$r = createAstro();
const $$Html = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Html;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520"> <path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52"></path> <path fill="#ef652a" d="M226 472l149-41 35-394H226"></path> <path fill="#ecedee" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"></path> <path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"></path> </svg>`;
}, "/app/src/icons/Tecnologias/Lenguajes/Html.astro", undefined);

const $$Astro$q = createAstro();
const $$Css = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Css;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520"> <path fill="#0c73b8" d="M41 460L0 0h451l-41 460-185 52"></path> <path fill="#30a9dc" d="M226 472l149-41 35-394H226"></path> <path fill="#ecedee" d="M226 208H94l5 57h127zm0-114H84l5 56h137zm0 261l-124-33 7 60 117 32z"></path> <path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 26-288H226v56h80l-6 58h-74z"></path> </svg>`;
}, "/app/src/icons/Tecnologias/Lenguajes/Css.astro", undefined);

const $$Astro$p = createAstro();
const $$Js = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Js;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="2500" height="2500" viewBox="0 0 1052 1052"><path fill="#f0db4f" d="M0 0h1052v1052H0z"></path><path d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z" fill="#323330"></path></svg>`;
}, "/app/src/icons/Tecnologias/Lenguajes/Js.astro", undefined);

const $$Astro$o = createAstro();
const $$Php = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Php;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 100 50"><path d="M7.579 10.123h14.204c4.169.035 7.19 1.237 9.063 3.604 1.873 2.367 2.491 5.6 1.855 9.699-.247 1.873-.795 3.71-1.643 5.512a16.385 16.385 0 01-3.392 4.876c-1.767 1.837-3.657 3.003-5.671 3.498a26.11 26.11 0 01-6.254.742h-6.36l-2.014 10.07H0l7.579-38.001m6.201 6.042l-3.18 15.9c.212.035.424.053.636.053h.742c3.392.035 6.219-.3 8.48-1.007 2.261-.742 3.781-3.321 4.558-7.738.636-3.71 0-5.848-1.908-6.413-1.873-.565-4.222-.83-7.049-.795-.424.035-.83.053-1.219.053h-1.113l.053-.053M41.093 0h7.314L46.34 10.123h6.572c3.604.071 6.289.813 8.056 2.226 1.802 1.413 2.332 4.099 1.59 8.056l-3.551 17.649h-7.42L54.979 21.2c.353-1.767.247-3.021-.318-3.763s-1.784-1.113-3.657-1.113l-5.883-.053-4.346 21.783h-7.314L41.093 0M70.412 10.123h14.204c4.169.035 7.19 1.237 9.063 3.604 1.873 2.367 2.491 5.6 1.855 9.699-.247 1.873-.795 3.71-1.643 5.512a16.385 16.385 0 01-3.392 4.876c-1.767 1.837-3.657 3.003-5.671 3.498a26.11 26.11 0 01-6.254.742h-6.36L70.2 48.124h-7.367l7.579-38.001m6.201 6.042l-3.18 15.9c.212.035.424.053.636.053h.742c3.392.035 6.219-.3 8.48-1.007 2.261-.742 3.781-3.321 4.558-7.738.636-3.71 0-5.848-1.908-6.413-1.873-.565-4.222-.83-7.049-.795-.424.035-.83.053-1.219.053H76.56l.053-.053"></path></svg>`;
}, "/app/src/icons/Tecnologias/Lenguajes/Php.astro", undefined);

const $$Astro$n = createAstro();
const $$Rust = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Rust;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="2500px" height="2500px" viewBox="15 15 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m47.781 31.608-1.343-.832a18.57 18.57 0 0 0-.038-.391l1.154-1.077a.46.46 0 0 0-.153-.771l-1.476-.552a16.798 16.798 0 0 0-.115-.381l.92-1.279a.462.462 0 0 0-.3-.727l-1.557-.253c-.06-.118-.123-.234-.187-.35l.654-1.435a.46.46 0 0 0-.437-.654l-1.579.055a12.482 12.482 0 0 0-.25-.302l.363-1.539a.461.461 0 0 0-.556-.556l-1.538.362c-.1-.084-.2-.167-.303-.25l.055-1.578a.46.46 0 0 0-.654-.437l-1.435.654a16.712 16.712 0 0 0-.35-.188l-.253-1.556a.462.462 0 0 0-.726-.301l-1.28.92a14.31 14.31 0 0 0-.38-.115l-.552-1.476a.461.461 0 0 0-.771-.154l-1.077 1.156c-.13-.014-.26-.028-.391-.038l-.832-1.344a.462.462 0 0 0-.786 0l-.832 1.344c-.13.01-.261.024-.391.038l-1.077-1.155a.464.464 0 0 0-.771.153l-.552 1.476c-.128.037-.255.076-.38.116l-1.28-.921a.46.46 0 0 0-.727.3l-.254 1.557c-.117.061-.233.124-.35.188l-1.434-.654a.46.46 0 0 0-.654.436l.055 1.58c-.102.082-.203.165-.303.25l-1.538-.363a.464.464 0 0 0-.557.556l.363 1.539c-.085.1-.168.2-.25.302l-1.579-.055a.462.462 0 0 0-.437.654l.654 1.436c-.063.115-.126.231-.187.35l-1.556.252a.462.462 0 0 0-.301.727l.92 1.279c-.04.126-.078.253-.115.38l-1.476.553a.462.462 0 0 0-.153.771l1.155 1.077c-.015.13-.028.26-.039.391l-1.343.832a.462.462 0 0 0 0 .786l1.343.831c.011.131.024.262.039.392l-1.155 1.077a.462.462 0 0 0 .153.771l1.476.552c.037.128.076.255.116.38l-.921 1.28a.462.462 0 0 0 .301.726l1.556.253c.061.118.123.235.188.35l-.655 1.435a.462.462 0 0 0 .437.654l1.579-.055c.082.103.165.203.25.303l-.363 1.539a.46.46 0 0 0 .557.555l1.538-.362c.1.085.201.167.303.249l-.055 1.58a.461.461 0 0 0 .654.436l1.435-.654c.115.064.232.127.35.188l.253 1.555a.461.461 0 0 0 .727.302l1.279-.922c.126.04.253.08.38.116l.552 1.476a.46.46 0 0 0 .771.153l1.078-1.155c.13.015.26.028.391.04l.832 1.343a.463.463 0 0 0 .786 0l.831-1.344c.131-.011.262-.024.392-.039l1.077 1.155a.46.46 0 0 0 .77-.153l.553-1.476c.127-.036.254-.076.38-.116l1.28.922a.463.463 0 0 0 .726-.302l.254-1.556c.117-.06.233-.124.349-.187l1.435.654a.461.461 0 0 0 .654-.437l-.055-1.58c.102-.08.203-.163.303-.248l1.538.362a.46.46 0 0 0 .556-.555l-.362-1.539c.084-.1.167-.2.249-.303l1.58.055a.46.46 0 0 0 .436-.654l-.654-1.435c.064-.115.126-.232.187-.35l1.556-.253a.46.46 0 0 0 .301-.726l-.92-1.28a17.5 17.5 0 0 0 .115-.38l1.476-.552a.46.46 0 0 0 .153-.771l-1.155-1.077c.014-.13.027-.261.039-.392l1.343-.831a.462.462 0 0 0 0-.786zM38.79 42.752a.952.952 0 0 1 .399-1.861.952.952 0 0 1-.4 1.861zm-.457-3.087a.866.866 0 0 0-1.028.666l-.477 2.226A11.649 11.649 0 0 1 32 43.597c-1.76 0-3.43-.39-4.929-1.087l-.477-2.225a.866.866 0 0 0-1.028-.667l-1.965.422a11.68 11.68 0 0 1-1.016-1.197h9.561c.108 0 .18-.02.18-.118v-3.382c0-.099-.072-.118-.18-.118H29.35V33.08h3.024c.276 0 1.476.079 1.86 1.613.12.471.384 2.006.564 2.497.18.551.912 1.652 1.692 1.652h4.764a.977.977 0 0 0 .173-.017c-.33.449-.693.874-1.083 1.27l-2.01-.431zm-13.223 3.04a.952.952 0 0 1-.399-1.861.95.95 0 0 1 .398 1.862zm-3.627-14.707a.95.95 0 1 1-1.737.771.95.95 0 1 1 1.737-.771zm-1.115 2.643 2.047-.91a.868.868 0 0 0 .44-1.145l-.421-.953h1.658v7.474h-3.345a11.714 11.714 0 0 1-.38-4.466zm8.983-.726v-2.203h3.948c.204 0 1.44.236 1.44 1.16 0 .767-.948 1.043-1.728 1.043h-3.66zM43.7 31.898c0 .292-.011.581-.033.868h-1.2c-.12 0-.168.08-.168.197v.551c0 1.298-.732 1.58-1.373 1.652-.61.068-1.288-.256-1.371-.63-.36-2.025-.96-2.458-1.908-3.206 1.176-.746 2.4-1.848 2.4-3.323 0-1.593-1.092-2.596-1.836-3.088-1.044-.688-2.2-.826-2.512-.826H23.285a11.684 11.684 0 0 1 6.545-3.694l1.463 1.535c.331.346.88.36 1.225.028l1.638-1.566a11.71 11.71 0 0 1 8.009 5.704l-1.121 2.532a.869.869 0 0 0 .44 1.145l2.159.958c.037.383.056.77.056 1.163zM31.294 19.093a.95.95 0 0 1 1.344.031.952.952 0 0 1-.032 1.346.949.949 0 0 1-1.343-.032.953.953 0 0 1 .031-1.345zm11.123 8.951a.95.95 0 1 1 1.737.772.95.95 0 1 1-1.737-.772z" fill="#c5412b"></path></svg>`;
}, "/app/src/icons/Tecnologias/Lenguajes/Rust.astro", undefined);

const $$Astro$m = createAstro();
const $$Ast = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Ast;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 366" xmlns="http://www.w3.org/2000/svg" width="256" height="366" preserveAspectRatio="xMidYMid"><path d="M182.022 9.147c2.982 3.702 4.502 8.697 7.543 18.687L256 246.074a276.467 276.467 0 0 0-79.426-26.891L133.318 73.008a5.63 5.63 0 0 0-10.802.017L79.784 219.11A276.453 276.453 0 0 0 0 246.04L66.76 27.783c3.051-9.972 4.577-14.959 7.559-18.654a24.541 24.541 0 0 1 9.946-7.358C88.67 0 93.885 0 104.314 0h47.683c10.443 0 15.664 0 20.074 1.774a24.545 24.545 0 0 1 9.95 7.373Z"></path><path fill="#FF5D01" d="M189.972 256.46c-10.952 9.364-32.812 15.751-57.992 15.751-30.904 0-56.807-9.621-63.68-22.56-2.458 7.415-3.009 15.903-3.009 21.324 0 0-1.619 26.623 16.898 45.14 0-9.615 7.795-17.41 17.41-17.41 16.48 0 16.46 14.378 16.446 26.043l-.001 1.041c0 17.705 10.82 32.883 26.21 39.28a35.685 35.685 0 0 1-3.588-15.647c0-16.886 9.913-23.173 21.435-30.48 9.167-5.814 19.353-12.274 26.372-25.232a47.588 47.588 0 0 0 5.742-22.735c0-5.06-.786-9.938-2.243-14.516Z"></path></svg>`;
}, "/app/src/icons/Tecnologias/Frameworks_Librerias/Ast.astro", undefined);

const $$Astro$l = createAstro();
const $$Bootstrap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Bootstrap;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 204" xmlns="http://www.w3.org/2000/svg" width="256" height="204" preserveAspectRatio="xMidYMid"><path fill="#7E13F8" d="M53.172 0C38.565 0 27.756 12.785 28.24 26.65c.465 13.32-.139 30.573-4.482 44.642C19.402 85.402 12.034 94.34 0 95.488v12.956c12.034 1.148 19.402 10.086 23.758 24.197 4.343 14.069 4.947 31.32 4.482 44.641-.484 13.863 10.325 26.65 24.934 26.65h149.673c14.608 0 25.414-12.785 24.93-26.65-.464-13.32.139-30.572 4.482-44.641 4.359-14.11 11.707-23.05 23.741-24.197V95.488c-12.034-1.148-19.382-10.086-23.74-24.196-4.344-14.067-4.947-31.321-4.483-44.642C228.261 12.787 217.455 0 202.847 0H53.17h.002ZM173.56 125.533c0 19.092-14.24 30.67-37.872 30.67h-40.23a4.339 4.339 0 0 1-4.338-4.339V52.068a4.339 4.339 0 0 1 4.339-4.34h39.999c19.705 0 32.637 10.675 32.637 27.063 0 11.503-8.7 21.801-19.783 23.604v.601c15.089 1.655 25.248 12.104 25.248 26.537Zm-42.26-64.05h-22.937v32.4h19.32c14.934 0 23.17-6.014 23.17-16.764 0-10.073-7.082-15.636-19.552-15.636Zm-22.937 45.256v35.705h23.782c15.548 0 23.786-6.239 23.786-17.965 0-11.728-8.467-17.742-24.786-17.742h-22.782v.002Z"></path></svg>`;
}, "/app/src/icons/Tecnologias/Frameworks_Librerias/Bootstrap.astro", undefined);

const $$Astro$k = createAstro();
const $$Node = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Node;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 292" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="292"><defs><linearGradient id="a" x1="68.188%" x2="27.823%" y1="17.487%" y2="89.755%"><stop offset="0%" stop-color="#41873F"></stop><stop offset="32.88%" stop-color="#418B3D"></stop><stop offset="63.52%" stop-color="#419637"></stop><stop offset="93.19%" stop-color="#3FA92D"></stop><stop offset="100%" stop-color="#3FAE2A"></stop></linearGradient><linearGradient id="c" x1="43.277%" x2="159.245%" y1="55.169%" y2="-18.306%"><stop offset="13.76%" stop-color="#41873F"></stop><stop offset="40.32%" stop-color="#54A044"></stop><stop offset="71.36%" stop-color="#66B848"></stop><stop offset="90.81%" stop-color="#6CC04A"></stop></linearGradient><linearGradient id="f" x1="-4.389%" x2="101.499%" y1="49.997%" y2="49.997%"><stop offset="9.192%" stop-color="#6CC04A"></stop><stop offset="28.64%" stop-color="#66B848"></stop><stop offset="59.68%" stop-color="#54A044"></stop><stop offset="86.24%" stop-color="#41873F"></stop></linearGradient><path id="b" d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"></path><path id="e" d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"></path></defs><path fill="url(#a)" d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"></path><mask id="d" fill="#fff"><use xlink:href="#b"></use></mask><path fill="url(#c)" d="M249.485 67.8 134.65 1.833c-1.086-.542-2.443-1.085-3.529-1.357L2.443 220.912c1.086 1.357 2.444 2.443 3.8 3.258l114.834 65.968c3.258 1.9 7.059 2.443 10.588 1.357L252.47 70.515c-.815-1.086-1.9-1.9-2.986-2.714Z" mask="url(#d)"></path><mask id="g" fill="#fff"><use xlink:href="#e"></use></mask><path fill="url(#f)" d="M249.756 223.898c3.258-1.9 5.701-5.158 6.787-8.687L130.579.204c-3.258-.543-6.787-.272-9.773 1.628L6.786 67.53l122.979 224.238c1.628-.272 3.529-.815 5.158-1.63l114.833-66.239Z" mask="url(#g)"></path></svg>`;
}, "/app/src/icons/Tecnologias/Frameworks_Librerias/Node.astro", undefined);

const $$Astro$j = createAstro();
const $$React = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$React;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 228" width="256" height="228" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z" fill="#00D8FF"></path></svg>`;
}, "/app/src/icons/Tecnologias/Frameworks_Librerias/React.astro", undefined);

const $$Astro$i = createAstro();
const $$Tailwind = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Tailwind;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 154" width="256" height="154" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"> <defs><linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="gradient"> <stop stop-color="#2298BD" offset="0%"></stop> <stop stop-color="#0ED7B5" offset="100%"></stop> </linearGradient></defs> <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z" fill="url(#gradient)"></path></svg>`;
}, "/app/src/icons/Tecnologias/Frameworks_Librerias/Tailwind.astro", undefined);

const $$Astro$h = createAstro();
const $$Mongo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Mongo;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 549" xmlns="http://www.w3.org/2000/svg" width="256" height="549" preserveAspectRatio="xMidYMid"><path fill="#01EC64" d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.704 26.234 5.966 63.988 5.966 63.988h17.045s4.26-37.54 5.965-63.987l1.918-1.494c.213.214 228.828-169.78 31.32-421.677Zm-47.726 418.05s-10.227-8.744-12.997-13.222v-.428l12.358-274.292c0-.853 1.279-.853 1.279 0l12.357 274.292v.428c-2.77 4.478-12.997 13.223-12.997 13.223Z"></path></svg>`;
}, "/app/src/icons/Tecnologias/Bases_de_datos/Mongo.astro", undefined);

const $$Astro$g = createAstro();
const $$Mysql = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Mysql;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 252"> <path d="M236 194c-14 0-25 1-34 5-3 1-7 1-7 4l3 6c2 3 5 8 9 11l11 8 21 10 11 9 6 4-3-6-5-5c-5-7-11-13-18-18-6-3-18-9-20-15h-1l12-3 18-3 8-2v-2l-9-10c-8-8-18-15-28-22l-18-8c-2-1-6-2-7-4l-7-13-15-30-8-20c-18-30-38-48-68-65-6-4-14-5-22-7l-13-1-8-6C34 5 8-9 1 9c-5 11 7 22 11 28l9 13 3 9c3 8 5 17 9 24l6 10c2 2 4 3 5 6-3 4-3 9-4 13-7 20-4 44 5 59 2 4 9 14 18 10 8-3 6-13 8-22l1-4 8 14c5 9 14 18 22 24 4 3 8 8 13 10l-4-4-9-10c-8-10-14-21-20-32l-7-17-3-6c-3 4-7 7-9 12-3 7-3 17-4 26h-1c-6-1-8-7-10-12-5-12-6-32-1-46 1-4 6-15 4-19-1-3-4-5-6-7l-7-12-10-30-9-13c-3-5-7-8-10-14-1-2-2-5 0-7l2-2c2-2 9 0 11 1 6 3 12 5 17 9l8 6h4c6 1 12 0 17 2 9 3 18 7 25 12 23 14 42 35 54 59 3 4 3 8 5 12l12 26c4 8 7 16 12 23 3 4 14 6 18 8l12 4 18 12c2 2 11 7 12 10Z" fill="#00546B"></path> <path d="m58 43-7 1 6 7 4 9v-1c3-1 4-4 4-8l-2-4-5-4Z" fill="#00546B"></path> </svg>`;
}, "/app/src/icons/Tecnologias/Bases_de_datos/Mysql.astro", undefined);

const $$Astro$f = createAstro();
const $$Figma = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Figma;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} width="54" height="80" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_912_3)"> <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83"></path> <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF"></path> <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E"></path> <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262"></path> <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE"></path> </g> <defs> <clipPath id="clip0_912_3"> <rect width="53.3333" height="80" fill="white"></rect> </clipPath> </defs> </svg>`;
}, "/app/src/icons/Tecnologias/Herramientas_Adicionales/Figma.astro", undefined);

const $$Astro$e = createAstro();
const $$Git = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Git;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"> <path d="M251.17 116.6 139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-.57V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33" fill="#DE4C36"></path> </svg>`;
}, "/app/src/icons/Tecnologias/Herramientas_Adicionales/Git.astro", undefined);

const $$Astro$d = createAstro();
const $$Netlify = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Netlify;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 226" xmlns="http://www.w3.org/2000/svg" width="256" height="226" preserveAspectRatio="xMidYMid"><path fill="#05BDBA" d="M69.181 188.087h-2.417l-12.065-12.065v-2.417l18.444-18.444h12.778l1.704 1.704v12.778zM54.699 51.628v-2.417l12.065-12.065h2.417L87.625 55.59v12.778l-1.704 1.704H73.143z"></path><path fill="#014847" d="M160.906 149.198h-17.552l-1.466-1.466v-41.089c0-7.31-2.873-12.976-11.689-13.174-4.537-.119-9.727 0-15.274.218l-.833.852v53.173l-1.466 1.466H95.074l-1.466-1.466v-70.19l1.466-1.467h39.503c15.354 0 27.795 12.441 27.795 27.795v43.882l-1.466 1.466Z"></path><path fill="#05BDBA" d="M71.677 122.889H1.466L0 121.423V103.83l1.466-1.466h70.211l1.466 1.466v17.593zM254.534 122.889h-70.211l-1.466-1.466V103.83l1.466-1.466h70.211L256 103.83v17.593zM117.876 54.124V1.466L119.342 0h17.593l1.466 1.466v52.658l-1.466 1.466h-17.593zM117.876 223.787v-52.658l1.466-1.466h17.593l1.466 1.466v52.658l-1.466 1.465h-17.593z"></path></svg>`;
}, "/app/src/icons/Tecnologias/Herramientas_Adicionales/Netlify.astro", undefined);

const $$Astro$c = createAstro();
const $$Vercel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Vercel;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 222" width="256" height="222" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path fill="#000" d="m128 0 128 221.705H0z"></path></svg>`;
}, "/app/src/icons/Tecnologias/Herramientas_Adicionales/Vercel.astro", undefined);

const $$Astro$b = createAstro();
const $$Notion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Notion;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="256" height="268" preserveAspectRatio="xMidYMid" viewBox="0 0 256 268"><path fill="#FFF" d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"></path><path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z"></path></svg>`;
}, "/app/src/icons/Tecnologias/Herramientas_Adicionales/Notion.astro", undefined);

const $$Astro$a = createAstro();
const $$Technology = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Technology;
  const LANGAGES = [
    { title: "HTML", icon: $$Html },
    { title: "CSS", icon: $$Css },
    { title: "JavaScript", icon: $$Js },
    { title: "PHP", icon: $$Php },
    { title: "Rust", icon: $$Rust }
  ];
  const FRAMEWORKS_LIBRARIES = [
    { title: "Astro", icon: $$Ast },
    { title: "Bootstrap", icon: $$Bootstrap },
    // { title: "Express", icon: Express },
    { title: "Node.js", icon: $$Node },
    { title: "React", icon: $$React },
    { title: "Tailwind CSS", icon: $$Tailwind }
    // { title: "Rust", icon: Rust}
  ];
  const BASES_DE_DONNEES = [
    { title: "MongoDB", icon: $$Mongo },
    { title: "MySQL", icon: $$Mysql }
  ];
  const OUTILS_ADDITIONNELS = [
    { title: "Figma", icon: $$Figma },
    { title: "Git", icon: $$Git },
    { title: "Netlify", icon: $$Netlify },
    { title: "Vercel", icon: $$Vercel },
    { title: "Notion", icon: $$Notion }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center"> <h2 class="text-4xl font-semibold pb-10 flex gap-x-3 items-center text-center mb-4"> ${renderComponent($$result, "Tecno_icon", $$TecnoIcon, { "class": "w-12 h-12" })} Technologies
</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-4"> <!-- Langages --> <div> <h2 class="text-2xl opacity-80 mb-6 text-center">Langages</h2> <nav class="flex flex-wrap justify-center gap-4"> ${LANGAGES.map(({ title, icon: Icon }) => renderTemplate`${renderComponent($$result, "Tecnos_icons", $$TecnosIcons, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", Icon, { "class": "w-12 h-12" })} ${title}` })}`)} </nav> </div> <!-- Frameworks et Librairies --> <div> <h2 class="text-2xl opacity-80 mb-6 text-center">Frameworks et Librairies</h2> <nav class="flex flex-wrap justify-center gap-4"> ${FRAMEWORKS_LIBRARIES.map(({ title, icon: Icon }) => renderTemplate`${renderComponent($$result, "Tecnos_icons", $$TecnosIcons, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", Icon, { "class": "w-12 h-12" })} ${title}` })}`)} </nav> </div> <!-- Bases de Données --> <div> <h2 class="text-2xl opacity-80 mb-6 text-center">Bases de Données</h2> <nav class="flex flex-wrap justify-center gap-4"> ${BASES_DE_DONNEES.map(({ title, icon: Icon }) => renderTemplate`${renderComponent($$result, "Tecnos_icons", $$TecnosIcons, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", Icon, { "class": "w-12 h-12" })} ${title}` })}`)} </nav> </div> <!-- Outils Additionnels --> <div> <h2 class="text-2xl opacity-80 mb-6 text-center">Outils Additionnels</h2> <nav class="flex flex-wrap justify-center gap-4"> ${OUTILS_ADDITIONNELS.map(({ title, icon: Icon }) => renderTemplate`${renderComponent($$result, "Tecnos_icons", $$TecnosIcons, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", Icon, { "class": "w-12 h-12" })} ${title}` })}`)} </nav> </div> </div> </div>`;
}, "/app/src/components/Technology.astro", undefined);

const $$Astro$9 = createAstro();
const $$Code = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Code;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 8l-4 4l4 4"></path><path d="M17 8l4 4l-4 4"></path><path d="M14 4l-4 16"></path></svg>`;
}, "/app/src/icons/Titulos/Code.astro", undefined);

const $$Astro$8 = createAstro();
const $$Project = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Project;
  const { projects } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-y-16"> ${projects.map(({ image, title, description, tags, link, github }) => renderTemplate`<article class="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0"> <div class="w-full md:w-1/2 flex items-center group"> <div class="relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl lg:border lg:border-gray-800 group-hover:shadow-2xl"> <img alt="Captura del Proyecto" class="object-cover object-top w-full h-56 transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105" loading="lazy"${addAttribute(image, "src")}> </div> </div> <div class="w-full md:w-1/2 flex flex-col justify-center"> <h3 class="text-2xl font-bold mb-2">${title}</h3> <div class="flex flex-wrap mt-2"> <ul class="flex flex-row mb-2 gap-x-2"> ${tags.map((tag) => renderTemplate`<li> <span class="flex gap-x-2 rounded-full text-xs bg-gray-700 text-white py-1 px-2"> ${tag} </span> </li>`)} </ul> </div> <div class="mt-2 text-lg mb-4">${description}</div> <footer class="flex items-end justify-start mt-4 gap-x-4"> ${github && renderTemplate`<a${addAttribute(github, "href")} class="flex items-center gap-x-2"> <span class="size-6">🔗</span> Code
</a>`} ${link && renderTemplate`<a${addAttribute(link, "href")} class="flex items-center gap-x-2"> <span class="size-4">🌐</span> Preview
</a>`} </footer> </div> </article>`)} </div>`;
}, "/app/src/components/Project.astro", undefined);

const $$Astro$7 = createAstro();
const $$Experience = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Experience;
  const { experiences } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="container px-5 py-6 mx-auto space-y-12"> <div class="relative border-l border-gray-800 pl-6"> ${experiences.map(({ startDate, endDate, position, name, summary, responsibilities, achievements, skills, location, location_type }) => {
    const startYear = startDate;
    const endYear = endDate ? endDate : "Pr\xE9sent";
    return renderTemplate`<div class="mb-10"> <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 mt-2"></div> <h2 class="text-white text-2xl font-bold">${startYear} - ${endYear}</h2> <p class="text-xl font-semibold">${position} @ ${name}</p> <p class="leading-relaxed text-base">${summary}</p> ${responsibilities && renderTemplate`<ul class="list-disc ml-4 text-skin-muted"> ${responsibilities.map((responsibility) => renderTemplate`<li>${responsibility}</li>`)} </ul>`} ${achievements && renderTemplate`<ul class="list-disc ml-4 text-skin-muted"> ${achievements.map((achievement) => renderTemplate`<li>${achievement}</li>`)} </ul>`} <ul class="flex flex-wrap gap-2 mt-2"> ${skills && skills.map((skill) => renderTemplate`<li class="bg-skin-button-accent/20 border-skin-hue/20 text-skin-hue border rounded-md px-2 py-0.5 text-xs"> ${skill} </li>`)} </ul> </div>`;
  })} </div> </section>`;
}, "/app/src/components/Experience.astro", undefined);

const $$Astro$6 = createAstro();
const $$Formation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Formation;
  const { formations } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="container px-5 py-6 mx-auto space-y-12"> <div class="relative border-l border-gray-800 pl-6"> ${formations.map(({ year, title, description }) => renderTemplate`<div class="mb-10"> <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 mt-2"></div> <h2 class="text-white text-2xl font-bold">${year}</h2> <p class="text-xl font-semibold">${title}</p> <p class="leading-relaxed text-base">${description}</p> </div>`)} </div> </section>`;
}, "/app/src/components/Formation.astro", undefined);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col md:flex-row gap-x-8 justify-center items-center"> <div class="[&>p]:mb-4 [&>p>strong]:text-blue-300 [&>p>strong]:font-semibold text-pretty"> <p>
Je m'appelle <strong>Fabien Roy</strong>. Après 15 ans d'expérience dans les réseaux fibre optique, dont 6 années en tant que conducteur de travaux spécialisé dans le déploiement de la fibre optique, j’ai décidé d'entamer une reconversion vers le <strong>développement web et mobile</strong>.
</p> <p>
J'ai obtenu un <strong>certificat d'État niveau 5 en Développement Web et Web Mobile (DWWM)</strong> à l'école Studi en candidat libre, tout en travaillant à plein temps. Cette expérience a renforcé ma persévérance et ma capacité à m’adapter à des défis exigeants.
</p> <p>
Avant même cette reconversion, ma passion pour la programmation était déjà présente. Dans mon ancien métier, j’utilisais des scripts en <strong>VBA</strong> pour automatiser des tâches répétitives, optimisant ainsi mon temps et la qualité des résultats. Aujourd’hui, cette aptitude à rechercher des solutions innovantes s’applique pleinement à mes projets de développement.
</p> <p class="text-pretty">
Je me spécialise en <strong>développement backend avec Symfony</strong> et continue d'explorer d'autres technologies comme Node.js et Python. Chaque jour, je cherche à améliorer mes compétences, à travailler sur des projets concrets et à approfondir mes connaissances.
</p> </div> <img src="/developpeur.webp" alt="Fabien Roy" class="rounded-full size-64"> </section>`;
}, "/app/src/components/About.astro", undefined);

const $$Astro$5 = createAstro();
const $$CertIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CertIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-certificate"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path><path d="M6 9l12 0"></path><path d="M6 12l3 0"></path><path d="M6 15l2 0"></path></svg>`;
}, "/app/src/icons/Titulos/Cert_icon.astro", undefined);

const $$Astro$4 = createAstro();
const $$ExpIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ExpIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" fill="#fff" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M5,10v-2h2v2h10v-2h2v2h5v-3c0-1.654-1.346-3-3-3h-3V2c0-1.103-.897-2-2-2H8c-1.103,0-2,.897-2,2v2H3c-1.654,0-3,1.346-3,3v3H5ZM8,2h8v2H8V2ZM24,12v12H0V12H5v2h2v-2h10v2h2v-2h5Z"></path></svg>`;
}, "/app/src/icons/Titulos/Exp_icon.astro", undefined);

const $$Astro$3 = createAstro();
const $$MyIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MyIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path></svg>`;
}, "/app/src/icons/Titulos/My_icon.astro", undefined);

const $$Astro$2 = createAstro();
const $$SectionAbout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SectionAbout;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="w-full mx-auto lg:w-[740px] pb-32"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/app/src/components/Section_about.astro", undefined);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="opacity-80 m-4 mt-8 w-full mx-auto container lg:max-w-4xl md:max-w-2xl mb-10 flex justify-center"> <div class="rounded-lg w-full max-w-screen-xl mx-auto md:flex md:items-center md:justify-between py-4"> <span class="text-sm sm:text-center flex items-center"> <a href="https://github.com/fabry44" target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center ml-2"> ${renderComponent($$result, "Github", $$Github, { "class": "size-4 md:size-6 mr-2" })}
Fabien Roy
</a>.
</span> <ul class="flex flex-wrap items-center mt-3 text-sm font-medium dark:text-white/90 sm:mt-0"> <li> <a href="#About" class="hover:underline me-4 md:me-6">A propos</a> </li> <li> <a id="contact" href="mailto:fabienroy2@gmail.com@gmail.com" class="hover:underline">Me contacter</a> </li> </ul> </div> </footer>`;
}, "/app/src/components/Footer.astro", undefined);

const $$Astro$1 = createAstro();
const $$SectionFormation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SectionFormation;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="w-full mx-auto lg:w-[1220px] pt-16 pb-28"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/app/src/components/Section_formation.astro", undefined);

const $$Astro = createAstro();
const $$SectionExperience = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionExperience;
  const { id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="w-full mx-auto lg:w-[1220px] pt-16 pb-28"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/app/src/components/Section_experience.astro", undefined);

const user = {
	email: "fabienroy2@gmail.com",
	name: "Roy Fabien",
	phone: "0650262098",
	address: "22 rue des Renardières 44100 Nantes",
	linkedin: null,
	github: null,
	status: null,
	bio: null
};
const formations = [
	{
		degree: "Certificat d'État niveau 5 - Développement Web et Web Mobile",
		institution: "École Studi",
		date: "2025-01-01T00:00:00+00:00",
		description: "Formation suivie en candidat libre à l'école Studi, spécialisée en développement backend avec Symfony."
	},
	{
		degree: "BTS Génie Optique option Photonique",
		institution: "Lycée Félix le Dantec à Lannion",
		date: "2010-06-01T00:00:00+00:00",
		description: "Spécialisation en optique physique, géométrique et photonique."
	},
	{
		degree: "Bac Scientifique",
		institution: "Lycée Chateaubriand à Combourg",
		date: "2008-06-01T00:00:00+00:00",
		description: "Spécialité Mathématiques."
	}
];
const projects = [
	{
		title: "Site web pour un zoo (Arcadia)",
		description: "Projet d'étude Studi (ECF) : conception d'un site web Zoo-Arcadia",
		link: "#",
		technology: [
		]
	},
	{
		title: "SOS PRO, Site vitrine pour une auto-entreprise",
		description: "Site vitrine pour une auto-entreprise de services à la personne avec Symfony 7.2, Bootstrap 5, JQuery et MariaDB",
		link: "#",
		technology: [
		]
	}
];
const technologies = [
	{
		name: "HTML",
		icon: "Html",
		"class": "bg-[#963419] text-white",
		style: "background-color: #963419; color: #fff;"
	},
	{
		name: "CSS",
		icon: "Css",
		"class": "bg-[#07436b] text-white",
		style: "background-color: #07436b; color: #fff;"
	},
	{
		name: "JavaScript",
		icon: "Js",
		"class": "bg-[#a39535] text-white",
		style: "background-color: #a39535; color: #fff;"
	},
	{
		name: "Python",
		icon: "Python",
		"class": "bg-[#306998] text-white",
		style: "background-color: #306998; color: #fff;"
	},
	{
		name: "PHP",
		icon: "Php",
		"class": "bg-[#4F5D95] text-white",
		style: "background-color: #4F5D95; color: #fff;"
	},
	{
		name: "Astro",
		icon: "AstroIcon",
		"class": "bg-[#FF5A1F] text-white",
		style: "background-color: #FF5A1F; color: #fff;"
	},
	{
		name: "Tailwind CSS",
		icon: "Tailwind",
		"class": "bg-[#06B6D4] text-white",
		style: "background-color: #06B6D4; color: #fff;"
	},
	{
		name: "Symfony",
		icon: "Symfony",
		"class": "bg-[#000000] text-white",
		style: "background-color: #000000; color: #fff;"
	},
	{
		name: "Bootstrap",
		icon: "Bootstrap",
		"class": "bg-[#563D7C] text-white",
		style: "background-color: #563D7C; color: #fff;"
	},
	{
		name: "React",
		icon: "React",
		"class": "bg-[#1c7777] text-white",
		style: "background-color: #1c7777; color: #fff;"
	},
	{
		name: "Django",
		icon: "Django",
		"class": "bg-[#092E20] text-white",
		style: "background-color: #092E20; color: #fff;"
	},
	{
		name: "jQuery",
		icon: "Jquery",
		"class": "bg-[#0769AD] text-white",
		style: "background-color: #0769AD; color: #fff;"
	},
	{
		name: "MongoDB",
		icon: "Mongo",
		"class": "bg-[#47A248] text-white",
		style: "background-color: #47A248; color: #fff;"
	},
	{
		name: "MariaDB",
		icon: "Maria",
		"class": "bg-[#003545] text-white",
		style: "background-color: #003545; color: #fff;"
	},
	{
		name: "SQLite",
		icon: "Sqlite",
		"class": "bg-[#003B57] text-white",
		style: "background-color: #003B57; color: #fff;"
	},
	{
		name: "MySQL",
		icon: "Mysql",
		"class": "bg-[#00758F] text-white",
		style: "background-color: #00758F; color: #fff;"
	}
];
const updated_at = "2025-02-23 12:19:33";
const data = {
	user: user,
	formations: formations,
	projects: projects,
	technologies: technologies,
	updated_at: updated_at
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Portfolio ${data.user.name} - D\xE9veloppeur Backend`, "description": "D\xE9veloppeur backend sp\xE9cialis\xE9 en Symfony, passionn\xE9 par l'optimisation et la cr\xE9ation de solutions performantes. Mon objectif est d'apprendre continuellement et de contribuer \xE0 des projets innovants qui allient technique et cr\xE9ativit\xE9." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="px-4"> ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` <div class="flex flex-col md:flex-row items-center md:items-start gap-10"> <div class="flex flex-col"> <!-- Titre et Badge --> <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold flex flex-row gap-x-5 pb-6 lg:pb-10">
Bonjour, je suis ${data.user.name} <a${addAttribute(data.user.linkedin, "href")} target="_blank" rel="noopener"> <div class="flex justify-center items-center hover:scale-110 transition"> ${renderComponent($$result3, "Badge", $$Badge, {}, { "default": ($$result4) => renderTemplate`${data.user.status}` })} </div> </a> </h1> <!-- Présentation avec informations personnelles --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Texte de présentation --> <div> <h2 class="text-xl lg:text-2xl opacity-80 text-pretty max-w-{700px}"> <span class="text-blue-300">${data.user.function}.</span><br> ${data.user.about} </h2> </div> <!-- Informations personnelles --> <div class="text-white text-lg space-y-3 m-auto"> <p><strong>Nom :</strong> ${data.user.name}</p> <p><strong>Âge :</strong> ${data.user.age} ans</p> <p><strong>Téléphone :</strong> ${data.user.phone}</p> <p><strong>Email :</strong> <a${addAttribute("mailto:" + data.user.email, "href")} class="text-blue-400 hover:underline">${data.user.email}</a></p> <p><strong>Adresse :</strong> ${data.user.address}</p> <!-- Image --> <div class="flex justify-center mt-3"> <img class="rounded-full w-24 h-24 md:w-48 md:h-48" src="/developpeur.webp"${addAttribute(data.user.name, "alt")}> </div> </div> </div> <!-- Liens sociaux --> <nav class="flex gap-x-5 mt-6 flex-wrap"> ${renderComponent($$result3, "Social_icons", $$SocialIcons, { "href": data.user.linkedin }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Linkedin", $$Linkedin, { "class": "size-4 md:size-6" })}
LinkedIn
` })} ${renderComponent($$result3, "Social_icons", $$SocialIcons, { "href": data.user.github }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Github", $$Github, { "class": "size-4 md:size-6" })}
GitHub
` })} ${renderComponent($$result3, "Social_icons", $$SocialIcons, { "href": "mailto:" + data.user.email }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Gmail", $$Gmail, { "class": "size-4 md:size-6" })} ${data.user.email}` })} </nav> </div> </div> ` })} <!-- Technologies --> ${renderComponent($$result2, "Section_techno", $$SectionTechno, { "id": "technology" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Technology", $$Technology, { "technologies": data.technologies })} ` })} <!-- Projets --> ${renderComponent($$result2, "Section", $$Section, { "id": "project" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center"> <h2 class="text-4xl font-semibold pb-10 flex gap-x-3 items-center text-center mb-4"> ${renderComponent($$result3, "Code", $$Code, { "class": "size-8 " })}Mes Projets
</h2> </div> ${renderComponent($$result3, "Project", $$Project, { "projects": data.projects })} ` })} <!-- Expériences --> ${renderComponent($$result2, "Section_experience", $$SectionExperience, { "id": "experience" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center"> <h2 class="text-4xl font-semibold pb-10 flex gap-x-3 items-center text-center mb-4"> ${renderComponent($$result3, "Exp_icon", $$ExpIcon, { "class": "size-8 " })}Expérience
</h2> </div> ${renderComponent($$result3, "Experience", $$Experience, { "experiences": data.experiences })} ` })} <!-- Formations --> ${renderComponent($$result2, "Section_formation", $$SectionFormation, { "id": "formation" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center"> <h2 class="text-4xl font-semibold pb-10 flex gap-x-3 items-center text-center mb-4"> ${renderComponent($$result3, "Cert_icon", $$CertIcon, { "class": "size-8 " })}Parcours de formation
</h2> </div> ${renderComponent($$result3, "Formation", $$Formation, { "formations": data.formations })} ` })} <!-- À propos --> ${renderComponent($$result2, "Section_about", $$SectionAbout, { "id": "about" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-center"> <h2 class="text-4xl font-semibold pb-10 flex gap-x-3 items-center text-center mb-4"> ${renderComponent($$result3, "My_icons", $$MyIcon, { "class": "size-8 " })}À propos de moi
</h2> </div> ${renderComponent($$result3, "About", $$About, { "about": data.user.about })} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })}`;
}, "/app/src/pages/index.astro", undefined);

const $$file = "/app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
