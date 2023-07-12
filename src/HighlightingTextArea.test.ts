// @vitest-environment jsdom

import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { HighlightingTextArea } from "./HighlightingTextArea";

describe("HighlightingTextArea", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    const element = document.createElement("textarea");
    element.className = "editor";
    document.body.appendChild(element);
  });

  it("should create textarea container and overlay", () => {
    new HighlightingTextArea(".editor");
    const editor = document.querySelector(".editor");

    expect(editor).toBeTruthy();
    expect(editor?.parentElement).not.toEqual(document.body);
  });

  it("should highlight searched phrases", () => {
    const textArea = new HighlightingTextArea(".editor");
    textArea.setText("Text for searching ears");

    const editor = document.querySelector(".editor");
    const overlay = editor?.parentElement?.children[1];

    textArea.highlight("ear");
    const html = overlay?.innerHTML ?? "";
    const matches = html.match(/(<span.+highlight.+>ear<\/span>)/);

    console.log(matches);

    expect(matches?.length).toBe(2);
  });

  it("should not highlight anything if phrase doesn't exist", () => {
    const textArea = new HighlightingTextArea(".editor");
    textArea.setText("Text for searching ears");

    const editor = document.querySelector(".editor");
    const overlay = editor?.parentElement?.children[1];

    textArea.highlight("door");
    const html = overlay?.innerHTML ?? "";
    const matches = html.match(/(<span.+highlight.+>ear<\/span>)/);

    console.log(matches);

    expect(matches).toBe(null);
  });
});
