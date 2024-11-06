"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function Counter({
  value,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = ""
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const countRef = useRef(count);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const steps = 60;
    const increment = value / steps;
    const timePerStep = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      countRef.current = Math.min(increment * currentStep, value);
      setCount(countRef.current);

      if (currentStep >= steps) {
        clearInterval(timer);
        setHasAnimated(true);
      }
    }, timePerStep);

    return () => clearInterval(timer);
  }, [value, duration, isInView, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
} 