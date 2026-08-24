/* ============================================================================
   EliteEnergy — LEGAL PAGE CONFIGURATION
   ----------------------------------------------------------------------------
   Every value below is read by terms.dc.html, privacy.dc.html and
   risk-disclosure.dc.html at load time.

   HOW IT BEHAVES
   - A value left as null is NOT shown in the public UI. No placeholder text
     ever renders. The surrounding sentence or block is hidden, or falls back
     to neutral wording that states no fact.
   - Replace null with a real string to switch a block on.

   NOTHING HERE IS PRE-FILLED WITH INVENTED INFORMATION.
   See LEGAL_INFORMATION_REQUIRED.md for what must be supplied before launch.
   ========================================================================== */

window.ELITE_LEGAL = {

  /* --- Publication ------------------------------------------------------ */

  // Shown as "Last updated" on all three pages. Change whenever you edit the
  // legal text. Format it exactly as you want it displayed.
  LAST_UPDATED: "24 August 2026",

  // Root URL of the live site, no trailing slash. Used to build the canonical
  // and og:url tags on each page.
  siteUrl: "https://eliteenergy.example",

  /* --- Operator identity ------------------------------------------------ */

  // Registered legal name of the company or sole trader operating the service.
  // null  -> pages refer to "EliteEnergy" only, and state no corporate identity.
  // "..." -> an operator line appears in the intro and contact sections.
  entityName: null,

  // Full registered/business address, one line.
  // null -> the address block is hidden entirely.
  registeredAddress: null,

  // Company or business registration number, with the register it is held in.
  // null -> hidden.
  registrationNumber: null,

  /* --- Contact ---------------------------------------------------------- */

  // General legal/support email address.
  // null -> email rows are hidden; pages direct users to Telegram only.
  contactEmail: null,

  // Dedicated privacy / data-protection contact. Falls back to contactEmail
  // when null; if both are null the privacy page directs users to Telegram.
  privacyEmail: null,

  // Telegram support account URL, e.g. "https://t.me/yourhandle".
  // null -> generic "our support account on Telegram" wording, no link.
  supportTelegram: "https://t.me/xeriy",

  // Telegram bot URL, e.g. "https://t.me/yourbot".
  // null -> "Open bot" buttons link to the landing page instead.
  botUrl: "https://t.me/EliteEnergybot",

  /* --- Law -------------------------------------------------------------- */

  // Governing law and the courts that have jurisdiction, e.g.
  // "England and Wales" or "the Republic of Estonia".
  // null -> the clause renders WITHOUT naming a jurisdiction. Set this before
  //         launch: an unnamed governing law is weak protection.
  governingLaw: null,

  /* --- Data handling ---------------------------------------------------- */
  /* These drive the Privacy Policy. Only switch a category on if the running
     bot / website ACTUALLY does it. Leaving one false when it is true is a
     compliance problem, not a design choice. */

  // How long order and account records are kept, e.g. "24 months after your
  // last order". null -> neutral "no longer than necessary" wording.
  dataRetention: null,

  // Does the WEBSITE set cookies (any non-essential storage)?
  usesCookies: false,

  // Does the WEBSITE run analytics?
  usesAnalytics: false,

  // Name of the analytics provider, e.g. "Plausible". Only used when
  // usesAnalytics is true.
  analyticsProvider: null,

  // Does the service log IP addresses or device/user-agent information?
  logsIpAddresses: false,

  // Is a public API actually offered to third parties in production?
  // true -> the Terms include the API clause. false -> that clause is hidden.
  offersApi: false
};
