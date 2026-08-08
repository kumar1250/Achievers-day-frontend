import { forwardRef } from "react";
import bvceLogo from "../assets/bvce-logo.png";

const INSTRUCTIONS = [
  "Be at the venue at least 30-45 minutes before the ceremony begins to check in and get seated.",
  "Proceed to the designated check-in area to receive your name card and instructions.",
  "Collect your Achievers Day kit from the department by showing this acknowledgement.",
  "Wear formal attire suitable for the felicitation ceremony.",
  "Follow instructions for the processional order — walk in a straight line at a steady pace.",
  "Once seated, remain in your assigned seat unless directed otherwise.",
  "Turn off or silence your phone during the ceremony.",
  "Maintain a respectful attitude — applaud and cheer for fellow achievers.",
  "When your name is called, walk to the stage confidently and return to your seat smoothly.",
  "After the ceremony, feel free to take photos with family and friends.",
];

const Acknowledgement = forwardRef(function Acknowledgement({ student }, ref) {
  const persons = student.persons || [];
  const rows = [...persons, ...Array(Math.max(0, 2 - persons.length)).fill(null)];

  return (
    <div
      ref={ref}
      className="paper-texture bg-[#FFFBF2] text-[#14102B] w-[800px] mx-auto p-0"
    >
      {/* Outer engraved border */}
      <div className="border-[3px] border-[#14102B] m-3">
        <div className="border border-[#F4A100] m-1.5 p-9">
          {/* Letterhead */}
          <div className="flex items-center gap-4 border-b-2 border-[#F4A100] pb-5">
            <img
              src={bvceLogo}
              alt="BVCE logo"
              className="w-16 h-16 object-contain shrink-0"
            />
            <div>
              <h1 className="font-['Fraunces'] text-lg font-bold text-[#14102B] leading-tight tracking-tight">
                Bonam Venkata Chalamayya Engineering College , Odalarevu
              </h1>
              <p className="text-[11px] text-[#14102B]/55 tracking-wide mt-0.5">
                B.V.C. Engineering College, Odalarevu Beach Road, Odalarevu – 533210, Allavaram Mandal, Dr. B.R. Ambedkar Konaseema District (formerly East Godavari), Andhra Pradesh, India — Since 1997
              </p>
            </div>
            <div className="ml-auto shrink-0 w-16 h-16 rounded-full border-2 border-[#F4A100] flex flex-col items-center justify-center text-center leading-none">
              <span className="text-[8px] font-semibold uppercase tracking-wider text-[#C97F00]">
                Registered
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00B8A9] mt-0.5"
              >
                <path d="m20 6-11 11-5-5" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C97F00]">
              Achievers Day 2026 &middot; 22nd August 2026
            </p>
            <h2 className="font-['Fraunces'] text-2xl font-bold text-[#14102B] mt-1.5">
              Registration Acknowledgement
            </h2>
          </div>

          <p className="mt-7 text-sm leading-relaxed">
            Dear <b>{student.name}</b>, congratulations on your placement.
            This letter confirms your registration for Achievers Day, with
            the details recorded below.
          </p>

          {/* Details grid */}
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2 text-sm border-y border-[#14102B]/10 py-4">
            <p>
              <span className="text-[#14102B]/50">Regd No</span>
              <br />
              <b>{student.roll_no}</b>
            </p>
            <p>
              <span className="text-[#14102B]/50">Name of the Candidate</span>
              <br />
              <b>{student.name}</b>
            </p>
            <p>
              <span className="text-[#14102B]/50">Branch</span>
              <br />
              <b>{student.branch}</b>
            </p>
            <p>
              <span className="text-[#14102B]/50">Company Placed</span>
              <br />
              <b>{student.company}</b>
            </p>
            <p>
              <span className="text-[#14102B]/50">IT / Non-IT</span>
              <br />
              <b>{student.it_status}</b>
            </p>
            <p>
              <span className="text-[#14102B]/50">Salary (LPA)</span>
              <br />
              <b>{student.salary}</b>
            </p>
            <p>
              <span className="text-[#14102B]/50">Attending Ceremony</span>
              <br />
              <b>{student.attend}</b>
            </p>
          </div>

          {/* Companions */}
          <p className="mt-6 font-semibold text-sm text-[#14102B]">
            Accompanying Guests
          </p>
          <table className="w-full mt-2 text-sm border border-[#14102B]/15">
            <thead className="bg-[#14102B] text-white">
              <tr>
                <th className="border border-[#14102B]/15 px-2 py-1.5 font-medium w-12">
                  S.No
                </th>
                <th className="border border-[#14102B]/15 px-2 py-1.5 font-medium text-left">
                  Name
                </th>
                <th className="border border-[#14102B]/15 px-2 py-1.5 font-medium text-left">
                  Relation
                </th>
                <th className="border border-[#14102B]/15 px-2 py-1.5 font-medium text-left">
                  Contact No.
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={i} className={i % 2 ? "bg-[#F4A100]/10" : "bg-white"}>
                  <td className="border border-[#14102B]/15 px-2 py-1.5 text-center">
                    {i + 1}
                  </td>
                  <td className="border border-[#14102B]/15 px-2 py-1.5">
                    {p?.name || ""}
                  </td>
                  <td className="border border-[#14102B]/15 px-2 py-1.5">
                    {p?.relation || ""}
                  </td>
                  <td className="border border-[#14102B]/15 px-2 py-1.5">
                    {p?.contact || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Instructions */}
          <div className="mt-7 border-t border-[#14102B]/10 pt-5">
            <p className="font-semibold text-sm text-[#14102B]">
              Instructions to the Achievers
            </p>
            <ol className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed">
              {INSTRUCTIONS.map((line, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-[#C97F00] font-semibold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Sign-off */}
          <div className="mt-8 flex items-end justify-between border-t-2 border-[#F4A100] pt-5">
            <div>
              <p className="font-['Caveat'] font-semibold text-2xl text-[#14102B]/80">
                Congratulations on your placement, and best wishes ahead!
              </p>
              <p className="text-[11px] text-[#14102B]/45 mt-1">
                Placements Office &middot; BVCE College &middot; B.V.C. Engineering College, Odalarevu Beach Road, Odalarevu – 533210, Allavaram Mandal, Dr. B.R. Ambedkar Konaseema District (formerly East Godavari), Andhra Pradesh, India
              </p>
            </div>
            <div className="text-center shrink-0">
              <div className="w-14 h-14 rounded-full border-2 border-[#F4A100] flex items-center justify-center mx-auto">
                <span className="font-['Fraunces'] text-[9px] font-bold text-[#C97F00] text-center leading-tight">
                  BVCE<br />SEAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Acknowledgement;