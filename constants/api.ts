const API_PREFIX = "/api/v1";

export const API_ENDPOINTS = {
  posts: {
    create: `${API_PREFIX}/posts`,
    getAll: `${API_PREFIX}/posts`,
    getById: (id: string | number) => `${API_PREFIX}/posts/${id}`,
    update: (id: string | number) => `${API_PREFIX}/posts/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/posts/${id}`,
    analyze: (id: string | number) => `${API_PREFIX}/posts/${id}/analyze`,
    summary: (id: string | number) => `${API_PREFIX}/posts/summary/${id}`,
    explain: (id: string | number) => `${API_PREFIX}/posts/explain/${id}`,
  },
  originality: {
    check: `${API_PREFIX}/originality/check`,
    report: (id: string | number) => `${API_PREFIX}/originality/report/${id}`,
  },
  blockchain: {
    submit: (id: string | number) => `${API_PREFIX}/blockchain/submit/${id}`,
    process: (id: string | number) =>
      `${API_PREFIX}/blockchain/process-ipfs/${id}`,
  },
  user: {
    profile: `${API_PREFIX}/user/profile`,
    posts: `${API_PREFIX}/user/posts`,
    analytics: `${API_PREFIX}/user/analytics`,
  },
  comments: {
    create: `${API_PREFIX}/comments`,
    getAll: `${API_PREFIX}/comments`,
    getById: (id: string | number) => `${API_PREFIX}/comments/${id}`,
    update: (id: string | number) => `${API_PREFIX}/comments/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/comments/${id}`,
    forPost: (postId: string | number) => `${API_PREFIX}/posts/${postId}/comments`,
    replies: (id: string | number) => `${API_PREFIX}/comments/${id}/replies`,
  },
} as const;
