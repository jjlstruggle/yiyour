interface IO {
  cb: { target: Element; callback: Function }[];
  io: IntersectionObserver;
}
class IO {
  constructor() {
    this.cb = [];
    this.io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          this.trigger(target);
        }
      });
    });
  }
  collect(element: Element, callback: Function) {
    this.io.observe(element);
    this.cb.push({ target: element, callback });
  }
  trigger(target: Element) {
    this.cb.forEach((c, index) => {
      if (c.target === target) {
        c.callback();
        this.io.unobserve(target);
        this.cb.splice(index, 1);
      }
    });
  }
}

export default new IO();
