"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Users,
} from "lucide-react";

export default function AddMemberPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    interests: [] as string[],
    status: "active",
  });

  const [submitted, setSubmitted] = useState(false);

  const interests = [
    "Faith",
    "Bible Study",
    "Purpose",
    "Leadership",
    "Career",
    "Education",
    "Relationships",
    "Technology",
    "Personal Development",
  ];

  const handleChange = (
    field: string,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleInterest = (interest: string) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter(
            (item) => item !== interest
          )
        : [...current.interests, interest],
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect this to your API later.
    console.log("New member:", form);

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-6 sm:px-8">
          <Link
            href="/dashboard/members"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to Members
          </Link>

          <div className="mt-6">
            <p className="text-sm font-semibold text-amber-600">
              Community Management
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Add Member
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add a new person to the WiseGen community.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8">
        {submitted ? (
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={30} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Member Added
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {form.firstName} {form.lastName} has been
              added to the WiseGen member list.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard/members"
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
              >
                View Members
              </Link>

              <button
                type="button"
                onClick={() => {
                  setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    age: "",
                    location: "",
                    interests: [],
                    status: "active",
                  });

                  setSubmitted(false);
                }}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Add Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
              {/* Main Form */}
              <div className="space-y-6">
                {/* Personal Information */}
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                        <User size={19} />
                      </div>

                      <div>
                        <h2 className="font-black text-slate-950">
                          Personal Information
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Basic information about the member.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 p-6 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      placeholder="e.g. Daniel"
                      value={form.firstName}
                      onChange={(value) =>
                        handleChange(
                          "firstName",
                          value
                        )
                      }
                      required
                    />

                    <Input
                      label="Last Name"
                      placeholder="e.g. Okoro"
                      value={form.lastName}
                      onChange={(value) =>
                        handleChange(
                          "lastName",
                          value
                        )
                      }
                      required
                    />

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            handleChange(
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="member@example.com"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange(
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="08012345678"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                        />
                      </div>
                    </div>

                    <Input
                      label="Age"
                      type="number"
                      placeholder="e.g. 18"
                      value={form.age}
                      onChange={(value) =>
                        handleChange("age", value)
                      }
                      required
                    />

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Location
                      </label>

                      <div className="relative">
                        <MapPin
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          value={form.location}
                          onChange={(e) =>
                            handleChange(
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Abuja, Nigeria"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Interests */}
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Users size={19} />
                      </div>

                      <div>
                        <h2 className="font-black text-slate-950">
                          Interests
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Select topics the member is interested in.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 p-6">
                    {interests.map((interest) => {
                      const selected =
                        form.interests.includes(
                          interest
                        );

                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() =>
                            toggleInterest(interest)
                          }
                          className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                            selected
                              ? "border-amber-400 bg-amber-400 text-slate-950"
                              : "border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Notes */}
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="font-black text-slate-950">
                      Additional Information
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Optional information about the member.
                    </p>
                  </div>

                  <div className="p-6">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Notes
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Add any relevant notes about this member..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                    />
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Status */}
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="font-black text-slate-950">
                      Member Status
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Control the member's current status.
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                          form.status === "active"
                            ? "border-green-300 bg-green-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={
                            form.status === "active"
                          }
                          onChange={(e) =>
                            handleChange(
                              "status",
                              e.target.value
                            )
                          }
                          className="mt-0.5 accent-green-600"
                        />

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Active
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Member is currently part of the
                            WiseGen community.
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                          form.status === "inactive"
                            ? "border-slate-300 bg-slate-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          checked={
                            form.status === "inactive"
                          }
                          onChange={(e) =>
                            handleChange(
                              "status",
                              e.target.value
                            )
                          }
                          className="mt-0.5 accent-slate-600"
                        />

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Inactive
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Member is no longer actively
                            participating.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </section>

                {/* Summary */}
                <section className="rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="font-black text-slate-950">
                      Summary
                    </h2>
                  </div>

                  <div className="space-y-4 p-6">
                    <SummaryRow
                      label="Name"
                      value={
                        form.firstName || form.lastName
                          ? `${form.firstName} ${form.lastName}`.trim()
                          : "Not provided"
                      }
                    />

                    <SummaryRow
                      label="Email"
                      value={
                        form.email || "Not provided"
                      }
                    />

                    <SummaryRow
                      label="Age"
                      value={
                        form.age
                          ? `${form.age} years`
                          : "Not provided"
                      }
                    />

                    <SummaryRow
                      label="Interests"
                      value={
                        form.interests.length
                          ? `${form.interests.length} selected`
                          : "None selected"
                      }
                    />
                  </div>
                </section>

                {/* Submit */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                  >
                    <Save size={17} />
                    Add Member
                  </button>

                  <Link
                    href="/dashboard/members"
                    className="mt-3 flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                  >
                    Cancel
                  </Link>
                </div>
              </aside>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}