import { Accordion, Col, DropdownButton, Form, Row, Stack } from "react-bootstrap";
import { Fragment, useTransition, useState, useEffect } from "react";
import { RenderOption } from "../models/RenderOptions";


const RenderOptionSelector = (props: {renderMode: RenderOption, setRenderMode: React.Dispatch<React.SetStateAction<RenderOption>>}) =>
{ 
    const {renderMode: renderState, setRenderMode: setRenderState} = props;
    return (
        <Row>
            <Col sm={4}>
                <Stack>
                    <Form.Label>Rendering Mode:</Form.Label>
                    <Form.Select aria-label={`Render Mode: ${renderState}`} onChange={e => setRenderState(e.currentTarget.value as RenderOption)}>
                        <option value="standard">Standard (no deferred/transitions)</option>
                        <option value="deferred">Deferred (useDeferredValue)</option>
                        <option value="transition">Transition (useTransition)</option>
                    </Form.Select>
                </Stack>
            </Col>
            <Col sm={8}></Col>
        </Row>
        
    )
};

export default RenderOptionSelector;