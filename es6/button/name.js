"use strict";

import withStyle from "easy-with-style";  ///

import { InputElement } from "easy";
import { arrayUtilities } from "necessary";

const { first } = arrayUtilities;

class NameButton extends InputElement {
  getName() {
    const childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

    return name;
  }

  onDoubleClick(doubleClickHandler) {
    this.on("dblclick", doubleClickHandler);
  }
  
  parentContext() {
	  const getName = this.getName.bind(this),
				  onDoubleClick = this.onDoubleClick.bind(this);

    return ({
      getName,
      onDoubleClick
    });
  }

  static tagName = "button";

  static defaultProperties = {
    className: "name"
  };
}

export default withStyle(NameButton)`

  border: none;
  height: 2.4rem;
  outline: none;
  display: inline-block;
  text-align: left;
  background-color: transparent;
  background-repeat: no-repeat;

`;
