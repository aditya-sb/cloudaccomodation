"use client";
import React from "react";

export default function Blog() {
  return (
    <div
      style={{
        background: "var(--background)",
        color: "var(--copy-primary)",
        padding: "2rem",
        lineHeight: "1.8",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Blog Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "var(--cta)",
          }}
        >
          Building Your API Stack
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "var(--copy-secondary)",
          }}
        >
          Software Engineering
        </p>
      </header>

      {/* Blog Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Alternating Sections */}
        <section
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexDirection: "row", // Default to row on larger screens
            flexWrap: "wrap", // Allow wrapping on smaller screens
          }}
        >
          <div style={{ flex: "1" }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac felis nec turpis vehicula malesuada.
              Suspendisse potenti. Praesent vestibulum, odio et accumsan tristique, felis nulla congue eros, eu ultrices nunc
              odio sit amet velit.
            </p>
            <p>
              Vestibulum vel ipsum nec magna ultricies fermentum. Duis nec augue in quam volutpat condimentum. Ut sollicitudin
              erat nisi, eget vehicula metus dapibus nec.
            </p>
          </div>
          <img
            src="/images/cityscape.jpeg"
            alt="Cityscape"
            style={{
              flex: "1",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </section>

        <section
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexDirection: "row-reverse", // Default to row-reverse on larger screens
            flexWrap: "wrap", // Allow wrapping on smaller screens
          }}
        >
          <div style={{ flex: "1" }}>
            <p>
              Curabitur fringilla neque nec velit egestas vehicula. Aenean ac ligula scelerisque, varius dolor in, eleifend
              urna. Integer non purus id magna dictum efficitur.
            </p>
            <p>
              Nam non ex nec ex pellentesque venenatis. Suspendisse tincidunt sapien in lorem hendrerit, ac ullamcorper ligula
              malesuada.
            </p>
          </div>
          <img
            src="/images/cottage.jpeg"
            alt="Cottage"
            style={{
              flex: "1",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </section>

        <section
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexDirection: "row", // Default to row on larger screens
            flexWrap: "wrap", // Allow wrapping on smaller screens
          }}
        >
          <div style={{ flex: "1" }}>
            <p>
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
              imperdiet.
            </p>
            <p>
              Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus
              condimentum laoreet.
            </p>
          </div>
          <img
            src="/images/mordenhouse.webp"
            alt="Modern House"
            style={{
              flex: "1",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </section>
      </div>

      {/* CSS Media Query for Mobile Screens */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            flex-direction: column !important; // Stack images and text vertically on smaller screens
            align-items: flex-start; // Align items to the start
          }
        }
      `}</style>
    </div>
  );
}
