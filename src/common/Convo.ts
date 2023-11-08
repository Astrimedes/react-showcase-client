import Msg from "./Msg";

class Convo {
    id: string = "";
    messages: Msg[] = [];

    constructor(id: string, messages: Msg[]) {
      this.id = id;
      this.messages = messages;
    }
  }

  export default Convo;