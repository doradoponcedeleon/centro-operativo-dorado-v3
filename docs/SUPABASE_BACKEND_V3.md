# Backend v3 conectado a Supabase

## Estado
- GET /api/sync funcionando
- POST /api/sync funcionando
- Tabla Supabase: public.datos
- Campo usado: contenido (jsonb)

## URL Supabase
https://htyhdphejfqnenijqmzx.supabase.co

## Endpoint local
http://127.0.0.1:9301/api/sync

## Pruebas exitosas
### Guardar
curl -X POST http://127.0.0.1:9301/api/sync \
-H "Content-Type: application/json" \
-d '{"test":"final"}'

### Leer
curl http://127.0.0.1:9301/api/sync
