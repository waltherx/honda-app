module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [      
      "dark",
      {
        honda: {
          primary: "#CC0000",

          secondary: "#eedbc0",

          accent: "#efa0c1",

          neutral: "#e2e3de",

          "base-100": "#fdfdfd",

          info: "#91bfee",

          success: "#47e6d1",

          warning: "#e17509",

          error: "#f35653",
        },
      },
    ],
  },
}
