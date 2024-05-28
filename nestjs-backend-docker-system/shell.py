import os
import sys
import subprocess
# print('aaa')
os.system("sudo echo hello")
os.system("sudo docker exec -it backend npm run build")
os.system("sudo docker exec -it backend pm2 restart")
