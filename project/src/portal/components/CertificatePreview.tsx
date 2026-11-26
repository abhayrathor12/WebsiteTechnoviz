import type { CertificateInfo } from "../api";
import logo from "../assets/certificate-logo.png";
import signature from "../assets/certificate-signature.png";

/*
 * On-screen copy of the certificate PDF (portal/certificate.py). Drawn as an SVG with the
 * same page size and coordinates as the PDF (A4 landscape, in points), so both look the same.
 * It's not a file, so viewing it doesn't count as a download.
 */

const W = 841.89;
const H = 595.28;
const CX = W / 2;

const NAVY = "#203f78";
const NAVY_DEEP = "#142a54";
const GOLD = "#ddaf26";
const INK = "#1a2740";
const SOFT = "#5b6478";
const CREAM = "#fbf8ef";

const SERIF = "'Times New Roman', Times, serif";
const SANS = "Helvetica, Arial, sans-serif";

// Footer positions (same as the PDF)
const FOOTER = H - 112;
const DATE_X = W * 0.19;
const SEAL_X = W * 0.415;
const SIGN_X = W * 0.635;
const QR_X = W * 0.855;
const LINE_W = 170;

function formatDate(isoDate: string) {
  // "2026-12-12" -> "12 December 2026" (parsed as a plain date, no timezone shift)
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Serrated gold "AI Masterclass 2026" seal */
function Seal({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const teeth = 36;
  const points = Array.from({ length: teeth * 2 }, (_, i) => {
    const a = (Math.PI * 2 * i) / (teeth * 2);
    const rr = i % 2 === 0 ? r : r * 0.93;
    return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
  }).join(" ");
  const tr = r * 0.68; // radius of the ring text
  const star = (sx: number) => {
    const s = r * 0.06;
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? s : s * 0.45;
      return `${sx + rr * Math.cos(a)},${cy - r * 0.1 + rr * Math.sin(a)}`;
    }).join(" ");
    return <polygon points={pts} fill={GOLD} />;
  };
  return (
    <g>
      <polygon points={points} fill={GOLD} />
      <circle cx={cx} cy={cy} r={r * 0.84} fill={NAVY} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke={GOLD} strokeWidth={0.8} />
      <path id="mp-seal-arc" d={`M ${cx - tr} ${cy} A ${tr} ${tr} 0 0 1 ${cx + tr} ${cy}`} fill="none" />
      <text fill={GOLD} fontFamily={SANS} fontWeight={700} fontSize={r * 0.13}>
        <textPath href="#mp-seal-arc" startOffset="50%" textAnchor="middle">
          TECHNOVIZ AUTOMATION
        </textPath>
      </text>
      <text x={cx} y={cy - r * 0.06} textAnchor="middle" fill="#fff" fontFamily={SANS} fontWeight={700} fontSize={r * 0.2}>
        AI
      </text>
      <text x={cx} y={cy + r * 0.15} textAnchor="middle" fill="#fff" fontFamily={SANS} fontSize={r * 0.12}>
        MASTERCLASS
      </text>
      <text x={cx} y={cy + r * 0.36} textAnchor="middle" fill={GOLD} fontFamily={SANS} fontWeight={700} fontSize={r * 0.14}>
        2026
      </text>
      {star(cx - r * 0.42)}
      {star(cx + r * 0.42)}
    </g>
  );
}

/** QR code from the backend's rows of "1"/"0" */
function QrCode({ x, y, size, rows }: { x: number; y: number; size: number; rows: string[] }) {
  const n = rows.length || 1;
  const cell = size / n;
  const pad = size * 0.06;
  let d = "";
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (row[c] === "1") d += `M${x + c * cell} ${y + r * cell}h${cell + 0.15}v${cell + 0.15}h${-(cell + 0.15)}z`;
    }
  });
  return (
    <g>
      <rect x={x - pad} y={y - pad} width={size + 2 * pad} height={size + 2 * pad} fill="#fff" stroke={GOLD} strokeWidth={1} />
      <path d={d} fill={NAVY_DEEP} />
    </g>
  );
}

export default function CertificatePreview({ info }: { info: CertificateInfo }) {
  // Long names get smaller, like the PDF (which measures the text)
  const nameSize = Math.max(22, Math.min(46, Math.floor(46 * (24 / Math.max(info.name.length, 24)))));
  const ofWidth = 180.34; // width of the spaced "OF COMPLETION" in the PDF
  const corners: [number, number, number, number][] = [
    [38, H - 38, 1, -1],
    [W - 38, H - 38, -1, -1],
    [38, 38, 1, 1],
    [W - 38, 38, -1, 1],
  ];
  const qrSize = 74;

  return (
    <div className="mp-cert" aria-label={`Certificate of completion for ${info.name}`}>
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" role="img">
        <rect width={W} height={H} fill={CREAM} />
        <rect x={16} y={16} width={W - 32} height={H - 32} fill="none" stroke={NAVY} strokeWidth={12} />
        <rect x={32} y={32} width={W - 64} height={H - 64} fill="none" stroke={GOLD} strokeWidth={2.2} />
        <rect x={38} y={38} width={W - 76} height={H - 76} fill="none" stroke={GOLD} strokeWidth={0.7} />
        {corners.map(([x, y, sx, sy]) => (
          <g key={`${x}-${y}`}>
            <polygon points={`${x},${y} ${x + sx * 46},${y} ${x},${y + sy * 46}`} fill={GOLD} />
            <circle cx={x + sx * 12} cy={y + sy * 12} r={3.2} fill={NAVY} />
          </g>
        ))}

        <image href={logo} x={CX - 85} y={112 - 53.3} width={170} height={53.3} />

        <text x={CX} y={178} textAnchor="middle" fill={NAVY_DEEP} fontFamily={SERIF} fontWeight={700} fontSize={62} letterSpacing={7}>
          CERTIFICATE
        </text>
        <text x={CX} y={205} textAnchor="middle" fill={GOLD} fontFamily={SANS} fontWeight={700} fontSize={13} letterSpacing={6}>
          OF COMPLETION
        </text>
        {[-1, 1].map((side) => {
          const x0 = CX + side * (ofWidth / 2 + 14);
          return <line key={side} x1={x0} y1={200} x2={x0 + side * 70} y2={200} stroke={GOLD} strokeWidth={1} />;
        })}

        <text x={CX} y={245} textAnchor="middle" fill={SOFT} fontFamily={SERIF} fontStyle="italic" fontSize={16}>
          This is to certify that
        </text>
        <text x={CX} y={298} textAnchor="middle" fill={NAVY} fontFamily={SERIF} fontStyle="italic" fontWeight={700} fontSize={nameSize}>
          {info.name}
        </text>
        <line x1={CX - 230} y1={312} x2={CX + 230} y2={312} stroke={GOLD} strokeWidth={1.4} />
        <text x={CX} y={340} textAnchor="middle" fill={SOFT} fontFamily={SANS} fontSize={13.5}>
          has successfully completed the Full-Day
        </text>
        <text x={CX} y={368} textAnchor="middle" fill={NAVY_DEEP} fontFamily={SANS} fontWeight={700} fontSize={20}>
          Smart Manufacturing &amp; AI Masterclass 2026
        </text>
        <text x={CX} y={388} textAnchor="middle" fill={SOFT} fontFamily={SANS} fontSize={12}>
          conducted by Technoviz Automation
        </text>

        {/* Date of completion */}
        <text x={DATE_X} y={FOOTER - 10} textAnchor="middle" fill={INK} fontFamily={SANS} fontWeight={700} fontSize={14}>
          {formatDate(info.completed_on)}
        </text>
        <line x1={DATE_X - LINE_W / 2} y1={FOOTER} x2={DATE_X + LINE_W / 2} y2={FOOTER} stroke={SOFT} strokeWidth={0.8} />
        <text x={DATE_X} y={FOOTER + 17} textAnchor="middle" fill={SOFT} fontFamily={SANS} fontSize={10.5}>
          Date of Completion
        </text>

        <Seal cx={SEAL_X} cy={FOOTER + 4} r={46} />

        {/* Signature */}
        <image href={signature} x={SIGN_X - 62} y={FOOTER - 6 - 57.7} width={124} height={57.7} />
        <line x1={SIGN_X - LINE_W / 2} y1={FOOTER} x2={SIGN_X + LINE_W / 2} y2={FOOTER} stroke={SOFT} strokeWidth={0.8} />
        <text x={SIGN_X} y={FOOTER + 17} textAnchor="middle" fill={INK} fontFamily={SANS} fontWeight={700} fontSize={13}>
          Kapil Khurana
        </text>
        <text x={SIGN_X} y={FOOTER + 31} textAnchor="middle" fill={SOFT} fontFamily={SANS} fontSize={10.5}>
          Trainer
        </text>

        {/* QR code -> website /verify-certificate */}
        <QrCode x={QR_X - qrSize / 2} y={FOOTER + 36 - qrSize} size={qrSize} rows={info.qr} />
        <text x={QR_X} y={FOOTER + 54} textAnchor="middle" fill={SOFT} fontFamily={SANS} fontSize={8.5}>
          Scan to verify
        </text>

        <text x={CX} y={H - 47} textAnchor="middle" fill={SOFT} fontFamily={SANS} fontSize={9}>
          Certificate ID: {info.certificate_id}
        </text>
      </svg>
    </div>
  );
}
