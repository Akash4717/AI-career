"use client";

import React from "react";
import { Document, Page, Text, View, Link, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "Times-Roman", lineHeight: 1.5 },
  name: { fontSize: 20, textAlign: "center", fontWeight: "bold", marginBottom: 4 },
  contact: { fontSize: 10, textAlign: "center", marginBottom: 20 },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 13, marginBottom: 6, fontWeight: "bold", textDecoration: "underline" },
  bulletItem: { marginLeft: 15, marginBottom: 4 },
  paragraph: { marginBottom: 4, textAlign: "justify" },
  link: { color: "blue", textDecoration: "underline" },
});

// Helper: split markdown-ish content into sections
function parseContent(content = "") {
  const sections = [];
  let current = null;

  const lines = content
    .split("\n")
    .map((l) => l.replace(/<[^>]*>/g, "").trim()) // remove <div> etc.
    .filter(Boolean);

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { title: line.replace("## ", "").trim(), items: [] };
    } else {
      if (!current) current = { title: "General", items: [] };
      current.items.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

const isUrl = (str) => /^https?:\/\//i.test(str);

export default function ResumePDF({ content, contactInfo = {}, name = "Your Name" }) {
  const sections = parseContent(content);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.contact}>
          {contactInfo.mobile ? `${contactInfo.mobile} | ` : ""}
          {contactInfo.email ? `${contactInfo.email} | ` : ""}
        </Text>
        <View style={styles.contact}>
          {contactInfo.linkedin && (
            <Link src={contactInfo.linkedin} style={styles.link}>LinkedIn</Link>
          )}
          {"   "}
          {contactInfo.github && (
            <Link src={contactInfo.github} style={styles.link}>GitHub</Link>
          )}
          {"   "}
          {contactInfo.portfolio && (
            <Link src={contactInfo.portfolio} style={styles.link}>Portfolio</Link>
          )}
        </View>

        {/* Sections */}
        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, i) =>
              item.startsWith("-") || item.startsWith("•") ? (
                <Text key={i} style={styles.bulletItem}>
                  {item.replace(/^[-•]\s*/, "• ")}
                </Text>
              ) : isUrl(item) ? (
                <Link key={i} src={item} style={styles.link}>
                  {item}
                </Link>
              ) : (
                <Text key={i} style={styles.paragraph}>{item}</Text>
              )
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
