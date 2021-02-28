export default class Post {
  constructor(id, content, voteCount, creationDate) {
    this.id = id;
    this.content = content;
    this.voteCount = voteCount;
    this.creationDate = creationDate;
  }
}