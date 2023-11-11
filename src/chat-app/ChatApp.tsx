import '../styling/ChatAppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { ConversationSearch, RenderOption, RenderOptionSelector } from '../search';
import { MessageList, MessageSender } from '../messages';
import { ConversationController } from '../conversations';
import { Msg } from '../common';
import StyleClassNames from '../styling';

function ChatApp() {
  const [convoId, setConvoId] = useState("");
  const [messagesList, setMessagesList] = useState(new Array<Msg>());
  const [activeTabKey, setActiveTabKey] = useState('talk');
  const [renderMode, setRenderMode] = useState<RenderOption>("standard");

  function handleTabChange(key: string | null) {
    setActiveTabKey(key ?? 'talk');
  }

  return (
    <div className={StyleClassNames.stretchNoScroll}>
      <div className={StyleClassNames.hideXScroll}>
        <h1 className={StyleClassNames.appTitleStylesAll}>
          <p>
            Demo AI Chat
          </p>
        </h1>
        <div id="mainApp">
          <Tabs mountOnEnter={true} activeKey={activeTabKey} id="tabs-container" className={StyleClassNames.rowStandard} onSelect={handleTabChange}>
            <Tab eventKey="talk" title="Talk">
              <Form>
                <Row className={StyleClassNames.insetRowStylesAll}>
                  <Col sm="12">
                    <MessageSender convoId={convoId} setConvoId={setConvoId} messageList={messagesList} setMessagesList={setMessagesList} />
                  </Col>
                </Row>
                <Row className={StyleClassNames.rowStandard}>
                  <Col sm="12" className={messagesList?.length ? "" : StyleClassNames.hiddenItem}>
                      <ConversationController editable={true} setConvoId={setConvoId} convoId={convoId} setMessagesList={setMessagesList} messagesList={messagesList}/>
                  </Col>
                </Row>
                <Form.Group as={Row} className={StyleClassNames.rowStandard}>
                  <MessageList messages={messagesList} />
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="search" title="Search">
                <Row className={StyleClassNames.insetRowStylesAll}>
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

