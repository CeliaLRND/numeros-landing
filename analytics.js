// Mesure d'audience PostHog. Inactive tant que POSTHOG_KEY est vide.
// Pour l'activer : coller la clé du projet (Project settings → Project API key),
// puis décommenter la section « Mesure d'audience » de confidentialite.html.
(function () {
  var POSTHOG_KEY = '';
  var POSTHOG_HOST = 'https://eu.i.posthog.com';
  if (!POSTHOG_KEY) return;

  // Snippet officiel de PostHog (chargement asynchrone de array.js).
  // prettier-ignore
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset identify alias set_config get_distinct_id get_property".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  window.posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Rien dans les cookies ni le localStorage : pas besoin de bandeau de consentement.
    persistence: 'memory',
    person_profiles: 'identified_only',
    autocapture: false,
    capture_pageview: true,
  });
})();
