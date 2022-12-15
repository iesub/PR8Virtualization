::Принимаем новый конфиг для базы данных пользователей и перезапускаем деплой

kubectl apply -f graylog.yaml
kubectl apply -f graylog-service.yaml

pause
