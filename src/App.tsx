import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { askChat } from './chaptGptLib';

function App() {
  const [question, setQuestion] = useState('');
  const [isValidPrompt, setIsValidPrompt] = useState(false);
  const [answer, setAnswer] = useState('Waiting for your question...');
  const [isEditable, setIsEditable] = useState(true);  

  const [transcript, setTranscript] = useState("");

  const [convoId, setConvoId] = useState("");
  const [parentId, setParentId] = useState("");

  const handleQuestionChange = (event: { target: { value: any; }; }) => {
    const textValue = event.target.value;
    setIsValidPrompt(() => textValue.length > 4);
    if (isValidPrompt)
    {
      setQuestion(textValue);
    }
  };

  const handleConversationChange = (event: any) => {
      setConvoId(event.target.value);
  }

  const handleParentChange = (event: any) => {
      setParentId(event.target.value);
  }

  const askChatNow = () => {
    if (!isValidPrompt) return;

    // clear answer with temp value
    // setAnswer('Waiting for answer...');
    setIsEditable(false);
    console.log("asking chatGpt: " + question);

    askChat(question, convoId, parentId)
    .then((r) => {

        setAnswer(r.response);
        setTranscript(question + "\n\n" + r.response + "\n\n\n" + transcript);
        setConvoId(r.conversationId);
        setParentId(r.messageId);
      })
    .catch(er => setAnswer(`Error occurred: ${er?.toString()}`))
    .finally( 
      () => setIsEditable(true));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          React Application Demo
        </p>
      </header>
      <div id="mainApp">
        <Form>
          <Form.Group as={Row}>
            <Col sm="12">
              <Form.Control plaintext id="explanation" readOnly defaultValue="Enter some text for chatGpt to respond to" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Conversation ID
            </Form.Label>
            <Col sm="4">
              <fieldset disabled={true}>
                <Form.Control id="conversationId" onChange={handleConversationChange} value={convoId} />
              </fieldset>
            </Col>
            <Form.Label column sm="1">
              Parent ID
            </Form.Label>
            <Col sm="4">
              <fieldset disabled={true}>
                <Form.Control id="parentId" onChange={handleParentChange} value={parentId} />
              </fieldset>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">
              Prompt
            </Form.Label>
            <Col sm="10">
              <fieldset disabled={!isEditable}>
                <Form.Control  id="chatInput" onChange={handleQuestionChange} placeholder="How are you today, GPT-3?" />
                <Button type="button" id="sendButton" onClick={() => askChatNow()}>Ask!</Button>
              </fieldset>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">
              Answer
            </Form.Label>
            <Col sm="10">
              <Form.Label id="ai-response-text" readOnly><pre>{transcript}</pre></Form.Label>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default App;
