echo "\n -> !!! WARNING: You have to be logged in before running this script !!!\n"

echo "\n -> Deploying 'chat-service'...\n"
docker push kravchenkoanton/chat-service:latest

echo "\n -> Deploying 'user-service'...\n"
docker push kravchenkoanton/user-service:latest

echo "\n -> Deploying 'client-app'...\n"
docker push kravchenkoanton/client-app:latest
