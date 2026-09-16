"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const pageLinks = [
  ["Home", "/"],
  ["Galerie", "/gallery"],
  ["Top 5", "/top-5"],
  ["Reiseplaner", "/#planner"],
  ["Währungsrechner", "/currency-converter"],
  ["Japan Quiz", "/quiz"],
  ["Visitenkarte", "/visitenkarte"],
] as const;

function SecondaryNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar" aria-label="Hauptnavigation">
      <Link className="nav-branding" href="/" onClick={() => setMenuOpen(false)}>Japan Reiseplaner</Link>
      <button className="hamburger" type="button" aria-label="Menü öffnen" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
      <ul className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
        {pageLinks.map(([label, href]) => <li key={href}><Link className="nav-link" href={href} onClick={() => setMenuOpen(false)}>{label}</Link></li>)}
      </ul>
    </nav>
  );
}

const galleryItems = [
  ["https://bit.ly/4jjfsmm", "Fushimi Inari Schrein"],
  ["https://bit.ly/3F6Yg5S", "Tokyo Skytree"],
  ["https://bit.ly/45trFSj", "Itsukushima Schrein"],
  ["https://bit.ly/43xylfO", "Der majestätische Fuji"],
  ["https://bit.ly/44UegCG", "Nara: Die Stadt der Hirsche"],
  ["https://bit.ly/4kE9w8T", "Ghibli Museum besuchen"],
  ["https://bit.ly/4kceg5O", "Hanami unter Kirschblüten"],
  ["https://bit.ly/4kxhLDk", "Entspannung im Onsen"],
  ["https://bit.ly/4k87ttF", "Schneeaffen in Jigokudani"],
  ["https://bit.ly/3Fo7uut", "Die vielfältige Küche probieren"],
];

const mapInfo: Record<string, string> = {
  Tokyo: "Tokio: Die pulsierende Hauptstadt Japans, bekannt für Wolkenkratzer, Modeviertel und Hightech-Innovationen.",
  Kyoto: "Kyoto: Die alte Kaiserstadt Japans, berühmt für Tempel, Gärten, Geishas und traditionelle Holzhäuser.",
  Hokkaido: "Hokkaido: Japans nördlichste Insel mit atemberaubender Natur, Skipisten und frischen Meeresfrüchten.",
  Okinawa: "Okinawa: Eine subtropische Inselkette mit Stränden, Korallenriffen und eigener Ryukyu-Kultur.",
};

const mapIcons: Record<string, string> = {
  Tokyo: "/map-icons/Tokyo-Icon.png",
  Kyoto: "/map-icons/Kyoto-Icon.png",
  Hokkaido: "/map-icons/Hokkaido-Icon.png",
  Okinawa: "/map-icons/Okinawa-Icon.png",
};

export function GalleryPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  return <div className="secondary-page"><SecondaryNav /><header className="secondary-heading"><p className="eyebrow">Japan entdecken</p><h1>Galerie mit Sehenswürdigkeiten</h1></header><main className="secondary-main">
    <section className="secondary-card map-section"><h2>Interaktive Japan-Karte</h2><div className="map-container"><img src="https://bit.ly/4kQ7xyq" alt="Karte von Japan" /><div className="map-hotspots">{Object.keys(mapInfo).map((region) => <button className={selectedRegion === region ? "map-hotspot active" : "map-hotspot"} key={region} type="button" aria-label={`${region} anzeigen`} onClick={() => setSelectedRegion(region)}><img src={mapIcons[region]} alt="" aria-hidden="true" /></button>)}</div></div><p className="map-info-text">{selectedRegion ? mapInfo[selectedRegion] : "Klicke auf ein Icon auf der Karte, um Informationen zu erhalten."}</p></section>
    <section className="secondary-card"><h2>Beliebte Reiseziele</h2><div className="gallery-grid popular-grid">{galleryItems.slice(0, 4).map(([image, title]) => <GalleryTile image={image} title={title} key={title} />)}</div></section>
    <section className="secondary-card"><h2>Meine Japan Bucket List Galerie</h2><div className="gallery-grid">{galleryItems.slice(4).map(([image, title]) => <GalleryTile image={image} title={title} key={title} />)}</div></section>
  </main><PageFooter /></div>;
}

function GalleryTile({ image, title }: { image: string; title: string }) {
  return <figure className="gallery-tile"><img src={image} alt={title} loading="lazy" /><figcaption>{title}</figcaption></figure>;
}

const districts = [
  ["Chiyoda: Das Zentrum der Macht", "Hier sind meine Top 5 Empfehlungen für das Herz Tokios", "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1400&auto=format&fit=crop"],
  ["Chuo: Luxus und Fischmarkt", "Vom Tsukiji Fischmarkt bis zu den Neonlichtern der Ginza", "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1400&auto=format&fit=crop"],
  ["Minato: International und Nachtaktiv", "Ikonische Skyline, luxuriöse Viertel und Hafenatmosphäre", "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1400&auto=format&fit=crop"],
  ["Shinjuku: Der Neon-Dschungel", "Gigantische Wolkenkratzer und winzige, verrauchte Gassen", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1400&auto=format&fit=crop"],
  ["Bunkyo: Akademische Ruhe", "Der Bezirk der Bildung, Literatur und ruhiger Gärten", "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1400&auto=format&fit=crop"],
];

export function TopFivePage() {
  return <div className="secondary-page districts-page"><SecondaryNav /><header className="district-hero"><p className="eyebrow">Tokyo Districts</p><h1>Top Spots von Tokio</h1><p>Eine Entdeckungsreise durch die spannendsten Bezirke</p></header><main className="district-list">{districts.map(([title, text, image], index) => <section className="district-card" key={title} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.66), rgba(0,0,0,.78)), url(${image})` }}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p><iframe title={`Karte für ${title}`} src="https://www.google.com/maps/d/u/0/embed?mid=1HShONE9wHMmLpMMTRXeQTcFoZlMDL74&ehbc=2E312F&noprof=1" loading="lazy" /></section>)}</main><PageFooter /></div>;
}

export function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1000");
  const [currency, setCurrency] = useState("EUR");
  const rates = { EUR: 0.00625, USD: 0.00667 };
  const value = Number(amount);
  const isValid = Number.isFinite(value) && value >= 0;
  const rate = rates[currency as keyof typeof rates];
  const result = isValid ? `${(value * rate).toFixed(2)} ${currency}` : `0.00 ${currency}`;
  const message = isValid ? `Fester Fallback-Kurs: 1 JPY = ${rate} ${currency}` : "Bitte gib einen gültigen positiven Betrag ein.";
  return <div className="secondary-page"><SecondaryNav /><main className="secondary-main centered-main"><section className="secondary-card converter-card"><p className="eyebrow">Praktisches Werkzeug</p><h1>Japanischer Währungsrechner (JPY)</h1><form onSubmit={(event) => event.preventDefault()}><label htmlFor="jpy-amount">Betrag in JPY:</label><input id="jpy-amount" type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} /><fieldset><legend>Zielwährung:</legend><label><input type="radio" name="currency" value="EUR" checked={currency === "EUR"} onChange={(event) => setCurrency(event.target.value)} /> Euro (EUR)</label><label><input type="radio" name="currency" value="USD" checked={currency === "USD"} onChange={(event) => setCurrency(event.target.value)} /> US-Dollar (USD)</label></fieldset><button className="submit-button" type="submit">Umrechnen</button></form><div className="result-box"><p>Umrechnungsbetrag:</p><strong>{result}</strong><small>{message}</small></div></section></main><PageFooter /></div>;
}

const questions = [
  ["Was ist die Hauptstadt Japans?", ["Kyoto", "Osaka", "Tokyo", "Sapporo"], "Tokyo"],
  ["Welcher Berg ist der höchste Berg Japans?", ["Mount Fuji", "Mount Kita", "Mount Yari", "Mount Tate"], "Mount Fuji"],
  ["Wie nennt man die traditionelle japanische Teezeremonie?", ["Ikebana", "Origami", "Chanoyu", "Kabuki"], "Chanoyu"],
  ["Welche Schrift verwendet Japan NICHT?", ["Hiragana", "Katakana", "Kanji", "Hangul"], "Hangul"],
  ["Was bedeutet Sakura?", ["Kirschblüte", "Bambus", "Kiefer", "Lotus"], "Kirschblüte"],
  ["Was ist ein Onsen?", ["Eine heiße Quelle", "Ein Tempel", "Ein Theater", "Ein Markt"], "Eine heiße Quelle"],
] as const;

type Score = { name: string; score: number };

export function QuizPage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [highscores, setHighscores] = useState<Score[]>([]);
  useEffect(() => { const restoreScores = window.setTimeout(() => { const saved = window.localStorage.getItem("japanQuizHighscores"); if (saved) setHighscores(JSON.parse(saved)); }, 0); return () => window.clearTimeout(restoreScores); }, []);
  useEffect(() => {
    if (finished || selected) return;
    const resetTimer = window.setTimeout(() => setTimeLeft(10), 0);
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setSelected("__timeout__");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => { window.clearTimeout(resetTimer); window.clearInterval(timer); };
  }, [index, finished, selected]);
  function choose(option: string) { if (selected) return; setSelected(option); if (option === questions[index][2]) setScore((value) => value + 1); }
  function next() { if (!selected) return; if (index === questions.length - 1) { setFinished(true); } else { setIndex((value) => value + 1); setSelected(""); setTimeLeft(10); } }
  function saveScore(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const name = playerName.trim() || "Anonym"; const nextScores = [...highscores, { name, score }].sort((a, b) => b.score - a.score).slice(0, 5); setHighscores(nextScores); window.localStorage.setItem("japanQuizHighscores", JSON.stringify(nextScores)); setScoreSaved(true); }
  function restart() { setIndex(0); setScore(0); setSelected(""); setTimeLeft(10); setPlayerName(""); setScoreSaved(false); setFinished(false); }
  return <div className="secondary-page"><SecondaryNav /><main className="quiz-container"><p className="eyebrow">Japan Wissen</p><h1>Japan Quiz</h1>{finished ? <div className="quiz-result"><h2>Quiz beendet!</h2><p>Du hast {score} von {questions.length} Fragen richtig beantwortet.</p>{!scoreSaved && <form className="score-form" onSubmit={saveScore}><label htmlFor="quiz-player-name">Dein Name für die Highscore-Liste:</label><input id="quiz-player-name" value={playerName} onChange={(event) => setPlayerName(event.target.value)} placeholder="Name eingeben" maxLength={24} /><button className="submit-button" type="submit">Ergebnis speichern</button></form>}<h3>Highscores</h3><ol>{highscores.map((entry, position) => <li key={`${entry.name}-${position}`}><span>{entry.name}</span><span>{entry.score} Punkte</span></li>)}</ol><button className="submit-button" type="button" onClick={restart}>Neues Spiel</button></div> : <div className="question-area"><div className="quiz-status"><p>Frage {index + 1} von {questions.length}</p><strong>{selected === "__timeout__" ? "Zeit abgelaufen" : `${timeLeft} Sekunden`}</strong></div><div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div><div className="quiz-timer"><span style={{ width: `${(timeLeft / 10) * 100}%` }} /></div><h2>{questions[index][0]}</h2><div className="quiz-options">{questions[index][1].map((option) => <button className={selected && option === questions[index][2] ? "correct" : selected === option ? "incorrect" : ""} type="button" key={option} onClick={() => choose(option)}>{option}</button>)}</div><button className="submit-button" type="button" disabled={!selected} onClick={next}>{selected === "__timeout__" ? "Weiter" : "Nächste Frage"}</button></div>}</main><PageFooter /></div>;
}

export function BusinessCardPage() {
  return <div className="secondary-page card-page"><SecondaryNav /><main className="business-card"><img src="http://bit.ly/4kqi6rD" alt="Profilbild Japan Reiseblogger" /><h1>Max Px</h1><p>Japan Reiseblogger</p><p>„Erkunde Japan mit mir – von den neonhellen Straßen Tokios bis zu den spirituellen Gipfeln Koyasans.“</p><div className="contact-info"><a href="mailto:deine.email@example.com">E-Mail</a><span>|</span><a href="#">Blog</a><span>|</span><a href="#">Social Media</a></div></main><PageFooter /></div>;
}

function PageFooter() {
  return <footer className="site-footer"><span>Japan Reiseplaner</span><span>© 2026 Max Px</span></footer>;
}
