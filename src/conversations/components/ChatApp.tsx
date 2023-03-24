import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState, useTransition } from 'react';
import MessageList from './MessageList';
import Msg from '../models/Msg';
import MessageSender from './MessageSender';
import { ConversationController } from './ConversationController';
import ConversationSearch from './ConversationSearch';

function ChatApp() {
  const [convoId, setConvoId] = useState("");
  const [messagesList, setMessagesList] = useState(new Array<Msg>());
  const [activeTabKey, setActiveTabKey] = useState('talk');
  const [reloadConvos, setReloadConvos] = useState(true);
  const [isTransitioning, startTransition] = useTransition();

  function handleTabChange(key: string | null) {
    setActiveTabKey(key ?? 'talk');
    startTransition(() => {
      setReloadConvos(key == 'search');
    })
  }

  // useEffect(() => {
  //   console.log('set reload convos to True');
  //   setReloadConvos(true);
  // }, [messagesList]);

  return (
    <div className='stretch-no-scroll'>
      <div className='hide-x-scroll'>
        <h1 className="text-center text-white text-wrap bg-primary">
          <p>
            Demo Chat
          </p>
        </h1>
        <div id="mainApp">
          <Tabs activeKey={activeTabKey} id="tabs-container" className="mb-3" onSelect={handleTabChange}>
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
              <ConversationSearch reload={reloadConvos} messageList={messagesList} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;

