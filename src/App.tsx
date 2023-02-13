import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { ArrowRepeat, Clipboard, Send } from 'react-bootstrap-icons';
import { SetStateAction, useRef, useState } from 'react';
import { askChat, getConvoMessages } from './chaptGptLib';
import MessageList from './conversations/components/MessageList';
import Msg from './conversations/models/Msg';

function App() {
  const [question, setQuestion] = useState('');
  const [isValidPrompt, setIsValidPrompt] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messagesList, setMessagesList] = useState(new Array<Msg>());

  const [convoId, setConvoId] = useState("");

  const handleQuestionChange = (event: { target: { value: any; }; }) => {
    const textValue = event.target.value;
    setIsValidPrompt(() => textValue.length > 4);
    if (isValidPrompt)
    {
      setQuestion(textValue);
    }
  };

  const handleConversationChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    // clear out messages
    setMessagesList(new Array<Msg>());
    setConvoId(event.target.value);
  }

  const getAllConvoMessages = () => {
    setIsEditable(false);

    getConvoMessages(convoId)
    .then((msgs) => {
      console.log(msgs);
      // add user and reply messages
      setMessagesList(msgs);
    })
    .catch(er => console.log(er))
    .finally(() => {
      setIsEditable(true);
    });
  }

  const askChatNow = () => {
    if (!isValidPrompt) return;

    // clear answer with temp value
    // setAnswer('Waiting for answer...');
    setIsEditable(false);
    console.log("asking chatGpt: " + question);

    // create user prompt message...
    let userMsg = new Msg({role: "User", message: question, conversationId: convoId, time: Date.now()});
    let replyMsg = null;

    askChat(question, convoId)
    .then((r) => {
        // add user and reply messages
        userMsg = r.prompt;
        replyMsg = r.reply;
        setMessagesList([...messagesList, userMsg, replyMsg])
        setConvoId(replyMsg.conversationId);
      })
    .catch(er => setMessagesList([...messagesList, userMsg, new Msg({role: "System: Error", message: `Error Occurred: ${er.toString()}`, time: Date.now()})]))
    .finally(() => {
      setIsEditable(true);
      // clear question input
      if (inputRef.current != null) inputRef.current.value = "";
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Demo Chat - Rendering
        </p>
      </header>
      <div id="mainApp">
        <Form>

          <Row className="mb-3">
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="1">Conversation</Form.Label>
              <Col sm="4">
                <fieldset disabled={!isEditable}>
                  <Form.Control id="conversationId" onChange={handleConversationChange} value={convoId} />
                </fieldset>
              </Col>
              <Col sm="4">
                <Button type="button" id="syncButton" onClick={() => getAllConvoMessages()}><ArrowRepeat/> Sync</Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm="1">
                Prompt
              </Form.Label>
              <Col sm="10">
                <fieldset disabled={!isEditable}>
                  <Form.Control ref={inputRef} id="chatInput" onChange={handleQuestionChange} placeholder="" />
                  <div className="smallPadding"><Button type="button" id="sendButton" onClick={() => askChatNow()}><Send /> Send</Button></div> 
                </fieldset>
              </Col>
            </Form.Group>
          </Row>
          

          <Form.Group as={Row} className="mb-3">
            <MessageList messages={messagesList} />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default App;
