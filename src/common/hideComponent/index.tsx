export default function Hide({
  itShould,
  children,
}: {
  itShould: boolean;
  children: JSX.Element;
}) {
  return itShould ? children : null;
}
