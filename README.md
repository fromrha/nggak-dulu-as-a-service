# Nggak Dulu as a Service

Tiny Indonesian API and web app for generating rejection sentences across different contexts and tones.

Use it when you need to say **nggak dulu** without making things awkward.

## Features

- Landing page with generator UI
- Category and tone filters
- Copy-to-clipboard result
- Public API endpoint
- Local JSON dataset, no database
- Open-source friendly Next.js structure

## API Usage

### Endpoint

```http
GET /api/no
```

### Query Parameters

| Parameter | Required | Example | Description |
|---|---:|---|---|
| `category` | No | `kampus` | Filter by context/category |
| `tone` | No | `sopan` | Filter by tone |

### Example Requests

```bash
curl http://localhost:3000/api/no
curl http://localhost:3000/api/no?category=kampus
curl "http://localhost:3000/api/no?category=corporate&tone=sopan"
```

### Example Response

```json
{
  "id": "general-sopan-001",
  "text": "Makasih sudah ngajak, tapi untuk sekarang aku nggak bisa ikut dulu.",
  "category": "general",
  "tone": "sopan"
}
```

### Error Response

```json
{
  "error": "No matching reason found."
}
```

## Available Categories

- `general`
- `corporate`
- `kampus`
- `teman`
- `freelance`

## Available Tones

- `sopan`
- `witty`
- `dingin`
- `lucu`
- `tegas`

## Local Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Self-hosting

Deploy to Vercel or any platform that supports Next.js App Router.

```bash
npm run build
npm run start
```

## Project Structure

```txt
src/
├── app/
│   ├── api/no/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ApiDocs.tsx
│   ├── Footer.tsx
│   ├── Generator.tsx
│   └── Hero.tsx
├── data/reasons.json
└── lib/
    ├── getRandomReason.ts
    └── types.ts
```

## Contributing

PRs welcome. Add new lines to `src/data/reasons.json` using existing category and tone values.

## License

MIT recommended. Add a `LICENSE` file before first public release if needed.

## Sponsor

Sponsor placeholder. If this becomes useful, caffeine funding may appear here.
