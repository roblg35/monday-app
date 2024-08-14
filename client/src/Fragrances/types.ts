import { Dispatch, SetStateAction } from "react";

export interface Fragrance {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
}
export interface FragranceTableProps {
  deleteFragrance: (v: Object) => void;
  selectedFragrance: Fragrance | undefined;
  setSelectedFragrance: Dispatch<SetStateAction<Fragrance | undefined>>;
  setShow: (v: boolean) => void;
  fragrances: Fragrance[];
}

export interface FragranceModalProps {
  selectedFragrance: Fragrance | undefined;
  setSelectedFragrance: Dispatch<SetStateAction<Fragrance | undefined>>;
  setShow: (v: boolean) => void;
  show: Boolean;
}
