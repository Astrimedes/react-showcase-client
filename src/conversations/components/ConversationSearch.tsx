import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';
import { useDeferredValue, useEffect, useState } from 'react';
import Convo from '../models/Convo';
import ConversationQueryResults from './ConversationQueryResults';
import { getAllConversations } from '../../chaptGptLib';

function ConversationSearch(props: {}) {
    const [searchTerms, setSearchTerms] = useState("");
    const [allConvos, setAllConvos] = useState<Convo[] | undefined>(undefined);

    // fetch all conversations one time on loading for now...
   useEffect(() => {
    getAllConversations()
        .then(convos => {
            setAllConvos(convos);
        });
    }, []);

    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Col sm="2">
                        <Form.Label >Message Search Terms</Form.Label>
                    </Col>
                    <Col sm="4">
                        <Form.Control type="text" value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)}></Form.Control>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm="12">
                        <ConversationQueryResults query={searchTerms} allConvos={allConvos} />
                    </Col>                
                </Row>
            </Form>
        </>
    );
}

export default ConversationSearch;

