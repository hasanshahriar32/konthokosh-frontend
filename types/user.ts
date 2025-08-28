export type UserSummary = {
  id: number;
  username: string;
  profileImageUrl?: string;
  firstName?: string;
  lastName?: string;
};

export type UserFeed = Omit<UserSummary, "profileImageUrl"> & {
  imageUrl: string;
};
