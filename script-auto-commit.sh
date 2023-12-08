#!/bin/bash

# Comando 1
echo "digite o diretorio"
read pasta

# Comando 2
echo "Executando Comando 2"
cd /c/Github/$pasta

# Comando 3
echo "Executando Comando 3"
auto-commit -q

git add .
git push

# Loop infinito
while true; do
    # Exibe uma mensagem
    echo "Pressione a tecla Esc para sair."

    # Lê a entrada do teclado
    read -rsn1 key

    # Verifica se a tecla pressionada é Esc
    if [ "$key" == $'\e' ]; then
        echo "Tecla Esc pressionada. Saindo."
        break
    fi
done