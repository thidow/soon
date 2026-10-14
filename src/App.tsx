import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const LAUNCH_DATE = new Date('2026-10-16T00:00:00+05:30').getTime();

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, LAUNCH_DATE - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}
const pad = (value: number) => String(value).padStart(2, '0');

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Thidow home">
      <span className="brand-mark" aria-hidden="true"><i /><i /></span>
      <span>Thidow</span>
    </a>
  );
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="page" id="top">
      <div className="grain" aria-hidden="true" />
      <header className="topbar reveal reveal-one"><Brand /></header>

      <section className="hero" aria-labelledby="headline">
        <h1 id="headline" className="reveal reveal-three">COMING<br /><span className="soon">SOON.</span></h1>
        <div className="launch reveal reveal-four">
          <span className="launch-date">Friday<span className="separator">/</span>16 October</span>
          <div className="countdown" aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds remaining`}>
            {([['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.minutes], ['Seconds', timeLeft.seconds]] as const).map(([label, value]) => (
              <div className="time-unit" key={label}>
                <span className="time-value" key={`${label}-${value}`}>{pad(value)}</span>
                <span className="time-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer reveal reveal-five">
        <span>© {new Date().getFullYear()} THIDOW</span>
        <a className="contact-link" href="mailto:xemishra@gmail.com">CONTACT DEVELOPER <ArrowUpRight size={13} /></a>
      </footer>
    </main>
  );
}
