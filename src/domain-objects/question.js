import Post from "@/domain-objects/post";

export default class Question extends Post{
  constructor(id, header, content, voteCount, creationDate, comments) {
    super(id, content, voteCount, creationDate);
    this.header = header;
    this.comments = comments;
  }
}