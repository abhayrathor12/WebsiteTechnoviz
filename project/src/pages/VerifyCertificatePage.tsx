import { useCallback, useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BadgeCheck,
  CalendarDays,
  Clock,
  Loader2,
  QrCode,
  Search,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";

import SEO from "../components/SEO";
import { PAGE_SEO } from "../seo/pages.js";
import { portalApi } from "../portal/api";
import type { CertificateVerification } from "../portal/api";

type Result =
  | { kind: "ok"; data: CertificateVerification }
  | { kind: "not_found"; id: string }
  | { kind: "error"; message: string };

function formatDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const clean = (value: string) => value.replace(/\s+/g, "").toUpperCase();

/**
 * /verify-certificate: anyone can check a masterclass certificate ID.
 * The QR code on the certificate opens /verify-certificate?id=<ID>, which shows the details straight away.
 */
export default function VerifyCertificatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idFromUrl = clean(searchParams.get("id") ?? "");

  const [input, setInput] = useState(idFromUrl);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const verify = useCallback(async (certificateId: string) => {
    setLoading(true);
    setResult(null);
    const { data, error, status } = await portalApi.verifyCertificate(certificateId);
    if (data) setResult({ kind: "ok", data });
    else if (status === 404) setResult({ kind: "not_found", id: certificateId });
    else setResult({ kind: "error", message: error || "Something went wrong. Please try again." });
    setLoading(false);
  }, []);

  // Opened from the QR code (or a shared link): check right away
  useEffect(() => {
    if (idFromUrl) {
      setInput(idFromUrl);
      verify(idFromUrl);
    }
  }, [idFromUrl, verify]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const id = clean(input);
    if (!id) return;
    if (id === idFromUrl) verify(id); // same ID again: the URL doesn't change, so check directly
    else setSearchParams({ id }); // the effect above runs the check
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEO {...PAGE_SEO["/verify-certificate"]} />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#142a54] via-[#203f78] to-[#142a54] text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ddaf26]/10" aria-hidden />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-white/5" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ddaf26]/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ddaf26]">
            <ShieldCheck size={15} /> Certificate Verification
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-bold">Verify a Certificate</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Check that a Smart Manufacturing &amp; AI Masterclass certificate was issued by Technoviz
            Automation. Enter the Certificate ID printed on it, or scan its QR code.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-20">
        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="-mt-8 relative rounded-2xl bg-white p-5 sm:p-6 shadow-xl ring-1 ring-gray-100"
        >
          <label htmlFor="certificate-id" className="block text-sm font-semibold text-[#142a54]">
            Certificate ID
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="certificate-id"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="e.g. TVA-MC26-7K3F9Q"
              autoComplete="off"
              spellCheck={false}
              maxLength={30}
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 font-mono text-base tracking-wider text-gray-900 outline-none transition focus:border-[#203f78] focus:ring-4 focus:ring-[#203f78]/10"
            />
            <button
              type="submit"
              disabled={loading || !clean(input)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#203f78] px-6 py-3 font-semibold text-white transition hover:bg-[#142a54] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              {loading ? "Checking..." : "Show Details"}
            </button>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <QrCode size={14} /> Scanning the QR code on the certificate opens this page with the details
            already shown.
          </p>
        </form>

        {/* Result */}
        <div className="mt-8" aria-live="polite">
          {loading && (
            <div className="flex justify-center py-10 text-[#203f78]">
              <Loader2 size={32} className="animate-spin" aria-label="Checking certificate" />
            </div>
          )}

          {!loading && result?.kind === "ok" && result.data.status === "verified" && (
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-emerald-100">
              <div className="flex items-center gap-4 bg-emerald-50 px-6 py-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <BadgeCheck size={26} />
                </span>
                <div>
                  <p className="text-lg font-bold text-emerald-800">Verified Certificate</p>
                  <p className="text-sm text-emerald-700">
                    This certificate is genuine and was issued by {result.data.issued_by}.
                  </p>
                </div>
              </div>

              <div className="px-6 py-6">
                <p className="text-sm text-gray-500">This is to certify that</p>
                <p className="mt-1 font-serif text-3xl font-bold italic text-[#203f78] break-words">
                  {result.data.name}
                </p>
                <p className="mt-2 text-gray-600">
                  has successfully completed the Full-Day{" "}
                  <strong className="text-[#142a54]">{result.data.course}</strong>, conducted by{" "}
                  {result.data.issued_by}.
                </p>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: User, label: "Participant", value: result.data.name },
                    { icon: CalendarDays, label: "Date of Completion", value: formatDate(result.data.completed_on) },
                    { icon: Award, label: "Programme", value: result.data.course },
                    { icon: Clock, label: "Format", value: result.data.format },
                    { icon: ShieldCheck, label: "Issued by", value: result.data.issued_by },
                    { icon: User, label: "Trainer", value: result.data.trainer },
                    { icon: QrCode, label: "Certificate ID", value: result.data.certificate_id, mono: true, wide: true },
                  ].map(({ icon: Icon, label, value, mono, wide }) => (
                    <div key={label} className={`flex gap-3 rounded-xl bg-gray-50 p-4 ${wide ? "sm:col-span-2" : ""}`}>
                      <Icon size={18} className="mt-0.5 shrink-0 text-[#ddaf26]" />
                      <div className="min-w-0">
                        <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</dt>
                        <dd className={`mt-0.5 font-semibold text-gray-900 break-words ${mono ? "font-mono tracking-wider" : ""}`}>
                          {value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {!loading && result?.kind === "ok" && result.data.status === "not_issued" && (
            <StatusCard
              tone="amber"
              icon={<Clock size={24} />}
              title="Certificate not issued yet"
              text={`The ID ${result.data.certificate_id} belongs to a registered participant, but the certificate has not been issued yet. Please check again after the masterclass is completed.`}
            />
          )}

          {!loading && result?.kind === "not_found" && (
            <StatusCard
              tone="red"
              icon={<XCircle size={24} />}
              title="No certificate found"
              text={`We could not find a certificate with the ID ${result.id}. Please check the ID printed on the certificate and try again.`}
            />
          )}

          {!loading && result?.kind === "error" && (
            <StatusCard tone="red" icon={<AlertTriangle size={24} />} title="Could not check" text={result.message} />
          )}
        </div>
      </div>
    </div>
  );
}

function StatusCard({
  tone,
  icon,
  title,
  text,
}: {
  tone: "amber" | "red";
  icon: ReactNode;
  title: string;
  text: string;
}) {
  const styles =
    tone === "amber"
      ? { box: "bg-amber-50 ring-amber-100", icon: "bg-amber-500", title: "text-amber-800", text: "text-amber-700" }
      : { box: "bg-red-50 ring-red-100", icon: "bg-red-500", title: "text-red-800", text: "text-red-700" };
  return (
    <div className={`flex gap-4 rounded-2xl p-6 shadow-sm ring-1 ${styles.box}`}>
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${styles.icon}`}>{icon}</span>
      <div className="min-w-0">
        <p className={`text-lg font-bold ${styles.title}`}>{title}</p>
        <p className={`mt-1 text-sm break-words ${styles.text}`}>{text}</p>
      </div>
    </div>
  );
}
