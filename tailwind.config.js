/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'User-show-bg': "url('https://imgs.search.brave.com/a_ETt2F-73TQ8KMGaLWFnF3TjwgZSkKSthq_zDuaQaI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC85MC8zOS90/ZXh0dXJlLWJsYWNr/LXdvb2Rlbi1iYWNr/Z3JvdW5kLXRlbXBs/YXRlLXZlY3Rvci0y/Nzg2OTAzOS5qcGc')",
      }
    },
  },
  plugins: [],
}

