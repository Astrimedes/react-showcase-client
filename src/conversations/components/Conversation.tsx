import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import sortMessages from '../models/ConversationSorting';
import Msg from '../models/Msg';

function Conversation(props: {convoId: string, messages: Msg[], opacity: number})
{ 
    const {messages, convoId, opacity} = props;

    const sortedMessages = sortMessages(messages, false);
    const messageParts = sortedMessages.slice(0, 4).map(msg => {
    return (
      <Card.Text key={msg.id} className='smallText'>
        {msg.role} said:<br/>{msg.message}
      </Card.Text>
    )});
    
    return (
      <Card style={{opacity: opacity}}>
        <Card.Body>
          <Card.Title><div>{`${convoId} : ${sortedMessages[0].message.slice(0, 120)}`}</div></Card.Title>
          {messageParts}
        </Card.Body>
      </Card>
    );
}

export default Conversation;