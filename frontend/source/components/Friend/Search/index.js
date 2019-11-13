import React, { useState, } from 'react';
import { Modal, Button, Search, } from 'semantic-ui-react';

const SearchModal = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal 
      open={open} 
      onClose={() => setOpen(false)}>

      <Modal.Action>
        {/* <Button onClick={() => setOpen(false)} negative>
          No
        </Button> */}
      </Modal.Action>
    </Modal>
  );
}

export default SearchModal;