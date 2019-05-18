import styled from '@emotion/styled';
import React from 'react';
import colors from '../constants/colors';
import Metadata from '../model/Metadata';
import getMetadataService from '../services/getMetadataService';
import FileInput from './FileInput';
import Loader from './Loader';
import MetadataList from './MetadataList';
import strings from '../constants/strings';

interface AppState {
  isLoading: boolean,
  file: File|null
  metadata: Metadata[]|null,
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isLoading: false,
    file: null,
    metadata: null,
  }

  handleButtonClick = (event: React.MouseEvent) => {
    if(!this.state.file) {
      return;
    }

    this.setState({isLoading: true, metadata: null});
    
    getMetadataService(this.state.file).then((response: Metadata[]) => {
      this.setState({isLoading: false, file: null, metadata: response});
    }).catch(error => console.error(error));
  }

  handleInputFileChange = (file: File) => {
    this.setState({file: file})
  }

  render() {
    return (
      <Wrapper>
        <Header>
          <Title>{strings.appTitle}</Title>
          <Subtitle>{strings.appSubtitle}</Subtitle>
        </Header>
        <FileInput file={this.state.file} onChange={this.handleInputFileChange} />
        {this.state.file && <Button onClick={this.handleButtonClick}>Extract metadata</Button>}
        <Loader isLoading={this.state.isLoading} />
        {this.state.metadata && <MetadataList metadata={this.state.metadata} />}
      </Wrapper>
    )
  }
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 1024px;
`

const Header = styled.header`
  text-align: center;
  padding: 1em;
  margin: 0.5em;
`

const Title = styled.h1`
  font-size: 46px;
  text-transform: uppercase;
  font-weight: bold;
`

const Subtitle = styled.h2`
  font-size: 26px;
  font-weight: 300;
`

const Button = styled.button`
  margin: 1em;
  padding: 1em 1.5em;
  color: black;
  text-transform: uppercase;
  border: 1px solid ${colors.primaryColorDark};
  background-color: ${colors.primaryColor};
  cursor: pointer;
  outline: none;
  transition: background-color 300ms ease-in-out;

  &:hover {
    background-color: ${colors.primaryColorLight};
  }
`

export default App;


