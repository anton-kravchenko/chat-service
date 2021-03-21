helm install my-mongo bitnami/mongodb
helm install my-redis --set cluster.slaveCount=0 bitnami/redis
<<<<<<< HEAD
kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -
helm install my-kafka --namespace kafka -f 07-kafka-config.yaml bitnami/kafka
=======
>>>>>>> b8f221a98a5b1697dc777446629d1481b1c197ee

kubectl apply -f 01-chat-service.yaml
kubectl apply -f 02-client-app.yaml
kubectl apply -f 03-user-service.yaml
<<<<<<< HEAD

kubectl apply -f 04-traefik-rbac.yaml
kubectl apply -f 05-traefik-deployment.yaml
kubectl apply -f 06-ingress-routes.yaml
=======
>>>>>>> b8f221a98a5b1697dc777446629d1481b1c197ee
