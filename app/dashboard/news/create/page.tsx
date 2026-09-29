"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Newspaper,
  Save,
  Send,
  Star,
  X,
  CheckCircle2,
} from "lucide-react";

const categories = [
  "Announcement",
  "Events",
  "Mentoring",
  "Faith & Purpose",
  "Community",
];

export default function CreateNewsPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Announcement");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("WiseGen Team");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [saved, setSaved] = useState(false);

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

    const newsData = {
      title,
      excerpt,
      category,
      content,
      author,
      status,
      featured,
      image,
    };

    console.log("News article:", newsData);

    setSaved(true);
  };

  if (saved) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={30} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              News Article Saved
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your news article has been saved successfully. Once the backend
              is connected, this action will save the article to the WiseGen
              database.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard/news"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to News
              </Link>

              <button
                onClick={() => {
                  setSaved(false);
                  setTitle("");
                  setExcerpt("");
                  setContent("");
                  setCategory("Announcement");
                  setAuthor("WiseGen Team");
                  setStatus("draft");
                  setFeatured(false);
                  setImage(null);
                  setImagePreview(null);
                }}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Newspaper size={16} />
                <span>Dashboard</span>
                <span>/</span>
                <span>News</span>
                <span>/</span>
                <span className="text-slate-700">Create</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create News Article
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and publish an update for the WiseGen community.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main editor */}
            <div className="space-y-6">
              {/* Basic information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="font-semibold text-slate-900">
                    Article Information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Add the main information for your news article.
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
                      placeholder="Enter the article title"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
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
                      placeholder="Write a short description of the article..."
                      rows={4}
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
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
                    Write the full content that visitors will read.
                  </p>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your article here..."
                  rows={18}
                  required
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  You can later replace this with a rich text editor when the
                  backend is implemented.
                </p>
              </section>

              {/* Featured image */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="font-semibold text-slate-900">
                    Featured Image
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add an image that represents this article.
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
                      Click to upload an image
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
                      alt="Featured image preview"
                      className="h-[280px] w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-sm transition hover:bg-red-600"
                      title="Remove image"
                    >
                      <X size={17} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/70 to-transparent px-4 pb-4 pt-10">
                      <p className="truncate text-sm font-medium text-white">
                        {image?.name}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish settings */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-slate-900">
                    Publish Settings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Control how this article is published.
                  </p>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                      status === "draft"
                        ? "border-amber-300 bg-amber-50/50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === "draft"}
                      onChange={() => setStatus("draft")}
                      className="mt-1 accent-amber-500"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Save as Draft
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Keep the article private until you are ready to
                        publish it.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                      status === "published"
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === "published"}
                      onChange={() => setStatus("published")}
                      className="mt-1 accent-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Publish Now
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Make the article available to visitors immediately.
                      </p>
                    </div>
                  </label>
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
                  placeholder="Author name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </section>

              {/* Featured */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={`flex w-full items-start gap-3 text-left`}
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

              {/* Article summary */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-slate-900">
                  Article Summary
                </h2>

                <div className="mt-4 space-y-3">
                  <SummaryRow
                    label="Title"
                    value={title || "Not set"}
                  />

                  <SummaryRow
                    label="Category"
                    value={category}
                  />

                  <SummaryRow
                    label="Author"
                    value={author || "Not set"}
                  />

                  <SummaryRow
                    label="Status"
                    value={status === "draft" ? "Draft" : "Published"}
                  />

                  <SummaryRow
                    label="Featured"
                    value={featured ? "Yes" : "No"}
                  />
                </div>
              </section>

              {/* Actions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {status === "published" ? (
                    <>
                      <Send size={17} />
                      Publish Article
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Draft
                    </>
                  )}
                </button>

                <Link
                  href="/dashboard/news"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
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
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-slate-500">{label}</span>

      <span className="max-w-[180px] truncate text-right text-xs font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
}