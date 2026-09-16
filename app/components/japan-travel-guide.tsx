"use client";

import { FormEvent, useEffect, useState } from "react";

type Destination = {
  id: number;
  name: string;
};

type Proverb = {
  japanisch: string;
  deutsch: string;
};

const fallbackProverbs: Proverb[] = [
  { japanisch: "七転び八起き (Nanakorobiyaoki)", deutsch: "Siebenmal hinfallen, achtmal aufstehen." },
  { japanisch: "猿も木から落ちる (Sarumokikaraochiru)", deutsch: "Auch Affen fallen von Bäumen." },
  { japanisch: "一石二鳥 (Issekinichō)", deutsch: "Ein Stein, zwei Vögel." },
  { japanisch: "継続は力なり (Keizokuhachikaranari)", deutsch: "Weitermachen ist Stärke." },
  { japanisch: "口は禍の元 (Kuchi wa wazawai no gen)", deutsch: "Der Mund ist der Ursprung des Unglücks." },
  { japanisch: "石の上にも三年 (Ishinouenimosan'nen)", deutsch: "Auch harte Arbeit zahlt sich aus." },
];

const places = [
  {
    id: "tokyo",
    number: "01",
    city: "Tokio",
    subtitle: "Interessante Punkte in Tokio",
    intro: "Eine Mischung aus Tradition und Moderne",
    sights: [
      {
        title: "1. Essen: Themen-Restaurants erleben",
        text: "Tokio ist berühmt für seine einzigartige Restaurant-Szene, die weit über traditionelles Sushi und Ramen hinausgeht. Besucher können in skurrilen Themen-Restaurants speisen, wie zum Beispiel Cafés im Stil von Anime oder mit einem Fokus auf bestimmte Konzepte wie Vampire oder Ninjas. Ein besonderes Erlebnis ist auch das Angeln des eigenen Abendessens in Restaurants wie Zauo.",
        link: "https://wanderweib.de/tipps-verrueckte-themen-restaurants-in-tokio-nur-auf-eigene-gefahr/",
        linkLabel: "Themen-Restaurants",
        image: "https://rb.gy/smpg6m",
        alt: "Ein außergewöhnliches Themen-Restaurant in Tokio",
      },
      {
        title: "2. Sehenswürdigkeiten: Die Shibuya-Kreuzung überqueren",
        text: "Die Shibuya-Kreuzung ist ein ikonisches Symbol des modernen Tokio und gilt als einer der belebtesten Fußgängerübergänge der Welt. Tausende Menschen überqueren gleichzeitig die Straße, was ein beeindruckendes Schauspiel ist. In der Umgebung gibt es zahlreiche Geschäfte, Restaurants und Unterhaltungsmöglichkeiten.",
        link: "https://www.japan.travel/de/spot/2177/",
        linkLabel: "Shibuya-Kreuzung",
        image: "https://rb.gy/5qf6m2",
        alt: "Die belebte Shibuya-Kreuzung bei Nacht",
      },
      {
        title: "3. Aktivitäten: Digitale Kunst in TeamLab erleben",
        text: "TeamLab Planets und TeamLab Borderless bieten immersive Erlebnisse in der Welt der digitalen Kunst. Diese Museen nutzen Lichter, Klänge und Projektionen, um interaktive Kunstinstallationen zu schaffen, die die Sinne ansprechen und unvergessliche Eindrücke hinterlassen.",
        link: "https://www.japan.travel/de/de/news/digital-art-museum-in-tokyo-teamlab-planets-verlaengert-borderless-oeffnet-2024/",
        linkLabel: "TeamLab Planets und TeamLab Borderless",
        image: "https://rb.gy/7mo84x",
        alt: "Eine digitale Kunstinstallation in TeamLab",
      },
      {
        title: "4. Besonderes Erlebnis: Mit Go-Karts durch die Stadt fahren",
        text: "Eine ungewöhnliche und unterhaltsame Aktivität ist eine Go-Kart-Tour durch die Straßen Tokios, oft verkleidet als Charaktere aus Spielen oder Animes. Man fährt an berühmten Sehenswürdigkeiten wie der Shibuya-Kreuzung vorbei und erlebt die Stadt aus einer völlig neuen Perspektive.",
        image: "https://rb.gy/kspxfx",
        alt: "Bild von Leuten in Kostümen, die Go-Kart in Tokio fahren",
        link: "https://wanderweib.de/tipps-mari-kart-fahren/",
        linkLabel: "Go-Kart-Tour durch die Straßen Tokios",
      },
      {
        title: "5. Kamakura & Enoshima: Zwei Juwelen südlich von Tokio",
        text: "Entdecke die historische Stadt der Samurai, Kamakura, mit ihren beeindruckenden Tempeln und dem berühmten Großen Buddha. Gleich in der Nähe erwartet dich Enoshima, eine malerische Insel mit einem atemberaubenden Meerblick und einer entspannten Küstenatmosphäre. Erfahre alles, was du für einen perfekten Tagesausflug von Tokio aus wissen musst.",
        image: "https://images.unsplash.com/photo-1689295046186-5a42620047aa?q=80&w=1400&auto=format&fit=crop",
        alt: "Der Große Buddha in Kamakura",
      },
    ],
  },
  {
    id: "kyoto",
    number: "02",
    city: "Kyoto",
    subtitle: "Interessante Punkte in Kyoto",
    intro: "Entdecke die kulturelle Seele Japans",
    sights: [
      {
        title: "1. Sehenswürdigkeiten: Der Fushimi Inari-Taisha Schrein",
        text: "Der Fushimi Inari-Taisha Schrein ist berühmt für Tausende von scharlachroten Torii (Schreintoren), die sich über einen Berg erstrecken. Ein Spaziergang durch diese beeindruckenden Torii-Alleen ist ein unvergessliches Erlebnis und bietet fantastische Fotomöglichkeiten. Der Schrein ist dem Shinto-Gott Inari gewidmet.",
        link: "https://japan-kyoto.de/fushimi-inari-taisha-schrein-kyoto/",
        linkLabel: "Fushimi Inari-Taisha Schrein",
        image: "https://images.unsplash.com/photo-1613487691352-7d9b4ee5045b?q=80&w=1400&auto=format&fit=crop",
        alt: "Rote Torii am Fushimi Inari-Taisha in Kyoto",
      },
      {
        title: "2. Sehenswürdigkeiten: Der Goldene Pavillon (Kinkaku-ji)",
        text: "Der Kinkaku-ji, auch bekannt als Goldener Pavillon, ist ein Zen-Tempel, dessen obere Stockwerke vollständig mit Blattgold bedeckt sind. Er liegt inmitten eines schönen Gartens an einem See, und seine Spiegelung im Wasser ist ein atemberaubender Anblick. Er gehört zum UNESCO-Weltkulturerbe.",
        link: "https://www.japan.travel/de/spot/1152/",
        linkLabel: "Kinkaku-ji",
        image: "https://images.unsplash.com/photo-1653997412308-308d945f687b?q=80&w=1400&auto=format&fit=crop",
        alt: "Der Goldene Pavillon Kinkaku-ji in Kyoto",
      },
      {
        title: "3. Essen: Kaiseki Ryori probieren",
        text: "Kyoto gilt als Zentrum der Kaiseki Ryori, einer traditionellen japanischen Haute Cuisine, die für ihre saisonalen Zutaten, sorgfältige Zubereitung und kunstvolle Präsentation bekannt ist. Ein mehrgängiges Kaiseki-Menü zu genießen, oft in einem Ryokan oder spezialisierten Restaurant, ist ein tiefes Eintauchen in die japanische Kulinarik und Ästhetik.",
        link: "https://www.japan.travel/de/de/guide/kaiseki-ryori/",
        linkLabel: "Kaiseki Ryori",
        image: "https://res.cloudinary.com/jnto/image/upload/w_1006,h_825,c_fill,f_auto,fl_lossy,q_60/v1/media/filer_public/41/d5/41d57e11-10af-4b9c-b23a-8e869eb79f35/herbstliche_kaiseki_ryori_l_109042_wxqsac",
        alt: "Eine kunstvoll angerichtete Kaiseki-Mahlzeit",
      },
      {
        title: "4. Aktivität: An einer Teezeremonie teilnehmen",
        text: "Kyoto ist ein bedeutendes Zentrum für die japanische Teezeremonie (Sado oder Chanoyu). Die Teilnahme an einer traditionellen Teezeremonie in einem Teehaus oder Tempel bietet Einblick in diese meditative Kunstform und japanische Gastfreundschaft. Man lernt die Zubereitung und den Genuss von Matcha-Grüntee in einer ruhigen Atmosphäre kennen.",
        link: "https://www.japan.travel/en/de/guide/teezeremonie/",
        linkLabel: "Teezeremonie",
        image: "https://bit.ly/4kldMty",
        alt: "Eine traditionelle japanische Teezeremonie in Kyoto",
      },
    ],
  },
  {
    id: "koyasan",
    number: "03",
    city: "Koyasan",
    subtitle: "Interessante Punkte in Koyasan",
    intro: "Ein spiritueller Ort in den Bergen",
    sights: [
      {
        title: "1. Sehenswürdigkeiten: Der mystische Oku-no-in Friedhof",
        text: "Oku-no-in ist der größte Friedhof Japans und eine der heiligsten Stätten Koyasans. Ein Pfad führt durch uralte Zedernwälder vorbei an über 200.000 moosbedeckten Grabsteinen und Monumenten hin zum Mausoleum von Kobo Daishi, dem Begründer des Shingon-Buddhismus. Die Atmosphäre ist tief spirituell und eindrucksvoll.",
        image: "https://bit.ly/3FeChtB",
        alt: "Der Weg durch den Oku-no-in Friedhof in Koyasan",
      },
      {
        title: "2. Aktivität & Unterkunft: Eine Nacht im Tempel (Shukubo)",
        text: "Eine Übernachtung in einem der Tempel (Shukubo) ist ein einzigartiges Erlebnis in Koyasan. Es ermöglicht dir, am monastischen Leben teilzuhaben, die Stille des Ortes auf dich wirken zu lassen und an Aktivitäten wie dem Morgengebet teilzunehmen.",
        link: "https://www.japan.travel/de/de/japan-reise-blog/tempel-uebernachtung-in-japan-shukubo/",
        linkLabel: "Übernachtung in einem der Tempel (Shukubo)",
        image: "https://bit.ly/43cAw8g",
        alt: "Ein traditionelles Zimmer in einer Tempelunterkunft",
      },
      {
        title: "3. Essen: Die vegetarische Shojin Ryori Küche",
        text: "Die Shojin Ryori ist die traditionelle buddhistisch-vegetarische Küche, die in Koyasan serviert wird. Sie verzichtet auf Fleisch, Fisch sowie starke Gewürze wie Zwiebeln und Knoblauch und konzentriert sich auf saisonales Gemüse und Bergpflanzen. Jede Mahlzeit ist ein sorgfältig zubereitetes Kunstwerk, das Körper und Geist nähren soll.",
        link: "https://www.gotokyo.org/de/story/guide/shojin-ryori/index.html",
        linkLabel: "Shojin Ryori",
        image: "https://bit.ly/4dhJjdA",
        alt: "Eine traditionelle Shojin-Ryori-Mahlzeit",
      },
      {
        title: "4. Aktivität: Teilnahme am Morgengebet",
        text: "Viele Tempel in Koyasan bieten ihren Gästen die Möglichkeit, am morgendlichen Gebet (Otsutome) teilzunehmen. Dies ist eine bewegende Erfahrung, bei der du den Gesängen der Mönche lauschst und die spirituelle Atmosphäre des Tempels am frühen Morgen erleben kannst.",
        image: "https://bit.ly/4j3U8kE",
        alt: "Morgengebet mit Mönchen in einem Tempel in Koyasan",
      },
    ],
  },
];

const navItems = [
  ["Tokio", "tokyo"],
  ["Kyoto", "kyoto"],
  ["Koyasan", "koyasan"],
  ["Reiseplaner", "planner"],
] as const;

const pageLinks = [
  ["Galerie", "/gallery"],
  ["Top 5", "/top-5"],
  ["Währungsrechner", "/currency-converter"],
  ["Japan Quiz", "/quiz"],
  ["Visitenkarte", "/visitenkarte"],
] as const;

export default function JapanTravelGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [destinationInput, setDestinationInput] = useState("");
  const [userName, setUserName] = useState("");
  const [proverbs, setProverbs] = useState<Proverb[]>(fallbackProverbs);
  const [proverbIndex, setProverbIndex] = useState(0);
  const [reviewSent, setReviewSent] = useState(false);

  useEffect(() => {
    const restoreSavedState = window.setTimeout(() => {
      const storedDestinations = window.localStorage.getItem("japan-destinations");
      const storedName = window.localStorage.getItem("japan-user-name");
      if (storedDestinations) setDestinations(JSON.parse(storedDestinations));
      if (storedName) setUserName(storedName);
    }, 0);

    fetch("/japanese-proverbs.json")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Could not load proverbs"))))
      .then((data: Proverb[]) => setProverbs(data))
      .catch(() => setProverbs(fallbackProverbs));

    return () => window.clearTimeout(restoreSavedState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("japan-destinations", JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    window.localStorage.setItem("japan-user-name", userName);
  }, [userName]);

  function addDestination(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = destinationInput.trim();
    if (!name) return;
    setDestinations((current) => [...current, { id: Date.now(), name }]);
    setDestinationInput("");
  }

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewSent(true);
    event.currentTarget.reset();
  }

  function nextProverb() {
    setProverbIndex((current) => (current + 1) % proverbs.length);
  }

  const currentProverb = proverbs[proverbIndex] ?? fallbackProverbs[0];

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="navbar" aria-label="Hauptnavigation">
          <a className="nav-branding" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">JP</span>
            <span>Japan Reiseplaner</span>
          </a>
          <button className="hamburger" type="button" aria-label="Menü öffnen" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
            <li><a className="nav-link" href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            {navItems.map(([label, id]) => (
              <li key={id}><a className="nav-link" href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a></li>
            ))}
            {pageLinks.map(([label, href]) => (
              <li key={href}><a className="nav-link" href={href} onClick={() => setMenuOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <div className="second-bg" id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Meine Japan Reise Seite</p>
            <h1>Hallo von meiner Japan Seite!</h1>
            <p className="hero-intro">Hier teile ich meine Begeisterung für Japan.</p>
            <div className="top-places">
              <strong>Meine Top 3 Orte in Japan</strong>
              <a href="#tokyo">Tokio: Wo Tradition auf Zukunft trifft</a>
              <a href="#kyoto">Kyoto: Wo Japans Seele blüht</a>
              <a href="#koyasan">Koyasan: Das Herz des japanischen Buddhismus</a>
            </div>
            <img className="main-image" src="https://bit.ly/4jhcdvN" alt="Mönchstempel in Koyasan" />
            <div className="hero-actions">
              <a className="button button-primary" href="#tokyo">Reise beginnen</a>
              <a className="text-link" href="#planner">Zum Reiseplaner</a>
            </div>
          </div>
        </section>

        <section className="intro-section content-width">
          <div className="section-kicker">Über mich und meine Japanreise</div>
          <div className="intro-grid">
            <h2>Meine Japanreise</h2>
            <div>
              <p>Im Jahr 2022 hatte ich das unglaubliche Erlebnis, zum ersten Mal nach Japan zu reisen. Dies war kurz nachdem internationale Reisen nach der Pandemie wieder möglich wurden, was die Reise zu etwas ganz Besonderem machte. Während meiner Reise durfte ich faszinierende Orte wie die pulsierende Metropole Tokio, das kulturell reiche Kyoto und das spirituelle Koyasan besuchen.</p>
              <p>Die Vielfalt und Einzigartigkeit dieser Orte, von der modernen Energie Tokios über die historischen Tempel Kyotos bis zur tiefen Ruhe Koyasans, hat mich zutiefst beeindruckt. Ganz Japan hat mich mit seiner Kultur, den Menschen und der atemberaubenden Schönheit des Landes in seinen Bann gezogen.</p>
            </div>
          </div>
        </section>

        {places.map((place) => (
          <section className="place-section" id={place.id} key={place.id}>
            <div className="content-width">
              <div className="place-heading">
                <span className="place-number">{place.number}</span>
                <div><h2>{place.subtitle}</h2><p className="section-kicker">{place.intro}</p></div>
              </div>
              <div className="sight-grid">
                {place.sights.map((sight, index) => (
                  <article className={`sight-card ${index === 0 ? "sight-card-featured" : ""}`} key={sight.title}>
                    <div className="image-wrap"><img src={sight.image} alt={sight.alt} loading={index === 0 ? "eager" : "lazy"} /></div>
                    <div className="sight-card-copy"><span className="card-index">{String(index + 1).padStart(2, "0")}</span><h3>{sight.title}</h3><p>{sight.text}{"link" in sight && sight.link && <>{" "}<a href={sight.link} target="_blank" rel="noreferrer">{sight.linkLabel}</a></>}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
        <div className="language-table">
          <table>
            <thead><tr><th>Deutsch</th><th>Aussprache</th><th>Japanisch</th></tr></thead>
            <tbody>
              <tr><td>Hallo</td><td>Kon&apos;nichiwa</td><td>こんにちは</td></tr>
              <tr><td>Vielen Dank</td><td>Arigatou gozaimasu</td><td>ありがとうございます</td></tr>
              <tr><td>Entschuldigung</td><td>Sumimasen</td><td>すみません</td></tr>
            </tbody>
          </table>
        </div>
        <section className="contact-form-section">
          <h3>Kontaktformular</h3>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-group"><label htmlFor="contact-name">Name:</label><input id="contact-name" type="text" required /></div>
            <div className="form-group"><label htmlFor="contact-email">E-Mail:</label><input id="contact-email" type="email" required /></div>
            <div className="form-group"><label htmlFor="contact-message">Nachricht:</label><textarea id="contact-message" rows={4} required /></div>
            <div className="form-group"><button className="submit-button" type="submit">Nachricht senden</button></div>
          </form>
        </section>
        </div>

        <section className="planner-section content-width" id="planner">
          <div className="section-heading-row"><div><p className="section-kicker">Dein nächster Schritt</p><h2>Plan it your way.</h2></div><p>Speichere Orte, sammle Ideen und nimm ein Stück Japan mit.</p></div>
          <div className="planner-grid">
            <div className="planner-panel destination-panel">
              <div className="panel-heading"><span className="panel-icon">+</span><div><h3>Meine Reiseziele</h3><p>Deine persönliche Liste</p></div></div>
              <form className="inline-form" onSubmit={addDestination}><input value={destinationInput} onChange={(event) => setDestinationInput(event.target.value)} placeholder="Neues Reiseziel" aria-label="Neues Reiseziel" /><button className="button button-dark" type="submit">Hinzufügen</button></form>
              <ul className="destination-list">{destinations.length === 0 ? <li className="empty-state">Noch keine Ziele gespeichert.</li> : destinations.map((destination) => <li key={destination.id}><span>{destination.name}</span><button type="button" aria-label={`${destination.name} entfernen`} onClick={() => setDestinations((current) => current.filter((item) => item.id !== destination.id))}>×</button></li>)}</ul>
            </div>
            <div className="planner-panel proverb-panel"><div className="panel-heading"><span className="panel-icon">言</span><div><h3>Japanisches Sprichwort</h3><p>Ein Gedanke für unterwegs</p></div></div><blockquote><span>{currentProverb.japanisch}</span><strong>{currentProverb.deutsch}</strong></blockquote><button className="button button-outline" type="button" onClick={nextProverb}>Nächstes Sprichwort <span>→</span></button></div>
            <div className={`planner-panel highlight-panel ${highlighted ? "highlighted" : ""}`}><div className="panel-heading"><span className="panel-icon">✦</span><div><h3>Highlight Box</h3><p>Ein kleiner Fokusmoment</p></div></div><p>Die besten Reiseerinnerungen entstehen oft zwischen den großen Sehenswürdigkeiten.</p><button className="button button-outline" type="button" onClick={() => setHighlighted((value) => !value)}>{highlighted ? "Highlight lösen" : "Highlight setzen"}</button></div>
            <div className="planner-panel name-panel"><label htmlFor="user-name">Dein Name</label><input id="user-name" value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="Wie dürfen wir dich nennen?" /><p>{userName ? `Willkommen zurück, ${userName}.` : "Wird automatisch in deinem Browser gespeichert."}</p></div>
          </div>
        </section>

        <section className="review-section content-width">
          <div><p className="section-kicker">Deine Stimme</p><h2>Welches Restaurant bleibt dir im Gedächtnis?</h2><p>Notiere einen Geschmack, zu dem du gerne zurückreisen würdest.</p></div>
          <form className="review-form" onSubmit={submitReview}><input name="restaurant" required placeholder="Restaurantname" aria-label="Restaurantname" /><select name="rating" defaultValue="5" aria-label="Bewertung"><option value="5">5 Sterne</option><option value="4">4 Sterne</option><option value="3">3 Sterne</option><option value="2">2 Sterne</option><option value="1">1 Stern</option></select><textarea name="comment" rows={3} placeholder="Deine Notiz" aria-label="Deine Notiz" /><button className="button button-primary" type="submit">Bewertung speichern</button>{reviewSent && <p className="success-message" role="status">Danke, deine Bewertung wurde für diese Sitzung gespeichert.</p>}</form>
        </section>
      </main>

      <footer className="site-footer"><span>Japan Reiseplaner</span><span>Eine persönliche Reise durch Japan</span><span>© 2026 Max Px</span></footer>
    </div>
  );
}
