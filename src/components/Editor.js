import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


const Editor = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        readonly: false,
        uploader: {
            insertImageAsBase64URI: false,
            // url: GET_Server_URL + "api/imageupload",

            isSuccess: function (resp) {
                return !resp.error;
            },
            getMessage: function (resp) {
                return resp.msg;
            },
            process: function (resp) {
                return {
                    files: resp.files || [],
                    path: resp.path,
                    baseurl: resp.baseurl,
                    error: resp.error,
                    msg: resp.msg,
                };
            },
            defaultHandlerSuccess: function (data, resp) {
                var i,
                    field = "files";
                if (data[field] && data[field].length) {
                    for (i = 0; i < data[field].length; i += 1) {
                        this.s.insertImage(
                            GET_FrontEnd_URL + "/assets/images/" + data[field][i]
                        );
                    }
                }
            },
            error: function (e) {
                this.e.fire("errorMessage", [e.getMessage(), "error", 4000]);
            },
        },
        buttons: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "brush",
            // "eraser",
            "copyformat",
            "|",
            "ol",
            "ul",
            "align",
            "|",
            "table",
            "indent",
            "outdent",
            "hr",
            "link",
            "image",
            "video",
            "source",
            "|",
        ],
        removeButtons: ["fullsize", "font", "fontsize", "paragraph"],
        toolbarSticky: true,
        toolbarAdaptive: false,
        addNewLineDeltaShow: false,
        cleanHTML: {
            replaceNBSP: true,
            removeEmptyElements: true,
            fillEmptyParagraph: false,
        },
    }
    // const config = useMemo(
    //     {
    //         readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    //         placeholder: placeholder || 'Start typings...'
    //     },
    //     [placeholder]
    // );

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
        />
    );
};

export default Editor;
