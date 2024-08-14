import { Fragrance } from "../types";

  
  export interface AddEditFragranceProps {
    initialFragrance?: Fragrance;
    onCompleted?: () => void;
    closeModal: () => void;
  }