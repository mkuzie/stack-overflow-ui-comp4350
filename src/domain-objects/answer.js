import Post from "@/domain-objects/post";

export default class Answer extends Post{
  constructor(id, content, voteCount, creationDate, comments) {
    super(id, content, voteCount, creationDate);
    this.comments = comments;
  }
}