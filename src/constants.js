export const ACCESS_TOKEN_KEY = "access_token";

export const AVAILABLE_CATEGORIES = [
  { label: "Good Reading", key: "good-reading", colorCode: "#ffe294" },
  { label: "Work Stuff", key: "work-stuff", colorCode: "#b2ff94" },
  { label: "Entertainment", key: "entertainment", colorCode: "#e6a8a8" },
];

export const DEFAULT_SELECT_INPUT_VALUE = "-";

export const DUMMY_BOOKMARK_DATA = [
  {
    id: "book1",
    title: "Binding Inline Styles",
    category: "good-reading",
    url: "https://vuejs.org/v2/guide/class-and-style.html",
  },
  {
    id: "book2",
    title: "Bookmark 2",
    category: "work-stuff",
    url: "https://google.com",
  },
  {
    id: "book3",
    title: "Bookmark 3",
    category: "entertainment",
    url: "https://google.com",
  },
];

export const REFRESH_TOKEN_KEY = "refresh_token";

export const TOKEN_EXPIRED_ERROR_MESSAGE = "TokenExpiredError";
