#!/bin/bash
# Exit on most errors
set -o errexit

# colors. Example usage: printf "${YELLOW}yellow text ${NC}reset color"
GREEN='\033[0;32m'
NC='\033[0m' # No Color
RED='\033[0;31m'
YELLOW='\033[1;33m'

PROJECT_NAME='pmanager'

# DESC: Usage help
function script_usage() {
    cat << EOF
Usage: ./run.sh COMMAND
Commands:
    build                      Run the project build
    down                       Brings services down
    help -h --help             Displays this help
    logs                       Show the services logs. Usage: ./run.sh logs SERVICE
                                   Usage: ./run.sh protophp PATH_TO_PHP_REPO/src/library
    ps                         List the services and their status
    pull                       Pull the latest images
    sh                         Run sh inside a container. Usage: ./run.sh sh SERVICE
    up                         Brings services up
EOF
}

# DESC: Parameter parser
# ARGS: $@ (optional): Arguments provided to the script
# OUTS: Variables indicating command-line parameters and options
function parse_params() {
    local param
    if [ $# -eq 0 ]; then
        script_usage
        exit 1
    fi

    while [[ $# -gt 0 ]]; do
        param="$1"
        shift
        case $param in
            build)
                build "${@:1}"
                exit 0
                ;;
            down)
                down "${@:1}"
                exit 0
                ;;
            logs)
                logs "${@:1}"
                exit 0
                ;;
            ps)
                ps "${@:1}"
                exit 0
                ;;
            pull)
                pull "${@:1}"
                exit 0
                ;;
            sh)
                sh "${@:1}"
                exit 0
                ;;
            up)
                up "${@:1}"
                exit 0
                ;;
            help|-h|--help)
                script_usage
                exit 0
                ;;
            *)
                printf "Invalid parameter was provided: $param\n\n"
                script_usage
                exit 1
                ;;
        esac
    done
}

# DESC: Run the project build
# ARGS: $@ (optional): Arguments provided to the script
function build() {
    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME"  build "$@"
}

# DESC: Brings services down
# ARGS: $@ (optional): Arguments provided to the script
function down() {
    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME" down "$@"
}

# DESC: Show the services logs. Usage: ./run.sh logs SERVICE
# ARGS: $@ (optional): Arguments provided to the script
function logs() {
    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME" logs "$@"
}

# DESC: List the services and their status
# ARGS: $@ (optional): Arguments provided to the script
function ps() {
    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME" ps "$@"
}

# DESC: Pull the latest images
# ARGS: $@ (optional): Arguments provided to the script
function pull() {
    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME" pull "$@"
}

# DESC: Run sh inside a container. Usage: ./run.sh sh SERVICE
# ARGS: $@ (optional): Arguments provided to the script
function sh() {
    if [ -z "$1" ]; then
        service=${PWD##*/}
    else
        service="$1"
    fi

    printf "${YELLOW}INFO: ${NC} Running sh inside "$service".\n\n"

    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME" exec "$service" sh
}

# DESC: Brings services up
# ARGS: $@ (optional): Arguments provided to the script
function up() {
    docker-compose -f docker/docker-compose.yml --project-name "$PROJECT_NAME" up -d "$@"
}

# DESC: Main control flow
# ARGS: $@ (optional): Arguments provided to the script
function main() {
    parse_params "$@"
}

# Make it rain
main "$@"
