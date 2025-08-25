export const API_ENDPOINTS = {
  posts: {
    create: "/api/posts",
    getAll: "/api/posts",
    getById: (id: string | number) => `/api/posts/${id}`,
    update: (id: string | number) => `/api/posts/${id}`,
    delete: (id: string | number) => `/api/posts/${id}`,
    analyze: (id: string | number) => `/api/posts/${id}/analyze`,
  },
  originality: {
    check: "/api/originality/check",
    report: (id: string | number) => `/api/originality/report/${id}`,
  },
  blockchain: {
    submit: (id: string | number) => `/api/blockchain/submit/${id}`,
    process: (id: string | number) => `/api/blockchain/process-ipfs/${id}`,
  },
  user: {
    profile: "/api/user/profile",
    posts: "/api/user/posts",
    analytics: "/api/user/analytics",
  },
} as const;
