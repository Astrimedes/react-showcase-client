import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';
import { findConversations, findConversationsAsync } from '../models/SortAndFindUtils';

const ConversationQueryResultsRenderDeferred = (props: {allConvos: Convo[] | undefined, query: string}) => {
    const {allConvos, query} = props;
    const deferredQuery = useDeferredValue(query);
    const [isLoading, setIsLoading] = useState(false);
    
     const matchConvos = useMemo(() => {
        let convos = findConversations(allConvos, deferredQuery);
        return convos;
    }, [deferredQuery]);

    return (
        <>
            <Row className="mb-3">
                <Col sm="12">
                    <FormLabel className="text-secondary">{(deferredQuery?.length > 0 ? 'Matches: ' : 'Conversations: ') + `${matchConvos?.length ?? 0}`}</FormLabel>
                </Col>                
            </Row>
            <Row className="mb-3">
                <Col sm="12">
                    {
                        isLoading ? (<FormLabel className='text-warning'>Loading...</FormLabel>) 
                        : (<ConversationList conversations={matchConvos} />)
                    }
                </Col>                
            </Row>
        </>
    );
};

export default ConversationQueryResultsRenderDeferred;

