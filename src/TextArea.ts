import classes from "./TextArea.module.css";

export class TextArea {
  editor;
  container;
  overlay;
  searchPhrase: string = "";
  constructor(selector: string) {
    const editor = document.querySelector<HTMLTextAreaElement>(selector);
    if (!editor) {
      throw new Error("Cannot find selector for the textarea");
    }
    this.editor = editor;

    this.container = document.createElement("div");
    this.editor.parentElement?.appendChild(this.container);
    this.container.appendChild(this.editor);
    this.overlay = document.createElement("div");
    this.container.appendChild(this.overlay);

    this.container.className = classes.container;
    this.overlay.className = classes.overlay;

    const editorStyle = window.getComputedStyle(this.editor);

    this.overlay.style.fontFamily = editorStyle.fontFamily;
    this.overlay.style.fontSize = editorStyle.fontSize;
    this.overlay.style.fontWeight = editorStyle.fontWeight;
    this.overlay.style.lineHeight = editorStyle.lineHeight;
    this.overlay.style.letterSpacing = editorStyle.letterSpacing;
    this.overlay.style.padding = editorStyle.padding;

    this.overlay.style.marginLeft = `${
      parseFloat(editorStyle.marginLeft) + 1
    }px`;

    this.overlay.style.marginRight = `${
      parseFloat(editorStyle.marginRight) + 1
    }px`;

    this.overlay.style.marginTop = `${parseFloat(editorStyle.marginTop) + 1}px`;

    this.overlay.style.marginBottom = `${
      parseFloat(editorStyle.marginBottom) + 1
    }px`;

    this.overlay.style.width = editorStyle.width;
    this.overlay.style.height = editorStyle.height;

    const overlayZIndex = !isNaN(Number(editorStyle.zIndex))
      ? Number(editorStyle.zIndex) + 2
      : 2;

    this.overlay.style.zIndex = String(overlayZIndex);

    new ResizeObserver(this.resize.bind(this)).observe(this.editor);

    this.editor.addEventListener("scroll", this.onScroll.bind(this));
    this.editor.addEventListener("input", this.onInput.bind(this));

    this.resize();
  }

  setText(text: string) {
    this.editor.value = text;
  }

  highlight(searchPhrase: string) {
    this.searchPhrase = searchPhrase;

    if (!searchPhrase) {
      this.overlay.innerHTML = "";
      return;
    }

    const text = this.editor.value ?? "";
    if (!text || text.length < searchPhrase.length) {
      this.overlay.innerHTML = "";
      return;
    }

    this.overlay.innerHTML = text.replaceAll(
      searchPhrase,
      `<span class="${classes.highlight}">${searchPhrase}</span>`
    );
  }

  private onScroll() {
    this.overlay.scrollTop = this.editor.scrollTop;
  }

  private onInput() {
    this.highlight(this.searchPhrase);
  }

  private resize() {
    this.overlay.style.width = this.editor.clientWidth + "px";
    this.overlay.style.height = this.editor.clientHeight + "px";
  }
}
