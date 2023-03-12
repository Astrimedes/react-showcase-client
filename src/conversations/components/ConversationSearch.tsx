import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import MessageList from './MessageList';
import Msg from '../models/Msg';
import MessageSender from './MessageSender';
import { ConversationController } from './ConversationController';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';
import { getAllConversations } from '../../chaptGptLib';

function ConversationSearch(props: {allConvos: Convo[] | undefined}) {
    const [isPending, startTransition] = useTransition();
    const searchInput = useRef<HTMLInputElement>(null);
    const [searchTerms, setSearchTerms] = useState("");

    const {allConvos} = props;

    const handleQuestionChange = (event: { target: { value: any; }; }) => {
        const textValue = event.target.value;
        // use transition here, when setting a new search term
        startTransition(() => {
            setSearchTerms(textValue);
        });
    };

    const searchResults = useMemo(() => {
        if (!allConvos || allConvos.length < 1) return;
        const matches = allConvos.filter(convo => convo.messages.find(msg => msg.message.includes(searchTerms)));
        return matches;
    }, [allConvos, searchTerms]);

    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Col sm="2">
                        <Form.Label >Message Search Terms</Form.Label>
                    </Col>
                    <Col sm="4">
                        <Form.Control ref={searchInput} onChange={handleQuestionChange} ></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    
                        <Col sm="12">
                        { searchResults && searchResults.length > 0 ? 
                                <ConversationList conversations={searchResults} />
                            : <Form.Label >No results found</Form.Label>
                        }
                        </Col>                
                </Form.Group>
            </Form>
        </>
    );
}

export default ConversationSearch;

