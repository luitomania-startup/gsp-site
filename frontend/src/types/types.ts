export type DocsList = Array<{ name: string; url: string }>;

export interface IMember {
  id?: string;
  constituency?: string;
  candidateName?: string;
  phone?: string;
  symbol?: string;
  photo?: string;
}
export interface IMemberEdit {
  id: string;
  constituency?: string;
  candidateName?: string;
  phone?: string;
  symbol?: string;
  photo?: string;
}

export interface IFeed {
  id?: string;
  title?: string;
  subtext?: string;
  description?: string;
  imageUrl?: string;
  readmore?: string;
  blurHash?: string;
}

export interface IFeedEdit {
  id: string;
  title?: string;
  subtext?: string;
  description?: string;
  imageUrl?: string;
  readmore?: string;
}

export interface Image {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
}

export interface Post {
  _id?: string;
  title: string;
  description: string;
  postImageUrl: string;
  postImagePublicId: string;
  dateCreated?: string;
}

export interface Video {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  videoPublicId: string;
}

export interface AboutUs {
  _id?: string;
  aboutUsImageUrl: string;
  aboutUsImagePublicId: string;
  description: string;
}

export interface DeleteParam {
  _id: string;
}

export type MembershipForm = any;
export type MembershipSubmission = Object;