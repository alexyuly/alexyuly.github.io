window.addEventListener("load", function() {

  let preview = false;
  let selection;

  const appendChildButton = document.querySelector("#append-child");
  const floatingPreviewToggleButton = document.querySelector("#floating-preview-toggle");
  const insertBeforeButton = document.querySelector("#insert-before");
  const previewToggleButton = document.querySelector("#preview-toggle");
  const removeButton = document.querySelector("#remove");
  const root = document.querySelector("#root");
  const selectionClassName = document.querySelector("#selection-class-name");
  const selectionControlButtons = document.querySelectorAll("#selection-controls button");
  const selectionTagName = document.querySelector("#selection-tag-name");
  const toolbox = document.querySelector("#toolbox");

  appendChildButton.addEventListener("click", function(event) {
    appendChildToSelection();
  });

  floatingPreviewToggleButton.addEventListener("click", function(event) {
    togglePreview();
  });

  insertBeforeButton.addEventListener("click", function(event) {
    insertBeforeSelection();
  });

  previewToggleButton.addEventListener("click", function(event) {
    togglePreview();
  });

  removeButton.addEventListener("click", function(event) {
    removeSelection();
  });

  root.addEventListener("click", toggleSelection);

  updateSelection(null);

  function appendChildToSelection() {
    selection.appendChild(createElement());
  }

  function createElement() {
    const element = document.createElement("div");

    element.className = "element";
    element.addEventListener("click", toggleSelection);

    return element;
  }

  function insertBeforeSelection() {
    selection.parentElement.insertBefore(createElement(), selection);
  }

  function removeSelection() {
    selection.remove();
    updateSelection(null);
  }

  function togglePreview() {
    if (preview) {
      floatingPreviewToggleButton.remove();
      floatingPreviewToggleButton.classList.add("hidden");
      
      for (const child of Array.from(document.body.children)) {
        child.remove();
        root.appendChild(child);
      }

      document.body.appendChild(toolbox);
      document.body.appendChild(root);
      document.body.appendChild(floatingPreviewToggleButton);

    } else {
      toolbox.remove();
      root.remove();
      floatingPreviewToggleButton.remove();
      
      for (const child of Array.from(root.children)) {
        child.remove();
        document.body.appendChild(child);
      }

      document.body.appendChild(floatingPreviewToggleButton);
      floatingPreviewToggleButton.classList.remove("hidden");
    }

    preview = !preview;
  }

  function toggleSelection(event) {
    event.stopPropagation();
    updateSelection(event.target === selection ? null : event.target);
  }

  function updateSelection(newSelection) {
    if (selection) {
      selection.classList.remove("selected");
    }
    
    selection = newSelection;

    if (selection) {
      selection.classList.add("selected");
    }

    selectionTagName.textContent = selection ? selection.tagName.concat(selection.id ? '#'.concat(selection.id) : '') : "No selection";
    selectionClassName.textContent = !selection ? null : selection.className ? '.'.concat(Array.from(selection.classList).join('.')) : "No class";

    for (const button of selectionControlButtons) {
      button.disabled = (selection && selection.id === "root" && button.id !== "append-child") || !selection;
    }
  }
});
