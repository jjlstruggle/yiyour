import { ComponentType, lazy, Suspense } from "react";
import { Spin } from "antd";
export default function LazyComponent({
  Component,
}: {
  Component: Promise<{ default: ComponentType<any> }>;
}) {
  const Lazy = lazy(() => Component);
  return (
    <Suspense fallback={<Spin />}>
      <Lazy />
    </Suspense>
  );
}
