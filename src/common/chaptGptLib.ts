import { Convo } from "../conversations";
import ChatServerResponse from "./ChatServerResponse";

const HOST_ENDPOINT = process.env.REACT_APP_CHAT_SERVER_PROTOCOL + "://" + process.env.REACT_APP_CHAT_SERVER_HOST + ":" + process.env.REACT_APP_CHAT_SERVER_PORT;
const POST_ASK_ENDPOINT = HOST_ENDPOINT + "/message";
const GET_CONVO_ENDPOINT = HOST_ENDPOINT + "/conversation/";
const GET_ALLCONVOS_ENDPOINT = HOST_ENDPOINT + "/conversations";
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

const getAllConversations = async () => {
    try {
        console.log(`calling chat server @ ${GET_ALLCONVOS_ENDPOINT}`);
        const response = await fetch(GET_ALLCONVOS_ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        const allConvos = await response.json() as Convo[];
        return allConvos;
    } catch(e) {
        console.log(e);
        let errResult = (e as Error).message || (e as string) || "error";
        return errResult;
    }
}

export { askChat, getConvoMessages, getAllConversations }
