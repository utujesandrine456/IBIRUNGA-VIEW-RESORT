"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  defaultTransition,
  fadeInUp,
  staggerContainer,
  viewport,
} from "@/lib/motion";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function MotionReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </Component>
  );
}

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: Variants;
  as?: "div" | "ul";
};

export function MotionStagger({
  children,
  className,
  stagger = staggerContainer,
  as = "div",
}: MotionStaggerProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      {children}
    </Component>
  );
}

type MotionItemProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li";
};

export function MotionItem({
  children,
  className,
  variants = fadeInUp,
  as = "div",
}: MotionItemProps) {
  const Component = motion[as];

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
