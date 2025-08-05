"use client";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function TinyMce() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef?.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="4sexq1ugevypazbmqa5gsn6giai8mmgr03sefzecdbf2a4be"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "fontfamily | fontsize | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image link",
          font_formats:
            "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap');",
        }}
      />
      <Input className="text-white w-sm my-4" />
      <Button onClick={log} className="bg-white hover:bg-amber-300 ">
        Log editor content
      </Button>
    </>
  );
}
