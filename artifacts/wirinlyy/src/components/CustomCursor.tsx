import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  return isTouch;
}

export function CustomCursor() {
  const isTouch = useIsTouch();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer ring (slow lag)
  const outerX = useSpring(cursorX, { stiffness: 80, damping: 30 });
  const outerY = useSpring(cursorY, { stiffness: 80, damping: 30 });

  // Inner dot (fast follow)
  const innerX = useSpring(cursorX, { stiffness: 800, damping: 50 });
  const innerY = useSpring(cursorY, { stiffness: 800, damping: 50 });

  // Ghosts
  const ghost1X = useSpring(cursorX, { stiffness: 200, damping: 40 });
  const ghost1Y = useSpring(cursorY, { stiffness: 200, damping: 40 });
  const ghost2X = useSpring(ghost1X, { stiffness: 250, damping: 40 });
  const ghost2Y = useSpring(ghost1Y, { stiffness: 250, damping: 40 });
  const ghost3X = useSpring(ghost2X, { stiffness: 300, damping: 40 });
  const ghost3Y = useSpring(ghost2Y, { stiffness: 300, damping: 40 });
  const ghost4X = useSpring(ghost3X, { stiffness: 350, damping: 40 });
  const ghost4Y = useSpring(ghost3Y, { stiffness: 350, damping: 40 });
  const ghost5X = useSpring(ghost4X, { stiffness: 400, damping: 40 });
  const ghost5Y = useSpring(ghost4Y, { stiffness: 400, damping: 40 });
  const ghost6X = useSpring(ghost5X, { stiffness: 450, damping: 40 });
  const ghost6Y = useSpring(ghost5Y, { stiffness: 450, damping: 40 });

  const [mode, setMode] = useState<'default' | 'magnetic' | 'text'>('default');

  useEffect(() => {
    if (isTouch) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.classList.contains('cursor-magnetic') ||
        target.closest('.cursor-hover') ||
        target.closest('.cursor-magnetic')
      ) {
        setMode('magnetic');
      } else if (
        ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(target.tagName.toLowerCase())
      ) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  const getOuterVariants = () => {
    switch (mode) {
      case 'magnetic':
        return {
          width: 90,
          height: 90,
          backgroundColor: 'hsl(345 75% 62% / 0.15)',
          borderColor: 'hsl(345 75% 62% / 0.3)',
          x: -45,
          y: -45,
        };
      case 'text':
        return {
          width: 2,
          height: 28,
          backgroundColor: 'hsl(345 75% 62% / 0.8)',
          borderColor: 'transparent',
          borderRadius: '0%',
          x: -1,
          y: -14,
        };
      default:
        return {
          width: 60,
          height: 60,
          backgroundColor: 'transparent',
          borderColor: 'hsl(345 75% 62% / 0.4)',
          borderRadius: '50%',
          x: -30,
          y: -30,
        };
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-[9998]"
        style={{ x: outerX, y: outerY }}
        animate={getOuterVariants()}
        transition={{ type: 'tween', ease: 'circOut', duration: 0.2 }}
      />
      
      {mode !== 'text' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
          style={{ x: innerX, y: innerY, marginLeft: -4, marginTop: -4 }}
          animate={{ scale: mode === 'magnetic' ? 0 : 1 }}
        />
      )}

      {/* Ghosts */}
      {mode === 'default' && (
        <>
          <motion.div className="fixed top-0 left-0 w-2 h-2 bg-primary/80 rounded-full pointer-events-none z-[9997]" style={{ x: ghost1X, y: ghost1Y, marginLeft: -4, marginTop: -4, scale: 0.8 }} />
          <motion.div className="fixed top-0 left-0 w-2 h-2 bg-primary/60 rounded-full pointer-events-none z-[9997]" style={{ x: ghost2X, y: ghost2Y, marginLeft: -4, marginTop: -4, scale: 0.6 }} />
          <motion.div className="fixed top-0 left-0 w-2 h-2 bg-primary/40 rounded-full pointer-events-none z-[9997]" style={{ x: ghost3X, y: ghost3Y, marginLeft: -4, marginTop: -4, scale: 0.5 }} />
          <motion.div className="fixed top-0 left-0 w-2 h-2 bg-primary/20 rounded-full pointer-events-none z-[9997]" style={{ x: ghost4X, y: ghost4Y, marginLeft: -4, marginTop: -4, scale: 0.4 }} />
          <motion.div className="fixed top-0 left-0 w-2 h-2 bg-primary/10 rounded-full pointer-events-none z-[9997]" style={{ x: ghost5X, y: ghost5Y, marginLeft: -4, marginTop: -4, scale: 0.3 }} />
        </>
      )}
    </>
  );
}
