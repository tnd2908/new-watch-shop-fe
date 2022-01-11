import { Button, Divider, Form, Input, message, Tag } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API/API";
import "../../../styles/component/editor.scss"
import { useForm } from "antd/lib/form/Form";
import draftToHTML from "draftjs-to-html";
import { useHistory } from "react-router-dom";

interface INewsActionProps {

}

interface INewsField {
    content: any,
    title: string,
    // authors: string,
    description: string,
    status: number
}

const NewsAction: React.FC<INewsActionProps> = props => {
    const [form] = useForm();
    const history = useHistory();
    const [editor, setEditor] = useState<EditorState>(EditorState.createEmpty());

    const onEditorChange = (editorState: any) => {
        if (editorState) {
            const contentRaw = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHTML(contentRaw);
            setEditor(editorState);
            form.setFieldsValue({ content: htmlContent })
        }

    }

    function uploadImageCallBack(file: File) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            axios.post(`${API_URL}/upload`, formData)
                .then(res => resolve({
                    data: {
                        link: `${API_URL}/upload/${res.data.image}`
                    }
                }));
        })
    }

    const onFieldChange = (fields: any, allFiels: any) => {
        console.log(fields);
    }

    const onFieldSubmit = (e: INewsField) => {
        const submitData = {
            content: draftToHTML(e.content) || "",
            description: e.description || "",
            title: e.title || "",
            author: "Admin",
            status: 1
        }

        axios.post(`${API_URL}/news`, submitData).then(res => {
            message.success(res.data?.message || "Thêm tin thành công");
            history.replace("/admin");
        });
    }

    return <div className="bg-white container p-5">
        <div>
            <span>
                <span>Authors: </span>
                <span><strong>Admin</strong></span>
            </span>
            <span className="ms-5">
                <span>Approver: </span>
                <span><strong>Admin</strong></span>
            </span>
            <span className="ms-5">
                <span>Approve date: </span>
                <span><strong>12-11-2000</strong></span>
            </span>

        </div>
        <Divider className="mt-5" orientation="left"><span className="h2">News Create</span></Divider>
        <Form
            onFieldsChange={onFieldChange}
            form={form}
            onFinish={onFieldSubmit}
            className="mt-5"
            labelCol={{ lg: { span: 2 }, md: { span: 2 }, xs: { span: 2 } }}
            wrapperCol={{ lg: { span: 20 }, md: { span: 20 }, xs: { span: 20 } }}
            labelAlign="right"
        >
            <Form.Item label="Status">
                <span><Tag color={"#108ee9"}>Init</Tag></span>
            </Form.Item>
            <Form.Item name="title" label="Title">
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item name="content" label="Content">
                <Editor
                    wrapperClassName="editor__wrapper"
                    editorClassName="demo-editor"
                    toolbarClassName="toolbar-class"
                    editorState={editor}
                    onEditorStateChange={onEditorChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: true },
                        },
                    }}
                //   wrapperStyle={<wrapperStyleObject>}
                //   editorStyle={<editorStyleObject>}
                //   toolbarStyle={<toolbarStyleObject>}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default NewsAction;