import { Col, Row } from "react-bootstrap";
import { Msg, sortMessages } from "../common";
import Message from "./Message";

function MessageList(props: {messages: Msg[]})
{ 
    const {messages} = props;
    const sortedMessages = sortMessages(messages);

    return (
        <Row>
            {sortedMessages?.map( (msg, index, array) => {
                return  <Row key={index.toString()}>
                            <Col sm="12">
                                <Message msg={msg} opacity={index < 1 ? 1 : index < 3 ? 0.75 : index < 7 ? 0.5 : 0.35} />
                            </Col>
                        </Row>
            })}
        </Row>
    )
}

export default MessageList;