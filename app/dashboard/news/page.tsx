"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Newspaper,
  Star,
  CalendarDays,
  FileText,
  X,
  CheckCircle2,
  Clock3,
  Archive,
} from "lucide-react";

type NewsStatus = "published" | "draft" | "archived";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  status: NewsStatus;
  featured: boolean;
  image: string;
};

const initialNews: NewsItem[] = [
  {
    id: "1",
    title: "Welcome to the New WiseGen Website",
    excerpt:
      "We are excited to launch a new online space for the WiseGen community.",
    category: "Announcement",
    date: "September 28, 2026",
    author: "WiseGen Team",
    status: "published",
    featured: true,
    image: "/news/welcome.jpg",
  },
  {
    id: "2",
    title: "Why Mentoring Matters for Young People",
    excerpt:
      "Discover how meaningful mentoring relationships can help young people grow in faith, wisdom, and purpose.",
    category: "Mentoring",
    date: "September 20, 2026",
    author: "WiseGen Team",
    status: "published",
    featured: false,
    image: "/news/mentoring.jpg",
  },
  {
    id: "3",
    title: "Preparing for the WiseGen Youth Conference",
    excerpt:
      "Everything young people should know as we prepare for an upcoming WiseGen gathering.",
    category: "Events",
    date: "September 15, 2026",
    author: "WiseGen Team",
    status: "published",
    featured: true,
    image: "/news/conference.jpg",
  },
  {
    id: "4",
    title: "Building a Life of Purpose",
    excerpt:
      "A practical reflection on discovering purpose and making wise decisions.",
    category: "Faith & Purpose",
    date: "September 10, 2026",
    author: "WiseGen Team",
    status: "draft",
    featured: false,
    image: "/news/purpose.jpg",
  },
  {
    id: "5",
    title: "WiseGen Community Update",
    excerpt:
      "A look at recent activities and what is coming next for the WiseGen community.",
    category: "Community",
    date: "August 30, 2026",
    author: "WiseGen Team",
    status: "archived",
    featured: false,
    image: "/news/community.jpg",
  },
];

const categories = [
  "All",
  "Announcement",
  "Events",
  "Mentoring",
  "Faith & Purpose",
  "Community",
];

function StatusBadge({ status }: { status: NewsStatus }) {
  const styles = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
    archived: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const icons = {
    published: CheckCircle2,
    draft: Clock3,
    archived: Archive,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  icon: typeof Newspaper;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<"all" | NewsStatus>("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteItem, setDeleteItem] = useState<NewsItem | null>(null);
  const [viewItem, setViewItem] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesStatus =
        status === "all" || item.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [news, search, category, status]);

  const publishedCount = news.filter(
    (item) => item.status === "published"
  ).length;

  const draftCount = news.filter((item) => item.status === "draft").length;

  const featuredCount = news.filter((item) => item.featured).length;

  const handleDelete = () => {
    if (!deleteItem) return;

    setNews((current) =>
      current.filter((item) => item.id !== deleteItem.id)
    );

    setDeleteItem(null);
  };

  const toggleFeatured = (id: string) => {
    setNews((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, featured: !item.featured }
          : item
      )
    );

    setOpenMenu(null);
  };

  const changeStatus = (id: string, newStatus: NewsStatus) => {
    setNews((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Newspaper size={16} />
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-700">News</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              News & Updates
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create, manage and publish news and updates for the WiseGen
              community.
            </p>
          </div>

          <Link
            href="/dashboard/news/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus size={18} />
            Create News
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total News"
            value={news.length}
            icon={Newspaper}
            description="All news articles"
          />

          <StatCard
            title="Published"
            value={publishedCount}
            icon={CheckCircle2}
            description="Currently visible"
          />

          <StatCard
            title="Drafts"
            value={draftCount}
            icon={FileText}
            description="Not published yet"
          />

          <StatCard
            title="Featured"
            value={featuredCount}
            icon={Star}
            description="Highlighted articles"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "all" | NewsStatus)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* News list */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  News Articles
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {filteredNews.length} article
                  {filteredNews.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Newspaper size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No news found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Try changing your search or filters, or create a new news
                article.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-left">
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Article
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Category
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Featured
                      </th>
                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredNews.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <div className="flex min-w-[300px] items-center gap-3">
                            <div className="flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                              <Newspaper
                                size={21}
                                className="text-slate-400"
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate font-semibold text-slate-900">
                                  {item.title}
                                </p>

                                {item.featured && (
                                  <Star
                                    size={14}
                                    className="shrink-0 fill-amber-400 text-amber-500"
                                  />
                                )}
                              </div>

                              <p className="mt-1 line-clamp-1 max-w-md text-xs text-slate-500">
                                {item.excerpt}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                By {item.author}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                            {item.category}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays size={15} />
                            {item.date}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleFeatured(item.id)}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                              item.featured
                                ? "border-amber-200 bg-amber-50 text-amber-500"
                                : "border-slate-200 bg-white text-slate-400 hover:text-slate-600"
                            }`}
                            title={
                              item.featured
                                ? "Remove from featured"
                                : "Make featured"
                            }
                          >
                            <Star
                              size={17}
                              className={
                                item.featured ? "fill-current" : ""
                              }
                            />
                          </button>
                        </td>

                        <td className="relative px-5 py-4 text-right">
                          <button
                            onClick={() =>
                              setOpenMenu(
                                openMenu === item.id ? null : item.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <MoreVertical size={19} />
                          </button>

                          {openMenu === item.id && (
                            <div className="absolute right-5 top-12 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-left shadow-xl">
                              <button
                                onClick={() => {
                                  setViewItem(item);
                                  setOpenMenu(null);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={16} />
                                View
                              </button>

                              <Link
                                href={`/dashboard/news/${item.id}`}
                                onClick={() => setOpenMenu(null)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil size={16} />
                                Edit
                              </Link>

                              {item.status !== "published" && (
                                <button
                                  onClick={() =>
                                    changeStatus(item.id, "published")
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-emerald-700 hover:bg-emerald-50"
                                >
                                  <CheckCircle2 size={16} />
                                  Publish
                                </button>
                              )}

                              {item.status === "published" && (
                                <button
                                  onClick={() =>
                                    changeStatus(item.id, "archived")
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                                >
                                  <Archive size={16} />
                                  Archive
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setDeleteItem(item);
                                  setOpenMenu(null);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-slate-100 md:hidden">
                {filteredNews.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex gap-3">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Newspaper
                          size={22}
                          className="text-slate-400"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="line-clamp-2 font-semibold text-slate-900">
                                {item.title}
                              </h3>

                              {item.featured && (
                                <Star
                                  size={13}
                                  className="shrink-0 fill-amber-400 text-amber-500"
                                />
                              )}
                            </div>

                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {item.excerpt}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              setOpenMenu(
                                openMenu === item.id ? null : item.id
                              )
                            }
                            className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                            {item.category}
                          </span>

                          <StatusBadge status={item.status} />

                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <CalendarDays size={13} />
                            {item.date}
                          </span>
                        </div>

                        {openMenu === item.id && (
                          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <button
                              onClick={() => {
                                setViewItem(item);
                                setOpenMenu(null);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Eye size={16} />
                              View
                            </button>

                            <Link
                              href={`/dashboard/news/${item.id}`}
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Pencil size={16} />
                              Edit
                            </Link>

                            <button
                              onClick={() => {
                                toggleFeatured(item.id);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Star size={16} />
                              {item.featured
                                ? "Remove Featured"
                                : "Make Featured"}
                            </button>

                            <button
                              onClick={() => {
                                setDeleteItem(item);
                                setOpenMenu(null);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* View modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                  News Preview
                </p>
                <h2 className="mt-1 font-bold text-slate-900">
                  {viewItem.title}
                </h2>
              </div>

              <button
                onClick={() => setViewItem(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {viewItem.category}
                </span>

                <StatusBadge status={viewItem.status} />

                {viewItem.featured && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    <Star size={13} className="fill-current" />
                    Featured
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
                <CalendarDays size={16} />
                {viewItem.date}

                <span>•</span>

                <span>By {viewItem.author}</span>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-5">
                <p className="leading-7 text-slate-700">
                  {viewItem.excerpt}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  href={`/dashboard/news/${viewItem.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Delete this article?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to delete{" "}
              <span className="font-semibold text-slate-700">
                "{deleteItem.title}"
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteItem(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}