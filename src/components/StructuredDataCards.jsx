import {
  User,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Wrench,
  Trophy,
  FileText,
  AlertTriangle,
} from "lucide-react";

/**
 * The backend's `structured_data` is untyped (Any) — the LLM decides its own
 * shape per document type (Resume, Invoice, Marksheet, Aadhaar, Financial
 * Statement, ...). Rather than assuming one fixed schema, this component
 * renders ANY object generically as sectioned cards, while recognizing a
 * handful of common section names to pick a nicer icon/title when present.
 */

const KNOWN_SECTIONS = {
  personal_information: { title: "Personal Information", icon: User },
  personalinformation: { title: "Personal Information", icon: User },
  personal_details: { title: "Personal Information", icon: User },
  education: { title: "Education", icon: GraduationCap },
  experience: { title: "Experience", icon: Briefcase },
  work_experience: { title: "Experience", icon: Briefcase },
  projects: { title: "Projects", icon: FolderKanban },
  skills: { title: "Skills", icon: Wrench },
  achievements: { title: "Achievements", icon: Trophy },
  certifications: { title: "Achievements", icon: Trophy },
};

function humanizeKey(key) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isPlainObject(value) {
  return (
    value !== null && typeof value === "object" && !Array.isArray(value)
  );
}

function ValueDisplay({ value }) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-500 italic">Not specified</span>;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return (
      <span className="text-slate-200 break-words whitespace-pre-wrap">
        {String(value)}
      </span>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-slate-500 italic">None</span>;
    }

    // Array of primitives -> pill tags
    if (value.every((item) => typeof item !== "object" || item === null)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm break-words"
            >
              {String(item)}
            </span>
          ))}
        </div>
      );
    }

    // Array of objects -> stacked mini-cards
    return (
      <div className="space-y-3">
        {value.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-950 border border-slate-800 rounded-lg p-3 sm:p-4"
          >
            {isPlainObject(item) ? (
              <ObjectFields data={item} />
            ) : (
              <ValueDisplay value={item} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (isPlainObject(value)) {
    return <ObjectFields data={value} />;
  }

  return <span className="text-slate-200">{String(value)}</span>;
}

function ObjectFields({ data }) {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return <span className="text-slate-500 italic">No details available</span>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {entries.map(([key, value]) => (
        <div key={key} className="min-w-0">
          <p className="text-slate-400 text-xs uppercase tracking-wide break-words">
            {humanizeKey(key)}
          </p>
          <div className="mt-1 text-sm sm:text-base">
            <ValueDisplay value={value} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-blue-400" />
        </div>
        <h3 className="text-white font-semibold text-base sm:text-lg break-words">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function StructuredDataCards({ data }) {
  if (!data || (isPlainObject(data) && Object.keys(data).length === 0)) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
        <p className="text-slate-400 text-sm sm:text-base">
          No structured data was extracted for this document.
        </p>
      </div>
    );
  }

  // LLM sometimes returns non-JSON text; llm_service falls back to
  // { raw_response: "..." } in that case. Surface it clearly instead of
  // pretending it's structured.
  if (isPlainObject(data) && Object.keys(data).length === 1 && "raw_response" in data) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-amber-400" />
          <h3 className="text-amber-400 font-semibold">
            Unstructured Response
          </h3>
        </div>
        <p className="text-slate-300 text-sm sm:text-base whitespace-pre-wrap break-words leading-6">
          {data.raw_response}
        </p>
      </div>
    );
  }

  if (isPlainObject(data) && "error" in data && Object.keys(data).length === 1) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-5 flex items-center gap-3">
        <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
        <p className="text-red-300 text-sm sm:text-base">{data.error}</p>
      </div>
    );
  }

  if (!isPlainObject(data)) {
    // Unexpected shape (array/string/number at top level) — still render
    // something useful rather than nothing.
    return (
      <SectionCard title="Extracted Information" icon={FileText}>
        <ValueDisplay value={data} />
      </SectionCard>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      {Object.entries(data).map(([key, value]) => {
        const known = KNOWN_SECTIONS[key.toLowerCase().replace(/\s+/g, "_")];
        const title = known?.title || humanizeKey(key);
        const Icon = known?.icon || FileText;

        return (
          <SectionCard key={key} title={title} icon={Icon}>
            <ValueDisplay value={value} />
          </SectionCard>
        );
      })}
    </div>
  );
}

export default StructuredDataCards;
