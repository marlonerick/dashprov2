#!/bin/sh

# Inicia o NGINX em primeiro plano
nginx -g "daemon off;"

# Inicia o backend em segundo plano
node backend/server.js &


