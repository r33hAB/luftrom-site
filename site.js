// Norwegian by default; English on request, remembered per browser. ?lang=en also works.
(function () {
  var root = document.documentElement;
  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "en" ? "en" : "nb");
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.set === lang ? "true" : "false");
    });
    try { localStorage.setItem("luftrom-lang", lang); } catch (e) {}
  }
  var wanted = new URLSearchParams(location.search).get("lang");
  if (wanted !== "en" && wanted !== "nb") {
    try { wanted = localStorage.getItem("luftrom-lang"); } catch (e) { wanted = null; }
  }
  if (wanted !== "en" && wanted !== "nb") {
    wanted = /^en/i.test(navigator.language || "") ? "en" : "nb";
  }
  apply(wanted);
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.dataset.set); });
  });
})();
