backend: 
- pip install libretranslate
- ./run.sh --frontend-timeout 1000

frontend:
- pnpm install
- pnpm dev
