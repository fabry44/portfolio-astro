function s(e){const r=window._paq=window._paq||[];r.push(["disableCookies"]),e?.heartBeatTimer&&r.push(["enableHeartBeatTimer",e.heartBeatTimer]),e?.setCookieDomain&&r.push(["setCookieDomain",e.setCookieDomain]),r.push(["trackPageView"]),r.push(["enableLinkTracking"]),function(){const t=e?.host;r.push(["setTrackerUrl",t+e?.trackerUrl]),r.push(["setSiteId",e?.siteId]);const i=document,a=i.createElement("script"),n=i.getElementsByTagName("script")[0];e?.crossOrigin&&(a.crossOrigin=e.crossOrigin),a.id="matomo-script",a.type=`text/${e?.partytown?"partytown":"javascript"}`,a.async=!0,a.defer=!0,a.src=t+e?.srcUrl,n.parentNode!=null&&t&&n.parentNode.insertBefore(a,n)}(),e?.viewTransition&&o(e)}function o(e){let r=document.referrer;document.addEventListener("astro:page-load",()=>{const t=window._paq=window._paq||[];if(t.push(["setReferrerUrl",r]),r=window.location.href,t.push(["setCustomUrl",r]),t.push(["setDocumentTitle",document.title]),t.push(["deleteCustomVariables","page"]),t.push(["deleteCustomDimension",1]),t.push(["trackPageView"]),typeof e?.viewTransition=="object"&&e?.viewTransition){const i=document.querySelector(e?.viewTransition?.contentElement);t.push(["MediaAnalytics::scanForMedia",i]),t.push(["FormAnalytics::scanForForms",i]),t.push(["trackContentImpressionsWithinNode",i])}t.push(["enableLinkTracking"])})}s({host:"https://analytics.fabien-roy.fr/",setCookieDomain:"*.fabien-roy.fr",trackerUrl:"matomo.php",srcUrl:"matomo.js",siteId:1,heartBeatTimer:5,viewTransition:{contentElement:"main"}});
