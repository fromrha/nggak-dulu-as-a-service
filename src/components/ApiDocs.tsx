import { CATEGORIES, TONES, CATEGORY_LABELS, TONE_LABELS } from "@/lib/types";

export function ApiDocs() {
  const exampleResponse = `{
  "id": "general-sopan-001",
  "text": "Makasih sudah ngajak, tapi untuk sekarang aku nggak bisa ikut dulu.",
  "category": "general",
  "tone": "sopan"
}`;

  return (
    <section id="api-docs" className="px-6 py-24 lg:px-8" aria-labelledby="api-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500">Public API</p>
          <h2 id="api-title" className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
            Pakai dari mana saja.
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Endpoint sederhana buat ambil kalimat penolakan random berdasarkan kategori dan tone.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-6 text-stone-100 shadow-2xl">
            <p className="mb-3 text-sm font-semibold text-amber-300">Endpoint</p>
            <code className="block rounded-2xl bg-white/10 p-4 text-sm text-amber-100">GET /api/no</code>

            <p className="mb-3 mt-6 text-sm font-semibold text-amber-300">Example requests</p>
            <pre className="overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm leading-7"><code>{`curl https://your-domain.vercel.app/api/no
curl https://your-domain.vercel.app/api/no?category=kampus
curl "https://your-domain.vercel.app/api/no?category=corporate&tone=sopan"`}</code></pre>

            <p className="mb-3 mt-6 text-sm font-semibold text-amber-300">Example response</p>
            <pre className="overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm leading-7"><code>{exampleResponse}</code></pre>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/70">
              <h3 className="text-xl font-extrabold text-stone-950">Query parameters</h3>
              <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-100 text-stone-700">
                    <tr>
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3">Required</th>
                      <th className="px-4 py-3">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    <tr><td className="px-4 py-3 font-mono">category</td><td className="px-4 py-3">No</td><td className="px-4 py-3 font-mono">kampus</td></tr>
                    <tr><td className="px-4 py-3 font-mono">tone</td><td className="px-4 py-3">No</td><td className="px-4 py-3 font-mono">sopan</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-amber-50 p-6 shadow-xl shadow-amber-200/40">
              <h3 className="text-xl font-extrabold text-stone-950">Available filters</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-sm font-bold text-stone-600">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <span key={category} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-stone-700 shadow-sm">
                        {CATEGORY_LABELS[category]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-bold text-stone-600">Tones</p>
                  <div className="flex flex-wrap gap-2">
                    {TONES.map((tone) => (
                      <span key={tone} className="rounded-full bg-stone-950 px-3 py-1 text-sm font-semibold text-amber-100 shadow-sm">
                        {TONE_LABELS[tone]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
