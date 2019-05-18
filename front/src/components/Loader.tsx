import React from 'react';
import styled from '@emotion/styled';
import { BeatLoader } from 'react-spinners';

import colors from '../constants/colors';

interface LoaderProps {
    isLoading: boolean
}

const Wrapper = styled.div`
    margin: 1.5em;
`

const Loader: React.FC<LoaderProps> = ({isLoading}: LoaderProps) => {
    if(!isLoading) {
        return null;
    }

    return (
        <Wrapper>
            <BeatLoader margin={'0.5em'} color={colors.primaryColorLight} />
        </Wrapper>
    )
}

export default Loader;