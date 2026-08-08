import { useState } from "react";
import { api } from "../api";

const DETAIL_ROWS = [
  ["Regd No", "roll_no"],
  ["Student Name", "name"],
  ["Branch", "branch"],
  ["Gender", "gender"],
  ["Contact", "mobile"],
  ["Company Placed", "company"],
  ["IT / Non-IT", "it_status"],
  ["Salary (LPA)", "salary"],
];

function emptyPerson() {
  return { name: "", contact: "", relation: "" };
}

export default function StudentLookup() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [attend, setAttend] = useState("Yes");
  const [persons, setPersons] = useState([emptyPerson()]);
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitMsg("");
    setStudent(null);
    if (!rollNo.trim()) return;
    setLoading(true);
    try {
      const data = await api.getStudent(rollNo.trim());
      setStudent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePerson = (idx, field, value) => {
    setPersons((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    );
  };

  const addPerson = () => setPersons((prev) => [...prev, emptyPerson()]);
  const removePerson = (idx) =>
    setPersons((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student) return;
    setSubmitting(true);
    setSubmitMsg("");
    try {
      const payload = {
        roll_no: student.roll_no,
        name: student.name,
        attend,
        persons_list: attend === "Yes" ? persons.filter((p) => p.name.trim()) : [],
      };
      const res = await api.submitRegistration(payload);
      setSubmitMsg(res.message);
      setStudent((s) => ({ ...s, already_registered: true }));
    } catch (err) {
      setSubmitMsg(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 px-4 sm:px-0 font-['Sora']">
      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="bg-white/[0.06] backdrop-blur-sm rounded-xl shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row gap-3"
      >
        <input
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Enter Regd No, e.g. 22221A0105"
          autoComplete="off"
          autoCapitalize="characters"
          className="flex-1 bg-white/5 border border-white/15 text-white placeholder-white/40 rounded-lg px-3 py-2.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4A100] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading || !rollNo.trim()}
          className="bg-[#F4A100] text-[#14102B] text-sm font-bold px-5 py-2.5 sm:py-2 rounded-lg hover:bg-[#FFC94A] disabled:opacity-50 disabled:cursor-not-allowed transition shrink-0"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-[#FF5A5F]/10 border border-[#FF5A5F]/30 text-[#FF8A8D] text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {student && (
        <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] border border-white/10 p-4 sm:p-5">
          <h2 className="font-['Fraunces'] font-semibold text-white mb-3">Placement Details</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {DETAIL_ROWS.map(([label, key]) => (
              <div
                key={key}
                className="flex justify-between gap-3 border-b border-white/10 pb-1"
              >
                <dt className="text-white/50 shrink-0">{label}</dt>
                <dd className="font-medium text-white text-right break-words">
                  {student[key] ?? "—"}
                </dd>
              </div>
            ))}
          </dl>

          {student.already_registered ? (
            <div className="mt-4 bg-[#00B8A9]/10 border border-[#00B8A9]/30 text-[#5CE0D3] text-sm rounded-lg px-4 py-3">
              This student has already been registered for Achievers Day.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 border-t border-white/10 pt-4">
              <div>
                <label className="text-sm font-medium text-white/80">
                  Will attend Achievers Day?
                </label>
                <div className="flex gap-4 mt-2">
                  {["Yes", "No"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-sm text-white/80 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="attend"
                        value={opt}
                        checked={attend === opt}
                        onChange={() => setAttend(opt)}
                        className="accent-[#F4A100]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {attend === "Yes" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/80">
                    Accompanying persons
                  </label>

                  {persons.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white/50">
                          Person {idx + 1}
                        </span>
                        {persons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePerson(idx)}
                            className="text-white/40 hover:text-[#FF5A5F] text-xs font-medium px-1"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          placeholder="Name"
                          value={p.name}
                          onChange={(e) => updatePerson(idx, "name", e.target.value)}
                          className="bg-white/5 border border-white/15 text-white placeholder-white/40 rounded-lg px-3 py-2 sm:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4A100] focus:border-transparent"
                        />
                        <input
                          placeholder="Contact"
                          value={p.contact}
                          onChange={(e) => updatePerson(idx, "contact", e.target.value)}
                          inputMode="tel"
                          className="bg-white/5 border border-white/15 text-white placeholder-white/40 rounded-lg px-3 py-2 sm:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4A100] focus:border-transparent"
                        />
                        <input
                          placeholder="Relation"
                          value={p.relation}
                          onChange={(e) => updatePerson(idx, "relation", e.target.value)}
                          className="bg-white/5 border border-white/15 text-white placeholder-white/40 rounded-lg px-3 py-2 sm:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4A100] focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPerson}
                    className="text-sm text-white/60 hover:text-[#F4A100] font-medium"
                  >
                    + Add another person
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#00B8A9] text-[#14102B] text-sm font-bold px-5 py-2.5 sm:py-2 rounded-lg hover:bg-[#3DD9CB] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {submitting ? "Submitting…" : "Submit Registration"}
              </button>
            </form>
          )}

          {submitMsg && (
            <div className="mt-3 text-sm text-white/70 break-words">{submitMsg}</div>
          )}
        </div>
      )}
    </div>
  );
}