import os
import sys

import uvicorn

# 确保当前目录正确
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)
sys.path.insert(0, BASE_DIR)

# 启动服务器
if __name__ == "__main__":
    uvicorn.run(
        "web_app:app", host="0.0.0.0", port=7000, reload=False, log_level="info"
    )
