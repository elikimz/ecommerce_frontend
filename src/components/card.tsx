import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "modern" | "product" | "elevated";
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  hover = false,
}) => {
  const baseClasses = "bg-white shadow rounded-lg";

  const variants = {
    default: "shadow-sm hover:shadow-md transition-shadow",
    modern: "card-modern",
    product: "card-product",
    elevated:
      "shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100",
  };

  const hoverClasses = hover
    ? "hover:transform hover:scale-[1.02] cursor-pointer"
    : "";

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};
