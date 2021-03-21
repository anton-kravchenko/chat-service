# echo "\n -> Pointing the local Docker daemon to the minikube internal Docker registry...\n"
# eval $(minikube -p minikube docker-env)

echo "\n -> Building chat-service...\n"
docker build -f ../chat-service/Dockerfile ../chat-service/ -t kravchenkoanton/chat-service:latest

echo "\n -> Building user-service...\n"
docker build -f ../user-service/Dockerfile ../user-service/ -t kravchenkoanton/user-service:latest

echo "\n -> Building client-app...\n"
docker build -f ../client-app/Dockerfile ../client-app/ -t kravchenkoanton/client-app:latest

echo "\n -> Done!\n"
