import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Stack, Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MessageList from './MessageList';
import Msg from '../models/Msg';
import MessageSender from './MessageSender';
import { ConversationController } from './ConversationController';
import ConversationSearch from './ConversationSearch';
import { RenderOption } from '../models/RenderOptions';
import RenderOptionSelector from './RenderOptionSelector';

function ChatApp() {
  const [convoId, setConvoId] = useState("");
  const [messagesList, setMessagesList] = useState(new Array<Msg>());
  const [activeTabKey, setActiveTabKey] = useState('talk');
  const [renderMode, setRenderMode] = useState<RenderOption>("standard");

  function handleTabChange(key: string | null) {
    setActiveTabKey(key ?? 'talk');
  }

  return (
    <div className='stretch-no-scroll'>
      <div className='hide-x-scroll'>
        <h1 className="text-center text-white text-wrap bg-primary">
          <p>
            Demo Chat
          </p>
        </h1>
        <div id="mainApp">
          <Tabs mountOnEnter={true} activeKey={activeTabKey} id="tabs-container" className="mb-3" onSelect={handleTabChange}>
            <Tab eventKey="talk" title="Talk">
              <Form>
                <Row className="mb-3 inset-children">
                  <Col sm="12">
                    <MessageSender convoId={convoId} setConvoId={setConvoId} messageList={messagesList} setMessagesList={setMessagesList} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm="12" className={messagesList?.length ? "" : "hidden-item"}>
                      <ConversationController editable={true} setConvoId={setConvoId} convoId={convoId} setMessagesList={setMessagesList} messagesList={messagesList}/>
                  </Col>
                </Row>
                <Form.Group as={Row} className="mb-3">
                  <MessageList messages={messagesList} />
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="search" title="Search">
              <ConversationSearch messageList={messagesList} renderOption={renderMode} />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <Stack>
                <RenderOptionSelector setRenderMode={setRenderMode} renderMode={renderMode}></RenderOptionSelector>
              </Stack>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;

