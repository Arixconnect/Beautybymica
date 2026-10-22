'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { languages, type Locale, type Dictionary } from '../lib/i18n';
import { asset, basePath, site } from '../lib/config';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" className={diagonal ? 'diagonal' : ''}><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg>;
}
function Star({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 80 80" fill="none"><path d="M40 1c0 28-11 39-39 39 28 0 39 11 39 39 0-28 11-39 39-39C51 40 40 29 40 1Z" fill="currentColor"/></svg>;
}
function Mark() { return <span className="brand"><Image className="brand-wordmark" src={asset('/images/brand-wordmark.webp')} alt="Beauty by Mica" width={420} height={221}/></span>; }
function LanguageSelect({ lang, label, suffix = '' }: { lang: Locale; label: string; suffix?: string }) {
  // Each locale is a complete static document with its own lang and hashed CSP.
  // A full navigation also preserves fragment anchors on hosts without a Next server.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  return <div className="language"><label className="sr-only" htmlFor={`language${suffix}`}>{label}</label><select id={`language${suffix}`} value={lang} onChange={e => { window.location.href = `${basePath}/${e.target.value}/${window.location.hash}`; }}>{languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}</select></div>;
}

export function Home({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [menu, setMenu] = useState(false);
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
        <figure className="hero-visual"><div className="hero-image"><Image src={asset('/images/glamorous-glam.webp')} alt={t.heroAlt} width={964} height={1381} priority sizes="(max-width: 767px) 100vw, 52vw"/></div><figcaption><span>{t.heroNote}</span><span aria-hidden="true">01 — BM</span></figcaption></figure>
      </section>
      <div className="discovery-strip section-shell"><a href="#about"><span>{t.scroll}</span><span aria-hidden="true">↓</span></a><span aria-hidden="true">PERSONAL. BEAUTIFUL. YOU.</span></div>
      <section id="about" className="artist section-shell section-space" aria-labelledby="artist-title"><div className="artist-identity"><p className="eyebrow">{t.artistLabel}</p><Image src={asset('/images/mica-brand.webp')} alt="Beauty by Mica — Mica" width={1100} height={1100} sizes="(max-width:767px) 220px, 28vw"/></div><div className="artist-copy"><Star className="artist-star"/><h2 id="artist-title">{t.artistTitle}<br/><em>{t.artistItalic}</em></h2><div className="artist-detail"><p>{t.artistText}</p><span className="signature" aria-hidden="true">{t.signature}<span>♡</span></span></div><a href="#experience" className="text-link">{t.artistLink}<Arrow/></a></div></section>
      <section id="looks" className="looks section-shell section-space" aria-labelledby="looks-title"><div className="section-heading"><div><p className="eyebrow">{t.looksLabel}</p><h2 id="looks-title">{t.looksTitle}<br/><em>{t.looksItalic}</em></h2></div><p className="section-note">{t.looksNote}</p></div><div className="look-grid">{t.lookNames.map((name, i) => <article className={`look-card look-${i}`} key={name}><div className="look-art"><Image src={asset(`/images/${['natural-glam', 'glamorous-glam', 'glitter-glam'][i]}.webp`)} alt={`${name} — Beauty by Mica`} width={[1100,964,997][i]} height={[1280,1381,1688][i]} sizes="(max-width:767px) 90vw, 30vw"/></div><div className="look-meta"><p className="micro">{t.inspiration}</p><h3>{name}</h3><p className="look-price">{['70,90','81,50','89,90'][i]} <span>XCG</span></p><p>{t.lookDescriptions[i]}</p></div></article>)}</div></section>
      <section className="comparison section-space" aria-labelledby="comparison-title"><div className="section-shell comparison-grid"><div className="comparison-copy"><p className="eyebrow">{t.comparisonLabel}</p><h2 id="comparison-title">{t.comparisonTitle}<br/><em>{t.comparisonItalic}</em></h2><p>{t.comparisonText}</p><Star className="comparison-star"/></div><figure className="carnival-photo"><Image src={asset('/images/carnival.webp')} alt={t.galleryCaptions[2]} width={1100} height={1467} sizes="(max-width:767px) 90vw, 48vw"/><figcaption>{t.galleryCaptions[2]} <span>BEAUTY BY MICA</span></figcaption></figure></div></section>
      <section id="experience" className="experience section-shell section-space" aria-labelledby="experience-title"><div><p className="eyebrow">{t.experienceLabel}</p><h2 id="experience-title">{t.experienceTitle}<br/><em>{t.experienceItalic}</em></h2><p className="section-note">{t.experienceNote}</p></div><div className="experience-steps">{t.experienceNames.map((name, i) => <article key={name}><span className="step-number">0{i + 1}</span><div><h3>{name}</h3><p>{t.experienceDescriptions[i]}</p></div><Star/></article>)}</div></section>
      <section id="portfolio" className="gallery section-shell section-space" aria-labelledby="gallery-title"><div className="section-heading"><div><p className="eyebrow">{t.galleryLabel}</p><h2 id="gallery-title">{t.galleryTitle}<br/><em>{t.galleryItalic}</em></h2></div><p className="section-note">{t.galleryNote}</p></div><div className="gallery-grid"><figure className="gallery-main"><div className="gallery-photo"><Image src={asset('/images/glamorous-glam-2.webp')} alt={t.galleryCaptions[0]} width={965} height={1818} sizes="(max-width:767px) 90vw, 48vw"/></div><figcaption><span>{t.galleryCaptions[0]}</span><span>01 /</span></figcaption></figure><figure className="gallery-detail"><div className="gallery-photo"><Image src={asset('/images/kids.webp')} alt={t.galleryCaptions[1]} width={1100} height={1467} sizes="(max-width:767px) 80vw, 38vw"/></div><figcaption><span>{t.galleryCaptions[1]}</span><span>02 /</span></figcaption></figure><div className="gallery-message" aria-hidden="true"><Star/><span>Beauty,<br/><em>by Mica.</em></span></div></div></section>
      <section id="booking" className="booking section-space" aria-labelledby="booking-title"><div className="section-shell"><p className="eyebrow">{t.bookingLabel}</p><div className="booking-main"><h2 id="booking-title">{t.bookingTitle}<br/><em>{t.bookingItalic}</em></h2><Star className="booking-star"/></div><div className="booking-bottom"><p>{t.bookingText}</p><div>{bookingButton()}<p className="booking-note">{t.bookingNote}</p></div></div></div></section>
    </main>
    <footer className="footer section-shell"><div className="footer-top"><a className="brand-link" href="#home" aria-label="Beauty by Mica"><Mark/></a><p>Marie Pampoen<br/>Curaçao</p><div className="footer-links"><a href="#about">{t.about}</a><a href="#looks">{t.looks}</a><button onClick={openBooking}>{t.book}<Arrow diagonal/></button></div><div className="footer-contact"><span>{t.instagram}</span><span>{t.contact}</span><LanguageSelect lang={lang} label={t.language} suffix="-footer"/></div></div><p className="footer-disclosure">{t.footerNote}</p><div className="footer-bottom"><p>© {new Date().getFullYear()} {t.rights}</p><p>{t.privacy}</p><a href="#home" aria-label={t.home}>↑</a></div></footer>
    {showMobileBooking && <div className="mobile-booking"><span>Beauty by Mica<small>Marie Pampoen, Curaçao</small></span>{bookingButton()}</div>}
    <dialog ref={dialog} className="booking-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-text" onClose={() => { lastTrigger.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) closeBooking(); } }}><button className="dialog-close" aria-label={t.close} onClick={closeBooking}>×</button><Star className="dialog-star"/><p className="eyebrow">{t.dialogTag}</p><h2 id="dialog-title">{t.dialogTitle}</h2><p id="dialog-text">{t.dialogText}</p><p className="dialog-privacy">{t.dialogPrivacy}</p><button className="button button-dark" onClick={closeBooking}>{t.back}<Arrow/></button></dialog>
  </>;
}
