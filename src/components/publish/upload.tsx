import { PlusCircleFilled } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { Dispatch, SetStateAction, useState } from "react";

const uploadButton = (
  <div>
    <PlusCircleFilled className="text-yel text-lg" />
    <div className="mt-2 text-base font-normal text-black">上传封面</div>
  </div>
);

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function GoodUpload({
  setFileList,
  fileList,
}: {
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
  fileList: UploadFile[];
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  return (
    <div>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
        }}
        onRemove={(file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
        customRequest={() => {}}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
