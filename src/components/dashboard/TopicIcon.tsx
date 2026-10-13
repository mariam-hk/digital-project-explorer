"use client";

import React from "react";
import {
  CreditCard,
  Smartphone,
  Globe,
  ShoppingCart,
  GraduationCap,
  Zap,
  Laptop,
} from "lucide-react";

interface TopicIconProps {
  topicId: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TopicIcon: React.FC<TopicIconProps> = ({
  topicId,
  className = "w-4 h-4",
  style,
}) => {
  const props = { className, style };
  switch (topicId) {
    case "payments":
      return <CreditCard {...props} />;
    case "smartphones":
      return <Smartphone {...props} />;
    case "internet":
      return <Globe {...props} />;
    case "shopping":
      return <ShoppingCart {...props} />;
    case "skills":
      return <GraduationCap {...props} />;
    case "readiness":
      return <Zap {...props} />;
    case "computers":
      return <Laptop {...props} />;
    default:
      return <Globe {...props} />;
  }
};
