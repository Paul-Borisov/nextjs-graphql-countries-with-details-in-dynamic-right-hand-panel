/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    after: true,
    // Using this Partial PreRendering option may result in unexpected problems in REST APIs like "429 - Too many requests"
    // on scrolling of the links' containing page.
    // ppr: "incremental",
    reactCompiler: {
      // React compiler may cause problems, for instance, in Tanstack Virtual.
      // Adding "use no memo" to a component excludes it from the scope of optimization and thus resolves the issue.
      compilationMode: "annotation",
    },
  },
};

export default nextConfig;
