module.exports = {
      apps: [
        {
          name: "my-nextjs-app",
          script: "node_modules/next/dist/bin/next",
          args: "start -p 3000",
          watch: false,
          env_production: {
            NODE_ENV: "production",
            NEXT_PUBLIC_BASE_API:"https://backend.math-star.de/api/",
            NEXT_PUBLIC_BASE_URL:"https://backend.math-star.de/"
          },
        },
      ],
    };