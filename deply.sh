echo "Switch To Branch Main"
git checkout main

echo "Building React App........."
npm run build 

echo "Deploying Files To Server"
scp -r build/* 139.177.179.37:var/www/html/triplef_frontend

echo "Done !"