export class CreateBlogDto {
    title: string;
    author: string;
    content: string;
}

export class UpdateBlogDto {
    title?: string;
    author?: string;
    content?: string;
}
