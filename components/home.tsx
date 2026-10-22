'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { languages, type Locale, type Dictionary } from '../lib/i18n';
import { asset, basePath, site } from '../lib/config';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" className={diagonal ? 'diagonal' : ''}><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg>;
}
function Star({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 80 80" fill="none"><path d="M40 1c0 28-11 39-39 39 28 0 39 11 39 39 0-28 11-39 39-39C51 40 40 29 40 1Z" fill="currentColor"/></svg>;
}
function Mark() { return <span className="brand"><span className="monogram" aria-hidden="true"><i>B</i>M<span>♡</span></span><span className="brand-name">BEAUTY<br/>BY MICA</span></span>; }
function LanguageSelect({ lang, label, suffix = '' }: { lang: Locale; label: string; suffix?: string }) {
  // Each locale is a complete static document with its own lang and hashed CSP.
  // A full navigation also preserves fragment anchors on hosts without a Next server.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  return <div className="language"><label className="sr-only" htmlFor={`language${suffix}`}>{label}</label><select id={`language${suffix}`} value={lang} onChange={e => { window.location.href = `${basePath}/${e.target.value}/${window.location.hash}`; }}>{languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}</select></div>;
}

export function Home({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [menu, setMenu] = useState(false);
  const [comparison, setComparison] = useState(50);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const heroActions = document.querySelector('.hero-ctas');
    if (!heroActions) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileBooking(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    observer.observe(heroActions);
    return () => observer.disconnect();
  }, []);
  const nav = [{ href: '#home', text: t.home }, { href: '#looks', text: t.looks }, { href: '#portfolio', text: t.portfolio }, { href: '#about', text: t.about }];
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && menu) { setMenu(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menu]);
  function openBooking() {
    if (site.bookingUrl) { window.location.assign(site.bookingUrl); return; }
    lastTrigger.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
  }
  function closeBooking() { dialog.current?.close(); }
  const bookingButton = (className = 'button button-dark') => <button className={className} onClick={openBooking}>{t.book}<Arrow diagonal /></button>;
  return <>
    <a href="#main" className="skip-link">{t.skip}</a>
    <div className="preview-bar"><span>{t.preview}</span><span className="preview-tag"><span aria-hidden="true">✦</span> {t.previewTag}</span></div>
    <header className="header" id="home">
      <a className="brand-link" href={`${basePath}/${lang}/`} aria-label="Beauty by Mica"><Mark /></a>
      <nav className="desktop-nav" aria-label={t.menu}>{nav.map(n => <a key={n.href} href={n.href}>{n.text}</a>)}</nav>
      <div className="header-actions"><button className="header-book" onClick={openBooking}>{t.book}<Arrow diagonal /></button><LanguageSelect lang={lang} label={t.language}/><button ref={menuButton} className="menu-toggle" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)} aria-label={menu ? t.close : t.menu}><span className={menu ? 'menu-lines open' : 'menu-lines'}><i/><i/></span></button></div>
      <nav className="mobile-nav" id="mobile-nav" hidden={!menu} aria-label={t.menu}>{nav.map(n => <a key={n.href} href={n.href} onClick={() => setMenu(false)}>{n.text}<Arrow /></a>)}{bookingButton()}</nav>
    </header>
    {lang !== 'en' && <p className="translation-note">{t.review}</p>}
    <main id="main">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="tiny-line"/>{t.eyebrow}</p><h1 id="hero-title">{t.hero1}<br/><em>{t.hero2}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-ctas">{bookingButton()}<a className="text-link" href="#looks">{t.explore}<Arrow /></a></div><div className="hero-bottom"><span className="location-dot"/>Marie Pampoen, Curaçao<span className="hero-edition">EST. IN BEAUTY</span></div></div>
        <figure className="hero-visual"><div className="hero-image"><Image src={asset('/images/hero.webp')} alt={t.heroAlt} width={1200} height={1500} priority sizes="(max-width: 767px) 100vw, 52vw"/><div className="hero-stamp" aria-hidden="true"><span>BEAUTY IS</span><Star/><span>PERSONAL</span></div><span className="image-label">{t.imageLabel}</span></div><figcaption><span>{t.heroNote}</span><span aria-hidden="true">01 — BM</span></figcaption></figure>
      </section>
      <div className="discovery-strip section-shell"><a href="#about"><span>{t.scroll}</span><span aria-hidden="true">↓</span></a><span aria-hidden="true">PERSONAL. BEAUTIFUL. YOU.</span></div>
      <section id="about" className="artist section-shell section-space" aria-labelledby="artist-title"><p className="eyebrow">{t.artistLabel}</p><div className="artist-copy"><Star className="artist-star"/><h2 id="artist-title">{t.artistTitle}<br/><em>{t.artistItalic}</em></h2><div className="artist-detail"><p>{t.artistText}</p><span className="signature" aria-hidden="true">{t.signature}<span>♡</span></span></div><a href="#experience" className="text-link">{t.artistLink}<Arrow/></a></div></section>
      <section id="looks" className="looks section-shell section-space" aria-labelledby="looks-title"><div className="section-heading"><div><p className="eyebrow">{t.looksLabel}</p><h2 id="looks-title">{t.looksTitle}<br/><em>{t.looksItalic}</em></h2></div><p className="section-note">{t.looksNote}</p></div><div className="look-grid">{t.lookNames.map((name, i) => <article className={`look-card look-${i}`} key={name}><div className="look-art" aria-hidden="true"><span className="art-number">0{i + 1}</span><div className="cosmetic-art"><span/><span/><span/></div><Star className="art-star"/></div><div className="look-meta"><p className="micro">{t.inspiration}</p><h3>{name}</h3><p>{t.lookDescriptions[i]}</p></div></article>)}</div></section>
      <section className="comparison section-space" aria-labelledby="comparison-title"><div className="section-shell comparison-grid"><div className="comparison-copy"><p className="eyebrow">{t.comparisonLabel}</p><h2 id="comparison-title">{t.comparisonTitle}<br/><em>{t.comparisonItalic}</em></h2><p>{t.comparisonText}</p><Star className="comparison-star"/></div><div><div className="comparison-frame" style={{ '--split': `${comparison}%` } as CSSProperties}><div className="comparison-study study-before" aria-hidden="true"><span className="study-circle"/><span className="study-stroke"/></div><div className="comparison-study study-after" aria-hidden="true"><span className="study-circle"/><span className="study-stroke"/></div><span className="comparison-label before">{t.before}</span><span className="comparison-label after">{t.after}</span><div className="comparison-divider" aria-hidden="true"><span>‹ &nbsp; ›</span></div><input type="range" min="0" max="100" value={comparison} onChange={e => setComparison(Number(e.target.value))} aria-label={t.comparisonControl} aria-describedby="comparison-help comparison-disclosure"/><span className="demo-badge" id="comparison-disclosure">{t.comparisonDisclosure}</span></div><p id="comparison-help" className="comparison-help"><span aria-hidden="true">↔</span>{t.comparisonHelp}</p></div></div></section>
      <section id="experience" className="experience section-shell section-space" aria-labelledby="experience-title"><div><p className="eyebrow">{t.experienceLabel}</p><h2 id="experience-title">{t.experienceTitle}<br/><em>{t.experienceItalic}</em></h2><p className="section-note">{t.experienceNote}</p></div><div className="experience-steps">{t.experienceNames.map((name, i) => <article key={name}><span className="step-number">0{i + 1}</span><div><h3>{name}</h3><p>{t.experienceDescriptions[i]}</p></div><Star/></article>)}</div></section>
      <section id="portfolio" className="gallery section-shell section-space" aria-labelledby="gallery-title"><div className="section-heading"><div><p className="eyebrow">{t.galleryLabel}</p><h2 id="gallery-title">{t.galleryTitle}<br/><em>{t.galleryItalic}</em></h2></div><p className="section-note">{t.galleryNote}</p></div><div className="gallery-grid"><figure className="gallery-main"><div className="gallery-photo"><Image src={asset('/images/hero.webp')} alt={t.galleryAlt} width={1200} height={1500} sizes="(max-width:767px) 100vw, 50vw"/><span className="image-label">{t.imageLabel}</span></div><figcaption><span>{t.galleryCaptions[0]}</span><span>01 /</span></figcaption></figure><figure className="gallery-detail"><div className="gallery-photo"><Image src={asset('/images/detail.webp')} alt={t.galleryAlt} width={800} height={800} sizes="(max-width:767px) 80vw, 36vw"/><span className="image-label">{t.imageLabel}</span></div><figcaption><span>{t.galleryCaptions[1]}</span><span>02 /</span></figcaption></figure><div className="gallery-message" aria-hidden="true"><Star/><span>Beauty,<br/><em>by Mica.</em></span></div></div></section>
      <section id="booking" className="booking section-space" aria-labelledby="booking-title"><div className="section-shell"><p className="eyebrow">{t.bookingLabel}</p><div className="booking-main"><h2 id="booking-title">{t.bookingTitle}<br/><em>{t.bookingItalic}</em></h2><Star className="booking-star"/></div><div className="booking-bottom"><p>{t.bookingText}</p><div>{bookingButton()}<p className="booking-note">{t.bookingNote}</p></div></div></div></section>
    </main>
    <footer className="footer section-shell"><div className="footer-top"><a className="brand-link" href="#home" aria-label="Beauty by Mica"><Mark/></a><p>Marie Pampoen<br/>Curaçao</p><div className="footer-links"><a href="#about">{t.about}</a><a href="#looks">{t.looks}</a><button onClick={openBooking}>{t.book}<Arrow diagonal/></button></div><div className="footer-contact"><span>{t.instagram}</span><span>{t.contact}</span><LanguageSelect lang={lang} label={t.language} suffix="-footer"/></div></div><p className="footer-disclosure">{t.footerNote}</p><div className="footer-bottom"><p>© {new Date().getFullYear()} {t.rights}</p><p>{t.privacy}</p><a href="#home" aria-label={t.home}>↑</a></div></footer>
    {showMobileBooking && <div className="mobile-booking"><span>Beauty by Mica<small>Marie Pampoen, Curaçao</small></span>{bookingButton()}</div>}
    <dialog ref={dialog} className="booking-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-text" onClose={() => { lastTrigger.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) closeBooking(); } }}><button className="dialog-close" aria-label={t.close} onClick={closeBooking}>×</button><Star className="dialog-star"/><p className="eyebrow">{t.dialogTag}</p><h2 id="dialog-title">{t.dialogTitle}</h2><p id="dialog-text">{t.dialogText}</p><p className="dialog-privacy">{t.dialogPrivacy}</p><button className="button button-dark" onClick={closeBooking}>{t.back}<Arrow/></button></dialog>
  </>;
}
