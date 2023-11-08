import '../styling/ChatAppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { useMemo } from 'react';
import { Convo, findConversations } from '../common';
import { ConversationList } from '../conversations';

const ConversationQueryResultsRenderStandard = (props: {allConvos: Convo[] | undefined, query: string}) => {
    const {allConvos, query} = props;
    
     const matchConvos = useMemo(() => {
        let convos = findConversations(allConvos, query);
        return convos;
    }, [allConvos, query]);

    return (
        <>
            <Row className="mb-3">
                <Col sm="12">
                    <FormLabel className="text-secondary">{(query?.length > 0 ? 'Matches: ' : 'Conversations: ') + `${matchConvos?.length ?? 0}`}</FormLabel>
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

export default ConversationQueryResultsRenderStandard;

