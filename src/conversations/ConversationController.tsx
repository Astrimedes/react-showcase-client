import { Form, Row } from 'react-bootstrap';
import { startTransition, useEffect, useState } from 'react';
import { Msg, getConvoMessages } from '../common';
import StyleClassNames from '../styling';

const ConversationController = (props: {editable: boolean, setConvoId: (newConvoId: string) => void, messagesList: Msg[], setMessagesList: (msgs: Msg[]) => void, convoId: string}) => {
  const {editable, convoId, setMessagesList, messagesList} = props;
  const [, setIsEditable] = useState(editable);

  const updateMessagesWithConvo = (queryConvoId: string) => {
    setIsEditable(false);
    getConvoMessages(queryConvoId)
    .then((msgs) => {
      setMessagesList(msgs);
    })
    .catch(er => console.log(er))
    .finally(() => {
      setIsEditable(true);
    });
  };

  useEffect(() => {
    startTransition(() => {
      if (convoId) {
        updateMessagesWithConvo(convoId);
      } else if (messagesList?.length > 0) {
        setMessagesList(new Array<Msg>());
      }
    })
  }, [convoId, messagesList?.length]);

  return (
  <>
    <Form.Group as={Row} className={StyleClassNames.rowWide}>
      <Form.Label  column sm="12" style={{paddingLeft: "1rem"}} className={StyleClassNames.textSecondary}>Conversation ID: {convoId}</Form.Label>
    </Form.Group>
  </>
  );
}

export default ConversationController;
