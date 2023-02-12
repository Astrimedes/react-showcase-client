import Convo from "./Convo";
import Msg from "./Msg";

const sortMessages = (messages: Msg[]) => {
    return messages?.map(msg => msg)?.reverse();
}

export default sortMessages;