import { Link } from 'react-router-dom';
import { Backpack, BookOpen } from 'lucide-react';
import '../App.css'; // Reusing general styles

export default function RoleSelection() {
    return (
        <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

            <div className="text-center animate-fade-in" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    Willkommen beim <span className="text-gradient-purple">KI Entdecker</span> ✨
                </h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>
                    Wer bist du? Wähle deine Rolle, um zu starten!
                </p>
            </div>

            <div className="features-grid" style={{ width: '100%', maxWidth: '900px', marginTop: '0' }}>

                {/* Student Card */}
                <Link to="/student" className="feature-card glass-panel animate-fade-in" style={{ animationDelay: '0.2s', textDecoration: 'none', borderTop: '4px solid var(--primary)', display: 'flex', alignItems: 'center', textAlign: 'center', gap: '1.5rem', padding: '3rem 2rem' }}>
                    <div className="brain-visual" style={{ width: '100px', height: '100px', fontSize: '3rem', margin: '0 auto', animation: 'pulseBrain 2s infinite alternate', borderColor: 'var(--primary)' }}>
                        🎒
                    </div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-color)' }}>Ich bin Schüler/in</h2>
                    <p className="feature-desc">
                        Lerne spielerisch, wie Künstliche Intelligenz funktioniert und trainiere deine eigene KI!
                    </p>
                    <div className="btn-primary" style={{ marginTop: 'auto', padding: '0.8rem 2rem' }}>
                        Los geht's!
                    </div>
                </Link>

                {/* Teacher Card */}
                <Link to="/teacher" className="feature-card glass-panel animate-fade-in" style={{ animationDelay: '0.4s', textDecoration: 'none', borderTop: '4px solid var(--accent)', display: 'flex', alignItems: 'center', textAlign: 'center', gap: '1.5rem', padding: '3rem 2rem' }}>
                    <div className="brain-visual" style={{ width: '100px', height: '100px', fontSize: '3rem', margin: '0 auto', borderColor: 'var(--accent)' }}>
                        👩‍🏫
                    </div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-color)' }}>Ich bin Lehrkraft</h2>
                    <p className="feature-desc">
                        Zum Lehrer-Bereich mit didaktischen Infos, Lehrplanbezug und Materialien.
                    </p>
                    <div className="btn-primary" style={{ marginTop: 'auto', padding: '0.8rem 2rem', background: 'linear-gradient(135deg, var(--secondary), var(--accent))' }}>
                        Zum Dashboard
                    </div>
                </Link>

            </div>
        </div>
    );
}
