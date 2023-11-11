import { Accordion, Stack } from 'react-bootstrap';
import { Msg, sortMessages } from '../common';
import Highlighter from "react-highlight-words";

function Conversation(props: {convoId: string, messages: Msg[], opacity: number, searchText: string})
{ 
    const {messages, convoId, opacity, searchText} = props;

    const sortedMessages = sortMessages(messages, false);
    const bodyElements = sortedMessages.map(msg => {
    return (
      <p style={{opacity: opacity}} key={msg.id} className='smallText'>
        {msg.role} said:<br/>
        <Highlighter
          highlightClassName="highlight"
          searchWords={[searchText]}
          autoEscape={false}
          textToHighlight={msg.message}
        />
      </p>
    )});

    const titleText = sortedMessages[0].message.slice(0, 120);
    
    return (
      <Accordion.Item eventKey={convoId} style={{opacity: opacity}}>
        <Accordion.Header>
          <Stack direction='vertical'>
            <div><h5 className='text-primary'> 
            <Highlighter
              highlightClassName="highlight"
              searchWords={[searchText]}
              autoEscape={false}
              textToHighlight={titleText}
              />
            </h5></div>
            <div><h6 className='text-secondary'>ID: {convoId}</h6></div>
          </Stack>
        </Accordion.Header>
        <Accordion.Body>{bodyElements}</Accordion.Body>
      </Accordion.Item>
    );
}

export default Conversation;