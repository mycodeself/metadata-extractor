import styled from '@emotion/styled';
import React from 'react';
import Metadata from '../model/Metadata';

const Wrapper = styled.div`
    margin: 4em 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
`

const Header = styled.h2`
    text-align: center;
    padding-bottom: 1em;
    border-bottom: 1px solid #222;
`

const List = styled.div`
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`

const Name = styled.p`
    text-align: center;
    font-weight: 500;
`

const Value = styled.p`
    text-align: center;
    padding-bottom: 1.5em;
    @media (min-width: 768px) {
        padding: 0;
    }
`

interface MetadataProps {
    metadata: Metadata[]
}

const MetadataList: React.FC<MetadataProps> = ({metadata}: MetadataProps) => {
    return (
        <Wrapper>
            <Header>Result</Header>
            <List>
                {metadata.map((item: Metadata, index: number) => (
                    <React.Fragment key={index}>
                        <Name>{item.name}</Name>
                        <Value>{item.value}</Value>
                    </React.Fragment>
                ))}
            </List>
        </Wrapper>   
    )
}

export default MetadataList