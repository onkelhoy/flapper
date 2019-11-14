import React, { useState, useContext, useMemo, } from 'react';
import _ from 'lodash';
import { Modal, Button, Search, } from 'semantic-ui-react';
import { request } from '../../../utils';

import './style.scss';

const SearchModal = (props) => {
  const {openSearch, setOpenSearch, friends, setFriends} = useContext(props.context);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const user = useMemo(() => JSON.parse(window.localStorage.getItem('flapper-user')), []);

  const addFriend = async () => {
    try {
      const result = await request('/friend/add', {
        method: 'post',
        body: {
          me: user._id,
          friend: selected._id,
        }
      });

      if (result.success) {
        setFriends([...friends, selected]);
        setOpenSearch(false);
      }
      else {
        console.error('could not do this');
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  const handleSeach = async (e, {value}) => {
    setSelected(false);
    setLoading(true);
    setValue(value);

    if (value === '') return setLoading(false);

    try {
      const result = await request('/friend/search/' + value, {
        method: 'post',
      });

      if (result.error) {
        setLoading(false);
      }
      else {
        setResults(result.filter(v => v.username !== user.username).map(r => ({...r, title: r.username, image: `/content/airplane(${r.airplane}).svg`})));
        setLoading(false);
      }
    }
    catch (e) {
      console.error(e);
      setLoading(false);
      // have a notification 
    }
  }

  return (
    <Modal 
      size="tiny"
      open={openSearch} 
      onClose={() => setOpenSearch(false)}>
      <Modal.Header>Search Friend to add</Modal.Header>
      <Modal.Content>
        <Search
          placeholder="search by username"
          loading={loading}
          onResultSelect={(e, {result}) => {setValue(result.username); setSelected(result)}}
          onSearchChange={handleSeach}
          results={results}
          value={value}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button compact negative onClick={() => setOpenSearch(false)}>
          Cancel
        </Button>
        <Button disabled={!selected} compact positive onClick={addFriend}>
          {selected ? `ADD ${selected.username}` : 'Select to add'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default SearchModal;