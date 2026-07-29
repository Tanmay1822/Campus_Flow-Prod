import re

files = [
    'frontend/src/components/TimetableApp.jsx',
    'frontend/src/components/FacialRecognitionApp.jsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Add bg-onyx/50 text-champagne to form inputs/selects that have 'border rounded'
    content = re.sub(
        r'(className="[^"]*border[^"]*rounded[^"]*)(")',
        r'\1 bg-onyx/50 text-champagne border-white/20\2',
        content
    )
    
    with open(file_path, 'w') as f:
        f.write(content)
        
print("Updated inputs in TimetableApp.jsx and FacialRecognitionApp.jsx")
