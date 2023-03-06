import ChatServerResponse from "./conversations/models/ChatServerResponse";
import Convo from "./conversations/models/Convo";
import Msg from "./conversations/models/Msg";

const HOST_ENDPOINT = process.env.REACT_APP_CHAT_SERVER_PROTOCOL + "://" + process.env.REACT_APP_CHAT_SERVER_HOST + ":" + process.env.REACT_APP_CHAT_SERVER_PORT;
const POST_ASK_ENDPOINT = HOST_ENDPOINT + "/message";
const GET_CONVO_ENDPOINT = HOST_ENDPOINT + "/conversation/";
console.log("using server endpoint " + HOST_ENDPOINT);

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
    console.log(`calling chat server @ ${POST_ASK_ENDPOINT}`);
    const response = await fetch(POST_ASK_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new ChatRequest(msg, conversationId, parentId)),
    });

    const messageAnswer = await response.json() as ChatServerResponse;
    return messageAnswer;
}

const getConvoMessages = async (conversationId: string) => {
    const convoEndpoint = GET_CONVO_ENDPOINT + conversationId;
    console.log(`calling chat server @ ${convoEndpoint}`);
    const response = await fetch(convoEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });

    const convo = await response.json() as Convo;
    return convo?.messages;
}

export { askChat, getConvoMessages }
