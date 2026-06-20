import type { TargetAndTransition, Transition } from "framer-motion";

interface AnimationVariant {
  initial: TargetAndTransition;
  whileInView: TargetAndTransition;
  viewport: { once: boolean; margin?: string };
  transition: Transition;
}

export const fadeUp: AnimationVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

export const stagger: AnimationVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function withStaggerDelay(index: number, delayStep = 0.1) {
  return {
    ...stagger,
    transition: { ...stagger.transition, delay: index * delayStep },
  };
}
