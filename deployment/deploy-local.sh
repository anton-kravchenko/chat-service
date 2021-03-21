helm install my-mongo bitnami/mongodb
helm install my-redis --set cluster.slaveCount=0 bitnami/redis

kubectl apply -f 01-chat-service.yaml
kubectl apply -f 02-client-app.yaml
kubectl apply -f 03-user-service.yaml
