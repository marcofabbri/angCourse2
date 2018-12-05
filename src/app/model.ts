export class Author {
    public name: string;
    public email: string;
    public date: Date;
}

export class RealCommit {
    public author: Author;
    public comment_count: number;
    public message: string;
}

export class Commit {
    public sha: string;
    public node_id: string;
    public commit: RealCommit;
}

export class User {
    public id: number;
    public first_name: string;
    public last_name: string;
    public avatar: string;
}

export class UsersPage {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}
