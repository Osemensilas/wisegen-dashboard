"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ImagePlus,
  Newspaper,
  Save,
  Send,
  Star,
  Trash2,
  X,
} from "lucide-react";

type NewsStatus = "published" | "draft" | "archived";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  date: string;
  author: string;
  status: NewsStatus;
  featured: boolean;
  image: string | null;
};

const categories = [
  "Announcement",
  "Events",
  "Mentoring",
  "Faith & Purpose",
  "Community",
];

const sampleNews: Record<string, NewsItem> = {
  "1": {
    id: "1",
    title: "Welcome to the New WiseGen Website",
    excerpt:
      "We are excited to launch a new online space for the WiseGen community.",
    category: "Announcement",
    content:
      "We are excited to welcome you to the new WiseGen website.\n\nWiseGen is a Christian-based fellowship and mentoring community created for teenagers and young adults. This new online space will make it easier for members, parents, mentors, and visitors to stay connected with the WiseGen community.\n\nThrough this website, you will be able to learn more about WiseGen, discover upcoming events, read our latest news and updates, view memories from past events, and connect with the community.\n\nWe look forward to growing together as we continue raising a generation that loves God, lives wisely, and fulfills purpose.",
    date: "September 28, 2026",
    author: "WiseGen Team",
    status: "published",
    featured: true,
    image: null,
  },

  "2": {
    id: "2",
    title: "Why Mentoring Matters for Young People",
    excerpt:
      "Discover how meaningful mentoring relationships can help young people grow in faith, wisdom, and purpose.",
    category: "Mentoring",
    content:
      "Mentoring gives young people an opportunity to learn from people who care about their growth and development.\n\nAt WiseGen, mentoring goes beyond simply giving advice. It is about walking alongside young people, listening to their questions, helping them navigate challenges, and encouraging them to make wise decisions.\n\nThrough meaningful relationships, young people can develop confidence, character, wisdom, and a clearer understanding of purpose.",
    date: "September 20, 2026",
    author: "WiseGen Team",
    status: "published",
    featured: false,
    image: null,
  },
};

export default function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [news] = useState(() => {
    // In the real application this will come from the API/database.
    return sampleNews["1"];
  });

  const [title, setTitle] = useState(news.title);
  const [excerpt, setExcerpt] = useState(news.excerpt);
  const [category, setCategory] = useState(news.category);
  const [content, setContent] = useState(news.content);
  const [author, setAuthor] = useState(news.author);
  const [status, setStatus] = useState<NewsStatus>(news.status);
  const [featured, setFeatured] = useState(news.featured);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    news.image
  );

  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedNews = {
      id: news.id,
      title,
      excerpt,
      category,
      content,
      author,
      status,
      featured,
      image,
    };

    console.log("Updated news:", updatedNews);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleDelete = () => {
    console.log("Delete news:", news.id);

    setShowDelete(false);

    alert("Article deleted. Backend integration is required for permanent deletion.");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/news"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Newspaper size={16} />
                <span>Dashboard</span>
                <span>/</span>
                <span>News</span>
                <span>/</span>
                <span className="text-slate-700">Edit Article</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Edit News Article
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update the article information and publishing settings.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  status === "published"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : status === "draft"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {status}
              </span>

              <span className="text-xs text-slate-400">
                ID: {news.id}
              </span>
            </div>
          </div>
        </div>

        {/* Save notification */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 size={18} />
            <span>Article changes have been saved.</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main content */}
            <div className="space-y-6">
              {/* Article information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="font-semibold text-slate-900">
                    Article Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update the title, description and category.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Article Title
                    </label>

                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="excerpt"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        Short Description
                      </label>

                      <span className="text-xs text-slate-400">
                        {excerpt.length}/200
                      </span>
                    </div>

                    <textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) {
                          setExcerpt(e.target.value);
                        }
                      }}
                      rows={4}
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    >
                      {categories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Content */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="font-semibold text-slate-900">
                    Article Content
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Edit the full content of this article.
                  </p>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  required
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Rich text editing can be added when the backend is connected.
                </p>
              </section>

              {/* Featured image */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="font-semibold text-slate-900">
                    Featured Image
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Change the image displayed with this article.
                  </p>
                </div>

                {!imagePreview ? (
                  <label
                    htmlFor="news-image"
                    className="flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 text-center transition hover:border-amber-300 hover:bg-amber-50/30"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                      <ImagePlus size={25} />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      Upload an image
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG or WEBP
                    </p>

                    <input
                      id="news-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200">
                    <img
                      src={imagePreview}
                      alt="News featured image"
                      className="h-[300px] w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-sm transition hover:bg-red-600"
                      title="Remove image"
                    >
                      <X size={17} />
                    </button>

                    {image && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/70 to-transparent px-4 pb-4 pt-10">
                        <p className="truncate text-sm font-medium text-white">
                          {image.name}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish status */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-slate-900">
                    Publish Status
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose the current state of this article.
                  </p>
                </div>

                <div className="space-y-3">
                  <StatusOption
                    label="Published"
                    description="Visible to website visitors."
                    checked={status === "published"}
                    onChange={() => setStatus("published")}
                    color="emerald"
                  />

                  <StatusOption
                    label="Draft"
                    description="Saved but not visible publicly."
                    checked={status === "draft"}
                    onChange={() => setStatus("draft")}
                    color="amber"
                  />

                  <StatusOption
                    label="Archived"
                    description="No longer actively displayed."
                    checked={status === "archived"}
                    onChange={() => setStatus("archived")}
                    color="slate"
                  />
                </div>
              </section>

              {/* Author */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Author
                </label>

                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </section>

              {/* Featured */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      featured
                        ? "bg-amber-100 text-amber-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Star
                      size={19}
                      className={featured ? "fill-current" : ""}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Featured Article
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Highlight this article on the WiseGen news section.
                    </p>
                  </div>

                  <div
                    className={`ml-auto mt-1 h-5 w-9 shrink-0 rounded-full p-0.5 transition ${
                      featured ? "bg-amber-500" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        featured ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                </button>
              </section>

              {/* Metadata */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-slate-900">
                  Article Details
                </h2>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      Article ID
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      #{news.id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      Category
                    </span>

                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays size={14} />
                      Published
                    </span>

                    <span className="text-xs font-medium text-slate-700">
                      {news.date}
                    </span>
                  </div>
                </div>
              </section>

              {/* Actions */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {status === "published" ? (
                    <>
                      <Send size={17} />
                      Save & Publish
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>

                <Link
                  href="/dashboard/news"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete Article
                </button>
              </section>
            </div>
          </div>
        </form>
      </div>

      {/* Delete confirmation */}
      {showDelete && (
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
                "{title}"
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDelete(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
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

function StatusOption({
  label,
  description,
  checked,
  onChange,
  color,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  color: "emerald" | "amber" | "slate";
}) {
  const styles = {
    emerald: checked
      ? "border-emerald-300 bg-emerald-50/50"
      : "border-slate-200",
    amber: checked
      ? "border-amber-300 bg-amber-50/50"
      : "border-slate-200",
    slate: checked
      ? "border-slate-300 bg-slate-50"
      : "border-slate-200",
  };

  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition hover:bg-slate-50 ${styles[color]}`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="mt-1"
      />

      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </label>
  );
}