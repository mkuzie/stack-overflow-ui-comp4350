export default class Question {
  constructor(header, content, voteCount, creationDate) {
    this.header = header;
    this.content = content;
    this.voteCount = voteCount;
    this.creationDate = creationDate;
  }
}