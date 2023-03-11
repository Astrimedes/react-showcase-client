import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import MessageList from './MessageList';
import Msg from '../models/Msg';
import MessageSender from './MessageSender';
import { ConversationController } from './ConversationController';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';
import { getAllConversations } from '../../chaptGptLib';

function ConversationSearch(props: {setConvoId: (convoId: string) => void}) {
  const {setConvoId} = props;
  const [allConvos, setAllConvos] = useState<undefined | Convo[]>(undefined);
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchTerms, setSearchTerms] = useState("");

  const searchResults = useMemo(() => {
    if (!allConvos || allConvos.length < 1 || !(typeof(allConvos)).includes('Convo')) return;
    const matches = allConvos.filter(convo => convo.messages.find(msg => msg.message.includes(searchTerms)));
    return matches;
  }, [allConvos, searchTerms]);

  // fetch all conversations one time on loading? should probably be passed as a prop instead
  useEffect(() => {
    getAllConversations()
        .then(convos => {
            setAllConvos(convos);
        });
  }, []);

  return (
    <>
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Col sm="2">
                    <Form.Label >Message Search Terms</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control ref={searchInput}></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm="12">
                    <ConversationList conversations={allConvos} />
                </Col>
            </Form.Group>
        </Form>
    </>
  );
}

export default ConversationSearch;

