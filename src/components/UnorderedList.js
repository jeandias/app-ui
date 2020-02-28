import React from 'react';

const UnorderedList = (props) => {
  const items = props.results.map((msg, i) => (
    <li className="list-group-item list-group-item-danger" key={i}>{msg}</li>
  ));
  return <ul className="list-group">{items}</ul>
};

export default UnorderedList;
