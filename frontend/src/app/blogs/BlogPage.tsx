"use client";
import React from "react";
import BlogCard from "./BlogCard";

const blogs = [
  {
    id: 1,
    image: "/images/cityscape.jpeg",
    type: "Design",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/blogs/blog",
  },
  {
    id: 2,
    image: "/images/cottage.jpeg",
    type: "Product",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    link: "/blogs/blog",
  },
  {
    id: 3,
    image: "/images/mordenhouse.webp",
    type: "Software Engineering",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    link: "/blogs/blog",
  },
];

const BlogPage = () => {
  return (
    <div
      style={{
        background: "var(--background)",
        color: "var(--copy-primary)",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--copy-secondary)" }}>Our blog</p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Resources and insights
        </h1>
        <p style={{ color: "var(--copy-secondary)", fontSize: "1rem" }}>
          The latest industry news, interviews, technologies, and resources.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search"
          style={{
            padding: "0.75rem 1rem",
            border: `1px solid var(--input-border)`,
            background: "var(--input-bg)",
            borderRadius: "12px",
            outline: "none",
            width: "100%",
            maxWidth: "400px",
            transition: "box-shadow 0.3s",
          }}
          onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 8px var(--primary)")}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
