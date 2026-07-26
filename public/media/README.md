# Media Library

Drop images here and reference them in the Google Sheet (or config) using a
**root-relative path** — e.g. a file at `public/media/sponsors/velocity.png`
is referenced in the sheet's **Logo URL** column as:

```
/media/sponsors/velocity.png
```

You can also paste **full external URLs** (e.g. a hosted CDN link) into any
image column — both work.

## Folders

| Folder | Use for |
|--------|---------|
| `event/` | Hero, gallery, venue and general event photos |
| `exhibitors/` | Exhibitor / client logos (Clients & Featured grids) |
| `partners/` | Government, association, institute & NGO logos |
| `sponsors/` | Sponsor & title-partner logos (marquee + partner tiers) |
| `testimonials/` | Head-shots for testimonial authors |
| `icons/` | Custom icons/illustrations for content blocks |

## Tips
- **Logos:** prefer transparent **PNG** or **SVG**, ~240px tall, trimmed of
  extra whitespace. They are auto-fitted (`object-contain`) into cards.
- **Photos:** landscape **JPG**, ~1600px wide, compressed.
- **Head-shots:** square **JPG/PNG**, ~400×400px (shown as a circle).
- Keep filenames lowercase with hyphens: `aether-ev.png`, not `Aether EV.PNG`.
- If an image column is left **empty**, the site automatically falls back to a
  styled monogram/initials — nothing breaks.
