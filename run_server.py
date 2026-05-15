import os
import sys

import uvicorn

# 确保当前目录正确
os.chdir(r"C:\Users\X1882\Desktop\GitHub\DATA-AI")
sys.path.insert(0, r"C:\Users\X1882\Desktop\GitHub\DATA-AI")

# 启动服务器
if __name__ == "__main__":
    uvicorn.run(
        "web_app:app", host="0.0.0.0", port=7000, reload=False, log_level="info"
    )
