import React, {useState, useEffect, useContext } from 'react';
import {globalContext} from '../../App';

import './style.scss';

const Section = (props) => {
  const { index, children, className = "" } = props;
  const { currentIndex } = useContext(globalContext);
  const [movement, setMovement] = useState('hidden');
  
  useEffect(() => {
    const diff = Math.abs(index - currentIndex);
    if (diff === 1) {
      if (index > currentIndex) return setMovement('right'); 
      else setMovement('left');
    } 
    else if (diff === 0) {
      setMovement('');
    }
  }, [currentIndex]);

  return (
    <section className={`screen-section ${className} ${movement}`}>
      {children}
    </section>
  )
}

export default Section;