// data/products.ts
// This is the static data layer. In a real project you'd fetch this from
// a CMS (Contentful, Sanity) or a database. The shape is the same — just
// swap the array for an async fetch() call and everything else stays put.

export interface AudioDemo {
  title: string
  file: string // filename inside /public/audio/
  bpm?: number
}

export interface Product {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  longDescription: string
  images: string[] // filenames inside /public/images/
  audioDemos: AudioDemo[]
  downloadUrl: string
  version: string
  releaseDate: string
  format: string[]         // e.g. ['VST3', 'AU', 'AAX']
  os: string[]
  requirements: string[]
  features: string[]
  free: boolean
}

export const products: Product[] = [
  {
    slug: 'polytec-drum-machine',
    name: 'Polytec Drum Machine',
    tagline: 'Analog warmth. Digital guts. For free.',
    // tagline: 'FREE Windows beta available now. macOS version coming soon!',
    shortDescription:
      'A VST sample-based drum machine built around real analog hardware samples. Punchy, warm, and alive!',
    longDescription: `
Polytec Drum Machine started as a small idea — to have the sound and feel of analog 
drum machines in a software format.

The result is a 8-channel sample-based instrument built around recordings of actual hardware. 
But it’s not just a static sample player — the sounds are modulated with carefully designed controls that make it feel alive, responsive and versatile as possible.

Source code available on GitHub - https://github.com/olegcontactbox/polytec-drums
    `.trim(),
    images: [
      '/images/pdm-overview.png',
      // '/images/pdm-sequencer.jpg',
      // '/images/pdm-channels.jpg',
    ],
    audioDemos: [
      { title: 'Electro-bass (kick, snares, hats only)', file: `polytecDrumsDemo01BasicsOnly.wav`, bpm: 128 },
      { title: `Raku's 4x4 long kicks groove`, file: `polytecDrumsDemo02Raku'sGroove.wav`, bpm: 128 },

      // { title: 'Half-time groove', file: 'demo-halftime.mp3', bpm: 88 },
      // { title: 'Jungle break — 95% probability', file: 'demo-jungle.mp3', bpm: 170 },
    ],
    downloadUrl: 'https://github.com/olegcontactbox/polytec-drums/releases/tag/polytec-drums-release',
    version: '0.1.0-beta',
    releaseDate: '2026-03-01',
    format: ['VST3', 'AU'],
    os: [
      'Windows',
      'macOS'
    ],
    requirements: [
      'VST3 (Windows) or AU (macOS) compatible host (Ableton, Reaper, Logic, FL Studio…)',
      // 'Windows 10 / macOS 11 or later',
      // 'Windows 10 or later',
      '64-bit only',
      '4 GB RAM minimum, 8 GB recommended',
      '300 MB disk space',
    ],
    features: [
      '8 independent sample channels — kick, snares, hats, percs and more coming in future updates!',
      'Per-channel controls for tuning, decay, drift, and more',
      'Handy master effects — drive, shape and dust for that extra bit of grit and character',
      // '16-to-64 step sequencer with per-step velocity and probability',
      // 'Swing and shuffle with continuous range from tight to broken',
      // 'Pattern chaining and song mode',
      // 'Sample import — load your own into any channel',
      'Fully Controlled by MIDI — trigger from your DAW',
      'Full automation support for all parameters',
      'Lightweight CPU footprint — runs quietly in the background',
    ],
    free: true,
  },
  //   {
  //     slug: 'polytec-drum-machine',
  //     name: 'Polytec Drum Machine (FREE)',
  //     tagline: 'Analog warmth. Digital guts. For free.',
  //     shortDescription:
  //       'A VST sample-based drum machine built around real analog hardware samples. Punchy, warm, and alive!',
  //     longDescription: `
  // Polytec Drum Machine started as a small idea — to have the sound and feel of analog 
  // drum machines in a software format.

  // The result is a 10-channel sample-based instrument built around recordings of actual hardware. 
  // But it’s not just a static sample player — the sounds are modulated with carefully designed controls that make it feel alive, responsive and versatile as possible.
  //     `.trim(),
  //     images: [
  //       '/images/pdm-overview.jpg',
  //       '/images/pdm-sequencer.jpg',
  //       '/images/pdm-channels.jpg',
  //     ],
  //     audioDemos: [
  //       { title: 'Straight 4/4 — full kit', file: 'demo-straight.mp3', bpm: 124 },
  //       { title: 'Half-time groove', file: 'demo-halftime.mp3', bpm: 88 },
  //       { title: 'Jungle break — 95% probability', file: 'demo-jungle.mp3', bpm: 170 },
  //     ],
  //     downloadUrl: '#', // swap for real link when ready
  //     version: '1.0.2',
  //     releaseDate: '2024-11-01',
  //     format: ['VST3', 'AU'],
  //     os: ['Windows 10+', 'macOS 11+'],
  //     requirements: [
  //       'VST3 or AU compatible host (Ableton, Reaper, Logic, FL Studio…)',
  //       'Windows 10 / macOS 11 or later',
  //       '64-bit only',
  //       '4 GB RAM minimum, 8 GB recommended',
  //       '300 MB disk space',
  //     ],
  //     features: [
  //       '10 independent sample channels — kick, snare, clap, hats, toms, perc',
  //       'Per-channel controls for tuning, decay, drive, and more',
  //       // '16-to-64 step sequencer with per-step velocity and probability',
  //       // 'Swing and shuffle with continuous range from tight to broken',
  //       // 'Pattern chaining and song mode',
  //       // 'Sample import — load your own into any channel',
  //       'Fully Controlled by MIDI — trigger from your DAW',
  //       'Full automation support for all parameters',
  //       'Lightweight CPU footprint — runs quietly in the background',
  //     ],
  //     free: true,
  //   },
]

// Helper used in generateStaticParams and page fetches
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Returns all slugs — used by generateStaticParams for SSG
export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug)
}
