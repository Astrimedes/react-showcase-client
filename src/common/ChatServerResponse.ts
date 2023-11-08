import Msg from "./Msg";

interface ChatServerResponse
{
    prompt: Msg;
    reply: Msg;
}

export default ChatServerResponse;