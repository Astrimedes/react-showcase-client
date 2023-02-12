import Msg from "./conversations/models/Msg";

const serverEndpoint = process.env.REACT_APP_CHAT_SERVER_PROTOCOL + "://" + process.env.REACT_APP_CHAT_SERVER_HOST + ":" + process.env.REACT_APP_CHAT_SERVER_PORT + "/conversation";
console.log("using server endpoint " + serverEndpoint);

class ChatRequest {
    message: string;
    conversationId: string | undefined;
    parentMessageId: string | undefined;

    constructor(msg: string, convoId?: string, parentMsgId?: string)
    {
        this.message = msg;
        this.conversationId = convoId;
        this.parentMessageId = parentMsgId;
    }
}

const askChat = async (msg: string, conversationId?: string, parentId?: string) => {
    console.log(`calling chat server @ ${serverEndpoint}`);
    const response = await fetch(serverEndpoint, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(new ChatRequest(msg, conversationId, parentId)),
        });

    const messageAnswer = await response.json() as Msg;
    return messageAnswer;
}

export { askChat }
