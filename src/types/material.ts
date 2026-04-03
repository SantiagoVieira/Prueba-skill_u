export type MaterialCategory = "pub" | "bus" | "rec";
export type MaterialFileType = "PDF" | "DOC" | "IMG" | "VID";

export interface Material {
  id:        number;
  title:     string;
  cat:       MaterialCategory;
  type:      MaterialFileType;
  subject:   string;
  uni:       string;
  author:    string;
  date:      string;
  size:      string;
  desc:      string;
  downloads: number;
}

export const CATEGORY_MAP: Record<
  MaterialCategory,
  { label: string; cls: string }
> = {
  pub: { label: "Publicación del material", cls: "badge-pub" },
  bus: { label: "Búsqueda del material",    cls: "badge-bus" },
  rec: { label: "Recursos",                 cls: "badge-rec" },
};

export const TYPE_THUMB_CLS: Record<MaterialFileType, string> = {
  PDF: "thumb-pdf",
  DOC: "thumb-doc",
  IMG: "thumb-img",
  VID: "thumb-vid",
};
