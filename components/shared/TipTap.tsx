"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StartedKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";

interface TipTapProps {
  onChange: (richText: string) => void;
}

const TipTap = ({ onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StartedKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
          levles: [2],
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] border border-gray-300 p-2 rounded-md outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2 justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
