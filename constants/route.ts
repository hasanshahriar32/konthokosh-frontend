export const paths = {
  home: "/",
  auth: "/auth",
  feed: "/feed",
  write: "/feed/new",
  "my-post": "/feed/me",
};

export const pathTitles = {
  home: "প্রচ্ছদ",
  auth: "নিবন্ধন",
  feed: "ফিড",
  write: "লিখুন",
  "my-post": "আমার পোস্ট",
};

export const routes = {
  home: {
    path: paths.home,
    title: pathTitles.home,
  },
  auth: {
    path: paths.auth,
    title: pathTitles.auth,
  },
  feed: {
    path: paths.feed,
    title: pathTitles.feed,
  },
  write: {
    path: paths.write,
    title: pathTitles.write,
  },
  "my-post": {
    path: paths["my-post"],
    title: pathTitles["my-post"],
  },
};
