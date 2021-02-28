import Post from "@/domain-objects/post";

export default class Comment extends Post{
  constructor(id, postID, content, voteCount, creationDate) {
    super(id, content, voteCount, creationDate);
    this.postID = postID;
  }
}