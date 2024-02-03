backend: 
- pip install libretranslate
- ./run.sh --frontend-timeout 1000 (first load is long)

frontend:
- pnpm install
- copy .env.example
- rename .env and add url
- pnpm dev
