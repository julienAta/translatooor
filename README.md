Translate app using LibreTranslate / based on argos translate

backend: 
- cd backend
- pip install libretranslate
- libretranslate --frontend-timeout 1000
-  Or with docker: ./run.sh --frontend-timeout 1000

frontend:
- cd frontend
- pnpm install
- copy .env.example
- rename .env
- pnpm dev
