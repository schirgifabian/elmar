import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Target, Info, Clock, PlayCircle } from 'lucide-react';
import '../App.css';

export default function TeacherDashboard() {
    return (
        <div className="app-container">
            <header className="glass-panel animate-fade-in" style={{ padding: '1rem 2rem' }}>
                <div className="logo">
                    👩‍🏫 Lehrer-Dashboard
                </div>
                <nav className="nav-links">
                    <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowLeft size={18} /> Zurück zur Auswahl
                    </Link>
                </nav>
            </header>

            <main>
                <section className="animate-fade-in" style={{ animationDelay: '0.2s', marginTop: '2rem' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Willkommen im <span className="text-gradient">Lehrer-Bereich</span></h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px' }}>
                        Dieser Bereich enthält alles, was Sie für eine vollständige Unterrichtseinheit (50 Min) zur "Einführung in KI" benötigen. Perfekt zugeschnitten auf die 4. Klasse Hauptschule/Mittelschule.
                    </p>
                </section>

                <div className="features-grid" style={{ marginTop: '3rem' }}>

                    <div className="feature-card glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="feature-icon" style={{ color: 'var(--primary)' }}><Clock size={40} /></div>
                        <h3 className="feature-title">50 Min. Stundenentwurf</h3>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <div style={{ padding: '0.5rem', borderLeft: '3px solid var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
                                <strong>0-5 Min: Einstieg</strong><br />
                                Wer hat heute schon KI genutzt? (Beispiel: TikTok "For You" Page erklären).
                            </div>
                            <div style={{ padding: '0.5rem', borderLeft: '3px solid var(--accent)', background: 'rgba(236, 72, 153, 0.05)' }}>
                                <strong>5-20 Min: Selbstständige Arbeit</strong><br />
                                Schüler loggen sich am PC ins "Schüler-Dashboard" ein und spielen die 5 Stationen (Dauer ca. 15 Min). Lehrkraft geht herum.
                            </div>
                            <div style={{ padding: '0.5rem', borderLeft: '3px solid var(--secondary)', background: 'rgba(168, 85, 247, 0.05)' }}>
                                <strong>20-35 Min: Besprechung</strong><br />
                                Was war schwer? Begriff "Deepfake" gemeinsam besprechen (Gefahren von generierten Inhalten auf Social Media).
                            </div>
                            <div style={{ padding: '0.5rem', borderLeft: '3px solid var(--success)', background: 'rgba(16, 185, 129, 0.05)' }}>
                                <strong>35-50 Min: Live Experiment & Abschluss</strong><br />
                                Am Beamer live einen Text mit ChatGPT generieren lassen (z.B. eine Entschuldigung für die Schule schreiben lassen) und bewerten.
                            </div>
                        </div>
                    </div>

                    <div className="feature-card glass-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="feature-icon" style={{ color: 'var(--accent)' }}><Target size={40} /></div>
                        <h3 className="feature-title">Lehrplanziele (Österreich)</h3>
                        <ul style={{ color: 'var(--text-muted)', marginTop: '1rem', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><strong>Digitale Grundbildung (8. Schulstufe):</strong></li>
                            <li>Schüler reflektieren den Einsatz von KI im Alltag.</li>
                            <li>Sie verstehen grundlegende Prinzipien des Maschinellen Lernens (Trainingsdaten = "Garbage In, Garbage Out").</li>
                            <li>Sie erkennen Algorithmen in ihrer eigenen Lebenswelt (z.B. Social Media).</li>
                        </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="feature-card glass-panel animate-fade-in" style={{ animationDelay: '0.5s', padding: '1.5rem' }}>
                            <div className="feature-icon" style={{ color: 'var(--secondary)', fontSize: '2rem' }}><BookOpen size={30} /></div>
                            <h3 className="feature-title" style={{ fontSize: '1.2rem' }}>Materialien / Downloads</h3>
                            <p className="feature-desc" style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                Arbeitsblätter zur Vertiefung (fiktiv).
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button className="dataset-btn" style={{ padding: '0.8rem', fontSize: '0.9rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={16} /> Arbeitsblatt: "KI im Alltag" (.pdf)</span>
                                </button>
                                <button className="dataset-btn" style={{ padding: '0.8rem', fontSize: '0.9rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={16} /> Lösungsschlüssel Info-Text (.pdf)</span>
                                </button>
                            </div>
                        </div>

                        <div className="feature-card glass-panel animate-fade-in" style={{ animationDelay: '0.6s', padding: '1.5rem' }}>
                            <div className="feature-icon" style={{ color: '#FBBF24', fontSize: '2rem' }}><PlayCircle size={30} /></div>
                            <h3 className="feature-title" style={{ fontSize: '1.2rem' }}>YouTube Empfehlungen</h3>
                            <p className="feature-desc" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                Zusätzliche Erklärvideos als Hausübung oder Vertiefung im Unterricht:
                            </p>
                            <ul style={{ color: 'var(--primary)', marginTop: '0.5rem', marginLeft: '1.5rem', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li><a href="#" style={{ textDecoration: 'underline' }}>MrWissen2go: "Wie KI unsere Welt verändert"</a></li>
                                <li><a href="#" style={{ textDecoration: 'underline' }}>Kurzgesagt: "Die KI Revolution"</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
