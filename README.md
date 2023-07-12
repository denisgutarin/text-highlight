# How to run

1. Clone the repo 
2. Open task.html in browser

# Idea of implementation

Textarea doesn't allow inner highlighting, so we need to create something on the layer above the textarea.
There could be two approaches:
- create many highlights over the text and count all positions of found words to put them in right places
- create one layer with the copy of textarea content and highlight phrases in-place ,then just hide one text.

First approach is more sophisticated and it is hard to understand where words will be wrapped and brought to the new line, so I've chosen the second variant.

- I put a new div layer with bigger z-index above the text-area
- style fonts, paddings, margins, the same for both
- put white-space: pre-wrap; for the enw layer to ensure that all spaces are on the right places
- put pointer-events: none for the new layer to be sure that we can click and select textarea content
- handle onscroll for the new layer to copy the scroll position from editor
- create resize observer to catch resize event of the textarea and resize new layer according to the new textarea dimensions
- handle oninput for both editable fields to implement logic of search and highlighting

Highlighting is 0.5 opacity yellow selection implemented with span with special css class.