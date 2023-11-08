import { Accordion, Stack } from 'react-bootstrap';
import { Msg, sortMessages } from '../common';

function Conversation(props: {convoId: string, messages: Msg[], opacity: number})
{ 
    const {messages, convoId, opacity} = props;

    const sortedMessages = sortMessages(messages, false);
    const bodyElements = sortedMessages.map(msg => {
    return (
      <p style={{opacity: opacity}} key={msg.id} className='smallText'>
        {msg.role} said:<br/>{msg.message}
      </p>
    )});
    
    return (
      <Accordion.Item eventKey={convoId} style={{opacity: opacity}}>
        <Accordion.Header>
          <Stack direction='vertical'>
            <div><h5 className='text-primary'>{sortedMessages[0].message.slice(0, 120)}</h5></div>
            <div><h6 className='text-secondary'>ID: {convoId}</h6></div>
          </Stack>
        </Accordion.Header>
        <Accordion.Body>{bodyElements}</Accordion.Body>
      </Accordion.Item>
    );
}

export default Conversation;