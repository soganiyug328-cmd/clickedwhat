import type { Scenario } from '@/types';
import { Mail, AlertTriangle, Clock, ExternalLink, Smartphone, Phone, Wifi, FileText, QrCode, KeyRound, Briefcase, MessageSquare, ChevronRight } from 'lucide-react';

interface ScenarioInterfaceProps {
  scenario: Scenario;
}

export function ScenarioInterface({ scenario }: ScenarioInterfaceProps) {
  switch (scenario.interface) {
    case 'email':
      return <EmailInterface scenario={scenario} />;
    case 'sms':
      return <SmsInterface scenario={scenario} />;
    case 'phone':
      return <PhoneInterface scenario={scenario} />;
    case 'browser':
      return <BrowserInterface scenario={scenario} />;
    case 'wifi':
      return <WifiInterface scenario={scenario} />;
    case 'update':
      return <UpdateInterface scenario={scenario} />;
    case 'qr':
      return <QrInterface scenario={scenario} />;
    case 'file':
      return <FileInterface scenario={scenario} />;
    case 'password':
      return <PasswordInterface scenario={scenario} />;
    case 'job':
      return <JobInterface scenario={scenario} />;
    default:
      return null;
  }
}

/* ── Email ── */
function EmailInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <Mail size={16} className="text-ink-300" />
        <span className="text-xs text-ink-300 font-mono">Inbox · 1 new message</span>
        <span className="ml-auto text-xs text-ink-400">{p.time}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3 pb-4 border-b border-ink-600/20">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-danger to-warn flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white truncate">{p.senderName}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-danger/15 text-danger font-medium">EXTERNAL</span>
            </div>
            <div className="text-xs text-ink-300 font-mono mt-0.5 truncate">{p.sender}</div>
          </div>
        </div>
        <h3 className="font-semibold text-base text-white mt-4">{p.subject}</h3>
        <div className="mt-3 text-sm text-ink-200 whitespace-pre-line leading-relaxed font-mono">
          {p.body}
        </div>
      </div>
    </div>
  );
}

/* ── SMS ── */
function SmsInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="max-w-sm mx-auto rounded-[2rem] overflow-hidden border-4 border-ink-600/40 bg-ink-850 animate-scale-in shadow-2xl">
      <div className="flex items-center justify-between px-6 py-2 bg-ink-800/80 text-xs text-ink-300">
        <span>{p.time}</span>
        <div className="flex items-center gap-1">
          <div className="flex items-end gap-0.5">
            <div className="w-0.5 h-1.5 bg-ink-300 rounded-sm" />
            <div className="w-0.5 h-2 bg-ink-300 rounded-sm" />
            <div className="w-0.5 h-2.5 bg-ink-300 rounded-sm" />
            <div className="w-0.5 h-3 bg-ink-300 rounded-sm" />
          </div>
          <Smartphone size={12} className="ml-1" />
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 pb-3 border-b border-ink-600/20">
          <MessageSquare size={16} className="text-ink-300" />
          <div>
            <div className="text-sm font-semibold text-white">{p.bank}</div>
            <div className="text-xs text-ink-300 font-mono">{p.sender}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-bl-sm p-3.5 text-sm text-ink-100 leading-relaxed">
            {p.message}
          </div>
          <div className="text-[10px] text-ink-400 mt-1.5 ml-2">Received · {p.time}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Phone Call ── */
function PhoneInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="max-w-sm mx-auto rounded-[2.5rem] overflow-hidden border-4 border-ink-600/40 bg-ink-850 animate-scale-in shadow-2xl">
      <div className="px-6 py-3 bg-gradient-to-b from-ink-800/80 to-transparent text-center">
        <div className="text-xs text-ink-300 uppercase tracking-wider">Incoming Call</div>
      </div>
      <div className="px-6 py-8 flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-ink-700 flex items-center justify-center">
            <Phone size={36} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-pulse-ring" />
        </div>
        <div className="mt-5 font-display text-xl font-bold text-white">{p.caller}</div>
        <div className="text-sm text-ink-300 font-mono mt-1">{p.number}</div>
        <div className="mt-5 bg-ink-800/60 rounded-xl p-3.5 text-sm text-ink-200 leading-relaxed text-left border border-ink-600/20">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" /> Live transcript
          </div>
          "{p.script}"
        </div>
      </div>
    </div>
  );
}

/* ── Browser / URL ── */
function BrowserInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-danger/60" />
          <div className="w-3 h-3 rounded-full bg-warn/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <div className="flex-1 ml-2 px-3 py-1 rounded-md bg-ink-850/80 text-xs text-ink-300 font-mono truncate flex items-center gap-1.5">
          <ExternalLink size={10} />
          {p.url}
        </div>
      </div>
      <div className="p-5">
        <div className="bg-ink-750/40 rounded-lg p-3.5 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-ink-700 flex items-center justify-center text-xs font-bold text-ink-300">
              ?
            </div>
            <span className="text-sm font-medium text-ink-200">{p.sender}</span>
          </div>
          <div className="bg-ink-800/60 rounded-lg p-3 text-sm text-ink-100">
            {p.message}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-300 bg-warn/5 border border-warn/15 rounded-lg p-2.5">
          <AlertTriangle size={14} className="text-warn" />
          The link destination is hidden by a URL shortener.
        </div>
      </div>
    </div>
  );
}

/* ── Wi-Fi ── */
function WifiInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <Wifi size={16} className="text-ink-300" />
        <span className="text-xs text-ink-300 font-mono">Wi-Fi Settings · Airport Terminal B</span>
      </div>
      <div className="p-5 space-y-2">
        <div className="text-xs text-ink-300 uppercase tracking-wider mb-2">Available Networks</div>
        {[
          { name: p.network, signal: 4, secured: false, suspicious: true },
          { name: p.altNetwork, signal: 3, secured: true, suspicious: false },
          { name: 'Airport_Guest_WiFi', signal: 2, secured: true, suspicious: false },
        ].map((net) => (
          <div
            key={net.name}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              net.suspicious
                ? 'border-warn/20 bg-warn/5'
                : 'border-ink-600/20 bg-ink-750/40'
            }`}
          >
            <Wifi size={18} className={net.suspicious ? 'text-warn' : 'text-ink-300'} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{net.name}</div>
              <div className={`text-[10px] ${net.suspicious ? 'text-warn' : 'text-ink-400'}`}>
                {net.secured ? 'Secured · WPA2' : 'Open · No password'}
              </div>
            </div>
            <div className="flex items-end gap-0.5">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 rounded-sm ${bar <= net.signal ? 'bg-primary' : 'bg-ink-600'}`}
                  style={{ height: `${bar * 3 + 2}px` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Fake Update ── */
function UpdateInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-danger/60" />
          <div className="w-3 h-3 rounded-full bg-warn/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <div className="flex-1 ml-2 px-3 py-1 rounded-md bg-ink-850/80 text-xs text-ink-300 font-mono truncate">
          {p.url}
        </div>
      </div>
      <div className="p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warn/30 to-danger/20 flex items-center justify-center mb-4">
          <AlertTriangle size={32} className="text-warn" />
        </div>
        <h3 className="font-display font-bold text-lg text-white mb-2">{p.message}</h3>
        <p className="text-sm text-ink-300 max-w-xs mb-5">
          Your {p.browser} browser needs a critical security update. Install now to stay protected.
        </p>
        <button className="btn-primary px-8 py-3 rounded-xl text-sm flex items-center gap-2">
          {p.button}
          <ChevronRight size={16} />
        </button>
        <div className="mt-4 text-[10px] text-ink-400 font-mono">Source: {p.url}</div>
      </div>
    </div>
  );
}

/* ── QR Code ── */
function QrInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <QrCode size={16} className="text-ink-300" />
        <span className="text-xs text-ink-300 font-mono">Camera · QR Scanner</span>
      </div>
      <div className="p-6 flex flex-col items-center text-center">
        <div className="text-sm text-ink-300 mb-4">{p.context}</div>
        <div className="relative">
          <div className="w-44 h-44 bg-white rounded-xl p-4">
            <div
              className="w-full h-full grid grid-cols-8 gap-0.5"
              style={{ maskImage: 'radial-gradient(circle, black 70%, transparent 100%)' }}
            >
              {Array.from({ length: 64 }, (_, i) => {
                const seed = (i * 7 + 13) % 11;
                return <div key={i} className={seed > 5 ? 'bg-black' : 'bg-white'} />;
              })}
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-primary rounded-xl animate-pulse" />
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
        </div>
        <div className="mt-4 bg-ink-750/60 rounded-lg px-4 py-2 text-xs font-mono text-ink-300">
          Scanned: {p.qrUrl}
        </div>
      </div>
    </div>
  );
}

/* ── File Attachment ── */
function FileInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <Mail size={16} className="text-ink-300" />
        <span className="text-xs text-ink-300 font-mono truncate">{p.sender}</span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-sm text-white mb-4">{p.subject}</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl border border-warn/20 bg-warn/5">
          <div className="w-12 h-12 rounded-xl bg-danger/15 border border-danger/30 flex items-center justify-center shrink-0">
            <FileText size={24} className="text-danger" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-white truncate">{p.fileName}</div>
            <div className="text-xs text-ink-300 mt-0.5">{p.fileSize}</div>
          </div>
          <div className="text-[10px] px-2 py-1 rounded bg-danger/15 text-danger font-mono font-semibold shrink-0">
            .scr
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-ink-300">
          <Clock size={12} />
          <span>Received just now · From: {p.senderName}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Password / Breach ── */
function PasswordInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-danger/10 border-b border-danger/20">
        <AlertTriangle size={16} className="text-danger" />
        <span className="text-xs text-danger font-mono">Security Alert · Data Breach Notification</span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-danger/15 border border-danger/30 flex items-center justify-center shrink-0">
            <KeyRound size={20} className="text-danger" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">{p.service} Data Breach Detected</h3>
            <p className="text-xs text-ink-300 mt-0.5">Breach date: {p.breachDate}</p>
          </div>
        </div>
        <div className="bg-ink-750/60 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-300">Service</span>
            <span className="text-white font-medium">{p.service}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-300">Exposed data</span>
            <span className="text-danger font-medium font-mono">{p.exposed}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-300">Status</span>
            <span className="text-warn font-medium">Credentials leaked online</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-ink-300">
          Your email and password from this breach are now publicly available on the internet.
        </div>
      </div>
    </div>
  );
}

/* ── Job Offer ── */
function JobInterface({ scenario }: ScenarioInterfaceProps) {
  const p = scenario.payload;
  return (
    <div className="rounded-xl overflow-hidden border border-ink-600/30 bg-ink-800/60 animate-scale-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-750/60 border-b border-ink-600/20">
        <Briefcase size={16} className="text-ink-300" />
        <span className="text-xs text-ink-300 font-mono">LinkedIn Message · {p.time}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3 pb-4 border-b border-ink-600/20">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center shrink-0">
            <Briefcase size={18} className="text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-semibold text-sm text-white">{p.senderName}</span>
            <div className="text-xs text-ink-300 font-mono mt-0.5 truncate">{p.sender}</div>
          </div>
        </div>
        <h3 className="font-semibold text-base text-white mt-4">{p.subject}</h3>
        <div className="mt-3 text-sm text-ink-200 whitespace-pre-line leading-relaxed">
          {p.body}
        </div>
      </div>
    </div>
  );
}
