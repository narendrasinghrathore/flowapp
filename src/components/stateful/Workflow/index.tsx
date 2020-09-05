import React from 'react';
import { useParams } from 'react-router-dom';

const WorkFlowComponent = React.memo((props: any) => {
    const { id } = useParams();

    return <h1>Workflow {id}</h1>;
});

export default WorkFlowComponent;