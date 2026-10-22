#!/usr/bin/env python3
"""Regenerate lib/pages.ts from scripts/pseo-glass-canada.xlsx."""

from __future__ import annotations

import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "scripts" / "pseo-glass-canada.xlsx"
OUT = ROOT / "lib" / "pages.ts"
PILLAR = "emergency-glass-repair"

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def col_index(letters: str) -> int:
    n = 0
    for c in letters:
        n = n * 26 + (ord(c) - 64)
    return n


def load_strings(z: zipfile.ZipFile) -> list[str]:
    root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    out: list[str] = []
    for si in root.findall(".//m:si", NS):
        t = si.find("m:t", NS)
        if t is not None and t.text:
            out.append(t.text)
            continue
        parts: list[str] = []
        for r in si.findall("m:r", NS):
            tt = r.find("m:t", NS)
            parts.append(tt.text if tt is not None and tt.text else "")
        out.append("".join(parts))
    return out


def parse_rows() -> list[dict]:
    with zipfile.ZipFile(XLSX) as z:
        strings = load_strings(z)
        root = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
        pages: list[dict] = []
        for row in root.findall(".//m:sheetData/m:row", NS)[1:]:
            cells: dict[int, str] = {}
            for c in row.findall("m:c", NS):
                ref = c.get("r", "")
                m = re.match(r"([A-Z]+)", ref)
                if not m:
                    continue
                t = c.get("t")
                v = c.find("m:v", NS)
                if v is None or v.text is None:
                    continue
                val = v.text
                if t == "s":
                    val = strings[int(val)]
                cells[col_index(m.group(1))] = val

            slug_raw = cells.get(3, "")
            if not slug_raw or not str(slug_raw).startswith("/"):
                continue

            slug = str(slug_raw).strip("/")
            area = cells.get(6, "") or ""
            vol = float(cells.get(9, 0) or 0)
            priority = cells.get(12, "") or ""
            if not priority:
                if slug == PILLAR or vol >= 200:
                    priority = "Top Priority"
                elif vol >= 80:
                    priority = "High"
                else:
                    priority = "Medium"

            kind = "national" if "National" in area else "city"
            pages.append(
                {
                    "id": int(float(cells.get(1, len(pages) + 1))),
                    "title": cells.get(2, ""),
                    "slug": slug,
                    "keyword": cells.get(4, ""),
                    "secondary": cells.get(5, "") or "",
                    "area": area,
                    "priority": priority,
                    "kind": kind,
                    "vol": vol,
                }
            )
    return pages


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def emit(pages: list[dict]) -> None:
    lines = [
        'export type PageKind = "national" | "city";',
        "",
        'export type SeoPage = {',
        "  id: number;",
        "  title: string;",
        "  slug: string;",
        "  keyword: string;",
        "  secondary: string[];",
        "  area: string;",
        '  priority: "Top Priority" | "High" | "Medium";',
        "  kind: PageKind;",
        "  volume?: number;",
        "};",
        "",
        "const row = (",
        "  id: number, title: string, slug: string, keyword: string, secondary: string,",
        '  area = "Canada", priority: SeoPage["priority"] = "Medium", kind: PageKind = "city", volume?: number,',
        "): SeoPage => ({",
        "  id, title, slug, keyword,",
        "  secondary: secondary ? secondary.split(\"|\").map((s) => s.trim()).filter(Boolean) : [],",
        "  area, priority, kind, volume,",
        "});",
        "",
        f'export const PILLAR_SLUG = "{PILLAR}";',
        "",
        "export const PAGES: SeoPage[] = [",
    ]
    for p in pages:
        sec = esc(p["secondary"])
        vol = f", {p['vol']:g}" if p.get("vol") else ""
        lines.append(
            f'  row({p["id"]}, "{esc(p["title"])}", "{esc(p["slug"])}", "{esc(p["keyword"])}", '
            f'"{sec}", "{esc(p["area"])}", "{p["priority"]}", "{p["kind"]}"{vol}),'
        )
    lines += [
        "];",
        "",
        'export const NATIONAL_PAGES = PAGES.filter((p) => p.kind === "national");',
        'export const CITY_PAGES = PAGES.filter((p) => p.kind === "city");',
        "",
        'const PHONE_DISPLAY_DEFAULT = "1-888-XXX-XXXX";',
        'const PHONE_E164_DEFAULT = "+1888XXXXXXX";',
        "",
        "function isPlaceholderPhone(value?: string) {",
        '  return !value || /x{2,}/i.test(value) || value.includes("XXX");',
        "}",
        "",
        "export const PHONE_DISPLAY = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_DISPLAY)",
        "  ? PHONE_DISPLAY_DEFAULT : process.env.NEXT_PUBLIC_PHONE_DISPLAY!;",
        "export const PHONE_E164 = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_E164)",
        "  ? PHONE_E164_DEFAULT : process.env.NEXT_PUBLIC_PHONE_E164!;",
        'export const SITE_NAME = "Emergency Glass Repair Canada";',
        "",
        "export function getPage(slug: string) { return PAGES.find((p) => p.slug === slug); }",
        "export function cleanTitle(title: string) { return title.split(\"|\")[0].trim(); }",
        "",
        "export function locationName(page: SeoPage) {",
        '  if (page.area.startsWith("Canada")) return "Canada";',
        '  return page.area.split(",")[0].trim();',
        "}",
        "",
        'export function serviceBaseSlug(slug: string) {',
        '  if (slug.startsWith("emergency-glass-repair-")) return "emergency-glass-repair";',
        "  return slug;",
        "}",
        "",
        "export function absoluteUrl(path = \"\") {",
        '  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://emergencyglassrepair.com";',
        '  return `${root.replace(/\\/$/, "")}/${path.replace(/^\\//, "")}`;',
        "}",
    ]
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {len(pages)} pages to {OUT}")


if __name__ == "__main__":
    emit(parse_rows())
