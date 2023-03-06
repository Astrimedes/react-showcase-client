import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useDeferredValue, useState } from 'react';
import MessageList from './MessageList';
import Msg from '../models/Msg';
import MessageSender from './MessageSender';
import { ConversationController } from './ConversationController';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';

function ConversationSearch(props: {setConvoId: (convoId: string) => void, defaultMessages: Convo[]}) {
  const {setConvoId, defaultMessages} = props;

  return (
    <>
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Col sm="2">
                    <Form.Label >Message Search Terms</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control ></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm="12">
                    <ConversationList conversations={defaultMessages} />
                </Col>
            </Form.Group>
        </Form>
    </>
  );
}

export default ConversationSearch;

