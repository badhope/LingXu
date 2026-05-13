#!/usr/bin/env python3
"""
批量更新项目中的名称引用
- Data → Data
- DataAgent → DataAgent
"""

import os
import re

def main():
    print('=' * 80)
    print('开始批量名称更新')
    print('=' * 80)
    
    root_dir = '/workspace/DataAgent'
    
    # 文件类型
    extensions = ['.py', '.md', '.toml', '.txt', '.js', '.css', '.html']
    
    # 替换规则
    replacements = [
        (r'\bManus\b', 'Data'),
        (r'\bOpenManus\b', 'DataAgent'),
    ]
    
    # 统计
    total_files = 0
    total_changes = 0
    
    # 遍历所有文件
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                # 跳过 .git 目录
                if '/.git/' in os.path.join(root, file):
                    continue
                
                file_path = os.path.join(root, file)
                total_files += 1
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    changed = False
                    changes_in_file = 0
                    
                    for pattern, replacement in replacements:
                        count = len(re.findall(pattern, content))
                        if count > 0:
                            content = re.sub(pattern, replacement, content)
                            changes_in_file += count
                            total_changes += count
                            changed = True
                    
                    if changed:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        
                        print(f'✅ {file_path}: {changes_in_file} 处更新')
                
                except Exception as e:
                    print(f'❌ {file_path}: {str(e)[:50]}')
    
    print('\n' + '=' * 80)
    print(f'完成：处理了 {total_files} 个文件，更新了 {total_changes} 处')
    print('=' * 80)

if __name__ == '__main__':
    main()
