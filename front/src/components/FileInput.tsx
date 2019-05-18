import React from 'react'
import styled from '@emotion/styled'
import { FaFileUpload, FaFileAlt } from "react-icons/fa";
import colors from '../constants/colors';
import strings from '../constants/strings';

interface IFileInputProps {
    onChange: Function,
    file: File|null
}

class FileInput extends React.PureComponent<IFileInputProps> {   
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        this.props.onChange(file);
    }

    render() {
        return (
            <Wrapper>
                <Input onChange={this.handleChange} type="file" />        
                {this.props.file 
                    ?
                    <React.Fragment> 
                        <FaFileAlt color={colors.primaryColorLight} size={72} />
                        <FileName>{this.props.file.name}</FileName> 
                    </React.Fragment>
                    : 
                    <React.Fragment>
                        <FaFileUpload color={colors.primaryColorLight} size={72} />
                        <Text>{strings.fileInputText}</Text>
                    </React.Fragment>
                }
            </Wrapper>
        )
    }
}
  
const Input = styled.input`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    cursor: pointer;
`

const Wrapper = styled.div`
    margin-top: 3em;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    max-width: 310px;
    height: auto;
    padding: 1em;
    cursor: pointer;
    @media (min-width: 768px) {
        max-width: 760px;
    }
`

const Text = styled.p`
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
    margin: 0;
    padding: 0;
    margin-top: 1em;
`

const FileName = styled.p`
    font-size: 16px;
    margin: 0;
    padding: 0.2em;
    margin-top: 1em;
    text-align: center;
`

export default FileInput;
