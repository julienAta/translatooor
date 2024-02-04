Translate app using LibreTranslate / based on argos translate

backend: 
- cd backend
- pip install libretranslate
- libretranslate --frontend-timeout 1000
-  Or with docker: ./run.sh --frontend-timeout 1000 (first load is long)

frontend:
- cd frontend
- pnpm install
- copy .env.example
- rename .env and add url (http://localhost:5000)
- pnpm dev
