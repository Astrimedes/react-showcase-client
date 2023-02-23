import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import sortMessages from '../models/ConversationSorting';
import Msg from '../models/Msg';

function Conversation(props: {convoId: string, messages: Msg[], opacity: number})
{ 
    const {messages, convoId, opacity} = props;

    const sortedMessages = sortMessages(messages, false);
    const bodyText = sortedMessages.slice(0, 4).map(msg => `${msg.role} said: \n${msg.message}`).join("\n");
    
    return (
      <Card style={{opacity: opacity}}>
        <Card.Body>
          <Card.Title><div>{`${convoId} : ${sortedMessages[0].message.slice(0, 120)}`}</div></Card.Title>
          <Card.Text className='smallText'>
            <pre>
              {bodyText}
            </pre>
          </Card.Text>
        </Card.Body>
      </Card>
    );
}

export default Conversation;