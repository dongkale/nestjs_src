import os
import sys
import subprocess
# print('aaa')
os.system("docker exec -it backend npm run build")
os.system("docker exec -it backend pm2 reload all")
