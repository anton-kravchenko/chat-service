echo "\n -> !!! WARNING: You have to be logged in before running this script !!!\n"

echo "\n -> Publishing 'chat-service'...\n"
docker push kravchenkoanton/chat-service:latest

echo "\n -> Publishing 'user-service'...\n"
docker push kravchenkoanton/user-service:latest

echo "\n -> Publishing 'client-app'...\n"
docker push kravchenkoanton/client-app:latest

echo "\n -> Publishing 'github-auth-middleware'...\n"
docker push kravchenkoanton/github-auth-middleware:latest
