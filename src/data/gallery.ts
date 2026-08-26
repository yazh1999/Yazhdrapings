import type { GalleryItem } from "@/types";

/**
 * ⚠️ EMPTY — content gate B1. The photography does not exist yet.
 *
 * The grid, the filters and the lightbox are all built and will render the
 * moment entries are added here. Do not seed this with stock or generated
 * imagery: docs/01-brief.md rules it out, and a gallery is a direct claim about
 * work this business has actually done.
 *
 * Per entry:
 *   src        /assets/gallery/<file>.webp — the file must exist
 *   alt        required, describes fabric AND work done. Pattern:
 *              "Deep green Kanjivaram silk saree, nine hand-set pleats,
 *               pressed and folded."
 *   width      real pixel dimensions, or the layout shifts (CLS budget 0.05)
 *   height
 */
export const gallery: GalleryItem[] = [];

export const galleryCategories = [
  { value: "all", label: "All" },
  { value: "silk", label: "Silk" },
  { value: "cotton", label: "Cotton" },
  { value: "georgette", label: "Georgette & chiffon" },
  { value: "bridal", label: "Bridal" },
  { value: "kuchu", label: "Kuchu" },
] as const;
