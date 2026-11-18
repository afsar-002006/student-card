export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        page: "#F8FAFC", primary: "#2563EB", secondary: "#60A5FA",
        line: "#E2E8F0", ink: "#1E293B", muted: "#64748B",
        success: "#16A34A", danger: "#EF4444", navy: "#0F2A5C", sky: "#E8F1FE",
      },
      boxShadow: { soft: "0 1px 3px rgba(15,42,92,.06), 0 4px 14px rgba(15,42,92,.05)" },
    },
  },
  plugins: [],
};
