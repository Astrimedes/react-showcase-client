import '../styling/ChatAppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { useMemo } from 'react';
import { Convo, findConversations } from '../common';
import { ConversationList } from '../conversations';
import StyleClassNames from '../styling';

const ConversationQueryResults = (props: {allConvos: Convo[] | undefined, query: string}) => {
    const {allConvos, query} = props;
    
     const matchConvos = useMemo(() => {
        let convos = findConversations(allConvos, query);
        return convos;
    }, [allConvos, query]);

    return (
        <>
            <Row className={StyleClassNames.rowStandard}>
                <Col sm="12">
                    <FormLabel className={StyleClassNames.textSecondary}>{(query?.length > 0 ? 'Matches: ' : 'Conversations: ') + `${matchConvos?.length ?? 0}`}</FormLabel>
                </Col>                
            </Row>
            <Row className={StyleClassNames.rowStandard}>
                <Col sm="12">
                    <ConversationList conversations={matchConvos} searchText={query} />
                </Col>                
            </Row>
        </>
    );
};

export default ConversationQueryResults;

