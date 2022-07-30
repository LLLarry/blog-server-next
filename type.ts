export interface User {
  id: number;
  username: string;
  createTime: string;
  avatar: string | null;
  email: string | null;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Article {
  comment: number;
  content: string | null;
  createTime: string;
  desc: string | null;
  id: number;
  picture: string | null;
  tags: Tag[];
  title: string;
  updateTime: string
  user: User;
  userId: User['id'];
  viewCount: number;
}

// 标签颜色枚举类
export enum TagColor {
  'cyan' = 1,
  'blue' = 2,
  'geekblue' = 3,
  'purple' = 4
}

export type ParamData = { [key: string]: any }

export type BaseReturnType = {
  code: number;
  message: string;
}

export type Action = {
  type: string | symbol | number;
  payload?: any;
}

export type Layout = "horizontal" | "vertical"

export interface Folder {
  mode: string;
  path: string;
  sha: string;
  size: number;
  type: string;
} 

export interface File {
  download_url?: string;
  fullPath?: string;
  mode: string;
  path: string;
  sha: string;
  size: number;
  type: string;
} 