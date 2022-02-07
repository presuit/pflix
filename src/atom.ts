import { atom } from "recoil";
import { IMediaDetailProps } from "./api";

interface ISelectedMedia {
  id: string;
  category: "movie" | "tv";
}

export const selectedMedia = atom<ISelectedMedia | null>({
  key: "selectedMedia",
  default: null,
});
