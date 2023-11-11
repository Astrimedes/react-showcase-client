import { Accordion, Row } from "react-bootstrap";
import { Fragment } from "react";
import Conversation from "./Conversation";
import { Convo } from "../common";

const createConvoElements = (conversations: Convo[] | undefined, searchText: string) => {
    return conversations?.map((convo, index, array) => {
        return convo?.messages?.length > 1 ? 
            (<Conversation key={index} convoId={convo?.id ?? 'no-id'} messages={convo.messages} opacity={1} searchText={searchText}></Conversation>) :
            (<Fragment key={index}></Fragment>)
    })
}

const ConversationList = (props: {conversations: Convo[] | undefined, searchText: string}) =>
{ 
    const {conversations, searchText} = props;

    return (
        <Row>
            <Accordion>
                {createConvoElements(conversations, searchText)}
            </Accordion>
        </Row>
    )
};

export default ConversationList;