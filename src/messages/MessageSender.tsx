import Button from 'react-bootstrap/Button';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import { Send, Trash3 } from 'react-bootstrap-icons';
import { useRef, useState } from 'react';
import { Msg, askChat } from '../common';

function MessageSender(props: {convoId: string, setConvoId: (newConvoId: string) => void, messageList: Msg[], setMessagesList: (msgs: Msg[]) => void}) {
  const {convoId, setConvoId, messageList, setMessagesList} = props;

  const [isEditable, setIsEditable] = useState(true);
  const questionInput = useRef<HTMLTextAreaElement>(null);
  const [question, setQuestion] = useState('');
  const [isValidPrompt, setIsValidPrompt] = useState(false);

  const handleQuestionChange = (event: { target: { value: string; }; }) => {
    const textValue = event.target.value.trim().replaceAll("\n","");
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

  return <Form.Group as={Row} className="mb-3">
    <Col sm="12">
      <Stack direction="vertical" style={{alignItems: "stretch", justifyContent: "center"}} gap={1}>
        <Form.Label>Ask ChatGPT a Question:</Form.Label>
        <Stack>
          <Form.Control as="textarea" rows={2} ref={questionInput} id="chatInput" onChange={handleQuestionChange} disabled={!isEditable} placeholder="" />
          <Stack direction="horizontal">
            <div className="smallPadding"><Button type="button" id="sendButton" onClick={() => askChatNow()} disabled={!isEditable || !isValidPrompt}><Send /> Send</Button></div>
            <div className={`smallPadding ms-auto ${!isEditable || !convoId ? 'hidden-item' : ''}`}><Button type="button" id="resetConvoButton" variant='danger' onClick={() => setConvoId("")} disabled={!isEditable || !convoId}><Trash3 /></Button></div>
          </Stack>
        </Stack>
      </Stack>
    </Col>
  </Form.Group>;
}

export default MessageSender;

