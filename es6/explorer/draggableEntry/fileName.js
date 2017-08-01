'use strict';

const nameUtil = require('../../util/name'),
      Entry = require('../entry'),
      DraggableEntry = require('../draggableEntry');

class FileNameDraggableEntry extends DraggableEntry {
  constructor(selector, name, explorer) {
    const type = Entry.types.FILE_NAME;

    super(selector, name, explorer, type);
  }

  isDirectoryNameDraggableEntry() {
    return false;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case Entry.types.MARKER:
      case Entry.types.FILE_NAME:
        const name = this.getName(),
              entryName = entry.getName();
          
        before = nameUtil.nameIsBeforeEntryName(name, entryName);
        break;

      case Entry.types.DIRECTORY_NAME:
        before = false;          
        break;
    }
    
    return before;
  }

  isRecognised() {
    const recognised = this.hasClass('recognised');

    return recognised;
  }

  retrieveSubEntries() {
    const subEntries = [];  ///
    
    return subEntries;
  }
  
  setRecognised(recognised) {
    recognised ?
      this.recognise() :
        this.overlook();
  }

  recognise() {
    this.addClass('recognised');
  }

  overlook() {
    this.removeClass('recognised');
  }

  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFileNameDraggableEntry(file);
  }
  
  initialise(recognised)  {
    super.initialise();
    
    this.setRecognised(recognised);
    
    const doubleClickHandler = this.doubleClickHandler.bind(this);

    this.onDoubleClick(doubleClickHandler);
  }

  static fromProperties(Class, properties) {
    if (arguments.length === 1) {
      properties = Class;
      Class = FileNameDraggableEntry;
    }

    const { name, explorer, recognised } = properties,
          fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, name, explorer);

    fileNameDraggableEntry.initialise(recognised);

    return fileNameDraggableEntry;
  }
}

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  },
  ignoredProperties: [
    'name',
    'explorer',
    'recognised'
  ]
});

module.exports = FileNameDraggableEntry;

