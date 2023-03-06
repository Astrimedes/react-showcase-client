import Message from "./Message";
import sortMessages from "../models/ConversationSorting";
import { Col, Row } from "react-bootstrap";
import Msg from '../models/Msg';
import { Fragment, useDeferredValue } from "react";
import Conversation from "./Conversation";
import Convo from "../models/Convo";

function ConversationList(props: {conversations: Convo[]})
{ 
    const {conversations} = props;
    const deferredConvos = useDeferredValue(conversations);
    return (
        <Row>
            {
                conversations.map((convo, index, array) => {
                    return convo?.messages?.length > 1 ? (<Conversation key={index} convoId={convo?.id ?? 'n/a'} messages={convo.messages} opacity={1}></Conversation>) : (<Fragment key="empty"></Fragment>)
                })
            }
        </Row>
    )
}

export default ConversationList;