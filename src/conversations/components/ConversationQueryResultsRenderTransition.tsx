import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react';
import ConversationList from './ConversationList';
import Convo from '../models/Convo';
import { findConversations, findConversationsAsync } from '../models/SortAndFindUtils';

const ConversationQueryResultsRenderTransition = (props: {allConvos: Convo[] | undefined, query: string}) => {
    const {allConvos, query} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [matchConvos, setMatchConvos] = useState(allConvos);
    const [isTransitioning, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            let convos = findConversations(allConvos, query);
            setMatchConvos(convos);
        });
    }, [query])

    return (
        <>
            <Row className="mb-3">
                <Col sm="12">
                    <FormLabel className="text-secondary">{(query?.length > 0 ? 'Matches: ' : 'Conversations: ') + `${matchConvos?.length ?? 0}`}</FormLabel>
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

export default ConversationQueryResultsRenderTransition;
