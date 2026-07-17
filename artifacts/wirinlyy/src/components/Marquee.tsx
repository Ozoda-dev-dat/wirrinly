import { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';

function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap text-3xl md:text-5xl font-serif font-black italic tracking-widest text-white uppercase" style={{ x }}>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
      </motion.div>
    </div>
  );
}

export function Marquee() {
  const text = "WIRINLYY ✦ PREMIUM DESSERTS ✦ TOSHKENT ✦ 100% KAKAO ✦ ";
  return (
    <div className="w-full py-6 md:py-8 flex flex-col gap-2 relative z-20" style={{ background: 'hsl(345 75% 55%)' }}>
      <ParallaxText baseVelocity={-2}>{text}</ParallaxText>
      <div className="opacity-60 -ml-[10%]">
        <ParallaxText baseVelocity={1.2}>{text}</ParallaxText>
      </div>
    </div>
  );
}
