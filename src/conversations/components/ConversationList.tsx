import { Accordion, Row } from "react-bootstrap";
import { Fragment } from "react";
import Conversation from "./Conversation";
import Convo from "../models/Convo";

const createConvoElements = (conversations: Convo[] | undefined) => {
    return conversations?.map((convo, index, array) => {
        return convo?.messages?.length > 1 ? 
            (<Conversation key={index} convoId={convo?.id ?? 'no-id'} messages={convo.messages} opacity={1}></Conversation>) :
            (<Fragment key={index}></Fragment>)
    })
}

const ConversationList = (props: {conversations: Convo[] | undefined}) =>
{ 
    const {conversations} = props;
    return (
        <Row>
            <Accordion>
                {createConvoElements(conversations)}
            </Accordion>
        </Row>
    )
};

export default ConversationList;