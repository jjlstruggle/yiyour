export default function (time: number): string {
  if (time < 10) {
    return "0" + time;
  } else {
    return "" + time;
  }
}
