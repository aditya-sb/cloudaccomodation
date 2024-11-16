"use client";
import React from "react";
import Link from "next/link"; // Make sure to import Link from next/link

interface BlogCardProps {
  blog: {
    id: number;
    image: string;
    type: string;
    title: string;
    description: string;
    link: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={blog.link} passHref>
      <div
        style={{
          cursor: "pointer",
          background: "var(--card)",
          border: `1px solid var(--gray-border)`,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.15)`;
          e.currentTarget.style.transform = "translateY(-6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 6px 12px rgba(0, 0, 0, 0.1)`;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div style={{ padding: "1rem" }}>
          <p
            style={{
              color: "var(--primary)",
              fontWeight: "600",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            {blog.type}
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            {blog.title}
          </h2>
          <p style={{ color: "var(--copy-secondary)", fontSize: "0.95rem" }}>
            {blog.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
