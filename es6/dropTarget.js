'use strict';

const easy = require('easy');

const options = require('./options'),
      arrayUtil = require('./util/array');

const { Element } = easy;

class DropTarget extends Element {
  constructor(selector, moveHandler = function(pathMaps, done) { done(); }) {
    super(selector);
    
    this.moveHandler = moveHandler;

    this.dropTargets = [];
  }

  addDropTarget(dropTarget) {
    this.dropTargets.push(dropTarget);
  }

  removeDropTarget(dropTarget) {
    const index = arrayUtil.indexOf(this.dropTargets, dropTarget),
          found = (index !== -1);

    if (found) {
      this.dropTargets.splice(index, 1);
    }
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDropTargetToBeMarked(draggableEntry) {
    const dropTargetToBeMarked = this.dropTargets.reduce(function(dropTargetToBeMarked, dropTarget) {
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
    const markedDropTarget = this.dropTargets.reduce(function(markedDropTarget, dropTarget) {
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
      const lastDraggableEntry = arrayUtil.last(draggableEntries),
            firstDraggableEntry = arrayUtil.first(draggableEntries),
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
          const pathMap = arrayUtil.find(pathMaps, function(pathMap) {
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
}

module.exports = DropTarget;
