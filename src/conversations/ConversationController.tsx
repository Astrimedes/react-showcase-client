import { Form, Row } from 'react-bootstrap';
import { startTransition, useEffect, useState } from 'react';
import { Msg, getConvoMessages } from '../common';

const ConversationController = (props: {editable: boolean, setConvoId: (newConvoId: string) => void, messagesList: Msg[], setMessagesList: (msgs: Msg[]) => void, convoId: string}) => {
  const {editable, convoId, setMessagesList, setConvoId, messagesList} = props;
  const [isEditable, setIsEditable] = useState(editable);

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
  }, [convoId]);

  return (
  <>
    <Form.Group as={Row} className="mb-2">
      <Form.Label  column sm="12" style={{paddingLeft: "1rem"}} className="text-secondary">Conversation ID: {convoId}</Form.Label>
    </Form.Group>
  </>
  );
}

export default ConversationController;