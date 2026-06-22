"use client";

import { createContext, useContext } from "react";
import { motion, type HTMLMotionProps, type Transition } from "framer-motion";
import {
  defaultTransition,
  fadeDown,
  fadeIn,
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
  staggerContainer,
  viewport,
} from "@/lib/motion";

const StaggerContext = createContext(false);

export const motionVariants = {
  fadeUp,
  fadeDown,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
} as const;

export type MotionVariantName = keyof typeof motionVariants;

const cardShadowRest = "0 4px 24px rgba(15, 23, 42, 0.08)";
const cardShadowHover = "0 28px 56px -16px rgba(92, 46, 46, 0.22)";

const hoverCardMotion = {
  y: -8,
  boxShadow: cardShadowHover,
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

function getViewAnimation(
  inStagger: boolean,
  animateOnMount: boolean,
  variant: MotionVariantName,
) {
  const variants = motionVariants[variant];
  if (inStagger) return { variants };
  if (animateOnMount) {
    return { initial: "hidden" as const, animate: "visible" as const, variants };
  }
  return {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport,
    variants,
  };
}

type MotionDivProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: MotionVariantName;
  hover?: boolean;
  shadow?: boolean;
  animateOnMount?: boolean;
};

export function MotionDiv({
  children,
  delay = 0,
  variant = "fadeUp",
  hover = false,
  shadow = false,
  animateOnMount = false,
  transition,
  style,
  className = "",
  ...props
}: MotionDivProps) {
  const inStagger = useContext(StaggerContext);
  const animProps = getViewAnimation(inStagger, animateOnMount, variant);
  const useShadow = shadow || hover;

  return (
    <motion.div
      {...animProps}
      transition={{ ...defaultTransition, delay, ...(transition as Transition) }}
      whileHover={hover ? hoverCardMotion : undefined}
      style={{
        ...(useShadow ? { boxShadow: cardShadowRest } : {}),
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type MotionSectionProps = HTMLMotionProps<"section"> & {
  delay?: number;
  variant?: MotionVariantName;
  animateOnMount?: boolean;
};

export function MotionSection({
  children,
  delay = 0,
  variant = "fadeUp",
  animateOnMount = false,
  transition,
  ...props
}: MotionSectionProps) {
  const inStagger = useContext(StaggerContext);
  const animProps = getViewAnimation(inStagger, animateOnMount, variant);

  return (
    <motion.section
      {...animProps}
      transition={{ ...defaultTransition, delay, ...(transition as Transition) }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionStagger({
  children,
  className,
  animateOnMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  animateOnMount?: boolean;
}) {
  return (
    <StaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        {...(animateOnMount
          ? { animate: "visible" }
          : { whileInView: "visible", viewport })}
        variants={staggerContainer}
        className={className}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  );
}

type MotionItemProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: MotionVariantName;
  hover?: boolean;
  shadow?: boolean;
};

export function MotionItem({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  hover = false,
  shadow = false,
}: MotionItemProps) {
  const inStagger = useContext(StaggerContext);
  const variants = motionVariants[variant];
  const useShadow = shadow || hover;

  return (
    <motion.div
      variants={variants}
      initial={inStagger ? undefined : "hidden"}
      whileInView={inStagger ? undefined : "visible"}
      viewport={inStagger ? undefined : viewport}
      transition={{ ...defaultTransition, delay }}
      whileHover={hover ? hoverCardMotion : undefined}
      style={useShadow ? { boxShadow: cardShadowRest } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type MotionCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: boolean;
  delay?: number;
};

export function MotionCard({
  children,
  className,
  hover = true,
  shadow = true,
  delay = 0,
}: MotionCardProps) {
  const inStagger = useContext(StaggerContext);
  const useShadow = shadow || hover;

  return (
    <motion.div
      variants={scaleIn}
      initial={inStagger ? undefined : "hidden"}
      whileInView={inStagger ? undefined : "visible"}
      viewport={inStagger ? undefined : viewport}
      transition={{ ...defaultTransition, delay }}
      whileHover={hover ? hoverCardMotion : undefined}
      style={useShadow ? { boxShadow: cardShadowRest } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { motion, StaggerContext };
