import Message from "./Message";
import sortMessages from "../models/ConversationSorting";
import { Col, Row } from "react-bootstrap";
import Msg from '../models/Msg';
import { useDeferredValue } from "react";
import Conversation from "./Conversation";

function ConversationList(props: {conversations: Msg[][]})
{ 
    const {conversations} = props;
    const deferredConvos = useDeferredValue(conversations);
    return (
        <Row>
            {
                conversations.map((convo, index, array) => {
                    return convo.length > 1 ? (<Conversation key={index} convoId={convo[1].conversationId ?? 'n/a'} messages={convo} opacity={1}></Conversation>) : (<></>)
                })
            }
        </Row>
    )
}

export default ConversationList;