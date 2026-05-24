import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#F4F7FF;color:#0A1628;overflow-x:hidden}
:root{
  --navy:#0A1628;--blue:#1A5FFF;--bluem:#3B7BFF;--bluelt:#EEF3FF;
  --teal:#00C9A7;--teallt:#E2FBF6;--gold:#F5A623;--goldlt:#FFF8ED;
  --white:#fff;--off:#F4F7FF;--muted:#6B7A99;--border:#E0E8F5;
  --sh:0 4px 20px rgba(10,22,40,.07);
  --shm:0 10px 40px rgba(10,22,40,.11);
  --shl:0 24px 64px rgba(10,22,40,.15);
  --r:20px;--fd:'Fraunces',Georgia,serif;--fb:'Plus Jakarta Sans',sans-serif;
}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:500;
  background:rgba(255,255,255,.97);backdrop-filter:blur(18px);
  border-bottom:1.5px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(16px,4vw,54px);height:68px;gap:12px;
}
.nav-logo{font-family:var(--fd);font-size:1.3rem;font-weight:900;color:var(--navy);flex-shrink:0;white-space:nowrap}
.nav-logo em{font-style:normal;color:var(--blue)}
.nav-links{display:flex;align-items:center;gap:22px}
.nl{font-size:.84rem;font-weight:600;color:var(--muted);cursor:pointer;
  border:none;background:none;font-family:var(--fb);transition:color .16s;white-space:nowrap}
.nl:hover{color:var(--blue)}
.nav-btn{
  background:linear-gradient(135deg,var(--blue),#003ECC);color:#fff;
  font-family:var(--fb);font-size:.84rem;font-weight:700;
  padding:10px 22px;border-radius:10px;border:none;cursor:pointer;flex-shrink:0;
  box-shadow:0 3px 14px rgba(26,95,255,.3);transition:transform .16s,box-shadow .16s;white-space:nowrap;
}
.nav-btn:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(26,95,255,.38)}
@media(max-width:680px){.nav-links{display:none}}

/* ══════════════════════════════════
   HERO — BRIGHT & LIGHT
══════════════════════════════════ */
.hero{
  min-height:100vh;padding:108px 20px 70px;
  background:linear-gradient(168deg,#ffffff 0%,#EAF0FF 48%,#D8E7FF 100%);
  display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 56% 56% at 82% 12%,rgba(26,95,255,.09) 0%,transparent 65%),
    radial-gradient(ellipse 42% 42% at 12% 88%,rgba(0,201,167,.08) 0%,transparent 60%),
    radial-gradient(ellipse 34% 34% at 55% 55%,rgba(59,123,255,.04) 0%,transparent 70%);
}
.hblob{position:absolute;border-radius:50%;filter:blur(72px);pointer-events:none}
.hb1{width:500px;height:500px;background:rgba(26,95,255,.06);top:-130px;right:-100px;animation:hbf 10s ease-in-out infinite}
.hb2{width:300px;height:300px;background:rgba(0,201,167,.06);bottom:-80px;left:-60px;animation:hbf 13s ease-in-out infinite reverse}
@keyframes hbf{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-22px)}}
.hring{position:absolute;border-radius:50%;pointer-events:none;opacity:.07}
.hr1{width:220px;height:220px;border:3px solid var(--blue);top:10%;right:7%;animation:spin 32s linear infinite}
.hr2{width:130px;height:130px;border:2px solid var(--teal);bottom:18%;left:4%;animation:spin 22s linear infinite reverse}
@keyframes spin{to{transform:rotate(360deg)}}

.hero-in{position:relative;z-index:1;text-align:center;max-width:880px;width:100%}

.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:#fff;border:1.5px solid #C5D6FF;color:var(--blue);
  font-size:.77rem;font-weight:700;letter-spacing:.2px;
  padding:8px 20px;border-radius:100px;margin-bottom:30px;
  box-shadow:0 2px 16px rgba(26,95,255,.1);
}
.bp{width:7px;height:7px;background:var(--teal);border-radius:50%;animation:bpa 2s infinite;flex-shrink:0}
@keyframes bpa{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}

/* Rotation — CSS grid stack, zero layout shift */
.hero-h{font-family:var(--fd);font-size:clamp(2rem,5.5vw,3.8rem);font-weight:900;color:var(--navy);line-height:1.12;margin-bottom:12px}
.rw{display:inline-grid;vertical-align:middle}
.ri{grid-area:1/1;color:var(--blue);transition:opacity .36s ease,transform .36s ease;white-space:nowrap}
.ri.on{opacity:1;transform:translateY(0)}
.ri.off{opacity:0;transform:translateY(-12px);pointer-events:none}
.hs{display:block;color:var(--navy)}

.hero-sub{color:var(--muted);font-size:clamp(.9rem,2.2vw,1.1rem);line-height:1.76;margin:20px auto 36px;max-width:510px}
.hero-sub strong{color:var(--blue)}

.btn-row{display:flex;gap:13px;justify-content:center;flex-wrap:wrap}
.btn-p{background:linear-gradient(135deg,var(--blue),#003ECC);color:#fff;font-family:var(--fb);font-size:.97rem;font-weight:700;padding:15px 36px;border-radius:12px;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(26,95,255,.33);transition:transform .16s,box-shadow .16s}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(26,95,255,.43)}
.btn-o{background:#fff;color:var(--navy);font-family:var(--fb);font-size:.97rem;font-weight:700;padding:15px 36px;border-radius:12px;border:1.5px solid #C0D4FF;cursor:pointer;box-shadow:0 2px 10px rgba(10,22,40,.06);transition:all .16s}
.btn-o:hover{border-color:var(--blue);box-shadow:0 4px 18px rgba(26,95,255,.12);transform:translateY(-2px)}

.hero-stats{display:flex;gap:clamp(18px,5vw,52px);justify-content:center;flex-wrap:wrap;margin-top:54px;padding-top:34px;border-top:1px solid #C8D9FF}
.sn{font-family:var(--fd);font-size:1.9rem;font-weight:900;color:var(--navy)}
.sl{font-size:.72rem;color:var(--muted);letter-spacing:.4px;margin-top:3px;text-align:center}

.hero-chips{display:flex;justify-content:center;flex-wrap:wrap;gap:9px;margin-top:24px}
.hchip{display:flex;align-items:center;gap:5px;background:#fff;border:1px solid #D5E2FF;border-radius:100px;padding:5px 12px;font-size:.72rem;font-weight:600;color:var(--muted);box-shadow:0 1px 6px rgba(10,22,40,.04)}

/* ── GENERAL ── */
.sec{padding:clamp(50px,8vw,88px) 20px}
.bg-w{background:#fff}.bg-o{background:var(--off)}
.wrap{max-width:1120px;margin:0 auto}
.sec-lbl{font-size:.69rem;font-weight:700;letter-spacing:2.5px;color:var(--blue);text-transform:uppercase;margin-bottom:10px}
.sec-ttl{font-family:var(--fd);font-size:clamp(1.7rem,4vw,2.7rem);font-weight:900;color:var(--navy);line-height:1.13}
.sec-sub{color:var(--muted);font-size:.93rem;line-height:1.7;margin-top:10px}
.sec-hd{text-align:center;margin-bottom:50px}

/* ── QUIZ ── */
.quiz-shell{background:linear-gradient(140deg,#0A1628,#0D2E6E 80%);border-radius:26px;padding:50px clamp(20px,5%,64px);color:#fff;position:relative;overflow:hidden}
.quiz-shell::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 54% 68% at 84% 14%,rgba(59,123,255,.28) 0%,transparent 58%)}
.qi{position:relative;z-index:1}
.qprog{display:flex;gap:8px;margin-bottom:36px}
.qp{flex:1;height:4px;border-radius:4px;background:rgba(255,255,255,.14);transition:background .3s}
.qp.on{background:var(--teal)}
.qq{font-family:var(--fd);font-size:clamp(1.25rem,3vw,1.95rem);font-weight:700;margin-bottom:7px}
.qhint{color:rgba(255,255,255,.46);font-size:.82rem;margin-bottom:24px}
.qopts{display:grid;grid-template-columns:repeat(auto-fit,minmax(178px,1fr));gap:11px}
.qopt{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);border-radius:14px;padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:11px;transition:all .16s}
.qopt:hover{background:rgba(255,255,255,.13);border-color:rgba(255,255,255,.28);transform:translateY(-2px)}
.qico{font-size:1.5rem;flex-shrink:0}
.qlbl{font-weight:700;font-size:.9rem}
.qsub{font-size:.72rem;color:rgba(255,255,255,.46);margin-top:2px}
.qnav{display:flex;align-items:center;justify-content:space-between;margin-top:28px;flex-wrap:wrap;gap:12px}
.qback{background:transparent;border:1.5px solid rgba(255,255,255,.2);color:#fff;padding:10px 22px;border-radius:10px;cursor:pointer;font-family:var(--fb);font-size:.84rem;transition:border-color .16s}
.qback:hover{border-color:rgba(255,255,255,.48)}
.qstep{color:rgba(255,255,255,.36);font-size:.79rem}
.rtag{display:inline-block;background:rgba(0,201,167,.18);border:1px solid var(--teal);color:var(--teal);font-size:.72rem;font-weight:700;letter-spacing:1px;padding:5px 14px;border-radius:100px;margin-bottom:14px}
.rcard{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:24px;margin:18px 0;display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap}
.rtitle{font-family:var(--fd);font-size:1.4rem;font-weight:900}
.rdesc{color:rgba(255,255,255,.56);font-size:.82rem;margin-top:5px;line-height:1.55}
.rpill{background:rgba(245,166,35,.15);border:1px solid var(--gold);color:var(--gold);font-weight:700;font-size:.77rem;padding:7px 14px;border-radius:100px;white-space:nowrap;flex-shrink:0}

/* ── PACKAGES GRID ── */
.pkgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(252px,1fr));gap:22px}
@media(min-width:960px){.pkgrid{grid-template-columns:repeat(4,1fr)}}
@media(max-width:540px){.pkgrid{grid-template-columns:1fr}}

.pkg{background:#fff;border-radius:var(--r);box-shadow:var(--sh);border:1.5px solid var(--border);cursor:pointer;transition:transform .22s,box-shadow .22s,border-color .22s;display:flex;flex-direction:column;overflow:hidden;position:relative}
.pkg:hover{transform:translateY(-6px);box-shadow:var(--shl);border-color:#B5C8FF}
.pkg:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.pkg.feat{border-color:var(--blue);border-width:2px}
.ptop{padding:24px 22px 18px;flex:1}
.pbadge{position:absolute;top:14px;right:14px;background:linear-gradient(135deg,var(--gold),#E09000);color:#fff;font-size:.62rem;font-weight:800;padding:4px 10px;border-radius:100px}
.pico{font-size:2rem;margin-bottom:12px;display:block}
.pname{font-family:var(--fd);font-size:1.12rem;font-weight:900;color:var(--navy);line-height:1.2}
.ptag{color:var(--muted);font-size:.76rem;margin:6px 0 14px;line-height:1.4}
.pclist{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:13px}
.pclist li{font-size:.77rem;color:#374151;display:flex;align-items:flex-start;gap:6px;line-height:1.4}
.pclist li::before{content:'✓';color:var(--teal);font-weight:800;font-size:.82rem;flex-shrink:0;margin-top:1px}
.pmore{font-size:.74rem;color:var(--blue);font-weight:700;margin-top:3px;cursor:pointer}
.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}
.chip{font-size:.67rem;font-weight:700;padding:3px 8px;border-radius:6px}
.ct{background:#E2FBF6;color:#009A6E}
.cb{background:#EEF3FF;color:var(--blue)}
.cg{background:#FFF8ED;color:#B06000;border:1px solid #FFE0A0}

.pbot{padding:14px 22px 20px;border-top:1px solid var(--border)}
.ppr{display:flex;align-items:baseline;gap:9px;margin-bottom:11px;flex-wrap:wrap}
.pprice{font-family:var(--fd);font-size:2rem;font-weight:900;color:var(--navy)}
.pwas{font-size:.82rem;color:var(--muted);text-decoration:line-through}
.psave{font-size:.7rem;font-weight:700;color:var(--teal);background:rgba(0,201,167,.1);padding:3px 8px;border-radius:6px;white-space:nowrap}
.pbtns{display:flex;gap:8px}
.pcta{flex:1;padding:12px 8px;border-radius:11px;border:none;cursor:pointer;font-family:var(--fb);font-size:.88rem;font-weight:700;background:linear-gradient(135deg,var(--blue),#003ECC);color:#fff;transition:transform .16s,box-shadow .16s}
.pcta:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(26,95,255,.33)}
.pdet{padding:11px 14px;border-radius:11px;border:1.5px solid var(--border);background:#fff;color:var(--blue);cursor:pointer;font-size:.8rem;font-weight:700;font-family:var(--fb);white-space:nowrap;transition:all .16s;flex-shrink:0}
.pdet:hover{background:var(--bluelt);border-color:var(--blue)}
@media(max-width:380px){.pbtns{flex-direction:column}}

/* ══════════════════════════════════
   BUNDLE DETAIL PAGE (full-screen)
══════════════════════════════════ */
.detail-page{
  min-height:100vh;background:var(--off);
  padding-top:68px; /* below nav */
  animation:dpIn .28s ease;
}
@keyframes dpIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* hero strip */
.dp-hero{
  background:linear-gradient(140deg,#0A1628 0%,#0D2E6E 60%,#1340A0 100%);
  padding:48px clamp(16px,5%,60px) 44px;
  position:relative;overflow:hidden;
}
.dp-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 80% 10%,rgba(59,123,255,.26) 0%,transparent 60%)}
.dp-back{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  color:#fff;font-family:var(--fb);font-size:.83rem;font-weight:600;
  padding:8px 18px;border-radius:100px;cursor:pointer;
  transition:background .16s;margin-bottom:28px;position:relative;z-index:1;
}
.dp-back:hover{background:rgba(255,255,255,.18)}
.dp-hero-in{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:28px}
.dp-icon{font-size:3rem;margin-bottom:12px}
.dp-name{font-family:var(--fd);font-size:clamp(1.6rem,4vw,2.6rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:8px}
.dp-tag{color:rgba(255,255,255,.62);font-size:.95rem;margin-bottom:20px;line-height:1.5}
.dp-pricecard{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);border-radius:18px;padding:22px 26px;min-width:220px;flex-shrink:0;backdrop-filter:blur(8px)}
.dp-price{font-family:var(--fd);font-size:2.8rem;font-weight:900;color:#fff;line-height:1}
.dp-was{font-size:.85rem;color:rgba(255,255,255,.42);text-decoration:line-through;margin-top:4px}
.dp-saving{display:inline-block;background:rgba(0,201,167,.2);border:1px solid rgba(0,201,167,.35);color:var(--teal);font-size:.8rem;font-weight:700;padding:5px 12px;border-radius:8px;margin-top:10px}
.dp-enrol{display:block;width:100%;margin-top:16px;padding:14px;border-radius:12px;border:none;cursor:pointer;font-family:var(--fb);font-size:.95rem;font-weight:800;background:linear-gradient(135deg,var(--teal),#00A888);color:#fff;box-shadow:0 4px 16px rgba(0,201,167,.35);transition:transform .16s}
.dp-enrol:hover{transform:translateY(-2px)}

/* body */
.dp-body{max-width:900px;margin:0 auto;padding:44px clamp(16px,4%,40px) 80px}
.dp-grid{display:grid;grid-template-columns:1fr 340px;gap:30px;align-items:start}
@media(max-width:760px){.dp-grid{grid-template-columns:1fr}}

.dp-card{background:#fff;border-radius:18px;padding:28px;box-shadow:var(--sh);border:1.5px solid var(--border);margin-bottom:22px}
.dp-card-ttl{font-family:var(--fd);font-size:1.12rem;font-weight:900;color:var(--navy);margin-bottom:16px;display:flex;align-items:center;gap:8px}
.dp-about{font-size:.92rem;color:#374151;line-height:1.76}
.dp-clist{list-style:none;display:flex;flex-direction:column;gap:8px}
.dp-clist li{display:flex;align-items:flex-start;gap:9px;font-size:.9rem;color:#374151;line-height:1.45;padding:10px 12px;background:var(--off);border-radius:10px;border:1px solid var(--border)}
.dp-clist li .cnum{font-family:var(--fd);font-size:.85rem;font-weight:900;color:var(--blue);min-width:22px;flex-shrink:0}
.dp-incl{display:flex;flex-direction:column;gap:10px}
.dp-incl-item{display:flex;align-items:flex-start;gap:11px;padding:14px;background:var(--off);border-radius:12px;border:1.5px solid var(--border)}
.dp-incl-ico{font-size:1.4rem;flex-shrink:0}
.dp-incl-lbl{font-weight:700;font-size:.86rem;color:var(--navy)}
.dp-incl-sub{font-size:.76rem;color:var(--muted);margin-top:2px;line-height:1.4}
.dp-free{display:inline-block;background:#E2FBF6;color:#009A6E;font-size:.66rem;font-weight:800;padding:2px 7px;border-radius:5px;margin-left:6px;vertical-align:middle}

/* QLS upgrade box */
.qls-card{background:var(--goldlt);border:1.5px solid #FFD97D;border-radius:18px;padding:24px;margin-bottom:22px}
.qls-ttl{font-weight:900;font-size:1rem;color:#7A4400;display:flex;align-items:center;gap:7px;margin-bottom:8px;font-family:var(--fd)}
.qls-body{font-size:.86rem;color:#8B5200;line-height:1.7;margin-bottom:16px}
.qls-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.qls-price{font-family:var(--fd);font-size:1.55rem;font-weight:900;color:#7A4400}
.qls-sub{font-size:.73rem;color:#9A6500;margin-top:2px}
.btn-qls{background:linear-gradient(135deg,var(--gold),#D98800);color:#fff;font-family:var(--fb);font-size:.86rem;font-weight:700;padding:11px 22px;border-radius:10px;border:none;cursor:pointer;box-shadow:0 3px 12px rgba(245,166,35,.38);transition:transform .16s}
.btn-qls:hover{transform:translateY(-1px)}

.outcomes-list{display:flex;flex-direction:column;gap:8px}
.oi{display:flex;align-items:center;gap:9px;background:linear-gradient(90deg,var(--bluelt),transparent);padding:11px 14px;border-radius:10px;border-left:3px solid var(--blue);font-size:.88rem;font-weight:600;color:var(--navy)}

/* sticky sidebar */
.dp-sidebar{position:sticky;top:84px}
.sidebar-cta{background:linear-gradient(140deg,var(--navy),#0D2E6E);border-radius:18px;padding:26px;color:#fff;text-align:center;box-shadow:var(--shm);margin-bottom:18px}
.sc-price{font-family:var(--fd);font-size:2.4rem;font-weight:900;color:#fff}
.sc-was{font-size:.84rem;color:rgba(255,255,255,.4);text-decoration:line-through;margin-top:2px}
.sc-save{display:inline-block;background:rgba(0,201,167,.2);border:1px solid rgba(0,201,167,.3);color:var(--teal);font-size:.78rem;font-weight:700;padding:4px 10px;border-radius:7px;margin:10px 0}
.sc-enrol{width:100%;padding:14px;border-radius:12px;border:none;cursor:pointer;font-family:var(--fb);font-size:.95rem;font-weight:800;background:linear-gradient(135deg,var(--teal),#009980);color:#fff;box-shadow:0 4px 16px rgba(0,201,167,.3);transition:transform .16s;margin-top:4px}
.sc-enrol:hover{transform:translateY(-2px)}
.sc-list{list-style:none;display:flex;flex-direction:column;gap:7px;margin-top:16px;text-align:left}
.sc-list li{display:flex;align-items:center;gap:7px;font-size:.81rem;color:rgba(255,255,255,.72)}
.sc-list li::before{content:'✓';color:var(--teal);font-weight:800;flex-shrink:0}

.sidebar-qls{background:var(--goldlt);border:1.5px solid #FFD97D;border-radius:16px;padding:20px}
.sq-ttl{font-weight:800;font-size:.88rem;color:#7A4400;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.sq-body{font-size:.78rem;color:#8B5200;line-height:1.6;margin-bottom:12px}
.sq-price{font-family:var(--fd);font-size:1.35rem;font-weight:900;color:#7A4400;margin-bottom:10px}
.btn-sqls{width:100%;padding:11px;border-radius:10px;border:none;cursor:pointer;font-family:var(--fb);font-size:.84rem;font-weight:700;background:linear-gradient(135deg,var(--gold),#D98800);color:#fff;transition:transform .16s}
.btn-sqls:hover{transform:translateY(-1px)}

/* ── COMPARISON ── */
.cmp-wrap{overflow-x:auto;border-radius:16px;box-shadow:var(--sh)}
.cmp{width:100%;border-collapse:separate;border-spacing:0;min-width:580px}
.cmp th{background:var(--navy);color:#fff;padding:14px 16px;font-family:var(--fb);font-size:.78rem;font-weight:700;text-align:left}
.cmp th:first-child{border-radius:16px 0 0 0}
.cmp th:last-child{border-radius:0 16px 0 0}
.cmp th.hl{background:var(--blue)}
.cmp td{padding:12px 16px;font-size:.83rem;border-bottom:1px solid #EEF0F8;background:#fff}
.cmp tr:last-child td{border-bottom:none}
.cmp tr:last-child td:first-child{border-radius:0 0 0 16px}
.cmp tr:last-child td:last-child{border-radius:0 0 16px 0}
.cmp tr:nth-child(even) td{background:#F9FAFB}
.cmp td:first-child{font-weight:700;color:var(--navy)}
.cmp td.hl{font-weight:800;color:var(--blue)}

/* ── CALC ── */
.calc{background:linear-gradient(140deg,var(--navy),#0D2E6E 80%);border-radius:24px;padding:50px clamp(20px,5%,64px);color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center}
@media(max-width:640px){.calc{grid-template-columns:1fr;gap:30px}}
.calc-ttl{font-family:var(--fd);font-size:clamp(1.4rem,3vw,2.1rem);font-weight:900;line-height:1.2;margin-bottom:10px}
input[type=range]{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;background:rgba(255,255,255,.18);outline:none;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--teal);border:3px solid #fff;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.24)}
.sinfo{display:flex;justify-content:space-between;color:rgba(255,255,255,.44);font-size:.78rem;margin-bottom:9px}
.cnums{display:flex;flex-direction:column;gap:12px}
.crow{background:rgba(255,255,255,.07);border-radius:13px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.crow.sv{background:rgba(0,201,167,.15);border:1px solid rgba(0,201,167,.28)}
.clbl{font-size:.82rem;color:rgba(255,255,255,.62);line-height:1.3}
.cval{font-family:var(--fd);font-size:1.5rem;font-weight:900;white-space:nowrap}
.cval.gr{color:var(--teal)}
.cval.st{text-decoration:line-through;color:rgba(255,255,255,.38);font-size:1.15rem}

/* ── TESTIMONIALS ── */
.ttrack{display:flex;gap:18px;overflow-x:auto;padding-bottom:12px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.ttrack::-webkit-scrollbar{height:4px}
.ttrack::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}
.tcard{background:#fff;border-radius:18px;padding:24px;min-width:275px;max-width:308px;box-shadow:var(--sh);scroll-snap-align:start;flex-shrink:0;border:1.5px solid var(--border)}
.tstars{color:var(--gold);font-size:.9rem;margin-bottom:9px;letter-spacing:1px}
.ttext{font-size:.86rem;color:#374151;line-height:1.66;margin-bottom:14px;font-style:italic}
.tauth{display:flex;align-items:center;gap:10px}
.tavatar{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:.88rem;color:#fff;flex-shrink:0}
.tname{font-weight:700;font-size:.83rem;color:var(--navy)}
.trole{font-size:.72rem;color:var(--muted)}

/* ── URGENCY ── */
.urgency{background:linear-gradient(135deg,#E84040,#C03030);border-radius:22px;padding:32px clamp(16px,4%,52px);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
.utag{font-size:.69rem;font-weight:700;letter-spacing:1.5px;color:rgba(255,255,255,.68);text-transform:uppercase}
.utitle{font-family:var(--fd);font-size:clamp(1.2rem,3vw,1.8rem);font-weight:900;color:#fff;margin-top:2px}
.trow{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.tblock{background:rgba(0,0,0,.22);border-radius:11px;padding:10px 14px;text-align:center;min-width:54px}
.tnum{font-family:var(--fd);font-size:1.75rem;font-weight:900;color:#fff;line-height:1}
.tlbl{font-size:.59rem;color:rgba(255,255,255,.56);text-transform:uppercase;letter-spacing:1px;margin-top:3px}
.tsep{font-size:1.7rem;font-weight:900;color:rgba(255,255,255,.3);line-height:1}
.btn-urg{background:rgba(255,255,255,.95);color:#C03030;font-family:var(--fb);font-size:.9rem;font-weight:800;padding:12px 26px;border-radius:11px;border:none;cursor:pointer;transition:transform .16s;white-space:nowrap}
.btn-urg:hover{transform:translateY(-2px)}

/* ── FAQ ── */
.faqlist{display:flex;flex-direction:column;gap:8px}
.faqitem{background:#fff;border-radius:13px;overflow:hidden;box-shadow:0 2px 10px rgba(10,22,40,.05);border:1.5px solid var(--border)}
.faqq{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;cursor:pointer;font-weight:700;font-size:.91rem;color:var(--navy);transition:background .16s;gap:12px;line-height:1.35}
.faqq:hover{background:#FAFBFF}
.faqchev{font-size:1rem;transition:transform .28s;color:var(--blue);flex-shrink:0}
.faqchev.op{transform:rotate(180deg)}
.faqa{padding:0 20px 16px;font-size:.86rem;color:var(--muted);line-height:1.72;border-top:1px solid var(--border);padding-top:13px}

/* ── FINAL CTA ── */
.fcta{background:linear-gradient(140deg,var(--navy),#0D2E6E);border-radius:28px;padding:66px clamp(20px,6%,80px);text-align:center;position:relative;overflow:hidden}
.fcta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 54% 64% at 50% 50%,rgba(26,95,255,.28) 0%,transparent 70%)}
.fcta-in{position:relative;z-index:1}
.fcta-ttl{font-family:var(--fd);font-size:clamp(1.9rem,5vw,3rem);font-weight:900;color:#fff;margin-bottom:12px;line-height:1.15}
.fcta-sub{color:rgba(255,255,255,.6);font-size:.96rem;margin-bottom:34px;line-height:1.65}
.trust-row{display:flex;gap:11px;justify-content:center;flex-wrap:wrap;margin-top:30px}
.tbadge{display:flex;align-items:center;gap:5px;color:rgba(255,255,255,.5);font-size:.75rem;background:rgba(255,255,255,.06);padding:6px 12px;border-radius:100px;border:1px solid rgba(255,255,255,.1)}

/* ── STICKY ── */
.sticky{position:fixed;bottom:0;left:0;right:0;z-index:400;background:rgba(10,22,40,.97);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;gap:16px;padding:12px 20px;flex-wrap:wrap;transform:translateY(100%);transition:transform .3s ease}
.sticky.show{transform:translateY(0)}
.slbl{color:rgba(255,255,255,.68);font-size:.82rem;white-space:nowrap}
.slbl strong{color:#fff}
`;

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const ROTATES = [
  "Start Your Care Career",
  "Get Promoted Faster",
  "Become NHS Admin Ready",
  "Specialise in Mental Health",
];

const PKGS = [
  {
    id: "starter", icon: "🏥", feat: false, popular: false,
    name: "Care Career Starter Bundle",
    tagline: "Everything you need to enter health & social care with confidence",
    courses: [
      "Health & Social Care Level 3",
      "Safeguarding Adults",
      "Medication Administration",
      "Infection Control",
      "Equality & Diversity",
      "First Aid Awareness",
    ],
    price: 59, was: 299,
    cta: "Enrol Now",
    outcomes: ["Support Worker", "Care Assistant", "Residential Support Worker"],
    qlsAvail: false,
    detail: "Designed for complete beginners, this bundle builds the essential foundations of health and social care from day one. Covering safeguarding, medication administration, infection control, and more — you'll complete all 6 courses with CPD-accredited certificates and a full PDF transcript, all included free. The bundle is recognised by UK employers and NHS providers, giving you a job-ready qualification at an affordable price.",
    cert: { cpd: 6, transcript: true, qls: false },
  },
  {
    id: "leadership", icon: "👑", feat: true, popular: true,
    name: "Senior Care Leadership Bundle",
    tagline: "10 comprehensive courses to take you into management and senior care roles",
    courses: [
      "Health & Social Care Level 5",
      "Leadership & Management",
      "Risk Assessment",
      "Supervision Skills",
      "Performance Management",
      "Conflict Resolution",
      "Team Communication",
      "Staff Appraisal Skills",
      "Delegation in Care",
      "HR Fundamentals for Managers",
    ],
    price: 99, was: 499,
    cta: "Get Leadership Ready",
    outcomes: ["Care Manager", "Team Leader", "Registered Supervisor", "Deputy Manager"],
    qlsAvail: true, qlsPrice: 89,
    detail: "Built for ambitious care workers ready to step into leadership, supervision, or management. This comprehensive 10-course bundle includes a CPD certificate and full PDF transcript for every course — all free. The content covers everything from people management and performance to risk assessment and HR fundamentals. For those applying for senior positions, the optional QLS Level 5 Endorsed Certificate adds a powerful premium credential recognised by regulators and senior employers.",
    cert: { cpd: 10, transcript: true, qls: true, qlsPrice: 89 },
  },
  {
    id: "admin", icon: "💻", feat: false, popular: false,
    name: "NHS Digital Administration Bundle",
    tagline: "Your pathway into healthcare administration and NHS support roles",
    courses: [
      "GDPR & Data Protection",
      "Excel + Office Skills",
      "Healthcare Administration",
      "Medical Terminology",
      "AI Tools for Administrators",
    ],
    price: 129, was: 499,
    cta: "Become Admin Ready",
    outcomes: ["NHS Administrator", "Medical Secretary", "Health Records Officer", "Clinical Support Administrator"],
    qlsAvail: true, qlsPrice: 79,
    detail: "Structured for those entering NHS or private healthcare administration, this bundle delivers practical, employer-recognised training across digital tools, compliance, and healthcare-specific knowledge. All 5 courses include a free CPD certificate and PDF transcript. For a stronger CV credential, the optional QLS Endorsed Certificate is available as a paid upgrade — ideal for those competing for NHS administrative or medical secretary roles.",
    cert: { cpd: 5, transcript: true, qls: true, qlsPrice: 79 },
  },
  {
    id: "mental", icon: "🧠", feat: false, popular: false,
    name: "Mental Health Specialist Bundle",
    tagline: "Expert-level credentials in mental health, neurodiversity, and therapeutic support",
    courses: [
      "Mental Health Awareness Level 3",
      "Counselling Skills",
      "CBT Awareness",
      "Autism Awareness",
      "ADHD Awareness",
    ],
    price: 79, was: 349,
    cta: "Specialise Today",
    outcomes: ["Mental Health Support Worker", "Wellbeing Coordinator", "Counselling Assistant", "SEND Support Worker"],
    qlsAvail: false,
    detail: "Develop recognised expertise across mental health, neurodiversity, and therapeutic support with this specialist 5-course bundle. Every course includes a free CPD-accredited certificate and a PDF transcript. Ideal for those working with vulnerable adults, young people, or in specialist care and education settings — this bundle is accepted by a wide range of UK healthcare employers and SEND support services.",
    cert: { cpd: 5, transcript: true, qls: false },
  },
];

const QUIZ_DATA = [
  {
    q: "What is your career goal?", hint: "Choose the option that best describes where you're heading",
    opts: [
      { ico: "🌱", lbl: "Start care career", sub: "New to health & social care", val: "starter" },
      { ico: "📈", lbl: "Get promoted", sub: "Move into leadership roles", val: "leadership" },
      { ico: "💼", lbl: "Move into admin", sub: "NHS / healthcare admin roles", val: "admin" },
      { ico: "🧠", lbl: "Mental health", sub: "Expert niche credentials", val: "mental" },
    ],
  },
  {
    q: "What's your experience level?", hint: "This helps us recommend the right starting point",
    opts: [
      { ico: "🐣", lbl: "Beginner", sub: "Little or no care experience", val: "b" },
      { ico: "🔷", lbl: "Intermediate", sub: "1–3 years in care", val: "i" },
      { ico: "⭐", lbl: "Experienced", sub: "3+ years, seeking advancement", val: "e" },
    ],
  },
  {
    q: "Preferred study focus?", hint: "We'll match you to the most suitable bundle",
    opts: [
      { ico: "🛠️", lbl: "Practical skills", sub: "Hands-on, work-ready training", val: "p" },
      { ico: "🏆", lbl: "Leadership", sub: "Managing teams & services", val: "l" },
      { ico: "📋", lbl: "Administration", sub: "Systems, records, compliance", val: "a" },
      { ico: "💙", lbl: "Specialist care", sub: "Niche expertise credentials", val: "s" },
    ],
  },
];

const TESTI = [
  { name: "Sarah M.", role: "Care Manager, Birmingham", text: "The Leadership Bundle gave me everything I needed to step into management. Promoted within 3 months!", stars: 5, col: "#1A5FFF" },
  { name: "David K.", role: "NHS Administrator, London", text: "The admin bundle is incredibly practical. The AI Tools module alone saves me hours every week.", stars: 5, col: "#00C9A7" },
  { name: "Priya S.", role: "Support Worker, Manchester", text: "Complete beginner. I landed my first care job within 6 weeks of finishing the Starter Bundle!", stars: 5, col: "#F5A623" },
  { name: "James T.", role: "Mental Health Worker, Leeds", text: "The CBT and counselling modules are genuinely in-depth. My employer was really impressed.", stars: 5, col: "#E84040" },
  { name: "Amara O.", role: "Team Leader, Bristol", text: "Studied alongside full-time work. Lifetime access made it totally manageable.", stars: 5, col: "#7C3AED" },
];

const FAQS = [
  { q: "Are CPD certificates included free in every bundle?", a: "Yes — every single bundle includes accredited CPD certificates for every course completed, issued as digital PDFs at no extra cost. You can share them directly with employers or add them to your LinkedIn profile." },
  { q: "What are PDF transcripts and are they free?", a: "PDF transcripts are detailed documents showing your learning outcomes, course content completed, and certificate references. These are included free with every bundle and are a great addition to any job application." },
  { q: "What is a QLS certificate and how is it different?", a: "QLS (Quality Licence Scheme) certificates are regulated by NCFE and carry greater weight with employers — especially for senior roles. They are an optional paid upgrade available on the Leadership and NHS Admin bundles. Your CPD certificates come free; QLS is a premium add-on." },
  { q: "Are these qualifications recognised by UK employers?", a: "Absolutely. All courses are CPD-accredited and widely accepted by NHS trusts, local authorities, care agencies, and private healthcare providers across the UK." },
  { q: "How long do I have access to the course content?", a: "Lifetime access — study at your own pace with no deadlines or expiry. Revisit any course material whenever you need a refresher." },
  { q: "Are payment plans available?", a: "Yes — interest-free monthly payment plans are available on all bundles. Split your payment over 3, 6, or 12 months at checkout." },
];

const COMP_ROWS = [
  { lbl: "Courses included", s: "6", l: "10", a: "5", m: "5" },
  { lbl: "CPD Certificates", s: "✓ Free ×6", l: "✓ Free ×10", a: "✓ Free ×5", m: "✓ Free ×5" },
  { lbl: "PDF Transcript", s: "✓ Free", l: "✓ Free", a: "✓ Free", m: "✓ Free" },
  { lbl: "QLS Endorsed Cert", s: "—", l: "+ £89 optional", a: "+ £79 optional", m: "—" },
  { lbl: "Study duration", s: "60–80 hrs", l: "100–120 hrs", a: "50–70 hrs", m: "60–80 hrs" },
  { lbl: "Savings vs. individual", s: "£240", l: "£400", a: "£370", m: "£270" },
  { lbl: "Career level", s: "Entry level", l: "Senior / Manager", a: "Admin / NHS", m: "Specialist" },
  { lbl: "Bundle Price", s: "£59", l: "£99", a: "£129", m: "£79" },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function pad(n) { return String(n).padStart(2, "0"); }
function useCountdown() {
  const [t, setT] = useState({ h: 11, m: 47, s: 33 });
  useEffect(() => {
    const id = setInterval(() => setT(p => {
      let { h, m, s } = p;
      s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) h = 23;
      return { h, m, s };
    }), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
function Nav({ onHome, onQuiz, view }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={onHome} style={{ cursor: "pointer" }}>
        Study<em>Booth</em>
      </div>
      {view === "home" && (
        <div className="nav-links">
          <button className="nl" onClick={() => scrollTo("pkgs")}>Bundles</button>
          <button className="nl" onClick={() => scrollTo("compare")}>Compare</button>
          <button className="nl" onClick={() => scrollTo("faqs")}>FAQ</button>
          <button className="nav-btn" onClick={onQuiz}>Find My Bundle</button>
        </div>
      )}
      {view === "detail" && (
        <div className="nav-links">
          <button className="nl" onClick={onHome}>← All Bundles</button>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function Hero({ onQuiz }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % ROTATES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="hblob hb1" /><div className="hblob hb2" />
      <div className="hring hr1" /><div className="hring hr2" />
      <div className="hero-in">
        <div className="hero-badge">
          <span className="bp" />
          🎓 UK's Leading Care Learning Platform · 24,000+ Learners
        </div>
        <h1 className="hero-h">
          <span className="rw">
            {ROTATES.map((r, i) => (
              <span key={r} className={`ri ${i === idx ? "on" : "off"}`}>{r}</span>
            ))}
          </span>
          <span className="hs">with a Focused Course Bundle</span>
        </h1>
        <p className="hero-sub">
          Choose your career-focused learning bundle and <strong>save up to 80%</strong>.{" "}
          CPD certificates &amp; PDF transcripts included <strong>free</strong> in every bundle.
        </p>
        <div className="btn-row">
          <button className="btn-p" onClick={() => scrollTo("pkgs")}>Explore Bundles →</button>
          <button className="btn-o" onClick={onQuiz}>🔍 Find My Bundle</button>
        </div>
        <div className="hero-stats">
          {[["24,000+", "Enrolled learners"], ["4.9★", "Average rating"], ["91%", "Completion rate"], ["From £59", "Bundle pricing"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="sn">{n}</div><div className="sl">{l}</div>
            </div>
          ))}
        </div>
        <div className="hero-chips">
          {["🔒 Secure Checkout", "📄 CPD Cert Free", "📑 PDF Transcript Free", "♾️ Lifetime Access", "💳 Pay Monthly", "✅ UK Recognised"].map(c => (
            <div key={c} className="hchip">{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QUIZ
═══════════════════════════════════════════════════════════════ */
function Quiz({ onSelect }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState([]);
  const [done, setDone] = useState(false);
  const MAP = { starter: PKGS[0], leadership: PKGS[1], admin: PKGS[2], mental: PKGS[3] };

  const pick = val => {
    const next = [...ans, val];
    setAns(next);
    if (step < QUIZ_DATA.length - 1) setStep(step + 1);
    else setDone(true);
  };
  const rec = done ? (MAP[ans[0]] || PKGS[0]) : null;

  return (
    <section className="sec bg-o" id="quiz">
      <div className="wrap">
        <div className="quiz-shell">
          <div className="qi">
            {!done ? (
              <>
                <div className="qprog">{QUIZ_DATA.map((_, i) => <div key={i} className={`qp${i <= step ? " on" : ""}`} />)}</div>
                <div className="qq">{QUIZ_DATA[step].q}</div>
                <div className="qhint">{QUIZ_DATA[step].hint}</div>
                <div className="qopts">
                  {QUIZ_DATA[step].opts.map(o => (
                    <div key={o.val} className="qopt" onClick={() => pick(o.val)}>
                      <span className="qico">{o.ico}</span>
                      <div><div className="qlbl">{o.lbl}</div><div className="qsub">{o.sub}</div></div>
                    </div>
                  ))}
                </div>
                <div className="qnav">
                  <span className="qstep">Step {step + 1} of {QUIZ_DATA.length}</span>
                  {step > 0 && <button className="qback" onClick={() => { setStep(step - 1); setAns(ans.slice(0, -1)); }}>← Back</button>}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div className="rtag">✨ RECOMMENDED FOR YOU</div>
                <div className="qq">Your perfect bundle match:</div>
                <div className="rcard">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>{rec.icon}</div>
                    <div className="rtitle">{rec.name}</div>
                    <div className="rdesc">{rec.courses.slice(0, 4).join(" · ")}{rec.courses.length > 4 ? ` +${rec.courses.length - 4} more` : ""}</div>
                  </div>
                  <div className="rpill">Save £{rec.was - rec.price}</div>
                </div>
                <div className="btn-row" style={{ justifyContent: "center" }}>
                  <button className="btn-p" onClick={() => onSelect(rec)}>{rec.cta}</button>
                  <button className="qback" onClick={() => { setStep(0); setAns([]); setDone(false); }}>Retake Quiz</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PACKAGES GRID
═══════════════════════════════════════════════════════════════ */
function Packages({ onSelect }) {
  return (
    <section className="sec bg-w" id="pkgs">
      <div className="wrap">
        <div className="sec-hd">
          <div className="sec-lbl">Course Bundles</div>
          <h2 className="sec-ttl">Choose Your Career Path</h2>
          <p className="sec-sub">Click any bundle to see the full course list, certificate details, and career outcomes · CPD certificates &amp; transcripts free in every bundle</p>
        </div>
        <div className="pkgrid">
          {PKGS.map(p => (
            <div key={p.id} className={`pkg${p.feat ? " feat" : ""}`}
              onClick={() => onSelect(p)} role="button" tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onSelect(p); }}>
              {p.popular && <div className="pbadge">⭐ Most Popular</div>}
              <div className="ptop">
                <span className="pico">{p.icon}</span>
                <div className="pname">{p.name}</div>
                <div className="ptag">{p.tagline}</div>
                <ul className="pclist">
                  {p.courses.slice(0, 5).map(c => <li key={c}>{c}</li>)}
                </ul>
                {p.courses.length > 5 && <div className="pmore">+{p.courses.length - 5} more courses →</div>}
                <div className="chips">
                  <span className="chip ct">📄 CPD Cert Free</span>
                  <span className="chip cb">📑 PDF Transcript</span>
                  {p.qlsAvail && <span className="chip cg">⭐ QLS Available</span>}
                </div>
              </div>
              <div className="pbot">
                <div className="ppr">
                  <div className="pprice">£{p.price}</div>
                  <div className="pwas">£{p.was}</div>
                  <div className="psave">Save £{p.was - p.price}</div>
                </div>
                <div className="pbtns">
                  <button className="pcta" onClick={e => { e.stopPropagation(); onSelect(p); }}>{p.cta}</button>
                  <button className="pdet" onClick={e => { e.stopPropagation(); onSelect(p); }}>Details ↗</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BUNDLE DETAIL — FULL PAGE
═══════════════════════════════════════════════════════════════ */
function DetailPage({ pkg, onBack }) {
  const topRef = useRef(null);
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "instant" }); }, []);

  return (
    <div className="detail-page" ref={topRef}>
      {/* ── Hero strip ── */}
      <div className="dp-hero">
        <button className="dp-back" onClick={onBack}>← Back to All Bundles</button>
        <div className="dp-hero-in">
          <div style={{ flex: 1 }}>
            <div className="dp-icon">{pkg.icon}</div>
            <h1 className="dp-name">{pkg.name}</h1>
            <p className="dp-tag">{pkg.tagline}</p>
            <div className="chips" style={{ gap: 8 }}>
              <span className="chip ct">📄 {pkg.cert.cpd} CPD Certs — Free</span>
              <span className="chip cb">📑 PDF Transcript — Free</span>
              {pkg.qlsAvail && <span className="chip cg">⭐ QLS Certificate Available</span>}
            </div>
          </div>
          <div className="dp-pricecard">
            <div className="dp-price">£{pkg.price}</div>
            <div className="dp-was">was £{pkg.was}</div>
            <div className="dp-saving">You save £{pkg.was - pkg.price}</div>
            <button className="dp-enrol">{pkg.cta}</button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="dp-body">
        <div className="dp-grid">
          {/* LEFT COL */}
          <div>
            {/* About */}
            <div className="dp-card">
              <div className="dp-card-ttl">📋 About This Bundle</div>
              <p className="dp-about">{pkg.detail}</p>
            </div>

            {/* Courses */}
            <div className="dp-card">
              <div className="dp-card-ttl">📚 Courses Included ({pkg.courses.length})</div>
              <ul className="dp-clist">
                {pkg.courses.map((c, i) => (
                  <li key={c}>
                    <span className="cnum">{i + 1}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificates & Transcripts */}
            <div className="dp-card">
              <div className="dp-card-ttl">🎓 Certificates &amp; Transcripts Included</div>
              <div className="dp-incl">
                {[
                  {
                    ico: "📄",
                    lbl: `CPD Accredited Certificate — FREE ×${pkg.cert.cpd}`,
                    sub: `You receive ${pkg.cert.cpd} individual CPD certificates, one for each course completed in this bundle. Issued as a digital PDF — share with employers or add to LinkedIn.`,
                  },
                  {
                    ico: "📑",
                    lbl: "PDF Transcript — FREE",
                    sub: "A detailed transcript covering all learning outcomes and course references. Ideal for job applications and appraisals.",
                  },
                  {
                    ico: "♾️",
                    lbl: "Lifetime Access",
                    sub: "No expiry dates. Revisit course material any time you need a refresher.",
                  },
                  {
                    ico: "✅",
                    lbl: "UK Employer Recognised",
                    sub: "CPD accreditation accepted by NHS trusts, care agencies, and private healthcare providers across the UK.",
                  },
                ].map(it => (
                  <div key={it.lbl} className="dp-incl-item">
                    <div className="dp-incl-ico">{it.ico}</div>
                    <div>
                      <div className="dp-incl-lbl">{it.lbl}</div>
                      <div className="dp-incl-sub">{it.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QLS (where available) */}
            {pkg.qlsAvail && (
              <div className="qls-card">
                <div className="qls-ttl">⭐ Optional Premium Certificate Upgrade</div>
                <p className="qls-body">
                  <strong>QLS (Quality Licence Scheme) Endorsed Certificate</strong> — regulated by NCFE — is a higher-level
                  credential that carries greater weight with employers, particularly for senior, management, or NHS roles.
                  Your CPD certificates and PDF transcript are already included free. The QLS certificate is a paid optional
                  upgrade for learners who want the strongest possible credential on their CV.
                </p>
                <div className="qls-row">
                  <div>
                    <div className="qls-price">+ £{pkg.cert.qlsPrice}</div>
                    <div className="qls-sub">Add at checkout, or at any time after enrolment</div>
                  </div>
                  <button className="btn-qls">Add QLS Certificate →</button>
                </div>
              </div>
            )}

            {/* Career Outcomes */}
            <div className="dp-card">
              <div className="dp-card-ttl">🎯 Career Outcomes</div>
              <div className="outcomes-list">
                {pkg.outcomes.map(o => <div key={o} className="oi">→ {o}</div>)}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="dp-sidebar">
            <div className="sidebar-cta">
              <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 8 }}>Bundle Price</div>
              <div className="sc-price">£{pkg.price}</div>
              <div className="sc-was">Individual price: £{pkg.was}</div>
              <div className="sc-save">You save £{pkg.was - pkg.price}</div>
              <button className="sc-enrol">{pkg.cta}</button>
              <ul className="sc-list">
                <li>{pkg.cert.cpd} CPD Certificates — Free</li>
                <li>PDF Transcript — Free</li>
                <li>Lifetime access, no deadline</li>
                <li>UK employer recognised</li>
                <li>Pay monthly available</li>
              </ul>
            </div>
            {pkg.qlsAvail && (
              <div className="sidebar-qls">
                <div className="sq-ttl">⭐ Add QLS Certificate</div>
                <p className="sq-body">
                  Upgrade to a QLS Endorsed Certificate for a more powerful credential — ideal for senior and NHS roles. Regulated by NCFE. Optional add-on.
                </p>
                <div className="sq-price">+ £{pkg.cert.qlsPrice}</div>
                <button className="btn-sqls">Add QLS Upgrade →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPARISON TABLE
═══════════════════════════════════════════════════════════════ */
function Compare() {
  return (
    <section className="sec bg-o" id="compare">
      <div className="wrap">
        <div className="sec-hd">
          <div className="sec-lbl">Compare Bundles</div>
          <h2 className="sec-ttl">Side-by-Side Breakdown</h2>
          <p className="sec-sub">Not sure which to choose? Compare every detail at a glance.</p>
        </div>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead>
              <tr>
                <th>Feature</th>
                <th>🏥 Starter</th>
                <th className="hl">👑 Leadership</th>
                <th>💻 Admin</th>
                <th>🧠 Mental Health</th>
              </tr>
            </thead>
            <tbody>
              {COMP_ROWS.map(r => (
                <tr key={r.lbl}>
                  <td>{r.lbl}</td>
                  <td>{r.s}</td>
                  <td className="hl">{r.l}</td>
                  <td>{r.a}</td>
                  <td>{r.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SAVINGS CALCULATOR
═══════════════════════════════════════════════════════════════ */
function Calc() {
  const [courses, setCourses] = useState(4);
  const per = 65, bundle = 59, ind = courses * per, saving = Math.max(0, ind - bundle);
  return (
    <section className="sec bg-w">
      <div className="wrap">
        <div className="calc">
          <div>
            <div className="sec-lbl" style={{ color: "rgba(255,255,255,.5)" }}>Savings Calculator</div>
            <div className="calc-ttl">See exactly how much you'll save</div>
            <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.65, fontSize: ".88rem", marginBottom: 8 }}>
              Drag the slider to compare individual course prices against a bundle.
            </p>
            <div style={{ marginTop: 24 }}>
              <div className="sinfo"><span>2 courses</span><span>8 courses</span></div>
              <input type="range" min={2} max={8} value={courses} onChange={e => setCourses(+e.target.value)} />
              <p style={{ color: "rgba(255,255,255,.36)", fontSize: ".75rem", marginTop: 7 }}>{courses} courses at ~£{per}/course if bought individually</p>
            </div>
          </div>
          <div className="cnums">
            <div className="crow"><div className="clbl">Buying {courses} courses individually</div><div className="cval st">£{ind}</div></div>
            <div className="crow"><div className="clbl">Care Career Starter Bundle</div><div className="cval">£{bundle}</div></div>
            <div className="crow sv"><div className="clbl" style={{ color: "var(--teal)", fontWeight: 700 }}>💰 Your total saving</div><div className="cval gr">{saving > 0 ? `£${saving}` : "—"}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
function Testimonials() {
  return (
    <section className="sec bg-o">
      <div className="wrap">
        <div className="sec-hd">
          <div className="sec-lbl">Learner Stories</div>
          <h2 className="sec-ttl">Real people, real career changes</h2>
        </div>
        <div className="ttrack">
          {TESTI.map(t => (
            <div key={t.name} className="tcard">
              <div className="tstars">{"★".repeat(t.stars)}</div>
              <p className="ttext">"{t.text}"</p>
              <div className="tauth">
                <div className="tavatar" style={{ background: t.col }}>{t.name[0]}</div>
                <div><div className="tname">{t.name}</div><div className="trole">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 22, color: "var(--muted)", fontSize: ".79rem" }}>
          24,000+ learners enrolled · 91% completion rate · 4.9★ average rating
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   URGENCY
═══════════════════════════════════════════════════════════════ */
function Urgency({ onBundles }) {
  const { h, m, s } = useCountdown();
  return (
    <section className="sec bg-w">
      <div className="wrap">
        <div className="urgency">
          <div>
            <div className="utag">⚡ Limited Time Offer</div>
            <div className="utitle">Bundle discount expires in:</div>
          </div>
          <div className="trow">
            <div className="tblock"><div className="tnum">{pad(h)}</div><div className="tlbl">Hours</div></div>
            <div className="tsep">:</div>
            <div className="tblock"><div className="tnum">{pad(m)}</div><div className="tlbl">Mins</div></div>
            <div className="tsep">:</div>
            <div className="tblock"><div className="tnum">{pad(s)}</div><div className="tlbl">Secs</div></div>
          </div>
          <button className="btn-urg" onClick={onBundles}>Claim Discount Now →</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="sec bg-o" id="faqs">
      <div className="wrap" style={{ maxWidth: 740 }}>
        <div className="sec-hd">
          <div className="sec-lbl">FAQ</div>
          <h2 className="sec-ttl">Common questions answered</h2>
        </div>
        <div className="faqlist">
          {FAQS.map((f, i) => (
            <div key={i} className="faqitem">
              <div className="faqq" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className={`faqchev${open === i ? " op" : ""}`}>▾</span>
              </div>
              {open === i && <div className="faqa">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════════════ */
function FinalCTA({ onBundles }) {
  return (
    <section className="sec bg-w">
      <div className="wrap">
        <div className="fcta">
          <div className="fcta-in">
            <div className="sec-lbl" style={{ color: "var(--teal)" }}>Ready to Begin?</div>
            <div className="fcta-ttl">Your next career move<br />starts today.</div>
            <p className="fcta-sub">Join 24,000+ learners. Bundles from just £59. CPD certificates &amp; transcripts included free.</p>
            <div className="btn-row">
              <button className="btn-p" style={{ fontSize: ".98rem", padding: "15px 38px" }} onClick={onBundles}>
                Choose My Bundle
              </button>
              <button className="btn-o" style={{ fontSize: ".98rem", padding: "15px 38px", background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.84)", border: "1.5px solid rgba(255,255,255,.18)" }}>
                💬 Speak to an Adviser
              </button>
            </div>
            <div className="trust-row">
              {["🔒 Secure Checkout", "📄 CPD Cert Free", "📑 PDF Transcript Free", "♾️ Lifetime Access", "💳 Pay Monthly", "✅ UK Recognised"].map(b => (
                <div key={b} className="tbadge">{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STICKY BAR
═══════════════════════════════════════════════════════════════ */
function Sticky({ onBundles }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const h = () => setVis(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`sticky${vis ? " show" : ""}`}>
      <div className="slbl"><strong>Bundle Sale</strong> — From £59 · CPD certs &amp; transcripts free</div>
      <button className="btn-p" style={{ padding: "10px 20px", fontSize: ".83rem" }} onClick={onBundles}>
        View Bundles →
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE (assembled)
═══════════════════════════════════════════════════════════════ */
function HomePage({ onSelect, showQuiz, setShowQuiz }) {
  return (
    <>
      <Hero onQuiz={() => {
        setShowQuiz(true);
        setTimeout(() => scrollTo("quiz"), 80);
      }} />
      {showQuiz && <Quiz onSelect={onSelect} />}
      <Packages onSelect={onSelect} />
      <Compare />
      <Calc />
      <Testimonials />
      <Urgency onBundles={() => scrollTo("pkgs")} />
      <FAQ />
      <FinalCTA onBundles={() => scrollTo("pkgs")} />
      <Sticky onBundles={() => scrollTo("pkgs")} />
      <div style={{ height: 68 }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT — STATE-BASED ROUTING
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("home"); // "home" | "detail"
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const goToBundle = pkg => {
    setSelectedPkg(pkg);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const goHome = () => {
    setView("home");
    setSelectedPkg(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <style>{CSS}</style>
      <Nav
        view={view}
        onHome={goHome}
        onQuiz={() => {
          if (view !== "home") { goHome(); setTimeout(() => { setShowQuiz(true); setTimeout(() => scrollTo("quiz"), 200); }, 100); }
          else { setShowQuiz(true); setTimeout(() => scrollTo("quiz"), 80); }
        }}
      />
      {view === "home" && <HomePage onSelect={goToBundle} showQuiz={showQuiz} setShowQuiz={setShowQuiz} />}
      {view === "detail" && selectedPkg && <DetailPage pkg={selectedPkg} onBack={goHome} />}
    </>
  );
}
