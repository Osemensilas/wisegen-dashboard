"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Ban,
  CalendarDays,
  ChevronRight,
  Filter,
  Mail,
  MoreVertical,
  Search,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";

type MemberStatus = "active" | "inactive";

type Member = {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  status: MemberStatus;
  joinedAt: string;
  interests: string[];
};

const initialMembers: Member[] = [
  {
    id: 1,
    name: "Daniel Okoro",
    email: "daniel@example.com",
    phone: "08012345678",
    age: 19,
    location: "Abuja, Nigeria",
    status: "active",
    joinedAt: "September 28, 2026",
    interests: ["Faith", "Purpose", "Leadership"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "08023456789",
    age: 17,
    location: "Abuja, Nigeria",
    status: "active",
    joinedAt: "September 25, 2026",
    interests: ["Bible Study", "Friendship"],
  },
  {
    id: 3,
    name: "Michael David",
    email: "michael@example.com",
    phone: "08034567890",
    age: 22,
    location: "Kaduna, Nigeria",
    status: "active",
    joinedAt: "September 21, 2026",
    interests: ["Career", "Purpose", "Faith"],
  },
  {
    id: 4,
    name: "Esther Paul",
    email: "esther@example.com",
    phone: "08045678901",
    age: 18,
    location: "Abuja, Nigeria",
    status: "inactive",
    joinedAt: "August 30, 2026",
    interests: ["Faith", "Relationships"],
  },
  {
    id: 5,
    name: "Joshua Samuel",
    email: "joshua@example.com",
    phone: "08056789012",
    age: 20,
    location: "Lagos, Nigeria",
    status: "active",
    joinedAt: "August 24, 2026",
    interests: ["Leadership", "Technology"],
  },
  {
    id: 6,
    name: "Mary James",
    email: "mary@example.com",
    phone: "08067890123",
    age: 16,
    location: "Abuja, Nigeria",
    status: "active",
    joinedAt: "August 18, 2026",
    interests: ["Bible Study", "Education"],
  },
];

export default function MembersPage() {
  const [members, setMembers] =
    useState<Member[]>(initialMembers);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"all" | MemberStatus>("all");

  const [menuOpen, setMenuOpen] =
    useState<number | null>(null);

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [memberToDelete, setMemberToDelete] =
    useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const query = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone.toLowerCase().includes(query) ||
        member.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  const activeMembers = members.filter(
    (member) => member.status === "active"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "inactive"
  ).length;

  const toggleStatus = (id: number) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === id
          ? {
              ...member,
              status:
                member.status === "active"
                  ? "inactive"
                  : "active",
            }
          : member
      )
    );

    setMenuOpen(null);
  };

  const confirmDelete = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
    setMenuOpen(null);
  };

  const deleteMember = () => {
    if (!memberToDelete) return;

    setMembers((current) =>
      current.filter(
        (member) => member.id !== memberToDelete.id
      )
    );

    if (selectedMember?.id === memberToDelete.id) {
      setSelectedMember(null);
    }

    setMemberToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600">
                Community Management
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                Members
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage people who have joined the WiseGen community.
              </p>
            </div>

            <Link
              href="/dashboard/members/add"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
            >
              <UserPlus size={17} />
              Add Member
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 lg:px-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Members
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {members.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Users size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Members
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {activeMembers}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <UserCheck size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Inactive Members
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {inactiveMembers}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <Ban size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Members */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* Filters */}
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search members by name, email, phone or location..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "all"
                        | MemberStatus
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 lg:w-52"
                >
                  <option value="all">
                    All Members
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Member
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    {/* Member */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 font-black text-amber-700">
                          {member.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {member.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Age {member.age}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-slate-700">
                        {member.email}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {member.phone}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-slate-600">
                        {member.location}
                      </p>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {member.joinedAt}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${
                          member.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">
                      <div className="relative flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            setMenuOpen(
                              menuOpen === member.id
                                ? null
                                : member.id
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {menuOpen === member.id && (
                          <MemberMenu
                            member={member}
                            onView={() => {
                              setSelectedMember(member);
                              setMenuOpen(null);
                            }}
                            onToggleStatus={() =>
                              toggleStatus(member.id)
                            }
                            onDelete={() =>
                              confirmDelete(member)
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 font-black text-amber-700">
                      {member.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {member.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Age {member.age}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setMenuOpen(
                          menuOpen === member.id
                            ? null
                            : member.id
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {menuOpen === member.id && (
                      <MemberMenu
                        member={member}
                        onView={() => {
                          setSelectedMember(member);
                          setMenuOpen(null);
                        }}
                        onToggleStatus={() =>
                          toggleStatus(member.id)
                        }
                        onDelete={() =>
                          confirmDelete(member)
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={14} />
                    {member.email}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={14} />
                    Joined {member.joinedAt}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      member.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {member.status}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMember(member)
                    }
                    className="flex items-center gap-1 text-xs font-bold text-slate-600"
                  >
                    View
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Users size={24} />
              </div>

              <h2 className="mt-4 font-black text-slate-800">
                No members found
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-400">
                Try changing your search or filter to find
                members.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-black text-slate-950">
                  Member Details
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  WiseGen community member
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-lg font-black text-amber-700">
                  {selectedMember.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-950">
                    {selectedMember.name}
                  </h3>

                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${
                      selectedMember.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {selectedMember.status}
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Email"
                  value={selectedMember.email}
                />

                <DetailItem
                  label="Phone"
                  value={selectedMember.phone}
                />

                <DetailItem
                  label="Age"
                  value={selectedMember.age.toString()}
                />

                <DetailItem
                  label="Location"
                  value={selectedMember.location}
                />

                <DetailItem
                  label="Joined"
                  value={selectedMember.joinedAt}
                />
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Interests
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedMember.interests.map(
                    (interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700"
                      >
                        {interest}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="mt-7 flex gap-3">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                >
                  <Mail size={16} />
                  Email Member
                </a>

                <button
                  type="button"
                  onClick={() => {
                    confirmDelete(selectedMember);
                    setSelectedMember(null);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              Delete member?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to permanently remove{" "}
              <span className="font-bold text-slate-700">
                {memberToDelete.name}
              </span>{" "}
              from the WiseGen member list.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setMemberToDelete(null);
                }}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteMember}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function MemberMenu({
  member,
  onView,
  onToggleStatus,
  onDelete,
}: {
  member: Member;
  onView: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
      <button
        type="button"
        onClick={onView}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        <Users size={15} />
        View Details
      </button>

      <button
        type="button"
        onClick={onToggleStatus}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        {member.status === "active" ? (
          <>
            <Ban size={15} />
            Deactivate
          </>
        ) : (
          <>
            <UserCheck size={15} />
            Activate
          </>
        )}
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={15} />
        Delete Member
      </button>
    </div>
  );
}