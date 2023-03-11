import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useDeferredValue, useState } from 'react';
import MessageList from './MessageList';
import Msg from '../models/Msg';
import MessageSender from './MessageSender';
import { ConversationController } from './ConversationController';
import ConversationSearch from './ConversationSearch';
import Convo from '../models/Convo';

function ChatApp() {
  const [convoId, setConvoId] = useState("");
  const [messagesList, setMessagesList] = useState(new Array<Msg>());
  const [isEditable, setIsEditable] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState('talk');
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Demo Chat
        </p>
      </header>
      <div id="mainApp">
        <Tabs mountOnEnter={true} activeKey={activeTabKey} id="tabs-container" className="mb-3" onSelect={(k) => setActiveTabKey(k ?? 'talk')}>
          <Tab eventKey="talk" title="Talk">
            <Form>
              <Row className="mb-3">
                <ConversationController editable={true} setConvoId={setConvoId} convoId={convoId} setMessagesList={setMessagesList} />
                <MessageSender convoId={convoId} setConvoId={setConvoId} messageList={messagesList} setMessagesList={setMessagesList} />
              </Row>
              <Form.Group as={Row} className="mb-3">
                <MessageList messages={messagesList} />
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="search" title="Search">
            <ConversationSearch setConvoId={setConvoId}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ChatApp;

