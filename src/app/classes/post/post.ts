import { Comment } from '../comment/comment';

export class Post {
    key: string
    content: string;
    timestamp: number;
    comments: Comment[];
    likes: number;
}
