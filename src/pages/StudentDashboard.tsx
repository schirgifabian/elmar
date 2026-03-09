import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, Brain, Image as ImageIcon, ShieldAlert, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import '../App.css';

export default function StudentDashboard() {
    const [currentMission, setCurrentMission] = useState(1);
    const totalMissions = 5;

    // Mission 1 State
    const [m1Score, setM1Score] = useState(0);
    const [m1Answered, setM1Answered] = useState<Record<string, boolean>>({});

    // Mission 2 State (Training)
    const [learningProgress, setLearningProgress] = useState(0);
    const [isLearning, setIsLearning] = useState(false);
    const [isBadLearning, setIsBadLearning] = useState(false);
    const [aiLevel, setAiLevel] = useState(0); // 0 = baby, 1 = kind, 2 = experte

    // Mission 3 State (Generator)
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);

    // Mission 4 State (Fake News)
    const [m4Score, setM4Score] = useState<boolean | null>(null);

    // Mission 5 State (Quiz)
    const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
    const [quizFinished, setQuizFinished] = useState(false);

    // --- Handlers ---

    const nextMission = () => {
        if (currentMission < totalMissions) {
            setCurrentMission(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleM1Choice = (item: string, isCorrect: boolean) => {
        setM1Answered(prev => ({ ...prev, [item]: isCorrect }));
        if (isCorrect && !m1Answered[item]) setM1Score(prev => prev + 1);
    };

    const handleTrain = (amount: number, isGoodData: boolean = true) => {
        if (learningProgress >= 100 && isGoodData) return;

        if (isGoodData) {
            setIsLearning(true);
            setTimeout(() => setIsLearning(false), 500);
            setLearningProgress((prev) => {
                const newProgress = Math.min(prev + amount, 100);
                if (newProgress >= 100) setAiLevel(2);
                else if (newProgress >= 50) setAiLevel(1);
                return newProgress;
            });
        } else {
            setIsBadLearning(true);
            setTimeout(() => setIsBadLearning(false), 500);
            setLearningProgress((prev) => Math.max(prev - 20, 0));
            setAiLevel(0);
        }
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const generateImage = () => {
        if (selectedTags.length === 0) return;
        setIsGenerating(true);
        setGeneratedEmoji(null);

        setTimeout(() => {
            setIsGenerating(false);
            // Simple logic to pick emoji based on tags
            if (selectedTags.includes('Katze') && selectedTags.includes('Weltraum')) setGeneratedEmoji('🚀😸');
            else if (selectedTags.includes('Hund') && selectedTags.includes('Sonnenbrille')) setGeneratedEmoji('🕶️🐶');
            else if (selectedTags.includes('Katze')) setGeneratedEmoji('🐱');
            else if (selectedTags.includes('Hund')) setGeneratedEmoji('🐕');
            else setGeneratedEmoji('✨🖼️✨');
        }, 1500);
    };

    const finishQuiz = () => {
        setQuizFinished(true);
        const allCorrect = quizAnswers[1] && quizAnswers[2] && quizAnswers[3];
        if (allCorrect) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#ec4899', '#10B981']
            });
        }
    };


    // --- Render Helpers ---

    const renderProgressBar = () => (
        <div className="global-progress-container">
            <div className="global-progress-text">
                <span>Gesamtfortschritt</span>
                <span>Mission {currentMission} von {totalMissions}</span>
            </div>
            <div className="global-progress-track">
                <div
                    className="global-progress-fill"
                    style={{ width: `${(currentMission / totalMissions) * 100}%` }}
                />
            </div>
        </div>
    );

    return (
        <div className="app-container">
            <header className="glass-panel animate-fade-in" style={{ zIndex: 100 }}>
                <div className="logo">
                    🎒 Schüler-Bereich
                </div>
                <nav className="nav-links">
                    <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <ArrowLeft size={16} /> Beenden
                    </Link>
                </nav>
            </header>

            <main>
                {renderProgressBar()}

                {/* MISSION 1: Was ist KI? */}
                {currentMission === 1 && (
                    <div className="mission-container animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <Brain size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                            <h1 style={{ fontSize: '3rem' }}>Stufe 1: <span className="text-gradient-purple">Was ist KI?</span></h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>KI steht für Künstliche Intelligenz. Aber ist jedes Programm am Computer gleich eine KI? Lass es uns testen!</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem' }}>Ordne zu: Was davon nutzt Künstliche Intelligenz?</h3>

                            <div className="choice-grid">
                                {/* Item 1 */}
                                <div className={`choice-card glass-panel ${m1Answered['taschenrechner'] !== undefined ? (m1Answered['taschenrechner'] === false ? 'correct' : 'incorrect') : ''}`}
                                    onClick={() => handleM1Choice('taschenrechner', false)}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧮</div>
                                    <h4>Der normale Taschenrechner</h4>
                                </div>

                                {/* Item 2 */}
                                <div className={`choice-card glass-panel ${m1Answered['siri'] !== undefined ? (m1Answered['siri'] === true ? 'correct' : 'incorrect') : ''}`}
                                    onClick={() => handleM1Choice('siri', true)}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                                    <h4>Sprachassistenten (wie Siri oder Alexa)</h4>
                                </div>

                                {/* Item 3 */}
                                <div className={`choice-card glass-panel ${m1Answered['word'] !== undefined ? (m1Answered['word'] === false ? 'correct' : 'incorrect') : ''}`}
                                    onClick={() => handleM1Choice('word', false)}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                                    <h4>Tippen in Microsoft Word</h4>
                                </div>

                                {/* Item 4 */}
                                <div className={`choice-card glass-panel ${m1Answered['tiktok'] !== undefined ? (m1Answered['tiktok'] === true ? 'correct' : 'incorrect') : ''}`}
                                    onClick={() => handleM1Choice('tiktok', true)}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎵</div>
                                    <h4>Der Algorithmus bei TikTok ("For You" Page)</h4>
                                </div>
                            </div>

                            {m1Score >= 2 && (
                                <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', borderRadius: '12px' }}>
                                    Super! Du hast erkannt, dass KI Aufgaben übernimmt, für die man eigentlich "mitdenken" (Muster erkennen) muss!
                                </div>
                            )}
                        </div>

                        <div className="mission-nav">
                            <div />
                            <button className="btn-primary" onClick={nextMission} disabled={m1Score < 2}>
                                Weiter zu Stufe 2 <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {/* MISSION 2: Training */}
                {currentMission === 2 && (
                    <div className="mission-container animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <Sparkles size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
                            <h1 style={{ fontSize: '3rem' }}>Stufe 2: <span className="text-gradient-purple">Wie lernt KI?</span></h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Eine KI ist anfangs dumm wie ein Toastbrot. Sie muss mit "Daten" trainiert werden. Aber Achtung: Schlechte Daten machen die KI verwirrt!</p>
                        </div>

                        <div className="training-container glass-panel">
                            <div className="training-controls">
                                <h3>Trainiere deine KI!</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                    Füttere die KI, um das Wissenslevel auf 100% zu bringen.
                                </p>

                                <button className="dataset-btn" onClick={() => handleTrain(25, true)} disabled={learningProgress >= 100}>
                                    <span>📚 1.000 gute Bücher lesen</span>
                                    <span className="dataset-icon" style={{ color: 'var(--success)' }}>+</span>
                                </button>

                                <button className="dataset-btn" onClick={() => handleTrain(20, true)} disabled={learningProgress >= 100}>
                                    <span>🖼️ 5.000 echte Tierbilder ansehen</span>
                                    <span className="dataset-icon" style={{ color: 'var(--success)' }}>+</span>
                                </button>

                                <button className="dataset-btn" onClick={() => handleTrain(0, false)} disabled={learningProgress >= 100}>
                                    <span>🗑️ Fake News & Lügen im Internet lesen</span>
                                    <span className="dataset-icon" style={{ color: 'var(--error)' }}>-</span>
                                </button>

                            </div>

                            <div className="training-view">
                                <div className={`brain-visual ${isLearning ? 'learning' : ''} ${isBadLearning ? 'bad-learning' : ''}`}>
                                    {aiLevel === 0 ? '👶' : aiLevel === 1 ? '🧠' : '🤖'}
                                </div>

                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <span>Wissenslevel: {learningProgress}%</span>
                                        <span>{aiLevel === 0 ? 'Anfänger' : aiLevel === 1 ? 'Lernend' : 'Experte'}</span>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar" style={{ width: `${learningProgress}%`, background: isBadLearning ? 'var(--error)' : '' }}></div>
                                    </div>
                                </div>

                                <div className="glass-panel" style={{ padding: '1.5rem', width: '100%', marginTop: '1rem', background: 'var(--surface-hover)' }}>
                                    <p style={{ fontStyle: 'italic' }}>
                                        {aiLevel === 0 && "Ich brauche gute Daten!"}
                                        {aiLevel === 1 && "Ah, langsam erkenne ich Muster!"}
                                        {aiLevel === 2 && "Ich bin bereit! Mein Netz ist trainiert."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mission-nav">
                            <div />
                            <button className="btn-primary" onClick={nextMission} disabled={learningProgress < 100}>
                                Weiter zu Stufe 3 <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {/* MISSION 3: Generative KI */}
                {currentMission === 3 && (
                    <div className="mission-container animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <ImageIcon size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                            <h1 style={{ fontSize: '3rem' }}>Stufe 3: <span className="text-gradient">Selbst kreativ werden</span></h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Wir haben der KI gerade das Lernen beigebracht. Jetzt kann sie etwas GANZ NEUES erschaffen (Generative KI). Baue einen "Prompt" (Befehl).</p>
                        </div>

                        <div className="glass-panel generator-sim" style={{ padding: '3rem' }}>
                            <h3>Wähle Wörter, um ein Bild zu generieren:</h3>
                            <div className="prompt-builder">
                                {['Hund', 'Katze', 'Weltraum', 'Sonnenbrille', 'Strand'].map(tag => (
                                    <div
                                        key={tag}
                                        className={`prompt-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag} {selectedTags.includes(tag) && <CheckCircle2 size={16} style={{ display: 'inline', marginLeft: '0.5rem', verticalAlign: 'text-bottom' }} />}
                                    </div>
                                ))}
                            </div>

                            <button className="btn-primary" onClick={generateImage} disabled={selectedTags.length === 0 || isGenerating} style={{ marginTop: '1rem' }}>
                                {isGenerating ? 'Generiere...' : 'Bild erstellen! ✨'}
                            </button>

                            <div className={`generation-result ${isGenerating ? 'generating' : ''}`}>
                                {!isGenerating && generatedEmoji && <span>{generatedEmoji}</span>}
                                {!isGenerating && !generatedEmoji && <span style={{ fontSize: '2rem', color: 'var(--surface-border)' }}>?</span>}
                            </div>

                            {generatedEmoji && (
                                <p style={{ color: 'var(--success)', fontWeight: 'bold' }}>Perfekt! Diese Form von KI nennt man "Generative KI" (wie Midjourney oder DALL-E).</p>
                            )}
                        </div>

                        <div className="mission-nav">
                            <div />
                            <button className="btn-primary" onClick={nextMission} disabled={!generatedEmoji}>
                                Weiter zu Stufe 4 <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {/* MISSION 4: KI im Alltag / Fake News */}
                {currentMission === 4 && (
                    <div className="mission-container animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <ShieldAlert size={48} color="var(--error)" style={{ margin: '0 auto 1rem' }} />
                            <h1 style={{ fontSize: '3rem' }}>Stufe 4: <span className="text-gradient-purple">Gefahren erkennen</span></h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Wenn eine KI völlig neue Bilder erschaffen kann... wie wissen wir dann im Internet, was noch echt ist?</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                            <h3>Echt oder Fake?</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Stell dir vor, du siehst auf TikTok ein Video, wo der Bundeskanzler sagt, ab morgen sind Sommerferien. Wie reagierst du?</p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button
                                    className={`btn-primary ${m4Score === false ? 'incorrect' : ''}`}
                                    onClick={() => setM4Score(false)}
                                    style={{ background: m4Score === false ? 'var(--error)' : 'var(--surface)', border: '1px solid var(--surface-border)' }}
                                >
                                    Ich freue mich und teile das Video sofort mit all meinen Freunden!
                                </button>
                                <button
                                    className={`btn-primary ${m4Score === true ? 'correct' : ''}`}
                                    onClick={() => setM4Score(true)}
                                    style={{ background: m4Score === true ? 'var(--success)' : 'var(--surface)', border: '1px solid var(--surface-border)' }}
                                >
                                    Ich bin skeptisch. KI kann Stimmen und Gesichter fälschen (Deepfakes). Ich prüfe erst seriöse Nachrichten.
                                </button>
                            </div>

                            {m4Score === true && (
                                <div className="animate-fade-in" style={{ marginTop: '2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Sehr stark!</h4>
                                    <p>Du hast das Prinzip der "Deepfakes" verstanden. KI wird oft genutzt, um Fake News zu verbreiten. Man darf nicht mehr allem trauen, was man sieht oder hört!</p>
                                </div>
                            )}
                        </div>

                        <div className="mission-nav">
                            <div />
                            <button className="btn-primary" onClick={nextMission} disabled={m4Score !== true}>
                                Zum finalen Quiz! <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {/* MISSION 5: Finale */}
                {currentMission === 5 && (
                    <div className="mission-container animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <Trophy size={48} color="#FBBF24" style={{ margin: '0 auto 1rem' }} />
                            <h1 style={{ fontSize: '3rem' }}>Finale: <span style={{ color: '#FBBF24' }}>Der Meister-Test</span></h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Zeig, was du in den letzten 10 Minuten gelernt hast.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '3rem' }}>

                            <div style={{ marginBottom: '2rem' }}>
                                <h4>1. Was braucht eine KI zwingend, um lernen zu können?</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button className="dataset-btn" style={{ flex: 1, borderColor: quizAnswers[1] === false ? 'var(--error)' : '' }} onClick={() => setQuizAnswers({ ...quizAnswers, 1: false })}>Viel Strom</button>
                                    <button className="dataset-btn" style={{ flex: 1, borderColor: quizAnswers[1] === true ? 'var(--success)' : '' }} onClick={() => setQuizAnswers({ ...quizAnswers, 1: true })}>Viele Daten (Beispiele)</button>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h4>2. Was ist ein "Deepfake"?</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button className="dataset-btn" style={{ flex: 1, borderColor: quizAnswers[2] === true ? 'var(--success)' : '' }} onClick={() => setQuizAnswers({ ...quizAnswers, 2: true })}>Eine durch KI gefälschte Stimme oder Videoaufnahme</button>
                                    <button className="dataset-btn" style={{ flex: 1, borderColor: quizAnswers[2] === false ? 'var(--error)' : '' }} onClick={() => setQuizAnswers({ ...quizAnswers, 2: false })}>Ein besonders kluger Roboter im Ozean</button>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h4>3. Wo begegnet uns KI schon im Alltag?</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button className="dataset-btn" style={{ flex: 1, borderColor: quizAnswers[3] === true ? 'var(--success)' : '' }} onClick={() => setQuizAnswers({ ...quizAnswers, 3: true })}>Beim Algorithmus auf Social Media</button>
                                    <button className="dataset-btn" style={{ flex: 1, borderColor: quizAnswers[3] === false ? 'var(--error)' : '' }} onClick={() => setQuizAnswers({ ...quizAnswers, 3: false })}>Nur in geheimen Laboren</button>
                                </div>
                            </div>

                            {!quizFinished ? (
                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #FBBF24, #F59E0B)' }}
                                    onClick={finishQuiz}
                                    disabled={quizAnswers[1] === undefined || quizAnswers[2] === undefined || quizAnswers[3] === undefined}
                                >
                                    Test abgeben!
                                </button>
                            ) : (
                                <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '2rem' }}>
                                    {(quizAnswers[1] && quizAnswers[2] && quizAnswers[3]) ? (
                                        <div>
                                            <h2 style={{ color: 'var(--success)', fontSize: '2rem', marginBottom: '1rem' }}>Herzlichen Glückwunsch! 🎉</h2>
                                            <p>Du hast 100% erreicht und bist jetzt ein offizieller KI-Entdecker! Du kannst diese Seite nun schließen.</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 style={{ color: 'var(--error)', fontSize: '2rem', marginBottom: '1rem' }}>Oh no! 😕</h2>
                                            <p>Du hast leider nicht alles richtig. Lade die Seite neu und versuche es nochmal!</p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </main>

            <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <p>Lernplattform-Demo für Elmar - Entwickelt für die 4. Klasse Hauptschule in Österreich 🇦🇹</p>
            </footer>
        </div>
    );
}
