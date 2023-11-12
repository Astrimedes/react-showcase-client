import { Accordion, Stack } from 'react-bootstrap';
import { Msg, sortMessages } from '../common';
import Highlighter from "react-highlight-words";
import StyleClassNames from '../styling';

function Conversation(props: {convoId: string, messages: Msg[], opacity: number, searchText: string})
{ 
    const {messages, convoId, opacity, searchText} = props;

    const sortedMessages = sortMessages(messages, false);
    const bodyElements = sortedMessages.map(msg => {
    return (
      <p style={{opacity: opacity}} key={msg.id} className={StyleClassNames.smallText}>
        {msg.role} said:<br/>
        <Highlighter
          highlightClassName={StyleClassNames.highlight}
          searchWords={[searchText]}
          autoEscape={false}
          textToHighlight={msg.message}
        />
      </p>
    )});

    const characterLimit = 120;
    const convoTitle = sortedMessages[0].message.length < characterLimit ? sortedMessages[0].message : sortedMessages[0].message.slice(0, characterLimit) + "...";
    
    return (
      <Accordion.Item eventKey={convoId} style={{opacity: opacity}}>
        <Accordion.Header>
          <Stack direction='vertical'>
            <div><h6 className={StyleClassNames.textPrimary}> 
            <Highlighter
              highlightClassName={StyleClassNames.highlight}
              searchWords={[searchText]}
              autoEscape={false}
              textToHighlight={convoTitle}
              />
            </h6></div>
            <div><h6 className={StyleClassNames.smallText}>ID: {convoId}</h6></div>
          </Stack>
        </Accordion.Header>
        <Accordion.Body>{bodyElements}</Accordion.Body>
      </Accordion.Item>
    );
}

export default Conversation;