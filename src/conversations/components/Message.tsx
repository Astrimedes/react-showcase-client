import Card from 'react-bootstrap/Card';
import Msg from '../models/Msg';

function Message(props: {msg: Msg, opacity: number})
{ 
    const {msg, opacity} = props;
    return (
      <Card style={{opacity: opacity}}>
        <Card.Body>
          <Card.Title><div>{msg.role} says...</div></Card.Title>
          <Card.Text>
            {msg.message}
          </Card.Text>
        </Card.Body>
      </Card>
    );
}

export default Message;