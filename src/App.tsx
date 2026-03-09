import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [learningProgress, setLearningProgress] = useState(0);
  const [isLearning, setIsLearning] = useState(false);
  const [aiLevel, setAiLevel] = useState(0); // 0 = baby, 1 = kind, 2 = experte

  const handleTrain = (amount: number) => {
    if (learningProgress >= 100) return;

    setIsLearning(true);
    setTimeout(() => setIsLearning(false), 500);

    setLearningProgress((prev) => {
      const newProgress = Math.min(prev + amount, 100);
      if (newProgress >= 100) setAiLevel(2);
      else if (newProgress >= 50) setAiLevel(1);
      return newProgress;
    });
  };

  const getBrainEmoji = () => {
    if (aiLevel === 0) return '👶';
    if (aiLevel === 1) return '🧠';
    return '🤖';
  };

  const getAiMessage = () => {
    if (aiLevel === 0) return 'Ich weiß noch gar nichts. Füttere mich mit Daten!';
    if (aiLevel === 1) return 'Ich lerne! Ich kann schon einfache Muster erkennen.';
    return 'Ich bin ein Experte! Ich kann jetzt Bilder erkennen und Texte schreiben.';
  };

  return (
    <div className="app-container">
      <header className="glass-panel animate-fade-in">
        <div className="logo">
          ✨ KI Entdecker
        </div>
        <nav className="nav-links">
          <a href="#was-ist-ki" className="nav-link active">Was ist das?</a>
          <a href="#lernen" className="nav-link">Wie lernt KI?</a>
          <a href="#alltag" className="nav-link">KI im Alltag</a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="badge">Für die 4. Klasse Hauptschule</div>
          <h1>Entdecke die <span className="text-gradient-purple">Künstliche Intelligenz</span></h1>
          <p>
            Computer sind nicht nur schnell im Rechnen. Heute können sie lernen, sehen, sprechen und kreativ sein! Aber wie funktioniert das eigentlich?
          </p>
          <a href="#lernen" className="btn-primary">Jetzt herausfinden</a>
        </section>

        {/* FEATURES: WAS IST KI? */}
        <section id="was-ist-ki" className="section animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-title">Was kann eine KI?</h2>
          <p className="section-subtitle">Eine KI (Künstliche Intelligenz) ist ein Computerprogramm, das Aufgaben löst, für die man eigentlich menschliche Intelligenz braucht.</p>

          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon">👁️</div>
              <h3 className="feature-title">Sehen & Erkennen</h3>
              <p className="feature-desc">Sie kann Bilder anschauen und erkennen, ob darauf ein Hund, eine Katze oder ein Auto zu sehen ist (wie bei Filtern auf TikTok/Snapchat!).</p>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon">🗣️</div>
              <h3 className="feature-title">Verstehen & Sprechen</h3>
              <p className="feature-desc">Sie versteht unsere Sprache. Du kannst mir ihr reden, als wäre sie ein Mensch (wie bei Siri, Alexa oder ChatGPT).</p>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Spielen & Strategie</h3>
              <p className="feature-desc">Sie lernt Spielregeln und kann die besten Profis der Welt in Schach oder Videospielen besiegen.</p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SECTION: TRAINING */}
        <section id="lernen" className="section animate-fade-in">
          <h2 className="section-title">Wie lernt eine KI?</h2>
          <p className="section-subtitle">Eine KI ist am Anfang wie ein leeres Gehirn. Sie muss "trainiert" werden. Das macht man, indem man ihr ganz viele Beispiele («Daten») zeigt.</p>

          <div className="training-container glass-panel">
            <div className="training-controls">
              <h3>Trainiere deine eigene KI!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Klicke auf die Knöpfe, um der KI Datenpakete zu schicken. Je mehr Daten sie hat, desto schlauer wird sie!
              </p>

              <button className="dataset-btn" onClick={() => handleTrain(10)} disabled={learningProgress >= 100}>
                <span>📚 100 Bücher lesen</span>
                <span className="dataset-icon">+</span>
              </button>

              <button className="dataset-btn" onClick={() => handleTrain(15)} disabled={learningProgress >= 100}>
                <span>🖼️ 1.000 Katzenbilder anschauen</span>
                <span className="dataset-icon">+</span>
              </button>

              <button className="dataset-btn" onClick={() => handleTrain(25)} disabled={learningProgress >= 100}>
                <span>💬 10.000 Chatverläufe analysieren</span>
                <span className="dataset-icon">+</span>
              </button>

              {learningProgress >= 100 && (
                <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginTop: '1rem' }}>
                  🎉 Deine KI ist jetzt vollständig trainiert!
                </div>
              )}
            </div>

            <div className="training-view">
              <div className={`brain-visual ${isLearning ? 'learning' : ''}`}>
                {getBrainEmoji()}
              </div>

              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  <span>Wissenslevel: {learningProgress}%</span>
                  <span>{aiLevel === 0 ? 'Baby' : aiLevel === 1 ? 'Schüler' : 'Experte'}</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${learningProgress}%` }}></div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', width: '100%', marginTop: '1rem', background: 'var(--surface-hover)' }}>
                <p style={{ fontStyle: 'italic' }}>"{getAiMessage()}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* EVERYDAY LIFE: ALLTAG */}
        <section id="alltag" className="section animate-fade-in">
          <h2 className="section-title">Wo nutzt du KI heute schon?</h2>
          <p className="section-subtitle">Wahrscheinlich nutzt du jeden Tag Künstliche Intelligenz, ohne es zu merken!</p>

          <div className="features-grid">
            <div className="feature-card glass-panel" style={{ borderTop: '4px solid #00F2FE' }}>
              <h3 className="feature-title">📱 Social Media</h3>
              <p className="feature-desc">Der Algorithmus bei TikTok und Instagram ist eine KI. Er lernt, welche Videos du magst, um dir mehr davon zu zeigen.</p>
            </div>

            <div className="feature-card glass-panel" style={{ borderTop: '4px solid #FAC711' }}>
              <h3 className="feature-title">📸 Kamera & Filter</h3>
              <p className="feature-desc">Gesichtsfilter (Hundeohren etc.) und der Portrait-Modus am Handy nutzen KI, um dein Gesicht zu erkennen.</p>
            </div>

            <div className="feature-card glass-panel" style={{ borderTop: '4px solid #10A37F' }}>
              <h3 className="feature-title">📝 Hausaufgaben & Lernen</h3>
              <p className="feature-desc">ChatGPT oder Übersetzer können Texte schreiben, Sprachen übersetzen und dir bei Hausaufgaben helfen.</p>
            </div>
          </div>
        </section>

      </main>

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>Demo für Elmar - Entwickelt für die 4. Klasse Hauptschule in Österreich 🇦🇹</p>
      </footer>
    </div>
  );
}

export default App;
