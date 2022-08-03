import { ComponentType, lazy, Suspense } from "react";
import { Spin } from "antd";
export default function useLazy<T>(
  Component: Promise<{ default: ComponentType<T> }>
) {
  const Lazy = lazy(() => Component);
  return (props?: any) => (
    <Suspense fallback={<Spin />}>
      <Lazy {...props} />
    </Suspense>
  );
}
