import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";

const featuredPosts = [
  {
    id: 1,
    tag: "Featured Story",
    readTime: "8 min read",
    title: "The Future of Curation: Why Quality Outshines Quantity.",
    excerpt:
      "In a sea of digital noise, curation is becoming the most effective way to help buyers discover valuable listings faster.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    author: "Elena Vance",
    role: "Lead Curator",
  },
];

const posts = [
  {
    id: 2,
    tag: "Tips",
    title: "Mastering the Art of Sustainable Selection",
    excerpt:
      "How to spot quality listings, avoid waste, and make smarter marketplace decisions every week.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    author: "Marcus Thorne",
  },
  {
    id: 3,
    tag: "Stories",
    title: "Behind the Craft: The Glassblowers of Venice",
    excerpt:
      "A look at how skilled makers preserve tradition while adapting to modern buying habits.",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
    author: "Rita Bell",
  },
  {
    id: 4,
    tag: "News",
    title: "Introducing Verified Origins for All Curators",
    excerpt:
      "New product origin checks help buyers trust the items they are viewing before they decide.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    author: "Julia Chen",
  },
];

const trendingTopics = [
  "Scaling your micro-brand in 2026",
  "Understanding the NFT impact on physical goods",
  "10 minimalist brands you need to follow",
  "Photography basics for product listings",
];

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return [post.tag, post.title, post.excerpt, post.author].some((value) =>
        value.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <div className="bg-[#f6f7fb] min-h-screen text-gray-900">
      <Header activePage="blog" />

      <div className="max-w-7xl mx-auto space-y-6 px-4 py-6">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
          <div className="relative overflow-hidden rounded-[28px] shadow-xl bg-black min-h-[300px]">
            <img
              src={featuredPosts[0].image}
              alt={featuredPosts[0].title}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
            <div className="relative z-10 h-full flex items-end p-8">
              <div className="max-w-xl text-white">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-200">
                  <span>{featuredPosts[0].tag}</span>
                  <span>•</span>
                  <span>{featuredPosts[0].readTime}</span>
                </div>
                <h1 className="mt-4 text-3xl md:text-4xl font-black leading-tight max-w-lg">
                  {featuredPosts[0].title}
                </h1>
                <p className="mt-4 max-w-xl text-sm md:text-base text-gray-200 leading-6">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-semibold">
                    EV
                  </div>
                  <div>
                    <p className="font-semibold">{featuredPosts[0].author}</p>
                    <p className="text-sm text-gray-300">{featuredPosts[0].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] bg-white shadow-xl p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Search Blog</p>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles..."
                className="mt-4 w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="rounded-3xl bg-teal-50 p-6">
              <p className="text-sm font-semibold text-teal-700">The Weekly Glow</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">
                Curated ideas for marketplace sellers.
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-6">
                Get weekly updates on curation, design, and product listing strategies.
              </p>
              <div className="mt-5 rounded-full bg-white px-4 py-3 text-sm text-gray-400 shadow-sm">
                Email Address
              </div>
              <button className="mt-4 w-full rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                Subscribe
              </button>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">Trending Now</p>
              <div className="mt-4 space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic} className="flex items-start gap-4 rounded-2xl bg-gray-50 px-4 py-3">
                    <span className="text-sm font-black text-gray-300">0{index + 1}</span>
                    <span className="text-sm font-medium text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Recent Insights</h2>
              <div className="flex gap-2 text-sm font-semibold text-gray-500">
                <span className="rounded-full bg-teal-50 px-4 py-2 shadow-sm text-teal-700">All</span>
                <span className="rounded-full px-4 py-2">Tips</span>
                <span className="rounded-full px-4 py-2">News</span>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-[22px] bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-700">
                      {post.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[12px] uppercase tracking-[0.22em] text-gray-400">Jul 19, 2026 • 4 min read</p>
                    <h3 className="mt-3 text-lg font-black leading-snug text-gray-900">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-200" />
                      <p className="text-sm font-medium text-gray-500">{post.author}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="mt-6 rounded-[22px] bg-white p-6 text-center shadow-md">
                <p className="text-sm font-semibold text-gray-700">No articles found.</p>
                <p className="mt-1 text-sm text-gray-500">Try a different keyword or clear the search.</p>
              </div>
            )}

            <div className="mt-6 flex justify-center md:justify-start">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md">
                Load More Articles
              </button>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[22px] bg-white p-5 shadow-md">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">Top Topics</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Technology",
                  "Marketplace",
                  "Curation",
                  "Lifestyle",
                ].map((topic) => (
                  <span key={topic} className="rounded-full bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <div className="flex justify-end">
          <Link
            to="/"
            className="rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;

