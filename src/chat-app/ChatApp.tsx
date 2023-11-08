import '../styling/ChatAppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { ConversationSearch, RenderOption, RenderOptionSelector } from '../search';
import { MessageList, MessageSender } from '../messages';
import { ConversationController } from '../conversations';
import { Msg } from '../common';

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
            Demo AI Chat
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
                <Row className="mb-3 inset-children">
                  <RenderOptionSelector setRenderMode={setRenderMode} renderMode={renderMode}></RenderOptionSelector>
                </Row>
                <ConversationSearch messageList={messagesList} renderOption={renderMode} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;

