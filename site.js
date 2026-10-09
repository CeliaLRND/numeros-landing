// Mouvement de la landing. Sans ce script, tout est déjà visible et lisible.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  root.classList.add('js');

  // Cascade d'arrivée : chaque bloc `.enter` apparaît quand il atteint l'écran,
  // ou dès qu'on l'a dépassé (un défilement rapide peut sauter par-dessus).
  var pending = Array.prototype.slice.call(document.querySelectorAll('.enter'));
  var queued = false;
  function reveal() {
    queued = false;
    var limit = window.innerHeight * 0.92;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top > limit) return true;
      el.classList.add('in');
      return false;
    });
    if (!pending.length) window.removeEventListener('scroll', onScroll);
  }
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(reveal);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  requestAnimationFrame(reveal);

  // Les jours personnels de l'app (src/content/personal-day), avec la couleur
  // de chaque nombre (src/lib/number-identity.ts).
  var DAYS = [
    { n: 1, hue: '#FF6A3D', focus: "Premier pas", lines: ["Note l’idée avant midi.", "Frappe avant qu’elle se ferme.", "Donne ton avis avant les autres.", "Envoie le message avant de le relire dix fois."] },
    { n: 2, hue: '#1F6FEB', focus: "Patience", lines: ["Ne relance pas avant demain.", "Écoute jusqu’au bout. Même quand tu as déjà la réponse.", "Attends ce soir avant d’en parler.", "Garde ce que tu captes pour toi jusqu’à demain."] },
    { n: 3, hue: '#FFC21A', focus: "Parler", lines: ["Dis la phrase à voix haute, à quelqu’un.", "Dis la chose importante, pas la dixième.", "Ose la blague.", "Dis oui et sors, même une heure."] },
    { n: 4, hue: '#16A34A', focus: "Méthode", lines: ["Fais la chose ennuyeuse en premier.", "Garde une heure de marge.", "Une brique. Puis une autre.", "Prends la responsabilité. Elle paiera plus tard."] },
    { n: 5, hue: '#FF8A00', focus: "Bouger", lines: ["Suis l’imprévu pour voir où il mène.", "Dis oui à l’invitation bizarre.", "Montre tes idées à quelqu’un qui décide.", "Regarde bien avant de dire non."] },
    { n: 6, hue: '#F0428F', focus: "Prendre soin", lines: ["Pose une vraie question à ce proche.", "Accepte l’invitation.", "Fais le premier pas avant ce soir.", "Dis oui à une chose, pas à trois."] },
    { n: 7, hue: '#5146D8', focus: "Silence", lines: ["Prends l’intuition au sérieux.", "Ne répète pas le secret aujourd’hui.", "Décline le déjeuner collectif.", "Note ce que tu as compris avant que ça s’efface."] },
    { n: 8, hue: '#C98A12', focus: "Décider", lines: ["Arrive avec un chiffre.", "Rembourse ce que tu dois. Tout ce que tu dois.", "Donne ton avis clairement, une fois.", "Lis les conditions avant de dire oui."] },
    { n: 9, hue: '#A3173B', focus: "Lâcher", lines: ["Ne retiens pas ce qui se termine.", "Réponds à ce message, sans forcément reprendre.", "Garde l’objet ou donne-le, mais décide.", "Laisse cette personne te surprendre."] },
  ];

  var glow = document.querySelector('.glow');
  var ticket = document.querySelector('.ticket');
  if (!ticket) {
    if (glow) glow.classList.add('lit');
    return;
  }

  var digits = ticket.querySelector('.digits');
  var focus = ticket.querySelector('.ticket-focus');
  var line = ticket.querySelector('.ticket-line');
  var live = document.querySelector('.ticket-live');
  var current = DAYS[7];

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function pick(list, not) {
    var next;
    do {
      next = list[Math.floor(Math.random() * list.length)];
    } while (list.length > 1 && next === not);
    return next;
  }

  // Le numéro défile quelques tours avant de se poser.
  function roll(target, done) {
    if (reduced) {
      digits.textContent = target;
      return done();
    }
    var n = 0;
    var timer = setInterval(function () {
      n += 1;
      if (n >= 9) {
        clearInterval(timer);
        digits.textContent = target;
        return done();
      }
      digits.textContent = pad(1 + Math.floor(Math.random() * 9));
    }, 55);
  }

  // Pose un autre jour sur le ticket : chiffre, focus, phrase et teinte de la page.
  function show(day) {
    var text = pick(day.lines, line.textContent);
    ticket.classList.add('swap');
    setTimeout(
      function () {
        focus.textContent = day.focus;
        line.textContent = text;
        ticket.classList.remove('swap');
      },
      reduced ? 0 : 160,
    );
    root.style.setProperty('--hue', day.hue);
    ticket.setAttribute(
      'aria-label',
      'Exemple de ticket du jour : numéro ' + pad(day.n) + ', ' + day.focus + '. Tirer un autre jour',
    );
    if (live) live.textContent = 'Numéro ' + pad(day.n) + ', ' + day.focus + '. ' + text;
    current = day;
  }

  var busy = false;
  function tear(next, delay) {
    if (busy) return;
    busy = true;
    ticket.classList.remove('torn');
    setTimeout(function () {
      if (next) show(next);
      roll(pad(current.n), function () {
        ticket.classList.add('torn');
        if (glow) glow.classList.add('lit');
        busy = false;
      });
    }, delay);
  }

  ticket.addEventListener('click', function () {
    tear(pick(DAYS, current), reduced ? 0 : 220);
  });

  // Première déchirure, une fois le hero posé : le 8 déjà écrit dans la page.
  tear(null, reduced ? 0 : 520);
})();
