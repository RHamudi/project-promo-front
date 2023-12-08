#!/bin/bash

# Comando 2
echo "Executando Comando 2"
cd /c/Github/$PWD

# Comando 3
echo "Executando linhas de comando"
git add .

echo "y" | auto-commit

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