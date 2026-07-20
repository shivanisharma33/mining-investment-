// ─── PARTICLES ───
const pContainer=document.getElementById('particles');

if (pContainer) {
    for (let i=0; i < 30; i++) {
        const p=document.createElement('span');

        p.style.cssText=`left:$ {
            Math.random()*100
        }

        %;

        animation-delay:$ {
            Math.random()*8
        }

        s;

        animation-duration:$ {
            6+Math.random()*6
        }

        s;
        `;
        pContainer.appendChild(p);
    }
}

// ─── HERO BACKGROUND VIDEO ───
// The hero clip is an H.264 QuickTime (.mov). Chrome/Edge/Safari can play it;
// Firefox can't decode the container. We fade the video in only once it is
// genuinely playing and leave the poster image in place on any failure, so the
// hero never shows a broken/black box. Motion-reduced users and phones (where
// the video is display:none) keep the static poster with no wasted bandwidth.
(function initHeroVideo() {
    const v = document.getElementById('heroVideo');
    if (!v) return;

    const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || getComputedStyle(v).display === 'none') return;

    const tryPlay = () => {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    const fail = () => v.classList.remove('is-playing');

    v.addEventListener('playing', () => v.classList.add('is-playing'));
    v.addEventListener('canplay', tryPlay);
    v.addEventListener('error', fail);
    v.querySelectorAll('source').forEach(s => s.addEventListener('error', fail));

    tryPlay();
})();

// ─── NAV SCROLL ───
window.addEventListener('scroll', ()=> {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    });

// ─── MOBILE MENU ───
function toggleMobile() {
    const m = document.getElementById('mobileMenu');
    const h = document.getElementById('hamburger');
    if (!m) return;
    const isOpen = m.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    if (h) h.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // Collapse any open mobile accordions when closing
    if (!isOpen) {
        m.querySelectorAll('.m-group.open').forEach(g => {
            g.classList.remove('open');
            const t = g.querySelector('.m-group-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
        // …including the year accordions nested inside Past Years, so the
        // menu reopens in the same collapsed state its toggles report.
        m.querySelectorAll('.m-year.open').forEach(y => {
            y.classList.remove('open');
            const t = y.querySelector('.m-year-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    }
}

// ─── NAV DROPDOWNS (click / keyboard support; hover is CSS-driven) ───
document.addEventListener('DOMContentLoaded', () => {
    // Desktop dropdowns — click toggles (hover still works via CSS)
    document.querySelectorAll('.nav-links .has-dropdown > .dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.parentElement;
            const wasOpen = parent.classList.contains('open');
            document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
                el.classList.remove('open');
                const t = el.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
            if (!wasOpen) {
                parent.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close desktop dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links .has-dropdown')) {
            document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
                el.classList.remove('open');
                const t = el.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
                el.classList.remove('open');
                const t = el.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Mobile accordion groups
    document.querySelectorAll('.mobile-menu .m-group-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            const isOpen = group.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // Mobile year accordions (nested inside the Past Years group). One year is
    // open at a time: opening one closes its siblings, so the list never grows
    // past the group's height and the years stay scannable.
    document.querySelectorAll('.mobile-menu .m-year-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const year = btn.parentElement;
            const wasOpen = year.classList.contains('open');
            year.parentElement.querySelectorAll('.m-year.open').forEach(open => {
                open.classList.remove('open');
                const t = open.querySelector('.m-year-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
            // A click on the open year collapses it rather than reopening it.
            if (!wasOpen) {
                year.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

// ─── NAVIGATION ───
let currentPage='home';
// The document pages (/past-years/<year>/<slug>) all share one container,
// #page-document, whose contents are rendered per document. `currentDoc`
// is what distinguishes one from another — without it, navigating from
// 2025 Brochure to 2024 Brochure would look like navigating to the page
// you are already on, and the early return below would swallow it.
let currentDoc=null;

function navigate(page, docId) {
    if (page===currentPage && (docId||null)===currentDoc) {
        window.scrollTo({
            top:0, behavior:'smooth'
        });
    return;
}

const overlay=document.getElementById('pageTransition');
overlay.classList.add('active');

setTimeout(()=> {
        document.querySelectorAll('.page').forEach(p=> p.classList.remove('active'));
        const target=document.getElementById('page-' + page);

        if (target) {
            target.classList.add('active'); currentPage=page;
            currentDoc = (page === 'document') ? (docId||null) : null;
            if (page === 'companies') {
                loadCompaniesWithLoader();
            }
            if (page === 'sponsors') {
                renderSponsorsPage();
            }
            if (page === 'media') {
                triggerGalleryEntrance();
            }
            // Build the document page before the fade-ups are wired below, so
            // its freshly created .fade-up elements are picked up by the same
            // observer every other page uses.
            if (page === 'document' && window.DocumentPage) {
                window.DocumentPage.render(docId);
            }
        }

        window.scrollTo(0, 0);
        overlay.classList.remove('active');
        initFadeUps();
        updateRoute(page, docId);
    }

    , 300);
}

// ─── URL routing (additive, non-breaking) ───
// Maps document IDs (`page-<id>`) to URL paths so deep links like /sponsors
// resolve to the correct SPA page. Netlify already rewrites all paths to
// /index.html (see netlify.toml), so any path lands in this router.
// Restored whenever we leave a document page, since the document renderer
// swaps the title to the document's own name.
const DEFAULT_TITLE = document.title;

function updateRoute(page, docId) {
    if (typeof history === 'undefined' || !history.pushState) return;
    let path;
    if (page === 'document') {
        const doc = window.SiteDocuments && window.SiteDocuments.byId(docId);
        // An unknown id would otherwise push a bogus URL; fall back to home.
        path = doc ? doc.path : '/';
    } else {
        path = page === 'home' ? '/' : '/' + page;
    }
    if (page !== 'document') document.title = DEFAULT_TITLE;
    if (location.pathname !== path) {
        history.pushState({ page: page, docId: docId || null }, '', path);
    }
}

// Returns {page, docId}. Two URL shapes resolve here: a flat single-segment
// slug matching a `page-<slug>` element, and the nested document route
// /past-years/<year>/<slug>, which is looked up in the registry rather than
// the DOM (every document shares the one #page-document container).
function routeFromUrl() {
    const slug = (location.pathname || '/').replace(/^\/+|\/+$/g, '');
    if (!slug) return { page: 'home', docId: null };

    const parts = slug.split('/');
    if (parts[0] === 'past-years' && parts.length === 3 && window.SiteDocuments) {
        const doc = window.SiteDocuments.byRoute(parts[1], parts[2]);
        if (doc) return { page: 'document', docId: doc.id };
        return { page: 'home', docId: null };
    }

    return document.getElementById('page-' + slug)
        ? { page: slug, docId: null }
        : { page: 'home', docId: null };
}

window.addEventListener('popstate', (e) => {
    const target = (e.state && e.state.page) ? e.state : routeFromUrl();
    if (target.page !== currentPage || (target.docId || null) !== currentDoc) {
        navigate(target.page, target.docId);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const initial = routeFromUrl();
    if (initial.page !== 'home') {
        // Defer slightly so all DOM is ready and other DOMContentLoaded handlers run first.
        setTimeout(() => navigate(initial.page, initial.docId), 50);
    }
});

// ─── FADE UP OBSERVER ───
function initFadeUps() {
    const els = document.querySelectorAll('.page.active .fade-up');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                
                // Trigger counter if it's a stat item
                const num = e.target.querySelector('.stat-num');
                if (num && num.hasAttribute('data-target')) {
                    animateCounter(num);
                }
                
                obs.unobserve(e.target);
            }
        });
    }, {
        threshold: 0.1
    });

    els.forEach(el => {
        el.classList.remove('visible');
        obs.observe(el);
    });
}

function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (outQuad)
        const ease = progress * (2 - progress);
        const currentNum = Math.floor(ease * target);
        
        el.innerHTML = currentNum + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.innerHTML = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', initFadeUps);
setTimeout(initFadeUps, 100);

// ─── TEAM BIO TOGGLE ───
function toggleBio(btn, id) {
    const bio=document.getElementById(id);
    bio.classList.toggle('expanded');
    const expanded = bio.classList.contains('expanded');
    const lang = (typeof currentLang !== 'undefined' && currentLang) || 'en';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]) || {};
    const moreKey = expanded ? 'team-read-less' : 'team-read-more';
    const fallback = expanded ? 'Read Less ↑' : 'Read More ↓';
    btn.textContent = dict[moreKey] || fallback;
}

// ─── PARTICIPATING COMPANIES ───
const COMPANIES_2026 = [
    ["1844 RESOURCES INC.^^", "TSX-V: EFF", "EXPLORER", "CANADA/QC", "Cu, Pb, Zn, Ag"],
    ["1911 GOLD CORPORATION", "TSX-V:AUMB; OTCQX:AUMBF", "DEVELOPER", "CANADA/ON, MB", "Au"],
    ["ABCOURT MINES INC.#", "TSX-V:ABI; OTCQB:ABMBF", "DEVELOPER", "CANADA/QC", "Au"],
    ["AGNICO EAGLE MINES LIMITED", "TSX:AEM; NYSE:AEM", "PRODUCER", "GLOBAL", "Au"],
    ["ALKANE RESOURCES LIMITED", "TSX: ALK; ASX: ALK: OTCQX: ALKEF", "PRODUCER", "AUSTRALIA; SWEDEN", "Au, Sb"],
    ["ANDEAN PRECIOUS METALS CORP.", "TSX:APM; OTCQX: ANPMF", "PRODUCER", "USA/CA; MEXICO; BOLIVIA", "Au, Ag"],
    ["APEX CRITICAL METALS CORP*", "CSE: APXC; OTCQX; APXCF", "EXPLORER", "USA, CANADA/BC/QC/ON", "REEs; Nb"],
    ["ARGO GOLD INC. ~", "CSE:ARQ", "EXPLORER", "CANADA/ON", "Au"],
    ["ARIZONA GOLD & SILVER INC.*", "TSX-V: AZS; OTCQB: AZASF", "EXPL/DEV", "USA/AZ, NV", "Au, Ag"],
    ["ARIZONA METALS CORP.*", "TSX:AMC;OTCQX:AZMCF", "EXPLORER", "USA/AZ", "Au,Cu,Zn"],
    ["ASTRA EXPLORATION INC", "TSX-V: ASTR; OTCQB: ATEPF", "EXPLORER", "ARGENTINA, CHILE", "Au, Ag"],
    ["ATHA ENERGY CORP", "TSX-V: SASK; OTCQB: SASKF", "DEV/EXPL", "CANADA/NV, SK", "U308"],
    ["ATLAS SALT INC.*", "TSX-V: SALT; OTCQX: SALQF", "PRODUCER", "CANADA/NL", "Na"],
    ["AURIGINAL MINING CORP*", "TSX-V: AUME", "EXPLORER", "CANADA/QC", "Au, Cu"],
    ["AVANTI GOLD CORP", "CSE: AGC;OTCQB: AVTGF", "EXPLORER", "DRC", "Au"],
    ["AZIMUT EXPLORATION INC.", "TSXV: AZM;OTCQX: AZMTF", "EXPLORER", "CANADA/QC", "Au,Cu,Ni,Li"],
    ["AZTEC MINERALS CORP.*", "TSX-V: AZT; OTCQB: AZZTF", "EXPLORER", "USA/ARIZONA", "Ag, Au"],
    ["BLUE LAGOON RESOURCES INC", "CSE: BLLG; OTCQB: BLAGF", "DEVELOPER", "CANADA/BC", "Au"],
    ["BLUEJAY GOLD INC.*", "PRIVATE", "EXPLORER", "CANADA/ON, YK", "Au, Ag"],
    ["BONTERRA RESOURCES INC.*", "TSX-V: BTR; OTCQX: BONXF", "EXPLORER", "CANADA/QC", "Au"],
    ["BRIXTON METALS CORPORATION*", "TSX-V: BBB; OTCQX: BBBXF", "EXPLORER", "CANADA/BC", "Cu, Au, Ag"],
    ["BRUNSWICK EXPLORATION*", "TSX-V: BRW;OTCQB: BRWXF", "EXPLORER", "CANADA/QC; GREENLAND", "Pg"],
    ["CAPITAN SILVER CORP*", "TSX-V: CAPT; OTCQX: CAPTF", "EXPLORER", "MEXICO", "Ag"],
    ["CARTIER RESOURCES INC.*", "TSX-V: ECR", "EXPLORER", "CANADA/QC", "Au"],
    ["CASCADIA MINERALS LTD", "TSX-V: CAM;OTCQB: CAMNF", "EXPLORER", "CANADA/YK", "Au, Cu"],
    ["CASSIAR GOLD CORP.*", "TSX-V: GLDC, OTCQX: CGLCF", "EXPLORER", "CANADA/BC", "Au"],
    ["CERRADO GOLD INC.", "TSX-V:CERT; OTCQX:CRDOF", "PRODUCER", "CANADA/QC; ARGENTINA; PORTUGAL", "Au"],
    ["CERRO DE PASCO RESOURCES INC", "TSX-V: CDPR;OTCQB: GPPRF", "DEVELOPER", "PERU", "Cu, Zn, Pb, Au"],
    ["CLINCH RESOURCES LTD.", "TSX: CLCH", "PRODUCER", "USA/WV", "C"],
    ["COLLECTIVE MINING LTD", "TSX: CNL; NYSE: CNL", "DEVELOPER", "COLOMBIA", "Au, Ag"],
    ["CONSOLIDATED LITHIUM METALS INC.", "TSX-V: CLM; OTCQB: JORFF", "EXPLORER", "CANADA/QC", "Li"],
    ["CONTANGO SILVER & GOLD INC.", "TSX/NYSE: CTGO", "EXPLORER", "CANADA/ BC", "Ag, Au"],
    ["CONSOLIDATED LITHIUM METALS INC.*", "TSX-V: CLM; OTCQB: JORFF", "EXPLORER", "CANADA/QC", "Li"],
    ["CRITICAL ELEMENTS LITHIUM CORPORATION*", "TSX-V: CRE; OTCQX: CRECF", "EXPLORER", "CANADA/QC", "Li"],
    ["CUPANI METALS CORPORATION*", "CSE: CUPA; OTCQB: CUPIF", "EXPLORER", "CANADA/QC", "Cu"],
    ["CYGNUS METALS LIMITED", "TSX-V: CYG; OTCQB: CYGGF", "DEV/EXPL", "CANADA/QC", "Au, Cu"],
    ["DOMESTIC METALS CORP*", "TSXV:DMCU;OTCQB: DMCUF", "EXPLORER", "USA", "Cu, Au"],
    ["DRYDEN GOLD CORP #", "TSX-V: DRY; OTCQX: DRYGF", "EXPLORER", "CANADA/ON", "Au"],
    ["DUMONT NICKEL INC.*", "PRIVATE", "EXPLORER", "CANADA/QC", "Ni, Co"],
    ["DYNASTY GOLD CORP*", "TSX-V: DYG", "EXPLORER", "CANADA/ON, USA/NV", "Au"],
    ["ELEMENT 29 RESOURCES INC.*", "TSX-V: ECU; OTCQB: EMTRF", "EXPLORER", "PERU", "Cu"],
    ["ELORO RESOURCES LTD.*", "TSX: ELO; OTCQX: ELRRF", "EXPLORER", "BOLIVIA", "Sn, Ag"],
    ["EMPEROR METALS INC. * #", "CSE: AUOZ; OTCQB: EMAUF", "EXPLORER", "CANADA/QC", "Au"],
    ["EPIC GOLD CORP.*", "CSE:NFLD; OTCQB: NFLDF", "EXPLORER", "CANADA/NFLD", "Au"],
    ["EQUINOX GOLD CORP.", "TSX:EQX; NYSE-A: EQX ", "PRODUCER", "CANADA/NF; ON/NICARAGUA/USA", "Au"],
    ["EQUITY METALS CORPORATION*", "TSX-V: EQTY; OTCQB: EQMEF", "EXPLORER", "CANADA/BC, NT, SK", "Au, Ag, Cu"],
    ["ERANOVA METALS INC.^^", "TSX-V: NOVA; OTCQB: STXPF", "EXPLORER", "CANADA/BC", "Mo"],
    ["ESGOLD CORP", "CSE: ESAU; OTCQB: ESAUF", "EXPL/DEV", "CANADA/QC", "Au, Ag"],
    ["FIRST CANADIAN GRAPHITE INC*", "TSX-V: FCI; OTCQB: GRAPF", "EXPLORER", "CANADA/QC", "C"],
    ["FIREFLY METALS LTD", "TSX: FFM; ASX: FFM", "EXPLORER", "CANADA/NFLD", "Cu, Au"],
    ["FIRST MINING GOLD CORP #", "TSX: FF; OTCQX: FFMGF", "DEV/EXPL", "CANADA/ON, QC, NFLD", "Au"],
    ["FIRST PHOSPHATE CORP.*", "CSE: PHOS; OTCQX: FRSPF OTCQX-ADR: FPHOY", "DEVELOPER", "CANADA/QC", "Battery, P2O5"],
    ["FORMATION METALS INC*", "CSE: FOMO; OTCQB: FOMTF", "EXPLORER", "CANADA/ON; QC", "Au, Ni, Cu, PGE, Ti"],
    ["FPX NICKEL CORP", "TSX-V: FPX; OTCBX: FPOCF", "DEVELOPER", "CANADA/BC", "Ni"],
    ["GEMDALE GOLD INC.~", "TSX-V: GEMG", "EXPLORER", "FINLAND", "Au"],
    ["GEOMEGA RESOURCES INC.", "TSX-V: GMA; OTCQB: GOMRF", "DEVELOPER", "CANADA/QC", "REE Extraction, refinery"],
    ["GLENCORE PLC / GLENCORE CANADA", "LSE: GLEN; JSE: GLN", "PRODUCER", "CANADA/GLOBAL", "Cu, Ni, Zn, Pb"],
    ["GLOBEX MINING ENTERPRISES INC.", "TSX: GMX; OTCQX: GLBXF", "EXPLORER", "CANADA/QC/ON; USA", "Polymetallic"],
    ["GOLDEN CARIBOO RESOURCES LTD.^^", "CSE: GCC; OTCQB:GCCFF", "EXPLORER", "CANADA/BC", "Au, Ag"],
    ["GR SILVER MINING LTD.*", "TSX-V: GRSL; OTCQX: GRSLF", "DEVELOPER", "MEXICO", "Ag"],
    ["GREENLIGHT METALS INC.*", "TSX-V:GRL; OTCQB: GRLMF", "EXPLORER", "USA", "Cu, Zn, Au"],
    ["GT RESOURCES INC.~", "TSX-V: GT; OTCQB: CGTRF", "EXPLORER", "FINLAND", "Cu, Ni, Pd, Co, Au, Pt"],
    ["GUANAJUATO SILVER COMPANY*", "TSX-V: GSVR; OTCQX: GSVRF", "PRODUCER", "MEXICO", "Ag, Au"],
    ["GUNNISON COPPER CORP*", "TSX: GCU; OTCQB:GCUMF", "PRODUCER", "USA/AZ", "Cu"],
    ["HARFANG EXPLORATION INC.*", "TSX-V: HAR", "EXPLORER", "CANADA/QC; ON", "Au"],
    ["HELIOSTAR METALS LTD.", "TSX-V: HSTR; OTCQX: HSTXF", "DEVELOPER", "MEXICO", "Au"],
    ["HEMLO MINING CORP.", "TSX-V: HMMC; OTCQX: HMMCF", "PRODUCER", "CANADA/QC", "Au"],
    ["HI- VIEW RESOURCES INC*", "CSE: GXLD;", "EXPLORER", "CANADA/BC, YK", "Au, Cu"],
    ["IAMGOLD CORPORATION", "TSX: IMG; NYSE: IAG", "PRODUCER", "CANADA/QC, ON; WEST AFRICA", "Au"],
    ["JUNO CORP.*", "PRIVATE", "DEV/EXPL", "CANADA/ ON", "Cu, Au, Ti, V, Sc, PGE"],
    ["KIRKLAND LAKE DISCOVERIES*#", "TSX-V: KLDC; OTCQB: KLKLF", "EXPLORER", "CANADA/ON", "Au"],
    ["LAFLEUR MINERALS INC.*", "CSE: LFLR; OTCQB: LFLRF", "DEVELOPER", "CANADA/QC", "Au"],
    ["LAHONTAN GOLD CORP.*", "TSX.V: LG; OTCQB: LGCXF", "EXPLORER", "USA/NV", "Au"],
    ["LATIN METALS INC*", "TSX.V: LMS; OTCQB: LMSQF", "EXPLORER", "PERU; ARGENTINA", "Au, Ag, Cu"],
    ["LAVRAS GOLD CORP.", "TSX-V: LGC; OTCQX:LGCFF", "EXPLORER", "BRAZIL", "Au"],
    ["LEVIATHAN METALS CORP.*", "TSX-V: LVX; OTCQB: LVXFF", "EXPLORER", "BOTSWANA; BOSNIA; HERZEGOVINA", "Cu, Ag, Zn, Pb"],
    ["Li-FT POWER LTD*", "TSX-V: LIFT; OTCQX: LIFFF", "EXPLORER", "CANADA/NWT'; QC", "Li"],
    ["LOMIKO METALS INC.^^", "TSX-V: LMR;", "EXPLORER", "CANADA/QC", "C"],
    ["LOYALIST EXPLORATION LIMITED*", "CSE: PNGC", "EXPLORER", "CANADA/ON", "Au, REEs"],
    ["MAGMA SILVER CORP.*", "TSX-V: MGMA; OTCQB: MAGMF", "EXPLORER", "PERU", "Au, Ag"],
    ["MAPLE GOLD MINES LTD #", "OTCQX:MGMLF", "EXPLORER", "CANADA/QC", "Au"],
    ["MCFARLANE LAKE MINING LIMITED*", "CSE: MLM: OTCQB: MLMLF", "EXPLORER", "CANADA/ON", "Au"],
    ["MIDLAND EXPLORATION INC.*", "TSX-V: MD", "EXPLORER", "CANADA/QC", "Au, PGE's"],
    ["MINAURUM SILVER INC.*", "TSX.V: MGG; OTCQX: MMRGF", "DEV/EXPL", "MEXICO; USA", "Au, Ag"],
    ["MINERA ALAMOS INC", "TSX-V: MAI; OTCQX: MAIFF", "PRODUCER", "USA; MEXICO", "Au"],
    ["MINEROS S.A.", "TSX: MSA; OTCQX: MNSAF", "EXPL/PRO", "CA/NIC;SA/CHILE,COL", "Au"],
    ["MITHRIL SILVER AND GOLD LIMITED", "TSX-V: MSG; ASX:MTH; OTCQB: MTIRF", "EXPLORER", "MEXICO", "Ag, Au"],
    ["MONT ROYAL RESOURCES LIMITED*", "TSX-V: MRZL; AXS: MRZ", "EXPLORER", "CANADA/QC", "REEs"],
    ["MOROCCO STRATEGIC MINERALS CORPORATION~", "TSX-V: MCC", "EXPLORER", "MOROCCO; CANADA/QC", "Li, Au, Cu"],
    ["NEW AGE METALS INC.*", "TSX-V: NAM; OTCQB: NMTLF", "EXPLORER", "CANADA/ON; MB", "PGE; Li, REEs"],
    ["NEW FOUND GOLD CORP.", "TSXV:NFG;NYSE:NFGC", "EXPLORER", "CANADA/NFLD", "Au"],
    ["NEW PACIFIC METALS CORP.*", "TSX: NUAG; NYSE: NEWP", "PRODUCER", "BOLIVIA", "Ag"],
    ["NEXGOLD MINING CORP", "TSX-V: NEXG; OTCQX: NXGCF", "DEV/EXPL", "CANADA/ON, NS", "Au"],
    ["NICOLA MINING INC", "TSX-V: NIM; OTCQB: HUSIF", "EXPLOER/DEV", "CANADA/BC", "Cu, Ag, Au"],
    ["NORTH AMERICAN NIOBIUM AND CRITICAL MINERALS CORP.", "CSE: NIOB;", "EXPLORER", "CANADA/QC", "Cu, REEs"],
    ["NORTH ATLANTIC TITANIUM CORP #^^", "CSE: NATO", "EXPLORER", "CANADA/BC", "Ti"],
    ["NORTHISLE COPPER & GOLD INC.", "TSX-V: NCX;OTCQX: NTCPF", "EXPLORER", "CANADA/BC", "Cu, Au"],
    ["NOUVEAU MONDE GRAPHITE INC.*", "TSX: NOU; NYSE: NMG", "DEVELOPER", "CANADA/QC", "C"],
    ["NUVAU MINERALS INC.*", "TSX-V: NMC", "EXPLORER", "CANADA/QC", "Zn, Cu"],
    ["OMAI GOLD MINES CORP*", "TTSX-V: OMG; OTCQB: OMGGF", "DEVELOPER", "GUYANA", "Au"],
    ["ONYX GOLD CORP", "TSX-V: ONYX;OTCQX: ONXGF", "EXPLORER", "CANADA/ON, YK", "Au"],
    ["OPUS ONE GOLD CORPORATION^^", "TSX-V: OOR", "EXPLORER", "CANADA/QC", "Au, Li"],
    ["OREZONE GOLD CORPORATION", "TSX: ORE; ASX: ORE; OTCQX: ORZCF", "PRODUCER", "CANADA/QC; AFRICA", "Au"],
    ["OR ROYALTIES INC", "TSX:OR; NYSE: OR", "ROYALTY", "GLOBAL", "Royalties"],
    ["ORVANA MINERALS CORP.", "TSX: ORV;OTCQX: ORVMF", "PRODUCER", "SPAIN, ARGENTINA, BOLIVIA", "Au, Cu, Ag"],
    ["OSISKO DEVELOPMENT CORP.", "TSX-V: ODV; NYSE: ODV", "PRODUCER", "CANADA/BC; USA/UT", "Au"],
    ["OUTCROP SILVER & GOLD CORPORATION", "TSX:OCG; OTCQX: OCGSF", "EXPLORER", "COLOMBIA", "Ag"],
    ["PALQUARTZ INC. ^^", "PRIVATE", "DEVELOPER", "CANADA/QC", "Si, HPQ"],
    ["PANTHER MINERALS PLC*", "LSE: PALM;OTCQB: GLIOF", "EXPLORER", "CANADA/ON", "Au, Ag, Zn, Cu, Co, Ga"],
    ["PELANGIO EXPLORATION INC.*", "TSX-V: PX", "EXPLORER", "CANADA/ON; AFRICA                                                                                                             ", "Au"],
    ["PELOTON MINERALS CORPORATION*", "CSE: PMC; OTCQB: PMCCF", "EXPLORER", "USA/NV", "Li, U, REEs"],
    ["PERSEVERANCE METALS INC.*#", "TSX-V: PMI", "EXPLORER", "CANADA/QC", "Ni, Cu, PGE"],
    ["PIVOTAL METALS LIMITED*", "ASX: PVT", "EXPLORER", "CANADA/QC", "Cu, Ni, PGMs"],
    ["PMET RESOURCES INC", "TSX: PMET; ASX: PMT; OTCQX: PMETF", "EXPL/DEV", "CANADA/QC", "Li"],
    ["POWER METALLIC MINES INC.", "TSX-V: PNPN;OTCQB: PNPNF", "EXPLORER", "CANADA/QC", "POLYMETALLIC"],
    ["Q2 METALS CORP.", "TSX-V:QTWO; OTCQB:QUEXF", "EXPLORER", "CANADA/QC", "Li"],
    ["QUESTCORP MINING INC.^^", "CSE: QQQ;OTCQB: QQCMF", "EXPLORER", "CANADA/BC; MEXICO", "Cu, Au"],
    ["RADISSON MINING RESOURCES INC.", "TSX-V: RDS; OTCQX:RMRDF", "EXPLORER", "CANADA/QC", "Au"],
    ["RED PARAMOUNT IRON*", "PRIVATE", "DEVELOPER", "CANADA/NL", "Fe"],
    ["RESOURO STRATEGIC METALS INC.*", "TSX-V: RSM; OTCQB: RSGOF", "EXPLORER", "BRAZIL", "REEs, Ti"],
    ["RPX GOLD INC*", "TSX-V: RPX; OTCQB: RDEXF", "EXPLORER", "CANADA/ON", "Au"],
    ["SAUDI GOLD REFINERY CO.*", "PRIVATE", "EXPLORER", "SAUDI ARABIA", "Au"],
    ["SCANDIUM CANADA LIMITED*", "TSX-V: SCD", "EXPLORER", "CANADA/QC", "Sc"],
    ["SCORPIO GOLD CORPORATION", "TSX-V: SGN;OTCQB: SRCRF", "EXPLORER", "USA/NV", "Au"],
    ["SCOTTIE RESOURCES CORP.", "TSX-V: SCOT; OTCQB: SCTSF", "EXPLORER", "CANADA/BC", "Au,Ag"],
    ["SEARCH MINERALS ~", "TSX-V: SMY", "EXPLORER", "CANADA/NL", "REEs"],
    ["SELKIRK COPPER MINES INC.*#", "TSX-V: SCMI;OTCQB: SKRKF", "DEVELOPER", "CANADA/YK", "Cu, Au, Ag"],
    ["SERABI GOLD PLC*", "TSX: SBI; OTCQX: SRBIF", "PRODUCER", "BRAZIL", "Au"],
    ["SILVER X MINING CORP*", "TSX-V: AGX: OTCQB: AGXPF", "PRODUCER", "PERU", "Ag"],
    ["SILVER ONE RESOURCES INC", "TSX-V: SVE, OTCQX:SLVRF", "EXPL/DEV", "USA/NV", "Ag"],
    ["SIRIOS RESOURCES INC.*", "TSX-V: SOI; OTCQB: SIREF", "EXPLORER", "CANADA/QC", "Au"],
    ["SOUTH KIRKLAND GOLD ^^", "PRIVATE", "EXPLORER", "CANADA/ON", "Au"],
    ["SPANISH MOUNTAIN GOLD LTD#", "TSX-V: SPA: OTCQB: SPAUF", "DEVELOPER", "CANADA/BC", "Au"],
    ["STANDARD URANIUM LTD*", "TSX-V: STND ; OTCQB: STTDF", "EXPL/ DEV", "CANADA/SK", "U"],
    ["STLLR GOLD INC.", "TSX: STLR; OTCQX: STLRF", "DEVELOPER", "CANADA/ON", "Au"],
    ["STRATEGIC RESOURCES INC.*", "TSX-V: SR", "EXPLORER", "CANADA/QC; FINLAND", "Fe, Li, Ti, V"],
    ["SUMMIT ROYALTIES LTD*", "TSX-V: SUM; OTCQB: SUMMF", "ROYALTY", "GLOBAL", "ROYALTIES"],
    ["SUN SUMMIT MINERALS CORP.*", "TSX-V: SMN; OTCQB: SMREF", "EXPLORER", "CANADA", "Au, Ag, Cu, Zn"],
    ["SURGE COPPER CORP.*", "TSX-V: SURG; OTCQB: SRGXF", "EXPLORER", "CANADA/BC", "Cu, Mo, Au, Ag"],
    ["TOCVAN VENTURES CORP.*", "CSE: TOC; OTCQB: TCVNF", "DEVELOPER", "MEXICO", "Au, Ag"],
    ["TACORA RESOURCES INC.*", "PRIVATE", "PRODUCER", "CANADA/NL", "Fe"],
    ["TALISKER RESOURCES LTD*", "TSX: TSK; OTCQB: TSKFF", "DEVELOPER", "CANADA/BC", "Au"],
    ["TARGA EXPLORATION CORP.*", "CSE: TEX; OTCQB: TRGEF", "EXPLORER", "CANADA/QC", "Au"],
    ["THUNDER GOLD CORP*", "TSX-V: TGOL; OTCQB: TGOLF", "EXPLORER", "CANADA/ON", "Au"],
    ["TINCORP METALS INC. ~", "TSX-V: TIN", "EXPLORER", "BOLIVIA", "Tin"],
    ["TRIDENT RESOURCES CORP.*", "TSX-V: ROCK; OTCQB: TRDTF", "EXPLORER", "CANADA/SK", "Au, Cu, Co, Ag, Zn"],
    ["TROILUS MINING CORP", "TSX: TLG; OTCQX: CHXMF", "DEV/EXPL", "CANADA/QC", "Au"],
    ["URANIUM X DISCOVERY CORP.^^", "CSE: STMN", "EXPLORER", "CANADA/SK", "U"],
    ["US GOLD CORP", "NASDAQ: USAU", "DEV/EXPL", "USA/WY, NV,ID", "Au, Cu"],
    ["VALKEA RESOURCES CORP", "TSX-V: OZ;OTCQB: OZBKF", "EXPLORER", "FINLAND", "Au"],
    ["VANADIUMCORP RESOURCE INC.^^ ~", "TSX-V: VRB; OTCQB: VRBFF", "EXPLORER", "CANADA/QC", "V"],
    ["VIOR GOLD CORPORATION INC", "TSX-V: VIO; OTCQB: VIORF", "EXPLORER", "CANADA/QC", "Au, Ni"],
    ["VIZSLA SILVER CORP", "TSX-V: VZLA; NYSE: VZLA", "DEVELOPER", "MEXICO", "Ag"],
    ["VOLTA METALS LTD.*", "CSE: VLTA;OTCQB: VOLMF", "EXPLORER", "CANADA/ON", "CM"],
    ["WALLBRIDGE MINING COMPANY LIMITED", "TSX:WM; OTCQB: WLBMF", "EXPLORER/DEV", "CANADA/QC", "Au"],
    ["WESDOME GOLD MINES LTD.*", "TSX: WDO; OTCQX: WDOFF", "PRODUCER", "CANADA/ON", "Au"],
    ["WEST POINT GOLD CORP", "TSX-V: WPG; OTCQB: WPGCF", "EXPLORER", "USA/AZ; NV", "Au"],
    ["WESTERN EXPLORATION INC.~", "TSX-V: WEX; OTC: WEXPF", "EXPLORER", "USA/NV", "Au, Ag"],
    ["WHITE GOLD CORP*", "TSX-V:WGO; OTCQX: WHGOF", "DEVELOPER", "CANADA/YK", "Au"],
    ["WINSHEAR GOLD CORP ^^", "TSX-V: WINS", "EXPLORER", "CANADA/ON; UK", "Au, Ni, Cu, Co"],
    ["XAU RESOURCES INC.~", "TSX-V: GIG", "EXPLORER", "GUYANA", "Au"],
    ["XXIX METAL CORP.*", "TSX-V: XXIX; OTCQB; QCCUF", "EXPLORER", "CANADA/QC", "Cu"]
];

const COMPANIES_BY_YEAR = {
    "2026": COMPANIES_2026,
    "2024": [],
    "2023": []
};

function highlightCompanyName(name) {
    return name.replace(/(\*|\^\^|#|~)+/g, m => '<span class="marker">' + m + '</span>');
}

function renderCompanies(rows) {
    const body = document.getElementById('companiesTableBody');
    const empty = document.getElementById('companiesEmpty');
    const wrap = document.querySelector('.companies-table-wrap');
    const count = document.getElementById('companiesCount');
    if (!body || !wrap) return;

    if (!rows || rows.length === 0) {
        body.innerHTML = '';
        wrap.querySelector('table').style.display = 'none';
        if (empty) empty.style.display = 'block';
        if (count) count.textContent = '0';
        return;
    }

    wrap.querySelector('table').style.display = '';
    if (empty) empty.style.display = 'none';
    if (count) count.textContent = rows.length;

    body.innerHTML = rows.map(r =>
        '<tr>' +
            '<td class="company-name">' + highlightCompanyName(r[0]) + '</td>' +
            '<td class="ticker">' + r[1] + '</td>' +
            '<td class="type">' + r[2] + '</td>' +
            '<td class="location">' + r[3] + '</td>' +
            '<td class="commodities">' + r[4] + '</td>' +
        '</tr>'
    ).join('');
}

function filterCompanies() {
    const yearEl = document.getElementById('companiesYear');
    const searchEl = document.getElementById('companiesSearch');
    if (!yearEl) return;

    const year = yearEl.value;
    const query = (searchEl ? searchEl.value : '').trim().toLowerCase();
    const dataset = COMPANIES_BY_YEAR[year] || [];

    // No data for this year → archive empty state (ignore search)
    if (dataset.length === 0) {
        renderCompanies([]);
        return;
    }

    const filtered = query
        ? dataset.filter(r => r.some(cell => String(cell).toLowerCase().includes(query)))
        : dataset;

    if (filtered.length === 0) {
        const body = document.getElementById('companiesTableBody');
        const count = document.getElementById('companiesCount');
        const wrap = document.querySelector('.companies-table-wrap');
        if (wrap) wrap.querySelector('table').style.display = '';
        if (body) body.innerHTML = '<tr class="companies-noresults"><td colspan="5">No companies match &ldquo;' + query + '&rdquo;.</td></tr>';
        if (count) count.textContent = '0';
        return;
    }

    renderCompanies(filtered);
}

function loadCompaniesWithLoader() {
    const loader = document.getElementById('companiesLoader');
    const tableContainer = document.getElementById('companiesTableContainer');
    const countContainer = document.querySelector('.companies-meta');
    const yearEl = document.getElementById('companiesYear');
    const searchEl = document.getElementById('companiesSearch');

    // Reset filter state so the user always lands on the default 2026 view
    if (yearEl) yearEl.value = '2026';
    if (searchEl) searchEl.value = '';

    // Force fade-up elements on this page to be visible so nothing stays hidden
    // behind opacity:0 while the IntersectionObserver catches up.
    document.querySelectorAll('#page-companies .fade-up').forEach(el => el.classList.add('visible'));

    if (loader) loader.style.display = 'block';
    if (tableContainer) tableContainer.style.display = 'none';
    if (countContainer) countContainer.style.opacity = '0';

    setTimeout(() => {
        filterCompanies();
        if (loader) loader.style.display = 'none';
        if (tableContainer) tableContainer.style.display = 'block';
        if (countContainer) {
            countContainer.style.transition = 'opacity 0.3s ease';
            countContainer.style.opacity = '1';
        }
    }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if we start on the companies page (for direct links or initial load)
    if (document.getElementById('page-companies') && document.getElementById('page-companies').classList.contains('active')) {
        loadCompaniesWithLoader();
    } else {
        filterCompanies(); // just pre-filter in background
    }
});
setTimeout(() => {
    if (document.getElementById('page-companies') && document.getElementById('page-companies').classList.contains('active')) {
        // already loading via DOMContentLoaded
    } else {
        filterCompanies();
    }
}, 150);

// ─── SPONSORS PAGE ─────────────────────────────────────────────────────────
// Folder names map 1:1 to section titles. The directory on disk is `sponsers`
// (note the existing project spelling). Image lists below mirror what's in
// each subfolder — add/remove filenames here when partners change.
const SPONSORS_BASE = 'sponsers';
const SPONSORS_DATA = [
    {
        title: 'Platinum Partners',
        files: [
            '5.png',
            '7.png',
            '8.png',
            '9.png',
            'Agnico_Eagle_Logo.svg.png'
        ]
    },
    {
        title: 'Gold Partners',
        files: [
            '1.pdf (1).png',
            '1.pdf.png',
            '12 (1).png',
            'peartree.8c0c95cff01a.png',
            'SPONSORS+04.09.26+(1).pdf.png'
        ]
    },
    {
        title: 'Silver Partners',
        files: [
            '12.png',
            '12 (2).png',
            '12 (3).png',
            '12 (4).png',
            '12 (7).png',
            '12 (8).png',
            '12 (9).png',
            '12 (10).png',
            '3.png',
            '642e8adf6f6728bf086ca90e_logo.svg',
            '790205.avif'
        ]
    },
    {
        title: 'Copper Partners',
        files: [
            '11.png', '12.png', '13.png', '14.png', '15.png', '16.png',
            '17.png', '18.png', '19.png', '20.png', '21.png', '22.png'
        ]
    },
    {
        title: 'Media Partners',
        files: [
            '1.pdf.png',
            '24.png', '25.png', '26.png', '27.png', '28.png', '29.png',
            '30.png', '31.png', '32.png', '33.png', '34.png', '35.png',
            '36.png', '37.png', '39.png', '40.png', '41.png', '42.png',
            '43.png', '44.png', '45.png'
        ]
    }
];

function buildSponsorImagePath(folder, file) {
    return SPONSORS_BASE + '/' + encodeURIComponent(folder) + '/' + encodeURIComponent(file);
}

function altForSponsor(folder, file) {
    const base = file.replace(/\.[^.]+$/, '').replace(/[+_().-]/g, ' ').trim();
    return (base || 'Sponsor logo') + ' — ' + folder;
}

let sponsorsRendered = false;
function renderSponsorsPage() {
    const root = document.getElementById('sponsorsRoot');
    if (!root) return;
    if (sponsorsRendered) {
        // Re-arm the fade-up observer for sections so the animation replays cleanly.
        root.querySelectorAll('.sp-section.fade-up').forEach(s => s.classList.remove('visible'));
        initFadeUps();
        return;
    }

    const html = SPONSORS_DATA.map(section => {
        const cards = (section.files && section.files.length)
            ? section.files.map(file => {
                const src = buildSponsorImagePath(section.title, file);
                const alt = altForSponsor(section.title, file);
                return (
                    '<button type="button" class="sp-card" ' +
                        'data-src="' + src + '" ' +
                        'data-caption="' + section.title + '" ' +
                        'aria-label="Preview ' + alt + '">' +
                        '<span class="sp-card-badge">' + section.title.replace(/ Partners$/i, '') + '</span>' +
                        '<img class="sp-card-img" ' +
                            'src="' + src + '" ' +
                            'alt="' + alt + '" ' +
                            'loading="lazy" ' +
                            'decoding="async" ' +
                            'referrerpolicy="no-referrer" />' +
                    '</button>'
                );
            }).join('')
            : '<div class="sp-empty">No partners listed yet.</div>';

        const sectionId = 'tier-' + section.title.toLowerCase().replace(/\s+/g, '-');
        return (
            '<section class="sp-section fade-up" id="' + sectionId + '" data-tier="' + section.title + '">' +
                '<header class="sp-section-head">' +
                    '<div class="sp-section-eyebrow">Tier</div>' +
                    '<h2 class="sp-section-title">' +
                        section.title.replace(/^(\w+)/, '<em>$1</em>') +
                    '</h2>' +
                    '<div class="gold-rule sp-section-rule" aria-hidden="true"></div>' +
                '</header>' +
                '<div class="sp-grid">' + cards + '</div>' +
            '</section>'
        );
    }).join('');

    root.innerHTML = html;
    sponsorsRendered = true;

    // Wire card clicks → modal
    root.querySelectorAll('.sp-card').forEach(card => {
        card.addEventListener('click', () => {
            openSponsorModal(card.dataset.src, card.dataset.caption, card.querySelector('img')?.alt || '');
        });
    });

    // Engage scroll-in animation
    initFadeUps();

    // Sidebar scroll-spy + smooth click-through
    setupSponsorSidenav();
}

// ─── Sponsors sidebar: smooth scroll + IntersectionObserver scroll-spy ───
let sponsorSpyObserver = null;
function setupSponsorSidenav() {
    const sidenav = document.querySelector('#page-sponsors .sp-sidenav');
    if (!sidenav) return;
    const links = sidenav.querySelectorAll('a[data-target]');
    const sections = document.querySelectorAll('#sponsorsRoot .sp-section[id]');
    if (!links.length || !sections.length) return;

    const linkById = {};
    links.forEach(a => { linkById[a.dataset.target] = a; });

    const setActive = (id) => {
        links.forEach(a => a.classList.remove('is-active'));
        if (linkById[id]) linkById[id].classList.add('is-active');
    };

    // Default: first tier active
    setActive(sections[0].id);

    // Smooth-scroll on click, with offset for the fixed top nav.
    links.forEach(a => {
        if (a.dataset.spyBound === '1') return;
        a.dataset.spyBound = '1';
        a.addEventListener('click', (e) => {
            const id = a.dataset.target;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
            const top = target.getBoundingClientRect().top + window.scrollY - (navH + 16);
            window.scrollTo({ top, behavior: 'smooth' });
            setActive(id);
        });
    });

    // Disconnect any previous observer (e.g. on re-render)
    if (sponsorSpyObserver) sponsorSpyObserver.disconnect();

    // The rootMargin biases detection to the top third of the viewport,
    // so the link flips as a section's heading crosses into view.
    sponsorSpyObserver = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
    }, {
        rootMargin: '-120px 0px -65% 0px',
        threshold: 0
    });

    sections.forEach(s => sponsorSpyObserver.observe(s));
}

// ─── Sponsor lightbox modal ───
function openSponsorModal(src, caption, alt) {
    const modal = document.getElementById('spModal');
    if (!modal) return;
    const img = modal.querySelector('.sp-modal-img');
    const cap = modal.querySelector('.sp-modal-caption');
    if (img) {
        img.src = src;
        img.alt = alt || caption || 'Sponsor preview';
    }
    if (cap) cap.textContent = caption || '';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeSponsorModal() {
    const modal = document.getElementById('spModal');
    if (!modal) return;
    modal.hidden = true;
    const img = modal.querySelector('.sp-modal-img');
    if (img) img.src = '';
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('spModal');
    if (!modal) return;
    modal.querySelector('.sp-modal-close')?.addEventListener('click', closeSponsorModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSponsorModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeSponsorModal();
    });
});

// ─── GALLERY (page-media) — lightbox + staggered entrance ─────────────────
function initGalleryPage() {
    const grid = document.querySelector('#page-media .media-tiles-grid');
    const lightbox = document.getElementById('galleryLightbox');
    if (!grid || !lightbox) return;

    const tiles = Array.from(grid.querySelectorAll('.media-tile'));
    const lbImg = lightbox.querySelector('.gl-img');
    const lbCounter = lightbox.querySelector('.gl-counter');
    const lbClose = lightbox.querySelector('.gl-close');
    const lbPrev = lightbox.querySelector('.gl-prev');
    const lbNext = lightbox.querySelector('.gl-next');

    let currentIndex = -1;

    // Make tiles keyboard-accessible + inject a hover caption from img.alt
    // (aria-hidden because the parent's aria-label already names the tile).
    tiles.forEach((tile, i) => {
        tile.setAttribute('role', 'button');
        tile.setAttribute('tabindex', '0');
        const img = tile.querySelector('img');
        const alt = img && img.alt ? img.alt.trim() : '';
        tile.setAttribute('aria-label', alt
            ? `${alt} — open image ${i + 1} of ${tiles.length}`
            : `Open image ${i + 1} of ${tiles.length}`);
        if (alt && !tile.querySelector('.media-tile-label')) {
            const label = document.createElement('span');
            label.className = 'media-tile-label';
            label.textContent = alt;
            label.setAttribute('aria-hidden', 'true');
            tile.appendChild(label);
        }
    });

    function openAt(index) {
        if (index < 0 || index >= tiles.length) return;
        const tile = tiles[index];
        const img = tile.querySelector('img');
        if (!img) return;
        currentIndex = index;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        if (lbCounter) lbCounter.textContent = `${index + 1} / ${tiles.length}`;
        lightbox.hidden = false;
        // Force reflow so the .is-open transition runs
        // eslint-disable-next-line no-unused-expressions
        lightbox.offsetWidth;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightbox.hidden = true;
            lbImg.src = '';
            currentIndex = -1;
        }, 300);
    }

    function step(delta) {
        if (currentIndex < 0) return;
        const next = (currentIndex + delta + tiles.length) % tiles.length;
        openAt(next);
    }

    tiles.forEach((tile, i) => {
        tile.addEventListener('click', () => openAt(i));
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openAt(i);
            }
        });
    });

    lbClose?.addEventListener('click', close);
    lbPrev?.addEventListener('click', () => step(-1));
    lbNext?.addEventListener('click', () => step(1));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('gl-stage')) close();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'ArrowRight') step(1);
    });

    // Staggered entrance — trigger when grid scrolls into view
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    grid.classList.add('is-visible');
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
        io.observe(grid);
    } else {
        grid.classList.add('is-visible');
    }
}

// Re-runs the entrance animation (called when SPA navigates to media page).
// Safe to call repeatedly; it just re-applies the visibility class.
function triggerGalleryEntrance() {
    const grid = document.querySelector('#page-media .media-tiles-grid');
    if (!grid) return;
    grid.classList.remove('is-visible');
    // Force reflow so the animation restarts when the class is re-added.
    // eslint-disable-next-line no-unused-expressions
    grid.offsetWidth;
    requestAnimationFrame(() => grid.classList.add('is-visible'));
}

document.addEventListener('DOMContentLoaded', initGalleryPage);

// ─── FEATURED PARTNERS CAROUSEL ────────────────────────────────────────────
// Spotlight carousel on the home page. Reuses the Media Partners image list
// from SPONSORS_DATA so partner additions/removals stay in one place.
function initFeaturedPartnersCarousel() {
    const container = document.getElementById('featuredPartnersCarousel');
    if (!container) return;
    const track = container.querySelector('#featuredPartnersTrack');
    const dotsContainer = container.querySelector('#featuredPartnersDots');
    const prevBtn = container.querySelector('.fp-arrow-prev');
    const nextBtn = container.querySelector('.fp-arrow-next');
    const tabsContainer = document.getElementById('featuredPartnersTiers');
    const titleTierEl = document.getElementById('featuredPartnersTier');
    if (!track || !dotsContainer || !prevBtn || !nextBtn) return;

    // Always clone 3 at each end so an "infinite" advance never reveals an empty slot,
    // regardless of whether the viewport currently shows 1, 2, or 3 slides.
    const CLONES = 3;

    // Flat stream across every tier in SPONSORS_DATA order. When the centered
    // slide reaches the last image of one tier, the next slide is the first
    // image of the following tier; once the final tier's last image is shown,
    // the loop wraps back to the first tier.
    function buildFlatData() {
        const out = [];
        SPONSORS_DATA.forEach(tier => {
            if (tier.files && tier.files.length) {
                tier.files.forEach(file => {
                    out.push({ tier: tier.title, file: file });
                });
            }
        });
        return out;
    }

    const data = buildFlatData();
    const total = data.length;
    if (!total) return;

    let currentTier = '';
    let visible = computeVisible();
    let activeIdx = CLONES;
    let isAnimating = false;
    let isPaused = false;
    let autoTimer = null;
    let animFallback = null;
    const AUTO_INTERVAL = 2200;
    const TRANSITION_MS = 1100; // safety > CSS transition duration

    function computeVisible() {
        if (window.matchMedia('(max-width: 600px)').matches) return 1.35;
        return 5;
    }

    function buildSlide(entry, isClone) {
        const src = buildSponsorImagePath(entry.tier, entry.file);
        const alt = altForSponsor(entry.tier, entry.file);
        const slide = document.createElement('div');
        slide.className = 'fp-slide';
        if (isClone) slide.classList.add('fp-slide--clone');
        slide.dataset.tier = entry.tier;
        slide.setAttribute('role', 'listitem');
        slide.setAttribute('aria-label', alt);
        const card = document.createElement('div');
        card.className = 'fp-slide-card';
        const img = document.createElement('img');
        img.className = 'fp-slide-img';
        img.src = src;
        img.alt = alt;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.draggable = false;
        card.appendChild(img);
        slide.appendChild(card);
        return slide;
    }

    function renderSlides() {
        track.innerHTML = '';
        // Prepend last CLONES items (wrapped via modulo so it works for any total)
        for (let i = total - CLONES; i < total; i++) {
            const idx = ((i % total) + total) % total;
            track.appendChild(buildSlide(data[idx], true));
        }
        // Real slides
        data.forEach(entry => track.appendChild(buildSlide(entry, false)));
        // Append first CLONES items
        for (let i = 0; i < CLONES; i++) {
            track.appendChild(buildSlide(data[i % total], true));
        }
    }

    function setActiveTier(tierName) {
        if (tierName === currentTier) return;
        currentTier = tierName;
        if (titleTierEl) titleTierEl.textContent = tierName.replace(/ Partners$/i, '');
        if (tabsContainer) {
            tabsContainer.querySelectorAll('.fp-tier').forEach(t => {
                const isActive = t.dataset.tier === tierName;
                t.classList.toggle('is-active', isActive);
                t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }
    }

    function update(animate) {
        track.style.transition = animate ? '' : 'none';
        const offsetPct = (((visible - 1) / 2) - activeIdx) * (100 / visible);
        track.style.transform = 'translateX(' + offsetPct + '%)';

        const slides = track.querySelectorAll('.fp-slide');
        slides.forEach((s, i) => {
            const dist = Math.abs(i - activeIdx);
            s.classList.toggle('is-center', i === activeIdx);
            s.classList.toggle('is-near', dist === 1);
            s.classList.toggle('is-far', dist > 1);
        });

        const realIdx = (((activeIdx - CLONES) % total) + total) % total;
        const activeEntry = data[realIdx];
        if (activeEntry) setActiveTier(activeEntry.tier);
    }

    function isVisible() {
        // offsetParent is null when the element (or any ancestor) is display:none.
        return container.offsetParent !== null;
    }

    function settle() {
        isAnimating = false;
        clearTimeout(animFallback);
        animFallback = null;
        if (activeIdx >= total + CLONES) {
            activeIdx -= total;
            update(false);
            void track.offsetWidth;
        } else if (activeIdx < CLONES) {
            activeIdx += total;
            update(false);
            void track.offsetWidth;
        }
    }

    function goTo(idx) {
        if (isAnimating) return;
        if (idx === activeIdx) return;
        // If the carousel is hidden (off-screen page), update silently.
        if (!isVisible()) {
            activeIdx = idx;
            update(false);
            settle();
            return;
        }
        isAnimating = true;
        activeIdx = idx;
        update(true);
        clearTimeout(animFallback);
        animFallback = setTimeout(settle, TRANSITION_MS);
    }

    function next() { goTo(activeIdx + 1); }
    function prev() { goTo(activeIdx - 1); }

    track.addEventListener('transitionend', (e) => {
        if (e.target !== track || e.propertyName !== 'transform') return;
        settle();
    });

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => {
            if (isPaused || !isVisible()) return;
            next();
        }, AUTO_INTERVAL);
    }

    function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // Pause on hover / focus
    container.addEventListener('mouseenter', () => { isPaused = true; });
    container.addEventListener('mouseleave', () => { isPaused = false; });
    container.addEventListener('focusin', () => { isPaused = true; });
    container.addEventListener('focusout', () => { isPaused = false; });

    // Manual nav
    prevBtn.addEventListener('click', () => prev());
    nextBtn.addEventListener('click', () => next());

    // Keyboard support when carousel is focused
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    });

    // Re-evaluate visible count on resize; reposition without re-rendering.
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const v = computeVisible();
            if (v !== visible) {
                visible = v;
                update(false);
            }
        }, 120);
    });

    // Pause auto-play when the tab is hidden so we don't pile up frames.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAuto();
        else startAuto();
    });

    function jumpToTier(tierName) {
        const firstIdx = data.findIndex(e => e.tier === tierName);
        if (firstIdx < 0) return;
        const targetIdx = CLONES + firstIdx;
        if (targetIdx === activeIdx) return;
        goTo(targetIdx);
        // Reset the auto-timer so the user gets a full interval before it advances.
        startAuto();
    }

    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.fp-tier');
            if (!btn || !btn.dataset.tier) return;
            jumpToTier(btn.dataset.tier);
        });
    }

    renderSlides();
    update(false);
    startAuto();
}

document.addEventListener('DOMContentLoaded', initFeaturedPartnersCarousel);

// ─── LANGUAGE SWITCHER ───
let currentLang = localStorage.getItem('siteLanguage') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('siteLanguage', lang);
  
  // Update toggle UI
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update tagged elements. Always use innerHTML so keys containing markup
  // (spans, <br>, <em>, entities like &nbsp;) render correctly.
  const elements = document.querySelectorAll('[data-t]');
  elements.forEach(el => {
    const key = el.getAttribute('data-t');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Update placeholder/value attributes via [data-t-attr="placeholder:key,title:key2"]
  document.querySelectorAll('[data-t-attr]').forEach(el => {
    const spec = el.getAttribute('data-t-attr');
    spec.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key && TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
        el.setAttribute(attr, TRANSLATIONS[lang][key]);
      }
    });
  });

  // Re-run any specific dynamic renders if needed (e.g. Sponsors)
  if (currentPage === 'sponsors') {
    sponsorsRendered = false; // Force re-render to pick up new tier names
    renderSponsorsPage();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  setLanguage(currentLang);

  // Toggle click handlers (Desktop & Mobile)
  const toggles = ['langToggle', 'langToggleMobile'];
  toggles.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const lang = opt.dataset.lang;
          if (lang !== currentLang) {
            setLanguage(lang);
          }
        });
      });
    }
  });
});
