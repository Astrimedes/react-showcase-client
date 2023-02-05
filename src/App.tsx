import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { askChat } from './chaptGptLib';

function App() {
  const [question, setQuestion] = useState('');
  const [isValidPrompt, setIsValidPrompt] = useState(false);
  const [answer, setAnswer] = useState('');

  // one time values
  useEffect(() => {
    setAnswer('Ask a question...');
  }, []);
  

  const handleQuestionChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
    const textValue = event.target.value;
    setIsValidPrompt(() => textValue.length > 4);
    if (isValidPrompt)
    {
      setQuestion(textValue);
      setAnswer('');
    }
  };

  const askChatNow = () => {
    setAnswer('Waiting for answer...');
    console.log("asking chatGpt: " + question);
    askChat(question).then((r) => setAnswer(r.response));
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
              <Form.Control id="explanation" plaintext readOnly defaultValue="Enter some text for chatGpt to respond to" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Prompt
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext id="chatInput" onChange={handleQuestionChange} placeholder="How are you today, GPT-3?" />
            </Col>
            <Col sm="2">
              <Button type="button" id="sendButton" onClick={() => askChatNow()}>Ask!</Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm="12">
              <p>
              <Form.Control id="ai-response-text" plaintext readOnly defaultValue="Waiting for answers..." value={answer} />
              </p>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default App;
