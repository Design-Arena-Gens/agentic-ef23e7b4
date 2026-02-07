#!/bin/bash
export VERCEL_TOKEN="m5blolp2WsnBvyMQnVlOPD2v"
export VERCEL_PROJECT_NAME="agentic-ef23e7b4"

echo "Starting deployment..."
OUTPUT=$(timeout 120 vercel deploy --prod --yes --token "$VERCEL_TOKEN" 2>&1)
EXIT_CODE=$?

echo "$OUTPUT"

if [ $EXIT_CODE -eq 124 ]; then
    echo "Deployment timed out but may still be processing..."
    echo "Checking if URL is accessible..."
    sleep 10
    curl -s "https://${VERCEL_PROJECT_NAME}.vercel.app" | head -20
fi
