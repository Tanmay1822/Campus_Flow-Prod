import re

files = [
    'frontend/src/components/TimetableApp.jsx',
    'frontend/src/components/FacialRecognitionApp.jsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Remove the unwanted class from the container div
    content = content.replace('className="max-w-md w-full bg-warm-ivory border border-camel/20 shadow-sm p-8 rounded-xl shadow-lg bg-white/50 text-warm-navy border-camel/20"', 'className="max-w-md w-full bg-warm-ivory border border-camel/20 shadow-sm p-8 rounded-xl shadow-lg"')
    
    # Let's also fix double font-bold if it happened
    content = content.replace('text-warm-navy font-bold drop-shadow-sm', 'text-warm-navy drop-shadow-sm')
    
    with open(file_path, 'w') as f:
        f.write(content)
        
print("Fixed divs")
