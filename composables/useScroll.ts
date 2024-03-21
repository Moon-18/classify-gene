import { ref, onMounted, onUnmounted } from 'vue';
// import { throttle } from 'throttle-debounce';
// import { throttle } from 'throttle-debounce';
function throttle(func: Function, delay: number) {
  let last: number;
  let timer: number;

  return function (this: any, ...args: any[]) {
    const now = new Date().getTime();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        last = now;
        func.apply(this, args);
      }, delay);
    } else {
      last = now;
      func.apply(this, args);
    }
  };
}

export default function useScroll() {
  const isScroll = ref(false);

  const handleScroll = () => {
    if (window.scrollY !== 0 || document.documentElement.scrollTop !== 0) {
      isScroll.value = true;
    } else {
      isScroll.value = false;
    }
  };
  const throttleHandleScroll: any = throttle(() => {
    handleScroll();
  }, 100);
  onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', throttleHandleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', throttleHandleScroll);
  });

  return { isScroll };
}
