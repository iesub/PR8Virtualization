::Принимаем новый конфиг для базы данных пользователей и перезапускаем деплой

kubectl apply -f elastic-PV.yaml
kubectl apply -f elastic-PVC.yaml
kubectl apply -f elastic.yaml
kubectl apply -f elastic-service.yaml
pause