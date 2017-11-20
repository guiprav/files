#!/bin/bash
set -e

USER="$1"; shift

case "$USER" in
  arthur)
    AUTH="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikw1QnBBMGVQRU4zMnF5emQiLCJpYXQiOjE1MTExNzUwOTB9.5UVtU-QrvO7G_3lVjadVWyLoYG8mh5lzcrTvtBGdrMI"
    ;;

  n2liquid)
    AUTH="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxaHo4VTByQ3BXdEJPQXAiLCJpYXQiOjE1MTExNzUwNzN9.IbAExsT6EGR81TzAgyznIwsuM3WhMdzqhC73ioBaoRM"
    ;;

  *) ;;
esac

ENDPOINT="$1"; shift

OUT="$(curl -s -H"Authorization: $AUTH" -H'Content-type: application/json' "$@" "localhost:3000/$ENDPOINT")"

if [[ "$OUT" == "{"* ]]; then
  echo "$OUT" | jq .
else
  echo "$OUT"
fi
