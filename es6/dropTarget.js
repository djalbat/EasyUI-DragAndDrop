'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const options = require('./options');

const { Element } = easy,
      { array } = necessary,
      { first, last } = array;

class DropTarget extends Element {
  constructor(selector, moveHandler = function(pathMaps, done) { done(); }) {
    super(selector);
    
    this.moveHandler = moveHandler;
    
    this.setInitialState();
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDropTargetToBeMarked(draggableEntry) {
    const dropTargets = this.getDropTargets(),
          dropTargetToBeMarked = dropTargets.reduce(function(dropTargetToBeMarked, dropTarget) {
            if (dropTargetToBeMarked === null) {
              if (dropTarget.isToBeMarked(draggableEntry)) { ///
                dropTargetToBeMarked = dropTarget;
              }
            }
      
            return dropTargetToBeMarked;
          }, null);

    return dropTargetToBeMarked;
  }

  getMarkedDropTarget() {
    const dropTargets = this.getDropTargets(),
          markedDropTarget = dropTargets.reduce(function(markedDropTarget, dropTarget) {
            if (markedDropTarget === null) {
              const dropTargetMarked = dropTarget.isMarked();
              
              if (dropTargetMarked) {
                markedDropTarget = dropTarget;
              }
            }
      
            return markedDropTarget;
          }, null);

    return markedDropTarget;
  }

  removeMarkerEntryGlobally() {
    const marked = this.isMarked();

    if (marked) {
      this.removeMarkerEntry();
    } else {
      const markedDropTarget = this.getMarkedDropTarget();

      markedDropTarget.removeMarkerEntry();
    }
  }

  moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
    const pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

    this.moveHandler(pathMaps, function() {
      const lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer, ///
            removeEmptyParentDirectoryNameDraggableEntries = draggableEntriesExplorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///

      if (removeEmptyParentDirectoryNameDraggableEntries) {
        draggableEntriesExplorer.unsetOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
      }

      draggableEntries.forEach(function(draggableEntry) {
        if (draggableEntry === lastDraggableEntry) {
          if (removeEmptyParentDirectoryNameDraggableEntries) {
            draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
          }
        }

        const draggableEntryPath = draggableEntry.getPath();

        if (draggableEntryPath !== null) {
          const pathMap = pathMaps.find(function(pathMap) {
                  const sourcePath = pathMap['sourcePath'],
                        found = (sourcePath === draggableEntryPath);
  
                  return found;
                }),
                sourcePath = pathMap['sourcePath'],
                targetPath = pathMap['targetPath'];

          this.moveDraggableEntry(draggableEntry, sourcePath, targetPath);
        }
      }.bind(this));

      done();
    }.bind(this));
  }

  moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
    const draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry();

    if (draggableEntryDirectoryNameDraggableEntry) {
      const directoryDraggableEntry = draggableEntry,  ///
            sourceDirectoryPath = sourcePath, ///
            targetDirectoryPath = targetPath; ///

      this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath);
    } else {
      const fileNameDraggableEntry = draggableEntry, ///
            sourceFilePath = sourcePath,  ///
            targetFilePath = targetPath;  ///

      this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath);
    }
  }
  
  addDropTarget(dropTarget) {
    const dropTargets = this.getDropTargets();
    
    dropTargets.push(dropTarget);
  }

  removeDropTarget(dropTarget) {
    const dropTargets = this.getDropTargets();

    const index = dropTargets.indexOf(dropTarget),
          found = (index !== -1);

    if (found) {
      const start = index,  ///
            deleteCount = 1;
      
      dropTargets.splice(start, deleteCount);
    }
  }

  getDropTargets() { return this.fromState('dropTargets'); }
  
  setInitialState() {
    const dropTargets = [];
    
    this.setState({
      dropTargets: dropTargets
    });
  }  
}

module.exports = DropTarget;
