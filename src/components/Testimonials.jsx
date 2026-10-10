import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "I thought it was impossible to make a website as beautiful as our product, but Rehans proved me wrong.",
    name: "Sara Lee",
    role: "CFO of Acme Co",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    text: "I've never met a web developer who truly cares about their clients' success like Rehan does.",
    name: "Chris Brown",
    role: "COO of DEF Corp",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    text: "After Rehan optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    role: "CTO of 456 Enterprises",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const cardStyle = {
  backgroundColor: "#141212ff",
  padding: "40px",
  borderRadius: "24px",
  width: "100%",
  maxWidth: "320px",
  flexShrink: 0,
  color: "#fff",
};

const Testimonials = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        padding: "60px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        style={{
          marginTop: "48px",
          backgroundColor: "#140e0eff",
          borderRadius: "20px",
        }}
      >
        {/* Heading */}
        <div
          style={{
            backgroundColor: "#320101ff",
            borderRadius: "16px",
            padding: "40px 20px",
            minHeight: "300px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "10px",
              }}
            >
              What others say
            </p>
            <h2
              style={{
                color: "#fff",
                fontWeight: "900",
                fontSize: "40px",
              }}
            >
              Testimonials.
            </h2>
          </motion.div>
        </div>

        {/* Cards Container */}
        <div
          style={{
            marginTop: "-80px",
            padding: "0 20px 56px 20px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center", // center cards on mobile
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Card 1 + Card 3 stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: "1",
              minWidth: "280px",
              maxWidth: "320px",
            }}
          >
            {[testimonials[0], testimonials[2]].map((item, index) => (
              <motion.div
                key={index}
                style={cardStyle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <p style={{ fontSize: "48px", fontWeight: "bold", margin: 0 }}>"</p>
                <div style={{ marginTop: "4px" }}>
                  <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#fff" }}>
                    {item.text}
                  </p>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "16px", fontWeight: "500", margin: 0, color: "#fff" }}>
                        <span
                          style={{
                            background: "linear-gradient(to right, #00f, #0ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          @
                        </span>{" "}
                        {item.name}
                      </p>
                      <p style={{ marginTop: "4px", fontSize: "12px", color: "#aaa" }}>
                        {item.role}
                      </p>
                    </div>
                    <img
                      src={item.avatar}
                      alt={`feedback_by-${item.name}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Card 2 */}
          <motion.div
            style={{
              ...cardStyle,
              flex: "1",
              minWidth: "280px",
              maxWidth: "320px",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p style={{ fontSize: "48px", fontWeight: "bold", margin: 0 }}>"</p>
            <div style={{ marginTop: "4px" }}>
              <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#fff" }}>
                {testimonials[1].text}
              </p>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "16px", fontWeight: "500", margin: 0, color: "#fff" }}>
                    <span
                      style={{
                        background: "linear-gradient(to right, #00f, #0ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      @
                    </span>{" "}
                    {testimonials[1].name}
                  </p>
                  <p style={{ marginTop: "4px", fontSize: "12px", color: "#aaa" }}>
                    {testimonials[1].role}
                  </p>
                </div>
                <img
                  src={testimonials[1].avatar}
                  alt={`feedback_by-${testimonials[1].name}`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
