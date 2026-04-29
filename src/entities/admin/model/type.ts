export interface UserRequest {
  pagePath: string;
  screenPageViews: string;
  activeUsers: string;
  newUsers: string;
  date: string;
}

export interface MessagesTypes {
  id: string;
  name: string;
  phone: string;
  message: string;
  read: boolean;
}
