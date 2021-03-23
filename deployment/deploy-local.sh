helm install my-mongo bitnami/mongodb
helm install my-redis --set cluster.slaveCount=0 bitnami/redis
kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -
helm install my-kafka --namespace kafka -f 07-kafka-config.yaml bitnami/kafka

kubectl apply -f 01-chat-service.yaml
kubectl apply -f 02-client-app.yaml
kubectl apply -f 03-user-service.yaml

kubectl apply -f 04-traefik-rbac.yaml
kubectl apply -f 05-traefik-deployment.yaml
kubectl apply -f 06-ingress-routes.yaml

kubectl apply -f 08-auth-middleware.yaml
