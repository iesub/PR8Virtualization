::Принимаем новый конфиг для базы данных пользователей и перезапускаем деплой

kubectl apply -f elastic-mongo-db-PV.yaml
kubectl apply -f elastic-mongo-db-PVC.yaml
kubectl apply -f elastic-mongo-db.yaml
kubectl apply -f elastic-mongo-db-service.yaml
pause
