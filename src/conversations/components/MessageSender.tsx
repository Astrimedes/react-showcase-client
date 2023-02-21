import Button from 'react-bootstrap/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';
import { RefObject, SetStateAction, useRef, useState } from 'react';
import { askChat } from '../../chaptGptLib';
import Msg from '../models/Msg';

function MessageSender(props: {convoId: string, setConvoId: (newConvoId: string) => void, messageList: Msg[], setMessagesList: (msgs: Msg[]) => void}) {
  const {convoId, setConvoId, messageList, setMessagesList} = props;

  const [isEditable, setIsEditable] = useState(true);
  const questionInput = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState('');
  const [isValidPrompt, setIsValidPrompt] = useState(false);
  

  const handleQuestionChange = (event: { target: { value: any; }; }) => {
    const textValue = event.target.value;
    setIsValidPrompt(() => textValue.length > 4);
    if (isValidPrompt)
    {
      setQuestion(textValue);
    }
  };

  const askChatNow = () => {
    if (!isValidPrompt) return;
  
    // clear answer with temp value
    // setAnswer('Waiting for answer...');
    setIsEditable(false);
    console.log("asking chatGpt: " + question);
  
    // create user prompt message...
    let userMsg = new Msg({role: "User", message: question, conversationId: convoId, time: Date.now()});
    let replyMsg: Msg;
  
    askChat(question, convoId)
    .then((r) => {
        // add user and reply messages
        userMsg = r.prompt;
        replyMsg = r.reply;
      })
    .catch(er => {
      console.error(er);
      replyMsg = new Msg({role: "System", message: `Error: ${er}`, conversationId: convoId, time: Date.now()});
    })
    .finally(() => {
      setIsEditable(true);
      // clear question input
      if (questionInput.current != null) questionInput.current.value = "";
      // set new convo id if needed
      if (replyMsg != undefined && replyMsg?.conversationId != convoId)
      {
        setConvoId(replyMsg.conversationId);
      } else {
        setMessagesList([...messageList, userMsg, replyMsg])
      }
    });
  }

  return <Form.Group as={Row} className="mb-2">
    <Form.Label column sm="1">
      Prompt
    </Form.Label>
    <Col sm="10">
      <Form.Control ref={questionInput} id="chatInput" onChange={handleQuestionChange} disabled={!isEditable} placeholder="" />
      <div className="smallPadding"><Button type="button" id="sendButton" onClick={() => askChatNow()} disabled={!isEditable || !isValidPrompt}><Send /> Send</Button></div>
    </Col>
  </Form.Group>;
}

export default MessageSender;

