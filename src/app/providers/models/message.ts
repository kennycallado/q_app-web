export type MessageData = {
  type:     string;
  content:  string[];
  path?:    string;
}

export class Message {
  id:     number;
  title:  string;
  body:   string;
  data:   MessageData;
  read:   boolean;

  constructor() {
    this.id   = 0
    this.read = false
  }

  new(new_message: {title: string, body: string, data: MessageData}): Message {
    this.title = new_message.title
    this.body  = new_message.body
    this.data  = new_message.data

    return this
  }

  toggleRead(): void {
    this.read = !this.read;
  }
}
