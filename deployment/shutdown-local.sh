helm delete my-mongo
helm delete my-redis
<<<<<<< HEAD
helm delete my-kafka -n kafka

kubectl delete -f 01-chat-service.yaml
kubectl delete -f 02-client-app.yaml
kubectl delete -f 03-user-service.yaml

kubectl delete -f 04-traefik-rbac.yaml
kubectl delete -f 05-traefik-deployment.yaml
kubectl delete -f 06-ingress-routes.yaml

kubectl delete --all pods -n kafka
kubectl delete --all jobs -n kafka
kubectl delete --all pvc -n kafka
kubectl delete ns kafka
=======
kubectl delete -f 01-chat-service.yaml
kubectl delete -f 02-client-app.yaml
kubectl delete -f 03-user-service.yaml
>>>>>>> b8f221a98a5b1697dc777446629d1481b1c197ee
