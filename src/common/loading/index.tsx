import { Spin, Modal } from "antd";

interface LoadingProps {
  loading: boolean;
}

export default function Loading(props: LoadingProps) {
  return (
    <Modal
      footer={null}
      visible={props.loading}
      keyboard={false}
      maskClosable={false}
      title={false}
    >
      <div className="w-screen h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    </Modal>
  );
}
