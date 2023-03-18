import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';
import { useDeferredValue, useEffect, useMemo } from 'react';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';
import { findConversation } from '../models/SortAndFindUtils';

const ConversationQueryResults = (props: {allConvos: Convo[] | undefined, query: string}) => {
    const {allConvos, query} = props;
    const deferredQuery = useDeferredValue(query);
    const conversations = useMemo(() => findConversation(allConvos, query), [deferredQuery, allConvos]);

    useEffect(() => {
        console.log(`query: ${query}, deferredQuery: ${deferredQuery}`);
    }, [query, deferredQuery]);

    return (
        <Row className="mb-3">
            <Col sm="12">
                <ConversationList conversations={conversations} />
            </Col>                
        </Row>
    );
};

export default ConversationQueryResults;

