import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';
import { findConversation } from '../models/SortAndFindUtils';

const ConversationQueryResults = (props: {allConvos: Convo[] | undefined, query: string}) => {
    const {allConvos, query} = props;
    const deferredQuery = useDeferredValue(query);
    const [isLoading, setIsLoading] = useState(allConvos === undefined);
    const [matchConvos, setMatchConvos] = useState(allConvos);
    
    useMemo(() => {
        setIsLoading(true);
        findConversation(allConvos, deferredQuery).then((convos) => {
            setMatchConvos(convos);
            setIsLoading(false);
        });
    }, [deferredQuery, allConvos]);

    // useEffect(() => {
    //     console.log(`query: ${query}, deferredQuery: ${deferredQuery}`);
    // }, [query, deferredQuery]);

    return (
        <>
            <Row className="mb-3">
                <Col sm="12">
                    <FormLabel>{(deferredQuery?.length > 0 ? 'Matches: ' : 'Conversations: ') + `${matchConvos?.length ?? 0}`}</FormLabel>
                </Col>                
            </Row>
            <Row className="mb-3">
                <Col sm="12">
                    <ConversationList conversations={matchConvos} />
                </Col>                
            </Row>
        </>
    );
};

export default ConversationQueryResults;

