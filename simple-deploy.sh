#!/bin/bash

echo "Building application..."
npm run build

echo ""
echo "Starting Vercel deployment with extended timeout..."
vercel deploy --prod --token m5blolp2WsnBvyMQnVlOPD2v --yes &
DEPLOY_PID=$!

# Monitor for 3 minutes
for i in {1..36}; do
    if ! kill -0 $DEPLOY_PID 2>/dev/null; then
        wait $DEPLOY_PID
        EXIT_CODE=$?
        if [ $EXIT_CODE -eq 0 ]; then
            echo "Deployment completed successfully!"
            exit 0
        else
            echo "Deployment failed with exit code $EXIT_CODE"
            exit $EXIT_CODE
        fi
    fi
    sleep 5
    echo "Still deploying... ($((i*5))s elapsed)"
done

echo "Deployment taking longer than expected. Process may still be running."
echo "Checking if deployment completed in background..."
sleep 20

curl -s "https://api.vercel.com/v6/deployments?projectId=prj_0RGNUpp5UW0Ij7bGWSadl31XXHjx&limit=1" \
  -H "Authorization: Bearer m5blolp2WsnBvyMQnVlOPD2v" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['deployments']:
    print('Latest deployment URL:', data['deployments'][0]['url'])
    print('State:', data['deployments'][0]['state'])
else:
    print('No deployments found yet')
"
