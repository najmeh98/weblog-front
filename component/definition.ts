import { DropdownItem } from "./CustomDropdown";

export const Category: DropdownItem[] = [
  { id: "other", label: "دیگر" },
  { id: "Academic", label: "علمی" },
  { id: "News", label: "خبری" },
  { id: "fun", label: "سرگرمی " },
  { id: "Personal", label: "شخصی" },
];
// export const Category: DropdownItem[] = [
//   "دیگر",
//   "علمی",
//   " خبری",
//   "سرگرمی",
//   "شخصی",
// ];
// type itemsType = {
//   label: string;
//   value: string;
// };
// const Category: string[] = ["دیگر", "علمی", "خبری", "سرگرمی ", "شخصی"];

export interface Post {
  // id?: string;
  title: string;
  content: string;
  // category: typeof Category;
  file: any;
}
